import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "You must be logged in to register" },
                { status: 401 }
            );
        }

        const { id: contestId } = await params;

        // Verify contest exists and is upcoming
        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
        });

        if (!contest) {
            return NextResponse.json(
                { error: "Contest not found" },
                { status: 404 }
            );
        }

        const now = new Date();
        if (now >= contest.startTime) {
            return NextResponse.json(
                { error: "Registration is closed for this contest" },
                { status: 400 }
            );
        }

        // Check if already registered
        const existing = await prisma.contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId,
                },
            },
        });

        if (existing) {
            return NextResponse.json(
                { error: "Already registered for this contest" },
                { status: 400 }
            );
        }

        // Register user
        const participation = await prisma.contestParticipation.create({
            data: {
                userId: session.user.id,
                contestId,
            },
        });

        return NextResponse.json({
            id: participation.id,
            message: "Successfully registered for contest",
        });
    } catch (error) {
        console.error("Contest registration error:", error);
        return NextResponse.json(
            { error: "Failed to register for contest" },
            { status: 500 }
        );
    }
}
