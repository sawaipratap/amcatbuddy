import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import styles from "./profile.module.css";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ username: string }>;
}

async function getUser(username: string) {
    const user = await prisma.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            name: true,
            image: true,
            rating: true,
            maxRating: true,
            problemsSolved: true,
            createdAt: true,
            _count: {
                select: {
                    submissions: true,
                    contestParticipations: true,
                },
            },
        },
    });

    return user;
}

async function getUserStats(userId: string) {
    const [recentSubmissions, acceptedByDifficulty] = await Promise.all([
        prisma.submission.findMany({
            where: { userId },
            select: {
                id: true,
                verdict: true,
                language: true,
                submittedAt: true,
                problem: {
                    select: { title: true, slug: true, difficulty: true },
                },
            },
            orderBy: { submittedAt: "desc" },
            take: 10,
        }),
        prisma.submission.groupBy({
            by: ["problemId"],
            where: { userId, verdict: "ACCEPTED" },
            _count: true,
        }),
    ]);

    return { recentSubmissions, solvedCount: acceptedByDifficulty.length };
}

function getRatingColor(rating: number): string {
    if (rating >= 2400) return "var(--color-rating-grandmaster)";
    if (rating >= 2100) return "var(--color-rating-master)";
    if (rating >= 1900) return "var(--color-rating-candidate-master)";
    if (rating >= 1600) return "var(--color-rating-expert)";
    if (rating >= 1400) return "var(--color-rating-specialist)";
    if (rating >= 1200) return "var(--color-rating-pupil)";
    return "var(--color-rating-newbie)";
}

function getRatingTitle(rating: number): string {
    if (rating >= 2400) return "Grandmaster";
    if (rating >= 2100) return "Master";
    if (rating >= 1900) return "Candidate Master";
    if (rating >= 1600) return "Expert";
    if (rating >= 1400) return "Specialist";
    if (rating >= 1200) return "Pupil";
    return "Newbie";
}

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { username } = await params;
    const user = await getUser(username);

    if (!user) {
        return { title: "User Not Found" };
    }

    return {
        title: `${user.name || user.username} - Profile`,
        description: `${user.username}'s profile on CodeArena. Rating: ${user.rating}`,
    };
}

export default async function ProfilePage({ params }: PageProps) {
    const { username } = await params;
    const [user, session] = await Promise.all([getUser(username), auth()]);

    if (!user) {
        notFound();
    }

    const { recentSubmissions } = await getUserStats(user.id);
    const isOwner = session?.user?.id === user.id;
    const ratingColor = getRatingColor(user.rating);
    const ratingTitle = getRatingTitle(user.rating);
    const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className="container">
            {/* Profile Header */}
            <div className={styles.header}>
                <div className={styles.avatarSection}>
                    {user.image ? (
                        <img src={user.image} alt={user.username || user.name || 'User'} className={styles.avatar} />
                    ) : (
                        <div className={styles.avatarPlaceholder}>
                            {user.name?.[0] || user.username?.[0] || '?'}
                        </div>
                    )}
                </div>

                <div className={styles.userInfo}>
                    <h1 className={styles.username} style={{ color: ratingColor }}>
                        {user.username || user.name || 'User'}
                    </h1>
                    {user.name && <p className={styles.name}>{user.name}</p>}
                    <p className={styles.title} style={{ color: ratingColor }}>
                        {ratingTitle}
                    </p>
                    <p className={styles.memberSince}>Member since {memberSince}</p>
                </div>

                <div className={styles.actions}>
                    {isOwner && (
                        <Link href="/settings" className="btn btn-secondary">
                            Edit Profile
                        </Link>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statValue} style={{ color: ratingColor }}>
                        {user.rating}
                    </div>
                    <div className={styles.statLabel}>Current Rating</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue} style={{ color: getRatingColor(user.maxRating) }}>
                        {user.maxRating}
                    </div>
                    <div className={styles.statLabel}>Max Rating</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>{user.problemsSolved}</div>
                    <div className={styles.statLabel}>Problems Solved</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statValue}>{user._count.contestParticipations}</div>
                    <div className={styles.statLabel}>Contests</div>
                </div>
            </div>

            {/* Recent Submissions */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Recent Submissions</h2>
                    <Link href={`/profile/${user.username}/submissions`} className="btn btn-ghost btn-sm">
                        View All
                    </Link>
                </div>

                {recentSubmissions.length === 0 ? (
                    <p className={styles.emptyState}>No submissions yet</p>
                ) : (
                    <div className={styles.submissionsList}>
                        {recentSubmissions.map((sub) => {
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
                                    <span className={styles.time}>
                                        {new Date(sub.submittedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}
