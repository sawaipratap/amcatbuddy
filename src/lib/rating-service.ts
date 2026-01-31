/**
 * LeetCode-Style Rating System
 * 
 * This service implements a rating calculation algorithm similar to LeetCode's system.
 * Ratings are updated based on problem difficulty and user's current rating.
 * 
 * Key Features:
 * - Difficulty-based rating changes (Easy/Medium/Hard/Expert)
 * - Performance-based adjustments using expected success rate
 * - Maximum rating tracking
 * - Rating history preservation
 */

import { Difficulty, Prisma } from "@prisma/client";
import { prisma } from "./prisma";

// Rating configuration for different difficulty levels
const RATING_CONFIG = {
    EASY: {
        baseChange: 20,
        minChange: 10,
        maxChange: 30,
        expectedRating: 800, // Expected rating to solve easily
    },
    MEDIUM: {
        baseChange: 35,
        minChange: 20,
        maxChange: 50,
        expectedRating: 1400,
    },
    HARD: {
        baseChange: 55,
        minChange: 30,
        maxChange: 80,
        expectedRating: 2000,
    },
    EXPERT: {
        baseChange: 85,
        minChange: 50,
        maxChange: 120,
        expectedRating: 2600,
    },
} as const;

interface RatingUpdateResult {
    oldRating: number;
    newRating: number;
    delta: number;
    maxRating: number;
}

/**
 * Calculate expected performance based on user rating vs problem difficulty
 * Returns a value between 0 and 1
 */
function calculateExpectedPerformance(
    userRating: number,
    difficulty: Difficulty
): number {
    const config = RATING_CONFIG[difficulty];
    const ratingDiff = userRating - config.expectedRating;

    // Logistic function for smooth performance curve
    // Users at the expected rating have ~50% expected performance
    const performance = 1 / (1 + Math.exp(-ratingDiff / 400));

    return performance;
}

/**
 * Calculate rating change for solving a problem
 * Higher rating users get less points for easy problems
 * Lower rating users get more points for hard problems
 */
function calculateRatingChange(
    userRating: number,
    difficulty: Difficulty,
    isFirstSolve: boolean
): number {
    if (!isFirstSolve) {
        return 0; // No rating change for solving the same problem again
    }

    const config = RATING_CONFIG[difficulty];
    const expectedPerformance = calculateExpectedPerformance(userRating, difficulty);

    // Calculate actual change based on performance gap
    // If user solves a problem above their level, they get more points
    // If user solves a problem below their level, they get fewer points
    const performanceMultiplier = 1 - expectedPerformance;

    let ratingChange = Math.round(
        config.baseChange + (config.maxChange - config.baseChange) * performanceMultiplier
    );

    // Ensure rating change is within bounds
    ratingChange = Math.max(config.minChange, Math.min(config.maxChange, ratingChange));

    // Add diminishing returns for very high ratings
    if (userRating > 2400) {
        ratingChange = Math.round(ratingChange * 0.8);
    } else if (userRating > 1900) {
        ratingChange = Math.round(ratingChange * 0.9);
    }

    return ratingChange;
}

/**
 * Update user rating after solving a problem
 * Only updates rating on first successful solve of a problem
 */
export async function updateRatingForSubmission(
    userId: string,
    problemId: string,
    difficulty: Difficulty
): Promise<RatingUpdateResult | null> {
    // Check if this is the first accepted submission for this problem
    const previousAccepted = await prisma.submission.findFirst({
        where: {
            userId,
            problemId,
            verdict: "ACCEPTED",
        },
        orderBy: {
            submittedAt: "asc",
        },
    });

    const isFirstSolve = !previousAccepted;

    // Get current user rating
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { rating: true, maxRating: true },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const oldRating = user.rating;
    const ratingChange = calculateRatingChange(oldRating, difficulty, isFirstSolve);

    if (ratingChange === 0) {
        return null; // No update needed
    }

    const newRating = Math.max(0, oldRating + ratingChange); // Rating can't go below 0
    const maxRating = Math.max(user.maxRating, newRating);

    // Update user rating
    await prisma.user.update({
        where: { id: userId },
        data: {
            rating: newRating,
            maxRating,
        },
    });

    return {
        oldRating,
        newRating,
        delta: ratingChange,
        maxRating,
    };
}

/**
 * Update ratings after a contest
 * Uses more sophisticated Elo algorithm considering all participants
 */
export async function updateRatingsForContest(contestId: string): Promise<void> {
    // Get all contest participations sorted by score
    const participations = await prisma.contestParticipation.findMany({
        where: { contestId },
        include: {
            user: {
                select: { id: true, rating: true, maxRating: true },
            },
        },
        orderBy: [
            { score: "desc" },
            { penalty: "asc" },
        ],
    });

    if (participations.length === 0) {
        return;
    }

    // Calculate rating changes using Elo-based system
    const ratingUpdates: Array<{
        userId: string;
        oldRating: number;
        newRating: number;
        delta: number;
        rank: number;
    }> = [];

    for (let i = 0; i < participations.length; i++) {
        const participation = participations[i];
        const rank = i + 1;
        const oldRating = participation.user.rating;

        // Calculate expected rank based on rating
        let expectedRank = 1;
        for (const other of participations) {
            if (other.userId !== participation.userId) {
                const expectedScore = 1 / (1 + Math.pow(10, (other.user.rating - oldRating) / 400));
                expectedRank += 1 - expectedScore;
            }
        }

        // Calculate rating change based on performance
        const performanceRatio = expectedRank / rank;
        const baseChange = 50; // Base rating change for contests
        let ratingChange = Math.round(baseChange * (performanceRatio - 1));

        // Cap rating changes
        ratingChange = Math.max(-100, Math.min(100, ratingChange));

        const newRating = Math.max(0, oldRating + ratingChange);
        const maxRating = Math.max(participation.user.maxRating, newRating);

        ratingUpdates.push({
            userId: participation.userId,
            oldRating,
            newRating,
            delta: ratingChange,
            rank,
        });

        // Update user rating
        await prisma.user.update({
            where: { id: participation.userId },
            data: {
                rating: newRating,
                maxRating,
            },
        });

        // Update participation rank
        await prisma.contestParticipation.update({
            where: { id: participation.id },
            data: { rank },
        });
    }

    // Create rating history records
    await prisma.rating.createMany({
        data: ratingUpdates.map((update) => ({
            userId: update.userId,
            contestId,
            oldRating: update.oldRating,
            newRating: update.newRating,
            delta: update.delta,
            rank: update.rank,
        })),
    });
}

/**
 * Get rating color based on CodeForces-style tiers
 */
export function getRatingColor(rating: number): string {
    if (rating >= 2400) return "#ff0000"; // Grandmaster - Red
    if (rating >= 2100) return "#ff8c00"; // Master - Orange
    if (rating >= 1900) return "#aa00aa"; // Candidate Master - Purple
    if (rating >= 1600) return "#0000ff"; // Expert - Blue
    if (rating >= 1400) return "#03a89e"; // Specialist - Cyan
    if (rating >= 1200) return "#008000"; // Pupil - Green
    return "#808080"; // Newbie - Gray
}

/**
 * Get rating title based on CodeForces-style tiers
 */
export function getRatingTitle(rating: number): string {
    if (rating >= 2400) return "Grandmaster";
    if (rating >= 2100) return "Master";
    if (rating >= 1900) return "Candidate Master";
    if (rating >= 1600) return "Expert";
    if (rating >= 1400) return "Specialist";
    if (rating >= 1200) return "Pupil";
    return "Newbie";
}
