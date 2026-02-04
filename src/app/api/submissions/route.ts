import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { submitToJudge } from "@/lib/judge";

// Enable Edge Runtime for ultra-fast response times and no cold starts
export const runtime = 'edge';
export const preferredRegion = 'auto'; // Deploy to region closest to users

const submissionSchema = z.object({
    problemId: z.string(),
    code: z.string().min(1, "Code is required"),
    language: z.enum(["CPP", "PYTHON", "JAVA", "JAVASCRIPT", "GO", "RUST"]),
    contestId: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        const body = await request.json();
        const result = submissionSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.issues[0].message },
                { status: 400 }
            );
        }

        const { problemId, code, language, contestId } = result.data;

        // Verify problem exists
        const problem = await prisma.problem.findUnique({
            where: { id: problemId },
            include: {
                testCases: {
                    select: { id: true, input: true, expectedOutput: true },
                    orderBy: { order: "asc" },
                },
            },
        });

        if (!problem) {
            return NextResponse.json(
                { error: "Problem not found" },
                { status: 404 }
            );
        }

        // For logged-in users: create persistent submission
        if (session?.user?.id) {
            console.log(`[Submission API] Creating submission for user ${session.user.id}, problem ${problemId}`);

            const submission = await prisma.submission.create({
                data: {
                    userId: session.user.id,
                    problemId,
                    code,
                    language,
                    contestId,
                    verdict: "PENDING",
                    totalTests: problem.testCases.length,
                },
            });

            console.log(`[Submission API] Created submission ${submission.id}, submitting to Judge0...`);
            console.log(`[Submission API] Judge0 URL: ${process.env.JUDGE0_API_URL || "http://localhost:2358"}`);

            // Submit to Judge0 asynchronously
            submitToJudge(submission.id, code, language, problem.testCases, {
                timeLimit: problem.timeLimit,
                memoryLimit: problem.memoryLimit,
            }).catch((err: Error) => {
                console.error("Judge submission error:", err);
            });

            return NextResponse.json({
                id: submission.id,
                message: "Submission received",
                anonymous: false,
            });
        }

        // For anonymous users: run against all test cases but don't persist
        const judgeUrl = process.env.JUDGE0_API_URL || "http://localhost:2358";
        const languageIds: Record<string, number> = {
            CPP: 54, PYTHON: 71, JAVA: 62, JAVASCRIPT: 63, GO: 60, RUST: 73,
        };
        const languageId = languageIds[language];

        // Run against all test cases
        const testResults = await Promise.all(
            problem.testCases.map(async (tc) => {
                try {
                    const submitResponse = await fetch(`${judgeUrl}/submissions?base64_encoded=true&wait=true`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            source_code: Buffer.from(code).toString("base64"),
                            language_id: languageId,
                            stdin: Buffer.from(tc.input).toString("base64"),
                            expected_output: Buffer.from(tc.expectedOutput.trim()).toString("base64"),
                            cpu_time_limit: problem.timeLimit / 1000,
                            memory_limit: problem.memoryLimit * 1024,
                        }),
                    });

                    if (!submitResponse.ok) {
                        return { passed: false, status: "error" };
                    }

                    const judgeResult = await submitResponse.json();
                    const statusId = judgeResult.status?.id;

                    return {
                        passed: statusId === 3,
                        status: statusId === 3 ? "ACCEPTED" :
                            statusId === 5 ? "TIME_LIMIT" :
                                statusId === 6 ? "COMPILE_ERROR" : "WRONG_ANSWER",
                        time: judgeResult.time,
                        memory: judgeResult.memory,
                    };
                } catch {
                    return { passed: false, status: "error" };
                }
            })
        );

        const passedCount = testResults.filter((r) => r.passed).length;
        const allPassed = passedCount === testResults.length;

        return NextResponse.json({
            id: `anon-${Date.now()}`,
            message: allPassed ? "All tests passed!" : `${passedCount}/${testResults.length} tests passed`,
            anonymous: true,
            verdict: allPassed ? "ACCEPTED" : "WRONG_ANSWER",
            passed: passedCount,
            total: testResults.length,
            results: testResults,
        });
    } catch (err) {
        console.error("Submission error:", err);
        return NextResponse.json(
            { error: "Failed to create submission" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const problemId = searchParams.get("problemId");
    const userId = searchParams.get("userId");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 20;

    const where: Record<string, unknown> = {};

    if (problemId) where.problemId = problemId;
    if (userId) where.userId = userId;

    const [submissions, total] = await Promise.all([
        prisma.submission.findMany({
            where,
            include: {
                user: { select: { username: true, name: true, image: true } },
                problem: { select: { title: true, slug: true } },
            },
            orderBy: { submittedAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.submission.count({ where }),
    ]);

    return NextResponse.json({
        submissions,
        total,
        page,
        totalPages: Math.ceil(total / pageSize),
    });
}
