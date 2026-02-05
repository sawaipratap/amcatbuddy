import { Redis } from 'ioredis'

// Initialize local Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 3,
    enableReadyCheck: false,
    lazyConnect: true,
})

// Handle Redis connection errors gracefully
redis.on('error', (error) => {
    console.error('Redis connection error:', error.message)
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
        const cached = await redis.get(key)
        if (cached !== null) {
            return JSON.parse(cached) as T
        }
    } catch (error) {
        // If Redis fails, just fetch from source
        console.error('Redis cache get error:', error)
    }

    // Fetch from source
    const data = await fetcher()

    // Store in cache (don't await - fire and forget)
    try {
        redis.setex(key, ttl, JSON.stringify(data)).catch(console.error)
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
