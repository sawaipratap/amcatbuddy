import { MetadataRoute } from 'next'
import { prisma } from "@/lib/prisma"

const BASE_URL = 'https://www.amcatbuddy.qzz.io'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static routes
    const routes = [
        '',
        '/problems',
        '/contests',
        '/leaderboard',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    try {
        // Dynamic routes for problems
        // Limit to recent or popular ones to avoid huge build times if there are thousands
        const problems = await prisma.problem.findMany({
            select: {
                id: true,
                updatedAt: true,
            },
            take: 1000,
            orderBy: {
                createdAt: 'desc'
            }
        })

        const problemRoutes = problems.map((problem) => ({
            url: `${BASE_URL}/problems/${problem.id}`,
            lastModified: problem.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }))

        return [...routes, ...problemRoutes]
    } catch (error) {
        console.error('Failed to generate sitemap for dynamic routes:', error)
        return routes
    }
}
