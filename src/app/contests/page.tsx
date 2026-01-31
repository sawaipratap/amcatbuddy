import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "./contests.module.css";

export const revalidate = 60;

// Contest type matching Prisma schema
interface Contest {
    id: string;
    title: string;
    slug: string;
    description: string;
    startTime: Date;
    endTime: Date;
    isRated: boolean;
}

async function getContests() {
    const now = new Date();

    const [upcoming, ongoing, past] = await Promise.all([
        prisma.contest.findMany({
            where: { isPublic: true, startTime: { gt: now } },
            orderBy: { startTime: "asc" },
            take: 10,
        }),
        prisma.contest.findMany({
            where: {
                isPublic: true,
                startTime: { lte: now },
                endTime: { gt: now },
            },
            orderBy: { startTime: "asc" },
        }),
        prisma.contest.findMany({
            where: { isPublic: true, endTime: { lte: now } },
            orderBy: { endTime: "desc" },
            take: 20,
        }),
    ]);

    return { upcoming, ongoing, past };
}

function formatDuration(start: Date, end: Date): string {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}

export default async function ContestsPage() {
    const { upcoming, ongoing, past } = await getContests();

    return (
        <div className="container">
            <div className={styles.header}>
                <h1 className={styles.title}>Contests</h1>
                <p className={styles.subtitle}>
                    Participate in coding contests to test your skills and climb the leaderboard.
                </p>
            </div>

            {/* Ongoing Contests */}
            {ongoing.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.liveIndicator} />
                        Live Now
                    </h2>
                    <div className={styles.contestGrid}>
                        {ongoing.map((contest: Contest) => (
                            <Link
                                key={contest.id}
                                href={`/contests/${contest.slug}`}
                                className={`${styles.contestCard} ${styles.contestLive}`}
                            >
                                <div className={styles.contestHeader}>
                                    <h3 className={styles.contestTitle}>{contest.title}</h3>
                                    {contest.isRated && <span className={styles.ratedBadge}>Rated</span>}
                                </div>
                                <p className={styles.contestDesc}>{contest.description}</p>
                                <div className={styles.contestMeta}>
                                    <span>Ends in {formatDuration(new Date(), contest.endTime)}</span>
                                    <span className="btn btn-primary btn-sm">Enter Contest</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Upcoming Contests */}
            {upcoming.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Upcoming</h2>
                    <div className={styles.contestList}>
                        {upcoming.map((contest: Contest) => (
                            <Link
                                key={contest.id}
                                href={`/contests/${contest.slug}`}
                                className={styles.contestRow}
                            >
                                <div className={styles.contestInfo}>
                                    <h3 className={styles.contestRowTitle}>{contest.title}</h3>
                                    <span className={styles.contestTime}>
                                        {formatDate(contest.startTime)}
                                    </span>
                                </div>
                                <div className={styles.contestDetails}>
                                    <span className={styles.contestDuration}>
                                        {formatDuration(contest.startTime, contest.endTime)}
                                    </span>
                                    {contest.isRated && <span className={styles.ratedBadge}>Rated</span>}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Past Contests */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Past Contests</h2>
                {past.length === 0 ? (
                    <p className={styles.emptyState}>No past contests yet.</p>
                ) : (
                    <div className={styles.contestList}>
                        {past.map((contest: Contest) => (
                            <Link
                                key={contest.id}
                                href={`/contests/${contest.slug}`}
                                className={styles.contestRow}
                            >
                                <div className={styles.contestInfo}>
                                    <h3 className={styles.contestRowTitle}>{contest.title}</h3>
                                    <span className={styles.contestTime}>
                                        {formatDate(contest.startTime)}
                                    </span>
                                </div>
                                <div className={styles.contestDetails}>
                                    <span className={styles.contestDuration}>
                                        {formatDuration(contest.startTime, contest.endTime)}
                                    </span>
                                    {contest.isRated && <span className={styles.ratedBadge}>Rated</span>}
                                    <span className="btn btn-ghost btn-sm">View Results</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
