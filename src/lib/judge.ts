import { prisma } from "@/lib/prisma";

// Types matching our Prisma schema
type Language = "CPP" | "PYTHON" | "JAVA" | "JAVASCRIPT" | "GO" | "RUST";
type Verdict =
    | "PENDING"
    | "RUNNING"
    | "ACCEPTED"
    | "WRONG_ANSWER"
    | "TIME_LIMIT"
    | "MEMORY_LIMIT"
    | "RUNTIME_ERROR"
    | "COMPILE_ERROR";

interface TestCase {
    id: string;
    input: string;
    expectedOutput: string;
}

interface ProblemLimits {
    timeLimit: number; // milliseconds
    memoryLimit: number; // MB
}

// Judge0 language IDs
const languageIds: Record<Language, number> = {
    CPP: 105,       // C++ (GCC 14.1.0)
    PYTHON: 109,    // Python (3.13.2)
    JAVA: 91,       // Java (JDK 17.0.6 LTS)
    JAVASCRIPT: 102,// JavaScript (Node.js 22.08.0)
    GO: 107,        // Go (1.23.5)
    RUST: 108,      // Rust (1.85.0)
};

// Judge0 status to our Verdict mapping
const statusToVerdict: Record<number, Verdict> = {
    1: "PENDING", // In Queue
    2: "RUNNING", // Processing
    3: "ACCEPTED", // Accepted
    4: "WRONG_ANSWER", // Wrong Answer
    5: "TIME_LIMIT", // Time Limit Exceeded
    6: "COMPILE_ERROR", // Compilation Error
    7: "RUNTIME_ERROR", // Runtime Error (SIGSEGV)
    8: "RUNTIME_ERROR", // Runtime Error (SIGXFSZ)
    9: "RUNTIME_ERROR", // Runtime Error (SIGFPE)
    10: "RUNTIME_ERROR", // Runtime Error (SIGABRT)
    11: "RUNTIME_ERROR", // Runtime Error (NZEC)
    12: "RUNTIME_ERROR", // Runtime Error (Other)
    13: "COMPILE_ERROR", // Internal Error
    14: "COMPILE_ERROR", // Exec Format Error
};

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || "http://localhost:2358";
const JUDGE0_AUTH_TOKEN = process.env.JUDGE0_AUTH_TOKEN;

async function callJudge0(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string> || {}),
    };

    if (JUDGE0_AUTH_TOKEN) {
        headers["X-Auth-Token"] = JUDGE0_AUTH_TOKEN;
    }

    return fetch(`${JUDGE0_API_URL}${endpoint}`, {
        ...options,
        headers,
    });
}

