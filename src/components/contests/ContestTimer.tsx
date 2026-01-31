"use client";

import { useState, useEffect } from "react";
import styles from "./ContestTimer.module.css";

interface ContestTimerProps {
    startTime: string;
    endTime: string;
    status: "upcoming" | "ongoing" | "ended";
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
    const difference = targetDate.getTime() - Date.now();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

export function ContestTimer({ startTime, endTime, status }: ContestTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const targetDate = status === "upcoming"
            ? new Date(startTime)
            : new Date(endTime);

        const updateTimer = () => {
            setTimeLeft(calculateTimeLeft(targetDate));
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, [startTime, endTime, status]);

    if (!mounted) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    if (status === "ended") {
        return (
            <div className={styles.container}>
                <div className={styles.statusBadge + " " + styles.ended}>
                    Contest Ended
                </div>
            </div>
        );
    }

    const label = status === "upcoming" ? "Starts in" : "Ends in";
    const isUrgent = status === "ongoing" && timeLeft.hours === 0 && timeLeft.minutes < 30;

    return (
        <div className={styles.container}>
            <span className={styles.label}>{label}</span>

            <div className={`${styles.timer} ${isUrgent ? styles.urgent : ""}`}>
                {timeLeft.days > 0 && (
                    <div className={styles.unit}>
                        <span className={styles.value}>{timeLeft.days}</span>
                        <span className={styles.unitLabel}>days</span>
                    </div>
                )}
                <div className={styles.unit}>
                    <span className={styles.value}>{String(timeLeft.hours).padStart(2, "0")}</span>
                    <span className={styles.unitLabel}>hrs</span>
                </div>
                <div className={styles.separator}>:</div>
                <div className={styles.unit}>
                    <span className={styles.value}>{String(timeLeft.minutes).padStart(2, "0")}</span>
                    <span className={styles.unitLabel}>min</span>
                </div>
                <div className={styles.separator}>:</div>
                <div className={styles.unit}>
                    <span className={styles.value}>{String(timeLeft.seconds).padStart(2, "0")}</span>
                    <span className={styles.unitLabel}>sec</span>
                </div>
            </div>

            {status === "ongoing" && (
                <div className={styles.statusBadge + " " + styles.live}>
                    <span className={styles.liveIndicator} />
                    Live
                </div>
            )}
        </div>
    );
}
