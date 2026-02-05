import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log(`[Status API] Checking status for submission: ${id}`);

        const submission = await prisma.submission.findUnique({
            where: { id },
            select: {
                id: true,
                verdict: true,
                executionTime: true,
                memoryUsed: true,
                testsPassed: true,
                totalTests: true,
                errorMessage: true,
            },
        });

        if (!submission) {
            console.error(`[Status API] Submission not found: ${id}`);
            return NextResponse.json(
                { error: "Submission not found" },
                { status: 404 }
            );
        }

        console.log(`[Status API] Submission ${id} status: ${submission.verdict}`);
        return NextResponse.json(submission);
    } catch (error) {
        console.error("[Status API] Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch submission status", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
