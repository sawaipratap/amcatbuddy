import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import styles from "./Header.module.css";

export async function Header() {
    const session = await auth();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4l3 3" />
                        </svg>
                    </div>
                    <span className={styles.logoText}>AMCAT<span className={styles.logoBuddy}>Buddy</span></span>
                </Link>

                {/* Navigation */}
                <nav className={styles.nav}>
                    <Link href="/problems" className={styles.navLink}>
                        Practice
                    </Link>
                    <Link href="/contests" className={styles.navLink}>
                        Mock Tests
                    </Link>
                    <Link href="/leaderboard" className={styles.navLink}>
                        Leaderboard
                    </Link>
                </nav>

                {/* Actions */}
                <div className={styles.actions}>
                    {session?.user ? (
                        <>
                            <Link href={`/profile/${session.user.username || session.user.id}`} className={styles.profileLink}>
                                {session.user.image ? (
                                    <img src={session.user.image} alt="" className={styles.avatar} />
                                ) : (
                                    <div className={styles.avatarPlaceholder}>
                                        {session.user.name?.[0] || "U"}
                                    </div>
                                )}
                                <span className={styles.userName}>{session.user.name || "Profile"}</span>
                            </Link>
                            <form
                                action={async () => {
                                    "use server";
                                    await signOut({ redirectTo: "/" });
                                }}
                            >
                                <button type="submit" className={`btn btn-ghost btn-sm ${styles.signOutBtn}`}>
                                    Sign Out
                                </button>
                            </form>
                        </>
                    ) : (
                        <Link href="/login" className="btn btn-primary btn-sm">
                            Start Free
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
