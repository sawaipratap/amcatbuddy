import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ProblemView } from "@/components/problems/ProblemView";
import { Metadata } from "next";
import { cache } from "react";
import { getCached, CACHE_TTL } from "@/lib/cache";

// Revalidate problem page every 5 minutes (reduces DB load significantly)
export const revalidate = 300;

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Problem type for caching
type CachedProblem = {
    id: string;
    title: string;
    slug: string;
    statement: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    difficulty: string;
    timeLimit: number;
    memoryLimit: number;
    sampleInput: string;
    sampleOutput: string;
    hint: string | null;
    editorial: string | null;
    tags: { tag: { name: string; slug: string; color: string } }[];
    author: { username: string | null; name: string | null; image: string | null };
    testCases: { input: string; expectedOutput: string; order: number }[];
    _count: { submissions: number };
};

// Cache the problem fetch with Redis + React cache
const getProblem = cache(async (slug: string) => {
    return getCached<CachedProblem | null>(
        `problem:${slug}`,
        async () => {
            return prisma.problem.findUnique({
                where: { slug, isPublic: true },
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    statement: true,
                    inputFormat: true,
                    outputFormat: true,
                    constraints: true,
                    difficulty: true,
                    timeLimit: true,
                    memoryLimit: true,
                    sampleInput: true,
                    sampleOutput: true,
                    hint: true,
                    editorial: true,
                    tags: {
                        select: {
                            tag: { select: { name: true, slug: true, color: true } },
                        },
                    },
                    author: {
                        select: { username: true, name: true, image: true },
                    },
                    testCases: {
                        where: { isSample: true },
                        select: { input: true, expectedOutput: true, order: true },
                        orderBy: { order: "asc" },
                    },
                    _count: {
                        select: { submissions: true },
                    },
                },
            });
        },
        CACHE_TTL.PROBLEM
    );
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const problem = await getProblem(slug);

    if (!problem) {
        return { title: "Problem Not Found" };
    }

    return {
        title: problem.title,
        description: problem.statement.substring(0, 160),
    };
}

export default async function ProblemPage({ params }: PageProps) {
    const { slug } = await params;

    // Batch all queries in parallel
    const [problem, session] = await Promise.all([
        getProblem(slug),
        auth(),
    ]);

    if (!problem) {
        notFound();
    }

    // Check authentication - redirect if not logged in
    if (!session?.user) {
        redirect(`/login?callbackUrl=/problems/${slug}`);
    }

    // Only fetch user submissions if logged in (single optimized query)
    const userSubmissions = session?.user?.id
        ? await prisma.submission.findMany({
            where: {
                userId: session.user.id,
                problemId: problem.id,
            },
            select: {
                id: true,
                verdict: true,
                language: true,
                submittedAt: true,
            },
            orderBy: { submittedAt: "desc" },
            take: 10,
        })
        : null;

    const hasSolved = userSubmissions?.some((s) => s.verdict === "ACCEPTED") ?? false;

    return (
        <ProblemView
            problem={problem}
            sampleTestCases={problem.testCases}
            userSubmissions={userSubmissions}
            hasSolved={hasSolved}
            isLoggedIn={!!session?.user}
        />
    );
}

