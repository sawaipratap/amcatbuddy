/**
 * Language boilerplate templates for Judge0
 * 
 * These templates are optimized for Judge0's Docker environment on Debian.
 * All Mac-specific optimizations have been removed.
 */

import { Language } from "@prisma/client";

export const BOILERPLATE_TEMPLATES: Record<Language, string> = {
    /**
     * C++ (GCC 14.1.0)
     * Judge0 Language ID: 105
     * 
     * Clean template without platform-specific optimizations.
     * Removed: ios_base::sync_with_stdio(false) and cin.tie(NULL)
     * These are competitive programming hacks, not needed for standard problems.
     */
    CPP: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    // Your code here
    
    return 0;
}`,

    /**
     * Python 3 (3.13.2)
     * Judge0 Language ID: 109
     * 
     * Simple, clean Python template with no unnecessary imports.
     */
    PYTHON: `# Your code here
`,

    /**
     * Java (JDK 17.0.6 LTS)
     * Judge0 Language ID: 91
     * 
     * Standard Java template with Scanner for input.
     * Class name must be "Main" for Judge0.
     */
    JAVA: `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // Your code here
        
        sc.close();
    }
}`,

    /**
     * JavaScript (Node.js 22.08.0)
     * Judge0 Language ID: 102
     * 
     * Node.js template using readline for standard input.
     */
    JAVASCRIPT: `const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', (line) => {
    input.push(line);
});

rl.on('close', () => {
    // Your code here
    // Access input lines using: input[0], input[1], etc.
});`,

    /**
     * Go (1.23.5)
     * Judge0 Language ID: 107
     * 
     * Go template with standard input/output.
     */
    GO: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    
    // Your code here
    // Read line with: scanner.Scan(); line := scanner.Text()
}`,

    /**
     * Rust (1.85.0)
     * Judge0 Language ID: 108
     * 
     * Rust template with buffered stdin reading.
     */
    RUST: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let lines: Vec<String> = stdin.lock()
        .lines()
        .map(|l| l.unwrap())
        .collect();
    
    // Your code here
    // Access input lines using: lines[0], lines[1], etc.
}`,
};

/**
 * Get clean boilerplate code for a specific language
 */
export function getBoilerplateCode(language: Language): string {
    return BOILERPLATE_TEMPLATES[language] || "";
}

/**
 * Judge0 Language IDs for reference
 * 
 * These are the language IDs used by Judge0 API.
 * Update these if you switch to a different Judge0 instance.
 */
export const JUDGE0_LANGUAGE_IDS: Record<Language, number> = {
    CPP: 105,       // C++ (GCC 14.1.0)
    PYTHON: 109,    // Python (3.13.2)
    JAVA: 91,       // Java (JDK 17.0.6 LTS)
    JAVASCRIPT: 102,// JavaScript (Node.js 22.08.0)
    GO: 107,        // Go (1.23.5)
    RUST: 108,      // Rust (1.85.0)
};

/**
 * Common competitive programming template (optional)
 * 
 * Use this if you specifically need fast I/O for competitive programming.
 * NOT recommended for general problem solving.
 */
export const COMPETITIVE_CPP_TEMPLATE = `#include <bits/stdc++.h>
using namespace std;

// Fast I/O (use only for competitive programming)
#define fast_io ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL)

int main() {
    fast_io;
    
    // Your code here
    
    return 0;
}`;
