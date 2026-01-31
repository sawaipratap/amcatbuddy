import { Redis } from '@upstash/redis'

// Initialize Upstash Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Cache TTL in seconds
const CACHE_TTL = {
    PROBLEM: 300,        // 5 minutes for individual problems
    PROBLEM_LIST: 60,    // 1 minute for problem list (changes more often with submissions)
    TAGS: 3600,          // 1 hour for tags (rarely change)
    LEADERBOARD: 30,     // 30 seconds for leaderboard
} as const

type CacheKey =
    | `problem:${string}`           // problem:slug
    | `problems:${string}`          // problems:hash
    | 'tags:all'
    | 'leaderboard'

/**
 * Get cached data or fetch from source
 */
export async function getCached<T>(
    key: CacheKey,
    fetcher: () => Promise<T>,
    ttl: number
): Promise<T> {
    try {
        // Try to get from cache
        const cached = await redis.get<T>(key)
        if (cached !== null) {
            return cached
        }
    } catch (error) {
        // If Redis fails, just fetch from source
        console.error('Redis cache get error:', error)
    }

    // Fetch from source
    const data = await fetcher()

    // Store in cache (don't await - fire and forget)
    try {
        redis.set(key, data, { ex: ttl }).catch(console.error)
    } catch (error) {
        console.error('Redis cache set error:', error)
    }

    return data
}

/**
 * Invalidate cache for a specific key or pattern
 */
export async function invalidateCache(key: CacheKey): Promise<void> {
    try {
        await redis.del(key)
    } catch (error) {
        console.error('Redis cache invalidate error:', error)
    }
}

/**
 * Invalidate all problem-related caches (call after submission)
 */
export async function invalidateProblemCaches(slug?: string): Promise<void> {
    try {
        if (slug) {
            await redis.del(`problem:${slug}` as CacheKey)
        }
        // For problem list, we let it expire naturally
    } catch (error) {
        console.error('Redis cache invalidate error:', error)
    }
}

// Export the redis instance for advanced usage
export { redis, CACHE_TTL }
