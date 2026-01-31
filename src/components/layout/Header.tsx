import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/lib/auth";
import styles from "./Header.module.css";

export async function Header() {
    const session = await auth();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/logo.png"
                        alt="AMCATBuddy"
                        width={36}
                        height={36}
                        className={styles.logoImage}
                    />
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
