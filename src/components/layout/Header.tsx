import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { UserMenu } from "./UserMenu";
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
                    <Link href="/amcat-pyqs" className={styles.navLink}>
                        AMCAT PYQs
                    </Link>
                    <Link href="/practice" className={styles.navLink}>
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
                            <UserMenu user={session.user} />
                        </>
                    ) : (
                        <Link href="/login" className="btn btn-primary btn-sm">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
