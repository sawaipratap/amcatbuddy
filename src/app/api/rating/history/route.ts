import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getRatingColor, getRatingTitle } from "@/lib/rating-service";

/**
 * GET /api/rating/history
 * Get rating history for a user
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        // Get user's current rating
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                rating: true,
                maxRating: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Get rating history from contests
        const ratingHistory = await prisma.rating.findMany({
            where: { userId },
            include: {
                contest: {
                    select: {
                        title: true,
                        slug: true,
                        startTime: true,
                    },
                },
            },
            orderBy: { calculatedAt: "desc" },
        });

        return NextResponse.json({
            currentRating: user.rating,
            maxRating: user.maxRating,
            color: getRatingColor(user.rating),
            title: getRatingTitle(user.rating),
            history: ratingHistory,
        });
    } catch (error) {
        console.error("Error fetching rating history:", error);
        return NextResponse.json(
            { error: "Failed to fetch rating history" },
            { status: 500 }
        );
    }
}
