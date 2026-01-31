import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const runSchema = z.object({
    problemId: z.string(),
    code: z.string().min(1, "Code is required"),
    language: z.enum(["CPP", "PYTHON", "JAVA", "JAVASCRIPT", "GO", "RUST"]),
});

// Language ID mapping for Judge0
const languageIds: Record<string, number> = {
    CPP: 54,       // C++ (GCC 9.2.0)
    PYTHON: 71,    // Python (3.8.1)
    JAVA: 62,      // Java (OpenJDK 13.0.1)
    JAVASCRIPT: 63, // JavaScript (Node.js 12.14.0)
    GO: 60,        // Go (1.13.5)
    RUST: 73,      // Rust (1.40.0)
};

// Run code against sample test cases only (no auth required)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = runSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.issues[0].message },
                { status: 400 }
            );
        }

        const { problemId, code, language } = result.data;

        // Get problem with sample test cases only
        const problem = await prisma.problem.findUnique({
            where: { id: problemId },
            select: {
                id: true,
                timeLimit: true,
                memoryLimit: true,
                sampleInput: true,
                sampleOutput: true,
                testCases: {
                    where: { isSample: true },
                    select: { input: true, expectedOutput: true },
                    orderBy: { order: "asc" },
                    take: 3, // Limit to 3 sample test cases for anonymous runs
                },
            },
        });

        if (!problem) {
            return NextResponse.json(
                { error: "Problem not found" },
                { status: 404 }
            );
        }

        // Use sample input/output if no sample test cases defined
        const testCases = problem.testCases.length > 0
            ? problem.testCases
            : problem.sampleInput && problem.sampleOutput
                ? [{ input: problem.sampleInput, expectedOutput: problem.sampleOutput }]
                : [];

        if (testCases.length === 0) {
            return NextResponse.json(
                { error: "No sample test cases available" },
                { status: 400 }
            );
        }

        const judgeUrl = process.env.JUDGE0_API_URL || "http://localhost:2358";
        console.log("Using Judge0 URL:", judgeUrl);
        const languageId = languageIds[language];

        // Run against each test case
        const results = await Promise.all(
            testCases.map(async (tc, index) => {
                try {
                    // Submit to Judge0
                    const submitResponse = await fetch(`${judgeUrl}/submissions?base64_encoded=true&wait=true`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            source_code: Buffer.from(code).toString("base64"),
                            language_id: languageId,
                            stdin: Buffer.from(tc.input).toString("base64"),
                            expected_output: Buffer.from(tc.expectedOutput.trim()).toString("base64"),
                            cpu_time_limit: problem.timeLimit / 1000, // Convert ms to seconds
                            memory_limit: problem.memoryLimit * 1024, // Convert MB to KB
                        }),
                    });

                    if (!submitResponse.ok) {
                        console.error(`Judge0 error: ${submitResponse.status} - ${await submitResponse.text()}`);
                        return {
                            testCase: index + 1,
                            status: "error",
                            message: "Judge service unavailable",
                        };
                    }

                    const judgeResult = await submitResponse.json();

                    // Decode output
                    const stdout = judgeResult.stdout
                        ? Buffer.from(judgeResult.stdout, "base64").toString()
                        : "";
                    const stderr = judgeResult.stderr
                        ? Buffer.from(judgeResult.stderr, "base64").toString()
                        : "";
                    const compileOutput = judgeResult.compile_output
                        ? Buffer.from(judgeResult.compile_output, "base64").toString()
                        : "";

                    // Determine verdict
                    const statusId = judgeResult.status?.id;
                    let verdict = "WRONG_ANSWER";

                    if (statusId === 3) verdict = "ACCEPTED";
                    else if (statusId === 4) verdict = "WRONG_ANSWER";
                    else if (statusId === 5) verdict = "TIME_LIMIT";
                    else if (statusId === 6) verdict = "COMPILE_ERROR";
                    else if ([7, 8, 9, 10, 11, 12].includes(statusId)) verdict = "RUNTIME_ERROR";

                    return {
                        testCase: index + 1,
                        status: verdict,
                        input: tc.input,
                        expectedOutput: tc.expectedOutput.trim(),
                        actualOutput: stdout.trim(),
                        time: judgeResult.time,
                        memory: judgeResult.memory,
                        error: stderr || compileOutput || null,
                    };
                } catch (err) {
                    console.error(`Test case ${index + 1} error:`, err);
                    return {
                        testCase: index + 1,
                        status: "error",
                        message: "Execution failed",
                    };
                }
            })
        );

        // Calculate overall result
        const allPassed = results.every((r) => r.status === "ACCEPTED");
        const passedCount = results.filter((r) => r.status === "ACCEPTED").length;

        return NextResponse.json({
            success: allPassed,
            passed: passedCount,
            total: results.length,
            results,
        });
    } catch (err) {
        console.error("Run error:", err);
        return NextResponse.json(
            { error: "Failed to run code" },
            { status: 500 }
        );
    }
}
