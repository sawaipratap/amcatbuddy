"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { Language, Verdict } from "@prisma/client";
import styles from "./ProblemView.module.css";

interface Tag {
    name: string;
    slug: string;
    color: string;
}

interface SampleTestCase {
    input: string;
    expectedOutput: string;
    order: number;
}

interface UserSubmission {
    id: string;
    verdict: Verdict;
    language: Language;
    submittedAt: Date;
}

interface Problem {
    id: string;
    title: string;
    slug: string;
    statement: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    difficulty: string;
    timeLimit: number;
    memoryLimit: number;
    sampleInput: string;
    sampleOutput: string;
    hint?: string | null;
    editorial?: string | null;
    tags: { tag: Tag }[];
    author: {
        username: string;
        name: string | null;
        image: string | null;
    };
}

interface ProblemViewProps {
    problem: Problem;
    sampleTestCases: SampleTestCase[];
    userSubmissions: UserSubmission[] | null;
    hasSolved: boolean;
    isLoggedIn: boolean;
}

const difficultyConfig = {
    EASY: { label: "Easy", class: "badge-easy" },
    MEDIUM: { label: "Medium", class: "badge-medium" },
    HARD: { label: "Hard", class: "badge-hard" },
    EXPERT: { label: "Expert", class: "badge-expert" },
};

const languageOptions = [
    { value: "CPP", label: "C++ 17" },
    { value: "PYTHON", label: "Python 3" },
    { value: "JAVA", label: "Java 17" },
    { value: "JAVASCRIPT", label: "JavaScript" },
    { value: "GO", label: "Go" },
    { value: "RUST", label: "Rust" },
];

