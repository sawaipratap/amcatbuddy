import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ContestTimer } from "@/components/contests/ContestTimer";
import styles from "./contest.module.css";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getContest(slug: string) {
    const contest = await prisma.contest.findUnique({
        where: { slug, isPublic: true },
        include: {
            problems: {
                orderBy: { order: "asc" },
                include: {
                    problem: {
                        select: {
                            id: true,
                            title: true,
                            slug: true,
                            difficulty: true,
                        },
                    },
                },
            },
            _count: {
                select: { participations: true },
            },
        },
    });

    return contest;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const contest = await getContest(slug);

    if (!contest) {
        return { title: "Contest Not Found" };
    }

    return {
        title: contest.title,
        description: contest.description.substring(0, 160),
    };
}

const difficultyConfig = {
    EASY: { label: "Easy", class: "badge-easy" },
    MEDIUM: { label: "Medium", class: "badge-medium" },
    HARD: { label: "Hard", class: "badge-hard" },
    EXPERT: { label: "Expert", class: "badge-expert" },
};

export default async function ContestPage({ params }: PageProps) {
    const { slug } = await params;
    const [contest, session] = await Promise.all([getContest(slug), auth()]);

    if (!contest) {
        notFound();
    }

    const now = new Date();
    const startTime = new Date(contest.startTime);
    const endTime = new Date(contest.endTime);

    const contestStatus =
        now < startTime ? "upcoming" :
            now >= startTime && now < endTime ? "ongoing" :
                "ended";

    // Check if user is registered
    let isRegistered = false;
    let userParticipation = null;

    if (session?.user?.id) {
        userParticipation = await prisma.contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contest.id,
                },
            },
        });
        isRegistered = !!userParticipation;
    }

    return (
        <div className="container">
            {/* Contest Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.titleRow}>
                        <h1 className={styles.title}>{contest.title}</h1>
                        {contest.isRated && <span className={styles.ratedBadge}>Rated</span>}
                    </div>

                    <p className={styles.description}>{contest.description}</p>

                    <div className={styles.meta}>
                        <div className={styles.metaItem}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>
                                {startTime.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <div className={styles.metaItem}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>
                                {startTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                {" - "}
                                {endTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                        </div>
                        <div className={styles.metaItem}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <span>{contest._count.participations} participants</span>
                        </div>
                    </div>
                </div>

                {/* Timer / Status */}
                <div className={styles.timerSection}>
                    <ContestTimer
                        startTime={contest.startTime.toISOString()}
                        endTime={contest.endTime.toISOString()}
                        status={contestStatus}
                    />

                    {contestStatus === "upcoming" && !isRegistered && session?.user && (
                        <form action={`/api/contests/${contest.id}/register`} method="POST">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Register Now
                            </button>
                        </form>
                    )}

                    {contestStatus === "upcoming" && isRegistered && (
                        <span className={styles.registeredBadge}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Registered
                        </span>
                    )}

                    {contestStatus === "ongoing" && session?.user && (
                        <Link href={`/contests/${contest.slug}/arena`} className="btn btn-primary btn-lg">
                            Enter Arena
                        </Link>
                    )}

                    {!session?.user && (
                        <Link href={`/login?callbackUrl=/contests/${contest.slug}`} className="btn btn-primary">
                            Sign in to participate
                        </Link>
                    )}
                </div>
            </div>

            {/* Problems List */}
            {(contestStatus === "ongoing" || contestStatus === "ended") && (
                <section className={styles.problemsSection}>
                    <h2 className={styles.sectionTitle}>Problems</h2>

                    <div className={styles.problemsList}>
                        <div className={styles.problemsHeader}>
                            <span className={styles.colLabel}>#</span>
                            <span className={styles.colTitle}>Problem</span>
                            <span className={styles.colDifficulty}>Difficulty</span>
                            <span className={styles.colPoints}>Points</span>
                            {contestStatus === "ended" && <span className={styles.colSolves}>Solves</span>}
                        </div>

                        {contest.problems.map((cp) => {
                            const difficulty = cp.problem.difficulty as keyof typeof difficultyConfig;
                            const config = difficultyConfig[difficulty];

                            return (
                                <Link
                                    key={cp.id}
                                    href={
                                        contestStatus === "ongoing"
                                            ? `/contests/${contest.slug}/problems/${cp.label}`
                                            : `/problems/${cp.problem.slug}`
                                    }
                                    className={styles.problemRow}
                                >
                                    <span className={styles.colLabel}>{cp.label}</span>
                                    <span className={styles.colTitle}>{cp.problem.title}</span>
                                    <span className={styles.colDifficulty}>
                                        <span className={`badge ${config.class}`}>{config.label}</span>
                                    </span>
                                    <span className={styles.colPoints}>{cp.points}</span>
                                    {contestStatus === "ended" && (
                                        <span className={styles.colSolves}>-</span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Rules */}
            {contest.rules && (
                <section className={styles.rulesSection}>
                    <h2 className={styles.sectionTitle}>Rules</h2>
                    <div className={styles.rulesContent}>
                        {contest.rules.split("\n").map((rule, i) => (
                            <p key={i}>{rule}</p>
                        ))}
                    </div>
                </section>
            )}

            {/* Leaderboard Preview (for ongoing/ended) */}
            {(contestStatus === "ongoing" || contestStatus === "ended") && (
                <section className={styles.leaderboardSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Leaderboard</h2>
                        <Link href={`/contests/${contest.slug}/standings`} className="btn btn-ghost btn-sm">
                            View Full Standings
                        </Link>
                    </div>

                    <p className={styles.leaderboardPlaceholder}>
                        Leaderboard will be available once participants start solving problems.
                    </p>
                </section>
            )}
        </div>
    );
}
