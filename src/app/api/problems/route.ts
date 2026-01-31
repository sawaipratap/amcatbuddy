import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createProblemSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
    statement: z.string().min(1),
    inputFormat: z.string().min(1),
    outputFormat: z.string().min(1),
    constraints: z.string().min(1),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD", "EXPERT"]),
    timeLimit: z.number().min(100).max(10000).default(1000),
    memoryLimit: z.number().min(16).max(1024).default(256),
    sampleInput: z.string().min(1),
    sampleOutput: z.string().min(1),
    hint: z.string().optional(),
    editorial: z.string().optional(),
    isPublic: z.boolean().default(false),
    tagIds: z.array(z.string()).optional(),
});

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get("difficulty");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 20;

    const where: Record<string, unknown> = { isPublic: true };

    if (difficulty) {
        where.difficulty = difficulty.toUpperCase();
    }

    if (tag) {
        where.tags = { some: { tag: { slug: tag } } };
    }

    if (search) {
        where.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { slug: { contains: search, mode: "insensitive" } },
        ];
    }

    const [problems, total] = await Promise.all([
        prisma.problem.findMany({
            where,
            select: {
                id: true,
                title: true,
                slug: true,
                difficulty: true,
                tags: { select: { tag: { select: { name: true, slug: true, color: true } } } },
                _count: { select: { submissions: { where: { verdict: "ACCEPTED" } } } },
            },
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.problem.count({ where }),
    ]);

    return NextResponse.json({
        problems,
        total,
        page,
        totalPages: Math.ceil(total / pageSize),
    });
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await request.json();
        const result = createProblemSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
        }

        const { tagIds, ...data } = result.data;

        const problem = await prisma.problem.create({
            data: {
                ...data,
                authorId: session.user.id,
                tags: tagIds
                    ? { create: tagIds.map((tagId) => ({ tagId })) }
                    : undefined,
            },
        });

        return NextResponse.json(problem, { status: 201 });
    } catch (err) {
        console.error("Create problem error:", err);
        return NextResponse.json({ error: "Failed to create problem" }, { status: 500 });
    }
}
