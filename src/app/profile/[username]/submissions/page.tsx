import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import styles from "../profile.module.css";

interface PageProps {
    params: Promise<{ username: string }>;
    searchParams: Promise<{ page?: string }>;
}

const ITEMS_PER_PAGE = 50;

const verdictConfig: Record<string, { label: string; class: string }> = {
    ACCEPTED: { label: "AC", class: "verdict-accepted" },
    WRONG_ANSWER: { label: "WA", class: "verdict-wrong" },
    TIME_LIMIT: { label: "TLE", class: "verdict-tle" },
    MEMORY_LIMIT: { label: "MLE", class: "verdict-tle" },
    RUNTIME_ERROR: { label: "RE", class: "verdict-wrong" },
    COMPILE_ERROR: { label: "CE", class: "verdict-wrong" },
    PENDING: { label: "...", class: "verdict-pending" },
    RUNNING: { label: "...", class: "verdict-pending" },
};

export default async function SubmissionsPage({ params, searchParams }: PageProps) {
    const { username } = await params;
    const { page: pageParam } = await searchParams;
    const page = parseInt(pageParam || "1");

    const user = await prisma.user.findUnique({
        where: { username },
        select: { id: true, username: true, name: true },
    });

    if (!user) {
        notFound();
    }

    const [submissions, totalSubmissions] = await Promise.all([
        prisma.submission.findMany({
            where: { userId: user.id },
            select: {
                id: true,
                verdict: true,
                language: true,
                submittedAt: true,
                executionTime: true,
                memoryUsed: true,
                problem: {
                    select: {
                        title: true,
                        slug: true,
                        difficulty: true,
                    },
                },
            },
            orderBy: { submittedAt: "desc" },
            skip: (page - 1) * ITEMS_PER_PAGE,
            take: ITEMS_PER_PAGE,
        }),
        prisma.submission.count({
            where: { userId: user.id },
        }),
    ]);

    const totalPages = Math.ceil(totalSubmissions / ITEMS_PER_PAGE);

    return (
        <div className="container">
            <div style={{ marginBottom: "2rem" }}>
                <Link href={`/profile/${user.username}`} className="btn btn-ghost btn-sm">
                    ← Back to Profile
                </Link>
            </div>

            <h1 style={{ marginBottom: "2rem" }}>
                All Submissions - {user.name || user.username}
            </h1>

            <p style={{ marginBottom: "1.5rem", color: "var(--text-secondary)" }}>
                Total: {totalSubmissions} submissions
            </p>

            {submissions.length === 0 ? (
                <p className={styles.emptyState}>No submissions yet</p>
            ) : (
                <>
                    <div className={styles.submissionsList}>
                        {submissions.map((sub) => {
                            const config = verdictConfig[sub.verdict] || verdictConfig.PENDING;
                            return (
                                <div key={sub.id} className={styles.submissionItem}>
                                    <Link
                                        href={`/problems/${sub.problem.slug}`}
                                        className={styles.problemLink}
                                    >
                                        {sub.problem.title}
                                    </Link>
                                    <span className={`badge ${config.class}`}>{config.label}</span>
                                    <span className={styles.language}>{sub.language}</span>
                                    {sub.executionTime && (
                                        <span className={styles.time}>{sub.executionTime}ms</span>
                                    )}
                                    {sub.memoryUsed && (
                                        <span className={styles.time}>
                                            {Math.round(sub.memoryUsed / 1024)}MB
                                        </span>
                                    )}
                                    <span className={styles.time}>
                                        {new Date(sub.submittedAt).toLocaleString()}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "1rem",
                                marginTop: "2rem",
                            }}
                        >
                            {page > 1 && (
                                <Link
                                    href={`/profile/${user.username}/submissions?page=${page - 1}`}
                                    className="btn btn-secondary"
                                >
                                    Previous
                                </Link>
                            )}
                            <span style={{ display: "flex", alignItems: "center" }}>
                                Page {page} of {totalPages}
                            </span>
                            {page < totalPages && (
                                <Link
                                    href={`/profile/${user.username}/submissions?page=${page + 1}`}
                                    className="btn btn-secondary"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
