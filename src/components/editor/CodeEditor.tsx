"use client";

import { useRef } from "react";
import Editor, { OnMount, Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import styles from "./CodeEditor.module.css";

// Language type matching our Prisma schema
type Language = "CPP" | "PYTHON" | "JAVA" | "JAVASCRIPT" | "GO" | "RUST";

interface CodeEditorProps {
    language: Language;
    value: string;
    onChange: (value: string) => void;
    readOnly?: boolean;
}

const languageMap: Record<Language, string> = {
    CPP: "cpp",
    PYTHON: "python",
    JAVA: "java",
    JAVASCRIPT: "javascript",
    GO: "go",
    RUST: "rust",
};

export function CodeEditor({
    language,
    value,
    onChange,
    readOnly = false,
}: CodeEditorProps) {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    const handleEditorMount: OnMount = (editor: editor.IStandaloneCodeEditor, _monaco: Monaco) => {
        editorRef.current = editor;
        editor.focus();
    };

    const handleChange = (newValue: string | undefined) => {
        if (newValue !== undefined) {
            onChange(newValue);
        }
    };

    return (
        <div className={styles.container}>
            <Editor
                height="100%"
                language={languageMap[language]}
                value={value}
                onChange={handleChange}
                onMount={handleEditorMount}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'Fira Code', 'SF Mono', Menlo, Monaco, monospace",
                    fontLigatures: true,
                    lineNumbers: "on",
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 4,
                    insertSpaces: true,
                    wordWrap: "on",
                    padding: { top: 16, bottom: 16 },
                    readOnly,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                    smoothScrolling: true,
                    bracketPairColorization: { enabled: true },
                    suggest: {
                        showMethods: true,
                        showFunctions: true,
                        showConstructors: true,
                        showFields: true,
                        showVariables: true,
                        showClasses: true,
                        showStructs: true,
                        showInterfaces: true,
                        showModules: true,
                        showProperties: true,
                        showEvents: true,
                        showOperators: true,
                        showUnits: true,
                        showValues: true,
                        showConstants: true,
                        showEnums: true,
                        showEnumMembers: true,
                        showKeywords: true,
                        showWords: true,
                        showColors: true,
                        showFiles: true,
                        showReferences: true,
                        showFolders: true,
                        showTypeParameters: true,
                        showSnippets: true,
                    },
                }}
            />
        </div>
    );
}
