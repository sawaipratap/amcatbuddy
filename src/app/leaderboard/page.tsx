import Link from "next/link";
import { prisma } from "@/lib/prisma";
import styles from "./leaderboard.module.css";

export const revalidate = 300; // Revalidate every 5 minutes

interface SearchParams {
    page?: string;
}

interface LeaderboardUser {
    id: string;
    username: string;
    name: string | null;
    image: string | null;
    rating: number;
    maxRating: number;
    problemsSolved: number;
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

export default async function LeaderboardPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;
    const page = parseInt(params.page || "1");
    const pageSize = 50;

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            orderBy: { rating: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: {
                id: true,
                username: true,
                name: true,
                image: true,
                rating: true,
                maxRating: true,
                problemsSolved: true,
            },
        }),
        prisma.user.count(),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="container">
            <div className={styles.header}>
                <h1 className={styles.title}>Leaderboard</h1>
                <p className={styles.subtitle}>
                    Top {total} competitive programmers ranked by rating.
                </p>
            </div>

            {/* Rating Legend */}
            <div className={styles.legend}>
                <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: "var(--color-rating-grandmaster)" }} />
                    Grandmaster (2400+)
                </span>
                <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: "var(--color-rating-master)" }} />
                    Master (2100+)
                </span>
                <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: "var(--color-rating-candidate-master)" }} />
                    CM (1900+)
                </span>
                <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: "var(--color-rating-expert)" }} />
                    Expert (1600+)
                </span>
                <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: "var(--color-rating-specialist)" }} />
                    Specialist (1400+)
                </span>
                <span className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: "var(--color-rating-pupil)" }} />
                    Pupil (1200+)
                </span>
            </div>

            {/* Leaderboard Table */}
            <div className={styles.tableWrapper}>
                <table className={`table ${styles.table}`}>
                    <thead>
                        <tr>
                            <th className={styles.colRank}>Rank</th>
                            <th className={styles.colUser}>User</th>
                            <th className={styles.colRating}>Rating</th>
                            <th className={styles.colMaxRating}>Max Rating</th>
                            <th className={styles.colSolved}>Problems Solved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: LeaderboardUser, index: number) => {
                            const rank = (page - 1) * pageSize + index + 1;
                            const ratingColor = getRatingColor(user.rating);
                            const title = getRatingTitle(user.rating);

                            return (
                                <tr key={user.id}>
                                    <td className={styles.colRank}>
                                        <span className={`${styles.rank} ${rank <= 3 ? styles[`rank${rank}` as keyof typeof styles] : ""}`}>
                                            {rank}
                                        </span>
                                    </td>
                                    <td className={styles.colUser}>
                                        <Link href={`/profile/${user.username}`} className={styles.userLink}>
                                            {user.image ? (
                                                <img src={user.image} alt="" className="avatar avatar-sm" />
                                            ) : (
                                                <div className={`avatar avatar-sm ${styles.avatarPlaceholder}`}>
                                                    {user.name?.[0] || user.username[0]}
                                                </div>
                                            )}
                                            <div className={styles.userInfo}>
                                                <span className={styles.userName} style={{ color: ratingColor }}>
                                                    {user.username}
                                                </span>
                                                <span className={styles.userTitle}>{title}</span>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className={styles.colRating}>
                                        <span className={styles.rating} style={{ color: ratingColor }}>
                                            {user.rating}
                                        </span>
                                    </td>
                                    <td className={styles.colMaxRating}>
                                        <span className={styles.maxRating} style={{ color: getRatingColor(user.maxRating) }}>
                                            {user.maxRating}
                                        </span>
                                    </td>
                                    <td className={styles.colSolved}>{user.problemsSolved}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    {page > 1 && (
                        <Link href={`/leaderboard?page=${page - 1}`} className="btn btn-secondary">
                            Previous
                        </Link>
                    )}
                    <span className={styles.pageInfo}>
                        Page {page} of {totalPages}
                    </span>
                    {page < totalPages && (
                        <Link href={`/leaderboard?page=${page + 1}`} className="btn btn-secondary">
                            Next
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
