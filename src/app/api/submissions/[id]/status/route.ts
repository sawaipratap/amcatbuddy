import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

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
        return NextResponse.json(
            { error: "Submission not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(submission);
}
