import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ProblemView } from "@/components/problems/ProblemView";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getProblem(slug: string) {
    const problem = await prisma.problem.findUnique({
        where: { slug, isPublic: true },
        include: {
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
                select: {
                    submissions: true,
                },
            },
        },
    });

    return problem;
}

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
    const [problem, session] = await Promise.all([
        getProblem(slug),
        auth(),
    ]);

    if (!problem) {
        notFound();
    }

    // Get user's submission status for this problem
    let userSubmissions = null;
    if (session?.user?.id) {
        userSubmissions = await prisma.submission.findMany({
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
        });
    }

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
