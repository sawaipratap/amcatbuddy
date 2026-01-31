import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id
                // Fetch additional user data
                const dbUser = await prisma.user.findUnique({
                    where: { id: user.id },
                    select: {
                        username: true,
                        rating: true,
                        isAdmin: true,
                        problemsSolved: true,
                    },
                })
                if (dbUser) {
                    session.user.username = dbUser.username
                    session.user.rating = dbUser.rating
                    session.user.isAdmin = dbUser.isAdmin
                    session.user.problemsSolved = dbUser.problemsSolved
                }
            }
            return session
        },
        async signIn({ user, account, profile }) {
            // Generate username from email if not exists
            if (user.email) {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email },
                })

                if (!existingUser) {
                    // Generate unique username from email
                    const baseUsername = user.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '')
                    let username = baseUsername
                    let counter = 1

                    while (await prisma.user.findUnique({ where: { username } })) {
                        username = `${baseUsername}${counter}`
                        counter++
                    }

                    // Update the user with username (will be created by adapter)
                    // We need to do this after the adapter creates the user
                }
            }
            return true
        },
    },
    events: {
        async createUser({ user }) {
            // Generate username for new users
            if (user.email && user.id) {
                const baseUsername = user.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '')
                let username = baseUsername
                let counter = 1

                while (await prisma.user.findUnique({ where: { username } })) {
                    username = `${baseUsername}${counter}`
                    counter++
                }

                await prisma.user.update({
                    where: { id: user.id },
                    data: { username },
                })
            }
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: "database",
    },
})