export async function submitToJudge(
    submissionId: string,
    code: string,
    language: Language,
    testCases: TestCase[],
    limits: ProblemLimits
): Promise<void> {
    console.log(`[Judge] Starting submission ${submissionId} with ${testCases.length} test cases`);
    console.log(`[Judge] Judge0 URL: ${JUDGE0_API_URL}`);

    try {
        // Update submission to RUNNING
        await prisma.submission.update({
            where: { id: submissionId },
            data: { verdict: "RUNNING" },
        });

        console.log(`[Judge] Submitting ${testCases.length} test cases to Judge0...`);

        // Submit each test case to Judge0
        const submissions = await Promise.all(
            testCases.map(async (tc, index) => {
                const response = await callJudge0("/submissions?base64_encoded=true&wait=false", {
                    method: "POST",
                    body: JSON.stringify({
                        source_code: Buffer.from(code).toString("base64"),
                        language_id: languageIds[language],
                        stdin: Buffer.from(tc.input).toString("base64"),
                        expected_output: Buffer.from(tc.expectedOutput.trim()).toString("base64"),
                        cpu_time_limit: limits.timeLimit / 1000, // Convert to seconds
                        memory_limit: limits.memoryLimit * 1024, // Convert to KB
                    }),
                });

                if (!response.ok) {
                    console.error(`[Judge] Judge0 submission failed: ${response.status} ${response.statusText}`);
                    throw new Error(`Judge0 submission failed: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(`[Judge] Test case submitted, token: ${data.token}`);
                return { testCaseId: tc.id, token: data.token, input: tc.input, expectedOutput: tc.expectedOutput, index };
            })
        );

        console.log(`[Judge] All test cases submitted, starting to poll for results...`);

        // Poll for results
        let allDone = false;
        let attempts = 0;
        const maxAttempts = 60;
        let testsPassed = 0;
        let finalVerdict: Verdict = "ACCEPTED";
        let maxTime = 0;
        let maxMemory = 0;
        let errorMessage: string | null = null;
        // Track first failed test case details
        let failedTestInput: string | null = null;
        let failedTestExpected: string | null = null;
        let failedTestActual: string | null = null;

        while (!allDone && attempts < maxAttempts) {
            attempts++;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(`[Judge] Polling attempt ${attempts}/${maxAttempts}`);

            const tokens = submissions.map((s) => s.token).join(",");
            const response = await callJudge0(
                `/submissions/batch?tokens=${tokens}&base64_encoded=true&fields=token,status,time,memory,stderr,compile_output,stdout`
            );

            if (!response.ok) {
                console.error(`[Judge] Polling failed: ${response.status}`);
                continue;
            }

            const data = await response.json();
            const results = data.submissions;

            allDone = results.every(
                (r: { status: { id: number } }) => r.status.id >= 3
            );

            if (allDone) {
                testsPassed = 0;
                for (let i = 0; i < results.length; i++) {
                    const result = results[i];
                    const submission = submissions[i];
                    const statusId = result.status.id as number;
                    const verdict = statusToVerdict[statusId] || "RUNTIME_ERROR";

                    if (verdict === "ACCEPTED") {
                        testsPassed++;
                    } else if (finalVerdict === "ACCEPTED") {
                        // First failed test case - capture details
                        finalVerdict = verdict;
                        failedTestInput = submission.input;
                        failedTestExpected = submission.expectedOutput.trim();
                        failedTestActual = result.stdout
                            ? Buffer.from(result.stdout, "base64").toString("utf-8").trim()
                            : "(no output)";
                        if (result.stderr) {
                            errorMessage = Buffer.from(result.stderr, "base64").toString("utf-8");
                        } else if (result.compile_output) {
                            errorMessage = Buffer.from(result.compile_output, "base64").toString("utf-8");
                        }
                    }

                    if (result.time) {
                        maxTime = Math.max(maxTime, parseFloat(result.time) * 1000);
                    }
                    if (result.memory) {
                        maxMemory = Math.max(maxMemory, result.memory as number);
                    }
                }
            }
        }

        if (!allDone) {
            console.error(`[Judge] Judging timed out after ${maxAttempts} attempts`);
            finalVerdict = "TIME_LIMIT";
            errorMessage = "Judging timed out";
        } else {
            console.log(`[Judge] Judging complete. Verdict: ${finalVerdict}, Tests passed: ${testsPassed}/${testCases.length}`);
        }

        // Update submission with results
        await prisma.submission.update({
            where: { id: submissionId },
            data: {
                verdict: finalVerdict,
                testsPassed,
                executionTime: Math.round(maxTime),
                memoryUsed: maxMemory,
                errorMessage,
                failedTestInput,
                failedTestExpected,
                failedTestActual,
            },
        });

        // If accepted, update user stats and rating
        if (finalVerdict === "ACCEPTED") {
            const submission = await prisma.submission.findUnique({
                where: { id: submissionId },
                select: {
                    userId: true,
                    problemId: true,
                    problem: {
                        select: { difficulty: true }
                    }
                },
            });

            if (submission) {
                // Check if this is the first AC for this problem by this user
                const previousAC = await prisma.submission.findFirst({
                    where: {
                        userId: submission.userId,
                        problemId: submission.problemId,
                        verdict: "ACCEPTED",
                        id: { not: submissionId },
                    },
                });

                if (!previousAC) {
                    // Update problems solved count
                    await prisma.user.update({
                        where: { id: submission.userId },
                        data: { problemsSolved: { increment: 1 } },
                    });

                    // Update rating using LeetCode-style algorithm
                    try {
                        const { updateRatingForSubmission } = await import("./rating-service");
                        const ratingUpdate = await updateRatingForSubmission(
                            submission.userId,
                            submission.problemId,
                            submission.problem.difficulty
                        );

                        if (ratingUpdate) {
                            console.log(
                                `Rating updated for user ${submission.userId}: ` +
                                `${ratingUpdate.oldRating} → ${ratingUpdate.newRating} ` +
                                `(${ratingUpdate.delta > 0 ? '+' : ''}${ratingUpdate.delta})`
                            );
                        }
                    } catch (error) {
                        console.error("Error updating rating:", error);
                        // Don't fail the submission if rating update fails
                    }
                }
            }
        }
    } catch (error) {
        console.error(`[Judge] Critical error for submission ${submissionId}:`, error);
        await prisma.submission.update({
            where: { id: submissionId },
            data: {
                verdict: "RUNTIME_ERROR",
                errorMessage: error instanceof Error ? error.message : "Judge error",
            },
        });
    }
}
