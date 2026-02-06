import { PrismaClient } from "@prisma/client";
import { partAQuestions, AMCATQuestion } from "./amcat-questions";
import { partB1Questions } from "./amcat-questions-b1";
import { partB2Questions } from "./amcat-questions-b2";
import { directory2Questions } from "./amcat-questions-dir2";
import { codechefQuestions } from "./codechef-questions";

const prisma = new PrismaClient();

const Difficulty = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    HARD: "HARD",
    EXPERT: "EXPERT",
} as const;

type DifficultyType = (typeof Difficulty)[keyof typeof Difficulty];

async function main() {
    console.log("🌱 Seeding AMCATBuddy database...");

    // Create tags
    const tags = await Promise.all([
        prisma.tag.upsert({
            where: { slug: "arrays" },
            update: {},
            create: { name: "Arrays", slug: "arrays", color: "#3b82f6" },
        }),
        prisma.tag.upsert({
            where: { slug: "strings" },
            update: {},
            create: { name: "Strings", slug: "strings", color: "#8b5cf6" },
        }),
        prisma.tag.upsert({
            where: { slug: "dynamic-programming" },
            update: {},
            create: { name: "Dynamic Programming", slug: "dynamic-programming", color: "#ef4444" },
        }),
        prisma.tag.upsert({
            where: { slug: "graphs" },
            update: {},
            create: { name: "Graphs", slug: "graphs", color: "#10b981" },
        }),
        prisma.tag.upsert({
            where: { slug: "trees" },
            update: {},
            create: { name: "Trees", slug: "trees", color: "#f59e0b" },
        }),
        prisma.tag.upsert({
            where: { slug: "greedy" },
            update: {},
            create: { name: "Greedy", slug: "greedy", color: "#ec4899" },
        }),
        prisma.tag.upsert({
            where: { slug: "sorting" },
            update: {},
            create: { name: "Sorting", slug: "sorting", color: "#06b6d4" },
        }),
        prisma.tag.upsert({
            where: { slug: "binary-search" },
            update: {},
            create: { name: "Binary Search", slug: "binary-search", color: "#84cc16" },
        }),
        prisma.tag.upsert({
            where: { slug: "math" },
            update: {},
            create: { name: "Math", slug: "math", color: "#a855f7" },
        }),
        prisma.tag.upsert({
            where: { slug: "implementation" },
            update: {},
            create: { name: "Implementation", slug: "implementation", color: "#64748b" },
        }),
    ]);

    console.log(`✅ Created ${tags.length} tags`);

    // Create or find admin user
    let adminUser = await prisma.user.findFirst({
        where: { isAdmin: true },
    });

    if (!adminUser) {
        adminUser = await prisma.user.create({
            data: {
                email: "admin@amcatbuddy.dev",
                username: "amcatbuddy_admin",
                name: "AMCATBuddy Admin",
                isAdmin: true,
            },
        });
        console.log(`✅ Created admin user: ${adminUser.username}`);
    } else {
        console.log(`✅ Using existing admin user: ${adminUser.username}`);
    }

    console.log(`✅ Created admin user: ${adminUser.username}`);

    // Combine all AMCAT questions
    const allQuestions: AMCATQuestion[] = [
        ...partAQuestions,
        ...partB1Questions,
        ...partB2Questions,
        ...directory2Questions,
    ];

    console.log(`📚 Total questions to seed: ${allQuestions.length}`);

    // Track seeded slugs to avoid duplicates
    const seededSlugs = new Set<string>();
    let successCount = 0;
    let skipCount = 0;

    for (const problemData of allQuestions) {
        // Skip if already seeded (duplicate check)
        if (seededSlugs.has(problemData.slug)) {
            console.log(`⏭️  Skipping duplicate: ${problemData.title}`);
            skipCount++;
            continue;
        }

        try {
            const { testCases: testCaseData, tags: tagSlugs, ...problem } = problemData;

            const createdProblem = await prisma.problem.upsert({
                where: { slug: problem.slug },
                update: {},
                create: {
                    title: problem.title,
                    slug: problem.slug,
                    statement: problem.statement,
                    inputFormat: problem.inputFormat,
                    outputFormat: problem.outputFormat,
                    constraints: problem.constraints,
                    difficulty: problem.difficulty as any,
                    timeLimit: problem.timeLimit,
                    memoryLimit: problem.memoryLimit,
                    sampleInput: problem.sampleInput,
                    sampleOutput: problem.sampleOutput,
                    hint: problem.hint,
                    isPublic: true,
                    category: "AMCAT_PYQ", // Set category for AMCAT questions
                    authorId: adminUser.id,
                },
            });

            // Create test cases
            for (let i = 0; i < testCaseData.length; i++) {
                await prisma.testCase.upsert({
                    where: {
                        id: `${createdProblem.id}-${i}`,
                    },
                    update: {},
                    create: {
                        id: `${createdProblem.id}-${i}`,
                        problemId: createdProblem.id,
                        input: testCaseData[i].input,
                        expectedOutput: testCaseData[i].output,
                        isSample: testCaseData[i].isSample,
                        order: i,
                    },
                });
            }

            // Link tags
            for (const tagSlug of tagSlugs) {
                const tag = tags.find((t) => t.slug === tagSlug);
                if (tag) {
                    await prisma.problemTag.upsert({
                        where: {
                            problemId_tagId: {
                                problemId: createdProblem.id,
                                tagId: tag.id,
                            },
                        },
                        update: {},
                        create: {
                            problemId: createdProblem.id,
                            tagId: tag.id,
                        },
                    });
                }
            }

            seededSlugs.add(problemData.slug);
            successCount++;
            console.log(`✅ Created problem: ${problem.title}`);
        } catch (error) {
            console.error(`❌ Error creating ${problemData.title}:`, error);
        }
    }

    // Create a sample mock test
    const now = new Date();
    const contestStart = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const contestEnd = new Date(contestStart.getTime() + 2 * 60 * 60 * 1000);

    await prisma.contest.upsert({
        where: { slug: "amcat-mock-test-1" },
        update: {},
        create: {
            title: "AMCAT Mock Test #1",
            slug: "amcat-mock-test-1",
            description: "Practice with real AMCAT-style coding questions. 2 hours, 5 problems.",
            rules: "1. Solve as many problems as you can\n2. Partial scoring enabled\n3. No external help",
            startTime: contestStart,
            endTime: contestEnd,
            isRated: true,
            isPublic: true,
        },
    });

    console.log("✅ Created sample mock test");

    // Seed CodeChef/Practice questions
    console.log(`\n📚 Seeding CodeChef Practice problems: ${codechefQuestions.length}`);
    let practiceCount = 0;

    for (const problemData of codechefQuestions) {
        // Skip if already seeded (duplicate check)
        if (seededSlugs.has(problemData.slug)) {
            console.log(`⏭️  Skipping duplicate: ${problemData.title}`);
            skipCount++;
            continue;
        }

        try {
            const { testCases: testCaseData, tags: tagSlugs, ...problem } = problemData;

            const createdProblem = await prisma.problem.upsert({
                where: { slug: problem.slug },
                update: {},
                create: {
                    title: problem.title,
                    slug: problem.slug,
                    statement: problem.statement,
                    inputFormat: problem.inputFormat,
                    outputFormat: problem.outputFormat,
                    constraints: problem.constraints,
                    difficulty: problem.difficulty as any,
                    timeLimit: problem.timeLimit,
                    memoryLimit: problem.memoryLimit,
                    sampleInput: problem.sampleInput,
                    sampleOutput: problem.sampleOutput,
                    hint: problem.hint,
                    isPublic: true,
                    category: "PRACTICE", // Set category for CodeChef/Practice questions
                    authorId: adminUser.id,
                },
            });

            // Create test cases
            for (let i = 0; i < testCaseData.length; i++) {
                await prisma.testCase.upsert({
                    where: {
                        id: `${createdProblem.id}-${i}`,
                    },
                    update: {},
                    create: {
                        id: `${createdProblem.id}-${i}`,
                        problemId: createdProblem.id,
                        input: testCaseData[i].input,
                        expectedOutput: testCaseData[i].output,
                        isSample: testCaseData[i].isSample,
                        order: i,
                    },
                });
            }

            // Link tags
            for (const tagSlug of tagSlugs) {
                const tag = tags.find((t) => t.slug === tagSlug);
                if (tag) {
                    await prisma.problemTag.upsert({
                        where: {
                            problemId_tagId: {
                                problemId: createdProblem.id,
                                tagId: tag.id,
                            },
                        },
                        update: {},
                        create: {
                            problemId: createdProblem.id,
                            tagId: tag.id,
                        },
                    });
                }
            }

            seededSlugs.add(problemData.slug);
            practiceCount++;
            console.log(`✅ Created practice problem: ${problem.title}`);
        } catch (error) {
            console.error(`❌ Error creating ${problemData.title}:`, error);
        }
    }

    console.log(`\n🎉 Seeding complete!`);
    console.log(`   ✅ ${successCount} AMCAT PYQ questions added`);
    console.log(`   ✅ ${practiceCount} Practice problems added`);
    console.log(`   ⏭️  ${skipCount} duplicates skipped`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
