import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Difficulty } from "@prisma/client";
import styles from "./problems.module.css";
import { getCached, CACHE_TTL } from "@/lib/cache";

// Revalidate every 5 minutes (problems don't change frequently)
export const revalidate = 300;

interface SearchParams {
    difficulty?: string;
    tag?: string;
    search?: string;
    page?: string;
}

// Cache tags - they rarely change
type CachedTag = { name: string; slug: string; color: string };

async function getTags(): Promise<CachedTag[]> {
    return getCached<CachedTag[]>(
        'tags:all',
        async () => {
            return prisma.tag.findMany({
                select: { name: true, slug: true, color: true },
                orderBy: { name: "asc" },
            });
        },
        CACHE_TTL.TAGS
    );
}

async function getProblems(searchParams: SearchParams) {
    const page = parseInt(searchParams.page || "1");
    const pageSize = 20;
    const skip = (page - 1) * pageSize;

    const where: Record<string, unknown> = {
        isPublic: true,
    };

    if (searchParams.difficulty && searchParams.difficulty !== "all") {
        where.difficulty = searchParams.difficulty.toUpperCase() as Difficulty;
    }

    if (searchParams.search) {
        where.OR = [
            { title: { contains: searchParams.search, mode: "insensitive" } },
            { slug: { contains: searchParams.search, mode: "insensitive" } },
        ];
    }

    if (searchParams.tag) {
        where.tags = {
            some: { tag: { slug: searchParams.tag } },
        };
    }

    const [problems, total, tags] = await Promise.all([
        prisma.problem.findMany({
            where,
            select: {
                id: true,
                title: true,
                slug: true,
                difficulty: true,
                tags: {
                    select: {
                        tag: { select: { name: true, slug: true, color: true } },
                    },
                },
                _count: {
                    select: { submissions: { where: { verdict: "ACCEPTED" } } },
                },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        }),
        prisma.problem.count({ where }),
        getTags(), // Now cached!
    ]);

    return {
        problems,
        total,
        tags,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
    };
}

const difficultyConfig = {
    EASY: { label: "Easy", class: "badge-easy" },
    MEDIUM: { label: "Medium", class: "badge-medium" },
    HARD: { label: "Hard", class: "badge-hard" },
    EXPERT: { label: "Expert", class: "badge-expert" },
};

export default async function ProblemsPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;
    const { problems, total, tags, page, totalPages } = await getProblems(params);

    return (
        <div className="container">
            <div className={styles.header}>
                <h1 className={styles.title}>Problems</h1>
                <p className={styles.subtitle}>
                    {total} problems available. Filter by difficulty or topic.
                </p>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <label className="label">Difficulty</label>
                    <div className={styles.filterButtons}>
                        <Link
                            href="/problems"
                            className={`btn btn-sm ${!params.difficulty || params.difficulty === "all" ? "btn-primary" : "btn-secondary"}`}
                        >
                            All
                        </Link>
                        {Object.entries(difficultyConfig).map(([key, config]) => (
                            <Link
                                key={key}
                                href={`/problems?difficulty=${key.toLowerCase()}`}
                                className={`btn btn-sm ${params.difficulty === key.toLowerCase() ? "btn-primary" : "btn-secondary"}`}
                            >
                                {config.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {tags.length > 0 && (
                    <div className={styles.filterGroup}>
                        <label className="label">Topics</label>
                        <div className={styles.tagList}>
                            {tags.slice(0, 10).map((tag) => (
                                <Link
                                    key={tag.slug}
                                    href={`/problems?tag=${tag.slug}`}
                                    className={`${styles.tagChip} ${params.tag === tag.slug ? styles.tagChipActive : ""}`}
                                    style={{ "--tag-color": tag.color } as React.CSSProperties}
                                >
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Problem List */}
            <div className={styles.problemList}>
                <div className={styles.problemHeader}>
                    <span className={styles.colStatus}>#</span>
                    <span className={styles.colTitle}>Title</span>
                    <span className={styles.colDifficulty}>Difficulty</span>
                    <span className={styles.colTags}>Tags</span>
                    <span className={styles.colAccepted}>Accepted</span>
                </div>

                {problems.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No problems found matching your criteria.</p>
                        <Link href="/problems" className="btn btn-primary">
                            Clear Filters
                        </Link>
                    </div>
                ) : (
                    problems.map((problem, index) => {
                        const config = difficultyConfig[problem.difficulty];
                        return (
                            <Link
                                key={problem.id}
                                href={`/problems/${problem.slug}`}
                                className={styles.problemRow}
                            >
                                <span className={styles.colStatus}>
                                    {(page - 1) * 20 + index + 1}
                                </span>
                                <span className={styles.colTitle}>
                                    <span className={styles.problemTitle}>{problem.title}</span>
                                </span>
                                <span className={styles.colDifficulty}>
                                    <span className={`badge ${config.class}`}>{config.label}</span>
                                </span>
                                <span className={styles.colTags}>
                                    {problem.tags.slice(0, 2).map(({ tag }) => (
                                        <span
                                            key={tag.slug}
                                            className={styles.tagSmall}
                                            style={{ backgroundColor: tag.color + "20", color: tag.color }}
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </span>
                                <span className={styles.colAccepted}>
                                    {problem._count.submissions}
                                </span>
                            </Link>
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    {page > 1 && (
                        <Link
                            href={`/problems?page=${page - 1}`}
                            className="btn btn-secondary"
                        >
                            Previous
                        </Link>
                    )}
                    <span className={styles.pageInfo}>
                        Page {page} of {totalPages}
                    </span>
                    {page < totalPages && (
                        <Link
                            href={`/problems?page=${page + 1}`}
                            className="btn btn-secondary"
                        >
                            Next
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