export function ProblemView({
    problem,
    sampleTestCases,
    userSubmissions,
    hasSolved,
    isLoggedIn,
}: ProblemViewProps) {
    const [activeTab, setActiveTab] = useState<"description" | "submissions">("description");
    const [language, setLanguage] = useState<Language>("CPP");
    const [code, setCode] = useState(getDefaultCode("CPP"));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState<{ verdict: string; message?: string; passed?: number; total?: number; details?: Array<{ testCase: number; status: string; input?: string; expectedOutput?: string; actualOutput?: string }> } | null>(null);

    const config = difficultyConfig[problem.difficulty as keyof typeof difficultyConfig];

    function getDefaultCode(lang: Language): string {
        const templates: Record<Language, string> = {
            CPP: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Your code here
    
    return 0;
}`,
            PYTHON: `# Your code here
`,
            JAVA: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Your code here
    }
}`,
            JAVASCRIPT: `const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => input.push(line));
rl.on('close', () => {
    // Your code here
});`,
            GO: `package main

import (
    "fmt"
)

func main() {
    // Your code here
}`,
            RUST: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    // Your code here
}`,
        };
        return templates[lang];
    }

    function handleLanguageChange(newLang: Language) {
        setLanguage(newLang);
        setCode(getDefaultCode(newLang));
    }

    async function handleRun() {
        setIsRunning(true);
        setResult(null);

        try {
            const response = await fetch("/api/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    problemId: problem.id,
                    code,
                    language,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Run failed");
            }

            setResult({
                verdict: data.success ? "ACCEPTED" : "WRONG_ANSWER",
                message: `Sample tests: ${data.passed}/${data.total} passed`,
                details: data.results,
            });
        } catch (error) {
            setResult({
                verdict: "ERROR",
                message: error instanceof Error ? error.message : "Run failed",
            });
        } finally {
            setIsRunning(false);
        }
    }

    async function handleSubmit() {
        setIsSubmitting(true);
        setResult(null);

        try {
            const response = await fetch("/api/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    problemId: problem.id,
                    code,
                    language,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Submission failed");
            }

            // Handle anonymous submission (result is immediate)
            if (data.anonymous) {
                setResult({
                    verdict: data.verdict,
                    message: data.message,
                    passed: data.passed,
                    total: data.total,
                });
                setIsSubmitting(false);
                return;
            }

            // Poll for result (logged-in user)
            pollSubmissionStatus(data.id);
        } catch (error) {
            setResult({
                verdict: "ERROR",
                message: error instanceof Error ? error.message : "Submission failed",
            });
            setIsSubmitting(false);
        }
    }

    async function pollSubmissionStatus(submissionId: string) {
        const maxAttempts = 30;
        let attempts = 0;

        const poll = async () => {
            attempts++;
            try {
                const response = await fetch(`/api/submissions/${submissionId}/status`);
                const data = await response.json();

                if (data.verdict !== "PENDING" && data.verdict !== "RUNNING") {
                    const testInfo = data.testsPassed !== undefined && data.totalTests !== undefined
                        ? ` (${data.testsPassed}/${data.totalTests} test cases passed)`
                        : "";
                    setResult({
                        verdict: data.verdict,
                        passed: data.testsPassed,
                        total: data.totalTests,
                        message: data.verdict === "ACCEPTED"
                            ? `All ${data.totalTests} test cases passed! Time: ${data.executionTime}ms, Memory: ${Math.round(data.memoryUsed / 1024)}MB`
                            : `${data.testsPassed}/${data.totalTests} test cases passed. ${data.errorMessage || getVerdictMessage(data.verdict)}`,
                    });
                    setIsSubmitting(false);
                } else if (attempts < maxAttempts) {
                    setTimeout(poll, 1000);
                } else {
                    setResult({ verdict: "TIMEOUT", message: "Judging timed out" });
                    setIsSubmitting(false);
                }
            } catch {
                setResult({ verdict: "ERROR", message: "Failed to get submission status" });
                setIsSubmitting(false);
            }
        };

        poll();
    }

    function getVerdictMessage(verdict: string): string {
        const messages: Record<string, string> = {
            WRONG_ANSWER: "Wrong Answer - Your output doesn't match the expected output",
            TIME_LIMIT: "Time Limit Exceeded - Your solution is too slow",
            MEMORY_LIMIT: "Memory Limit Exceeded - Your solution uses too much memory",
            RUNTIME_ERROR: "Runtime Error - Your program crashed during execution",
            COMPILE_ERROR: "Compilation Error - Check your syntax",
        };
        return messages[verdict] || verdict;
    }

    return (
        <div className={styles.container}>
            {/* Left Panel - Problem Description */}
            <div className={styles.leftPanel}>
                <div className={styles.header}>
                    <div className={styles.titleRow}>
                        <h1 className={styles.title}>{problem.title}</h1>
                        {hasSolved && (
                            <span className={styles.solvedBadge}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Solved
                            </span>
                        )}
                    </div>
                    <div className={styles.meta}>
                        <span className={`badge ${config.class}`}>{config.label}</span>
                        <span className={styles.metaItem}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {problem.timeLimit}ms
                        </span>
                        <span className={styles.metaItem}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                            {problem.memoryLimit}MB
                        </span>
                    </div>
                    <div className={styles.tags}>
                        {problem.tags.map(({ tag }) => (
                            <span
                                key={tag.slug}
                                className={styles.tag}
                                style={{ backgroundColor: tag.color + "20", color: tag.color }}
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === "description" ? styles.tabActive : ""}`}
                        onClick={() => setActiveTab("description")}
                    >
                        Description
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "submissions" ? styles.tabActive : ""}`}
                        onClick={() => setActiveTab("submissions")}
                    >
                        Submissions
                    </button>
                </div>

                {/* Tab Content */}
                <div className={styles.content}>
                    {activeTab === "description" ? (
                        <>
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Problem Statement</h2>
                                <div className={styles.prose}>{problem.statement}</div>
                            </section>

                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Input Format</h2>
                                <div className={styles.prose}>{problem.inputFormat}</div>
                            </section>

                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Output Format</h2>
                                <div className={styles.prose}>{problem.outputFormat}</div>
                            </section>

                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Constraints</h2>
                                <div className={styles.prose}>
                                    <pre className={styles.constraints}>{problem.constraints}</pre>
                                </div>
                            </section>

                            {sampleTestCases.length > 0 && (
                                <section className={styles.section}>
                                    <h2 className={styles.sectionTitle}>Sample Test Cases</h2>
                                    {sampleTestCases.map((tc, i) => (
                                        <div key={i} className={styles.testCase}>
                                            <div className={styles.testCaseBox}>
                                                <div className={styles.testCaseLabel}>Input</div>
                                                <pre className={styles.testCaseContent}>{tc.input}</pre>
                                            </div>
                                            <div className={styles.testCaseBox}>
                                                <div className={styles.testCaseLabel}>Output</div>
                                                <pre className={styles.testCaseContent}>{tc.expectedOutput}</pre>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            )}

                            {hasSolved && problem.hint && (
                                <section className={styles.section}>
                                    <h2 className={styles.sectionTitle}>Hint</h2>
                                    <div className={styles.prose}>{problem.hint}</div>
                                </section>
                            )}
                        </>
                    ) : (
                        <div className={styles.submissionsList}>
                            {!userSubmissions || userSubmissions.length === 0 ? (
                                <p className={styles.noSubmissions}>No submissions yet</p>
                            ) : (
                                userSubmissions.map((sub) => (
                                    <div key={sub.id} className={styles.submissionItem}>
                                        <span className={`badge ${getVerdictClass(sub.verdict)}`}>
                                            {sub.verdict.replace("_", " ")}
                                        </span>
                                        <span className={styles.submissionLang}>{sub.language}</span>
                                        <span className={styles.submissionTime}>
                                            {new Date(sub.submittedAt).toLocaleString()}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel - Code Editor */}
            <div className={styles.rightPanel}>
                <div className={styles.editorHeader}>
                    <select
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value as Language)}
                        className="input select"
                        style={{ width: "auto" }}
                    >
                        {languageOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className={styles.editorActions}>
                        <button
                            onClick={handleRun}
                            disabled={isRunning || isSubmitting}
                            className="btn btn-secondary"
                        >
                            {isRunning ? (
                                <>
                                    <span className="spinner" style={{ width: "1rem", height: "1rem" }} />
                                    Running...
                                </>
                            ) : (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                    Run
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || isRunning}
                            className="btn btn-primary"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner" style={{ width: "1rem", height: "1rem" }} />
                                    Judging...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </div>

                <div className={styles.editorWrapper}>
                    <CodeEditor
                        language={language}
                        value={code}
                        onChange={setCode}
                    />
                </div>

                {/* Result Panel */}
                {result && (
                    <div className={`${styles.resultPanel} ${styles[`result${result.verdict}`]}`}>
                        <div className={styles.resultHeader}>
                            <span className={`badge ${getVerdictClass(result.verdict as Verdict)}`}>
                                {result.verdict.replace("_", " ")}
                            </span>
                            {result.passed !== undefined && result.total !== undefined && (
                                <span className={styles.testCaseCount}>
                                    {result.passed}/{result.total} test cases
                                </span>
                            )}
                        </div>
                        {result.message && (
                            <p className={styles.resultMessage}>{result.message}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function getVerdictClass(verdict: Verdict | string): string {
    const classes: Record<string, string> = {
        ACCEPTED: "verdict-accepted",
        WRONG_ANSWER: "verdict-wrong",
        TIME_LIMIT: "verdict-tle",
        MEMORY_LIMIT: "verdict-tle",
        RUNTIME_ERROR: "verdict-wrong",
        COMPILE_ERROR: "verdict-wrong",
        PENDING: "verdict-pending",
        RUNNING: "verdict-pending",
        ERROR: "verdict-wrong",
        TIMEOUT: "verdict-tle",
    };
    return classes[verdict] || "verdict-pending";
}
