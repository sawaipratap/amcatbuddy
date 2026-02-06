import Link from "next/link";
import { auth } from "@/lib/auth";
import styles from "./page.module.css";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="container">
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeIcon}>🎯</span>
            <span>Your AMCAT Success Partner</span>
          </div>
          <h1 className={styles.heroTitle}>
            Ace AMCAT
            <br />
            <span className={styles.heroGradient}>Automata</span>
          </h1>
          <p className={styles.heroDescription}>
            Practice real AMCAT coding patterns, master Automata challenges, and
            land your dream job. Join thousands of candidates improving their scores every day.
          </p>
          <div className={styles.heroCta}>
            {session?.user ? (
              <Link href="/problems" className="btn btn-primary btn-lg">
                Start Practicing
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn btn-primary btn-lg">
                  Get Started Free
                </Link>
                <Link href="/problems" className="btn btn-secondary btn-lg">
                  Explore Questions
                </Link>
              </>
            )}
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeDot} />
              <span className={styles.codeDot} />
              <span className={styles.codeDot} />
              <span className={styles.codeTitle}>automata.py</span>
            </div>
            <pre className={styles.codeContent}>
              {`def find_pattern(arr, target):
    """AMCAT Automata Pattern"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Pattern not found`}
            </pre>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Everything you need to crack AMCAT</h2>
        <p className={styles.sectionSubtitle}>
          Prepare smarter with curated practice questions and real exam simulations
        </p>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Real AMCAT Patterns</h3>
            <p className={styles.featureDescription}>
              Practice questions mirroring actual AMCAT Automata difficulty levels and coding patterns.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Mock Tests</h3>
            <p className={styles.featureDescription}>
              Simulate real AMCAT conditions with timed full-length tests and instant feedback.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Progress Tracking</h3>
            <p className={styles.featureDescription}>
              Track your improvement over time and identify weak areas to focus your preparation.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Job Ready</h3>
            <p className={styles.featureDescription}>
              Build confidence to crack AMCAT and secure placements at top companies.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>200+</span>
          <span className={styles.statLabel}>Questions</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>5K+</span>
          <span className={styles.statLabel}>Candidates</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>50+</span>
          <span className={styles.statLabel}>Mock Tests</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>6</span>
          <span className={styles.statLabel}>Languages</span>
        </div>
      </section>

      {/* CTA Section */}
      {!session?.user && (
        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to crack AMCAT?</h2>
            <p className={styles.ctaDescription}>
              Join AMCATBuddy today and start your journey to your dream job.
            </p>
            <Link href="/login" className="btn btn-accent btn-lg">
              Start Practicing Now
            </Link>
          </div>
        </section>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AMCATBuddy",
            "url": "https://www.amcatbuddy.qzz.io",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.amcatbuddy.qzz.io/problems?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "description": "Practice real AMCAT Automata coding patterns, take mock tests, and prepare to ace your AMCAT assessment."
          })
        }}
      />
    </div>
  );
}
