// CodeChef Logical Problems - Rebranded for AMCATBuddy
// Problems from "Become 5 Star" roadmap (difficulty 500-1000)
// All "Chef/Chefland" references replaced with "Buddy/Buddyland"

import { Difficulty, DifficultyType, AMCATQuestion } from "./amcat-questions";

// Map CodeChef difficulty (500-1000) to our difficulty levels
function mapDifficulty(rating: number): DifficultyType {
        if (rating < 600) return Difficulty.EASY;
        if (rating < 750) return Difficulty.EASY;
        if (rating < 850) return Difficulty.MEDIUM;
        return Difficulty.HARD;
}

// Helper to replace Chef branding with Buddy
function rebrand(text: string): string {
        return text
                .replace(/Chefland/g, "Buddyland")
                .replace(/chefland/g, "buddyland")
                .replace(/Chef's/g, "Buddy's")
                .replace(/chef's/g, "buddy's")
                .replace(/Chef(?![a-z])/g, "Buddy")
                .replace(/chef(?![a-z])/g, "buddy");
}

export const codechefQuestions: AMCATQuestion[] = [
        // Problem 1: Greater Average (AVGPROBLEM) - Difficulty 500
        {
                title: "Greater Average",
                slug: "greater-average",
                difficulty: Difficulty.EASY,
                statement: `You are given 3 numbers A, B, and C. Determine whether the average of A and B is **strictly greater** than C or not.

Note: The average of A and B is defined as (A+B)/2. For example, the average of 5 and 9 is 7, and the average of 5 and 8 is 6.5.`,
                inputFormat: `The first line of input will contain a single integer T, denoting the number of test cases.
Each test case consists of 3 integers A, B, and C.`,
                outputFormat: `For each test case, output YES if the average of A and B is strictly greater than C, and NO otherwise.
You may print each character in uppercase or lowercase.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ A, B, C ≤ 10`,
                sampleInput: `5
5 9 6
5 8 6
5 7 6
4 9 8
3 7 2`,
                sampleOutput: `YES
YES
NO
NO
YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Calculate (A+B)/2.0 and compare with C. Use floating point to handle non-integer averages.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "5\n5 9 6\n5 8 6\n5 7 6\n4 9 8\n3 7 2", output: "YES\nYES\nNO\nNO\nYES", isSample: true },
                        { input: "1\n1 1 0", output: "YES", isSample: false },
                        { input: "1\n10 10 10", output: "NO", isSample: false },
                        { input: "1\n5 5 4", output: "YES", isSample: false },
                        { input: "1\n1 3 2", output: "NO", isSample: false },
                        { input: "1\n2 2 1", output: "YES", isSample: false },
                        { input: "1\n10 10 9", output: "YES", isSample: false },
                        { input: "1\n1 1 1", output: "NO", isSample: false },
                        { input: "1\n3 5 3", output: "YES", isSample: false },
                        { input: "1\n8 4 6", output: "NO", isSample: false },
                ],
        },

        // Problem 2: Buddyland Games (CHEFGAMES) - Difficulty 550 [REBRANDED]
        {
                title: "Buddyland Games",
                slug: "buddyland-games",
                difficulty: Difficulty.EASY,
                statement: `In Buddyland, a tennis game involves 4 referees. Each referee has to point out whether he considers the ball to be inside limits or outside limits.

The ball is considered to be **IN** if and only if **all** the referees agree that it was inside limits.

Given the decision of the 4 referees, help Buddy determine whether the ball is considered inside limits or not.`,
                inputFormat: `The first line of input will contain a single integer T, denoting the number of test cases.
Each test case consists of a single line of input containing 4 integers R1, R2, R3, R4 denoting the decision of the respective referees.
Here R can be either 0 or 1 where 0 denotes that the referee considered the ball to be inside limits whereas 1 denotes that they consider it to be outside limits.`,
                outputFormat: `For each test case, output IN if the ball is considered to be inside limits by all referees and OUT otherwise.`,
                constraints: `1 ≤ T ≤ 20
0 ≤ R1, R2, R3, R4 ≤ 1`,
                sampleInput: `4
1 1 0 0
0 0 0 0
0 0 0 1
1 1 1 1`,
                sampleOutput: `OUT
IN
OUT
OUT`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "The ball is IN only if all four values are 0. Check if R1 + R2 + R3 + R4 equals 0.",
                tags: ["implementation", "math"],
                testCases: [
                        { input: "4\n1 1 0 0\n0 0 0 0\n0 0 0 1\n1 1 1 1", output: "OUT\nIN\nOUT\nOUT", isSample: true },
                        { input: "1\n0 0 0 0", output: "IN", isSample: false },
                        { input: "1\n1 0 0 0", output: "OUT", isSample: false },
                        { input: "1\n0 1 0 0", output: "OUT", isSample: false },
                        { input: "1\n0 0 1 0", output: "OUT", isSample: false },
                        { input: "1\n0 0 0 1", output: "OUT", isSample: false },
                        { input: "1\n1 1 0 0", output: "OUT", isSample: false },
                        { input: "1\n1 1 1 0", output: "OUT", isSample: false },
                        { input: "1\n1 1 1 1", output: "OUT", isSample: false },
                        { input: "1\n0 1 1 0", output: "OUT", isSample: false },
                ],
        },

        // Problem 3: Subscriptions (SUBSCRIBE_) - Difficulty 504
        {
                title: "Subscriptions",
                slug: "subscriptions",
                difficulty: Difficulty.EASY,
                statement: `Buddy wants to subscribe to a streaming service. The service offers two plans:
- Monthly plan: costs M rupees per month
- Yearly plan: costs Y rupees per year

Buddy wants to use the service for exactly N months. Help Buddy find the minimum cost.`,
                inputFormat: `The first line of input contains a single integer T, denoting the number of test cases.
Each test case consists of a single line containing three space-separated integers N, M, and Y.`,
                outputFormat: `For each test case, output the minimum cost to use the service for N months.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N ≤ 100
1 ≤ M ≤ 1000
1 ≤ Y ≤ 12000`,
                sampleInput: `3
5 100 1000
12 100 1000
15 100 1000`,
                sampleOutput: `500
1000
1100`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Compare N*M (monthly for all) vs (N/12)*Y + (N%12)*M (yearly where possible, monthly for remainder).",
                tags: ["math", "greedy"],
                testCases: [
                        { input: "3\n5 100 1000\n12 100 1000\n15 100 1000", output: "500\n1000\n1100", isSample: true },
                        { input: "1\n24 50 500", output: "1000", isSample: false },
                        { input: "1\n6 200 1200", output: "1200", isSample: false },
                        { input: "1\n1 100 1200", output: "100", isSample: false },
                        { input: "1\n13 100 1000", output: "1100", isSample: false },
                        { input: "1\n11 100 1100", output: "1100", isSample: false },
                        { input: "1\n36 50 500", output: "1500", isSample: false },
                        { input: "1\n100 10 100", output: "880", isSample: false },
                        { input: "1\n7 150 1500", output: "1050", isSample: false },
                        { input: "1\n25 100 1000", output: "2100", isSample: false },
                ],
        },

        // Problem 4: Buddy in his Office (OFFICE) - Difficulty 532 [REBRANDED]
        {
                title: "Buddy in his Office",
                slug: "buddy-in-his-office",
                difficulty: Difficulty.EASY,
                statement: `Buddy works in an office. His office timings are from 9:00 AM to 5:00 PM (8 hours).

Buddy has a task that takes exactly T hours to complete. He can only work during office hours.

Given the current time (in 24-hour format as H:M), determine if Buddy can complete the task before office hours end.`,
                inputFormat: `The first line of input contains a single integer T, denoting the number of test cases.
Each test case consists of two lines:
- First line contains two integers H and M, the current hour and minute.
- Second line contains the integer T, the time required to complete the task in hours.`,
                outputFormat: `For each test case, output YES if Buddy can complete the task before 5:00 PM, NO otherwise.`,
                constraints: `1 ≤ Test Cases ≤ 100
9 ≤ H ≤ 17
0 ≤ M ≤ 59
1 ≤ T ≤ 8`,
                sampleInput: `3
9 0
8
14 30
2
16 0
2`,
                sampleOutput: `YES
YES
NO`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Calculate remaining time until 17:00. Compare with task duration.",
                tags: ["implementation", "math"],
                testCases: [
                        { input: "3\n9 0\n8\n14 30\n2\n16 0\n2", output: "YES\nYES\nNO", isSample: true },
                        { input: "1\n9 30\n7", output: "YES", isSample: false },
                        { input: "1\n17 0\n1", output: "NO", isSample: false },
                        { input: "1\n10 0\n7", output: "YES", isSample: false },
                        { input: "1\n15 0\n2", output: "YES", isSample: false },
                        { input: "1\n16 30\n1", output: "NO", isSample: false },
                        { input: "1\n9 0\n1", output: "YES", isSample: false },
                        { input: "1\n12 0\n5", output: "YES", isSample: false },
                        { input: "1\n13 0\n5", output: "NO", isSample: false },
                        { input: "1\n11 30\n6", output: "NO", isSample: false },
                ],
        },

        // Problem 5: Mahasena (AMR15A) - Difficulty 533
        {
                title: "Mahasena",
                slug: "mahasena",
                difficulty: Difficulty.EASY,
                statement: `Mahasena is a great warrior. He has an army of N soldiers. Each soldier has a weapon - either a sword or a bow.

A soldier with a sword has power 1, and a soldier with a bow has power 0.

Mahasena's army is considered strong if more than half the soldiers have swords. Determine if the army is strong.`,
                inputFormat: `The first line contains N, the number of soldiers.
The second line contains N space-separated integers, where each integer is either 0 or 1. 1 means the soldier has a sword, 0 means the soldier has a bow.`,
                outputFormat: `Print "YES" if the army is strong (more than half have swords), otherwise print "NO".`,
                constraints: `1 ≤ N ≤ 100`,
                sampleInput: `5
1 0 1 0 1`,
                sampleOutput: `YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Count the number of 1s. If count > N/2, the army is strong.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "5\n1 0 1 0 1", output: "YES", isSample: true },
                        { input: "4\n1 1 0 0", output: "NO", isSample: false },
                        { input: "3\n1 1 1", output: "YES", isSample: false },
                        { input: "6\n1 1 1 1 0 0", output: "YES", isSample: false },
                        { input: "2\n0 0", output: "NO", isSample: false },
                        { input: "1\n1", output: "YES", isSample: false },
                        { input: "1\n0", output: "NO", isSample: false },
                        { input: "7\n1 1 1 1 0 0 0", output: "YES", isSample: false },
                        { input: "10\n1 1 1 1 1 0 0 0 0 0", output: "NO", isSample: false },
                        { input: "8\n1 1 1 1 1 0 0 0", output: "YES", isSample: false },
                ],
        },

        // Problem 6: CRED Coins (CREDCOINS) - Difficulty 539
        {
                title: "CRED Coins",
                slug: "cred-coins",
                difficulty: Difficulty.EASY,
                statement: `Buddy has X coins. He can exchange:
- 4 coins for 1 gift
- 1 gift for 1 coin (trade back)

What is the maximum number of gifts Buddy can obtain?`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single integer X, the initial number of coins.`,
                outputFormat: `For each test case, output the maximum number of gifts Buddy can obtain.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ X ≤ 10^9`,
                sampleInput: `2
4
6`,
                sampleOutput: `1
2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Think about the net cost of getting a gift: 4 coins for 1 gift, then trade gift back for 1 coin. Net cost = 3 coins per gift. Maximum gifts = X / 3.",
                tags: ["math", "greedy"],
                testCases: [
                        { input: "2\n4\n6", output: "1\n2", isSample: true },
                        { input: "1\n3", output: "1", isSample: false },
                        { input: "1\n10", output: "3", isSample: false },
                        { input: "1\n100", output: "33", isSample: false },
                        { input: "1\n1", output: "0", isSample: false },
                        { input: "1\n2", output: "0", isSample: false },
                        { input: "1\n7", output: "2", isSample: false },
                        { input: "1\n9", output: "3", isSample: false },
                        { input: "1\n12", output: "4", isSample: false },
                        { input: "1\n1000000000", output: "333333333", isSample: false },
                ],
        },

        // Problem 7: Water Filling (WATERFILLING) - Difficulty 541
        {
                title: "Water Filling",
                slug: "water-filling",
                difficulty: Difficulty.EASY,
                statement: `Buddy has a tank of capacity C liters. Currently it has W liters of water.

A tap fills X liters per minute. How many minutes are needed to fill the tank completely?

If the tank is already full or overflowing, output 0.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains three integers C, W, and X.`,
                outputFormat: `For each test case, output the minimum number of minutes to fill the tank. Use ceiling if not an exact division.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ C, X ≤ 1000
0 ≤ W ≤ C`,
                sampleInput: `3
10 5 2
10 10 1
15 0 5`,
                sampleOutput: `3
0
3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Need to fill (C - W) liters at X liters per minute. Answer = ceiling((C-W)/X).",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n10 5 2\n10 10 1\n15 0 5", output: "3\n0\n3", isSample: true },
                        { input: "1\n100 50 10", output: "5", isSample: false },
                        { input: "1\n7 3 2", output: "2", isSample: false },
                        { input: "1\n5 0 1", output: "5", isSample: false },
                        { input: "1\n20 19 1", output: "1", isSample: false },
                        { input: "1\n1000 0 1000", output: "1", isSample: false },
                        { input: "1\n1000 500 100", output: "5", isSample: false },
                        { input: "1\n50 25 7", output: "4", isSample: false },
                        { input: "1\n100 99 1", output: "1", isSample: false },
                        { input: "1\n1 1 1", output: "0", isSample: false },
                ],
        },

        // Problem 8: Sale Season (SALESEASON) - Difficulty 541
        {
                title: "Sale Season",
                slug: "sale-season",
                difficulty: Difficulty.EASY,
                statement: `It's sale season! Shop A offers a flat discount of D rupees on all items. Shop B offers a P% discount.

An item costs M rupees originally. Buddy wants to buy from the shop where the final price is lower.

Output which shop offers the better deal, or if both are equal.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains three integers M, D, and P.`,
                outputFormat: `For each test case, output:
- "A" if Shop A is cheaper
- "B" if Shop B is cheaper
- "ANY" if both are equal`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ M ≤ 10000
0 ≤ D ≤ M
0 ≤ P ≤ 100`,
                sampleInput: `3
100 10 10
100 20 10
100 10 20`,
                sampleOutput: `ANY
A
B`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Shop A price = M - D. Shop B price = M - (M * P / 100). Compare these values.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n100 10 10\n100 20 10\n100 10 20", output: "ANY\nA\nB", isSample: true },
                        { input: "1\n200 50 25", output: "ANY", isSample: false },
                        { input: "1\n500 100 10", output: "A", isSample: false },
                        { input: "1\n1000 50 10", output: "A", isSample: false },
                        { input: "1\n50 5 10", output: "ANY", isSample: false },
                        { input: "1\n100 0 0", output: "ANY", isSample: false },
                        { input: "1\n1000 100 5", output: "A", isSample: false },
                        { input: "1\n1000 50 20", output: "B", isSample: false },
                        { input: "1\n400 100 25", output: "ANY", isSample: false },
                        { input: "1\n10000 1000 5", output: "A", isSample: false },
                ],
        },

        // Problem 9: Minimum Pizzas (MINPIZZA) - Difficulty 546
        {
                title: "Minimum Pizzas",
                slug: "minimum-pizzas",
                difficulty: Difficulty.EASY,
                statement: `Buddy is ordering pizzas for a party. Each pizza has S slices. There are N people at the party, and each person wants to eat exactly K slices.

What is the minimum number of pizzas Buddy needs to order so that everyone can eat K slices? Leftover slices are okay.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains three integers N, S, and K.`,
                outputFormat: `For each test case, output the minimum number of pizzas needed.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N, S, K ≤ 100`,
                sampleInput: `3
4 8 2
3 5 3
2 6 4`,
                sampleOutput: `1
2
2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Total slices needed = N * K. Pizzas needed = ceiling(total_slices / S).",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n4 8 2\n3 5 3\n2 6 4", output: "1\n2\n2", isSample: true },
                        { input: "1\n10 4 2", output: "5", isSample: false },
                        { input: "1\n5 10 2", output: "1", isSample: false },
                        { input: "1\n1 1 1", output: "1", isSample: false },
                        { input: "1\n100 8 4", output: "50", isSample: false },
                        { input: "1\n7 6 3", output: "4", isSample: false },
                        { input: "1\n20 8 2", output: "5", isSample: false },
                        { input: "1\n15 10 3", output: "5", isSample: false },
                        { input: "1\n100 100 1", output: "1", isSample: false },
                        { input: "1\n50 7 5", output: "36", isSample: false },
                ],
        },

        // Problem 10: Expert Setter (EXPERT) - Difficulty 561
        {
                title: "Expert Setter",
                slug: "expert-setter",
                difficulty: Difficulty.EASY,
                statement: `To become an expert problem setter, one needs to create at least N problems.

Buddy has already created X problems. If Buddy creates Y problems each day, how many more days are needed to become an expert?

If Buddy is already an expert, output 0.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains three integers N, X, and Y.`,
                outputFormat: `For each test case, output the minimum number of days needed.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N, Y ≤ 1000
0 ≤ X ≤ N`,
                sampleInput: `3
10 0 2
10 10 1
15 5 3`,
                sampleOutput: `5
0
4`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Need to create (N - X) more problems at Y per day. Answer = ceiling((N-X)/Y).",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n10 0 2\n10 10 1\n15 5 3", output: "5\n0\n4", isSample: true },
                        { input: "1\n100 50 10", output: "5", isSample: false },
                        { input: "1\n7 6 1", output: "1", isSample: false },
                        { input: "1\n5 0 1", output: "5", isSample: false },
                        { input: "1\n20 19 1", output: "1", isSample: false },
                        { input: "1\n1000 0 100", output: "10", isSample: false },
                        { input: "1\n50 25 7", output: "4", isSample: false },
                        { input: "1\n100 99 1", output: "1", isSample: false },
                        { input: "1\n1 1 1", output: "0", isSample: false },
                        { input: "1\n30 10 7", output: "3", isSample: false },
                ],
        },

        // Problem 11: Buddy and NextGen (HELIUM3) - Difficulty 562 [REBRANDED]
        {
                title: "Buddy and NextGen",
                slug: "buddy-and-nextgen",
                difficulty: Difficulty.EASY,
                statement: `Buddy is working on a NextGen project. The project requires exactly N units of a special fuel.

Currently, Buddy has X units. Each day, Buddy can produce Y units of fuel.

How many days does Buddy need to accumulate N units?`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains three integers N, X, and Y.`,
                outputFormat: `For each test case, output the minimum number of days. If Buddy already has enough, output 0.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N, Y ≤ 10^9
0 ≤ X ≤ N`,
                sampleInput: `3
100 50 10
50 50 5
1000 100 100`,
                sampleOutput: `5
0
9`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Days needed = ceiling((N - X) / Y). Handle the case where X >= N.",
                tags: ["math"],
                testCases: [
                        { input: "3\n100 50 10\n50 50 5\n1000 100 100", output: "5\n0\n9", isSample: true },
                        { input: "1\n10 0 3", output: "4", isSample: false },
                        { input: "1\n7 7 1", output: "0", isSample: false },
                        { input: "1\n1000000000 0 1", output: "1000000000", isSample: false },
                        { input: "1\n100 99 1", output: "1", isSample: false },
                        { input: "1\n500 100 50", output: "8", isSample: false },
                        { input: "1\n1 0 1", output: "1", isSample: false },
                        { input: "1\n999999999 0 1000000000", output: "1", isSample: false },
                        { input: "1\n200 50 30", output: "5", isSample: false },
                        { input: "1\n1000 500 250", output: "2", isSample: false },
                ],
        },

        // Problem 12: Sugarcane Juice Business (SUGARCANE) - Difficulty 563
        {
                title: "Sugarcane Juice Business",
                slug: "sugarcane-juice-business",
                difficulty: Difficulty.EASY,
                statement: `Buddy runs a sugarcane juice stall. Each glass uses S sugarcanes and sells for P rupees.

Buddy has N sugarcanes. What is the maximum revenue Buddy can earn?`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains three integers N, S, and P.`,
                outputFormat: `For each test case, output the maximum revenue.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N, S, P ≤ 1000`,
                sampleInput: `3
10 2 5
7 3 10
1 2 100`,
                sampleOutput: `25
20
0`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Glasses possible = N / S (integer division). Revenue = glasses * P.",
                tags: ["math"],
                testCases: [
                        { input: "3\n10 2 5\n7 3 10\n1 2 100", output: "25\n20\n0", isSample: true },
                        { input: "1\n100 10 50", output: "500", isSample: false },
                        { input: "1\n5 5 100", output: "100", isSample: false },
                        { input: "1\n1 1 1", output: "1", isSample: false },
                        { input: "1\n1000 1 1", output: "1000", isSample: false },
                        { input: "1\n999 100 50", output: "450", isSample: false },
                        { input: "1\n50 7 20", output: "140", isSample: false },
                        { input: "1\n3 4 1000", output: "0", isSample: false },
                        { input: "1\n100 25 10", output: "40", isSample: false },
                        { input: "1\n1000 1000 1000", output: "1000", isSample: false },
                ],
        },

        // Problem 13: Reverse The Number (FLOW007) - Difficulty 588
        {
                title: "Reverse The Number",
                slug: "reverse-the-number",
                difficulty: Difficulty.EASY,
                statement: `Given an integer N, output its digits in reverse order.

Note: Leading zeros should be omitted. For example, reversing 1200 should give 21, not 0021.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single integer N.`,
                outputFormat: `For each test case, output the reversed number.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N ≤ 10^9`,
                sampleInput: `3
1234
1200
100`,
                sampleOutput: `4321
21
1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Repeatedly extract the last digit (N % 10) and build the reversed number. Or convert to string, reverse, convert back.",
                tags: ["math", "strings", "implementation"],
                testCases: [
                        { input: "3\n1234\n1200\n100", output: "4321\n21\n1", isSample: true },
                        { input: "1\n123456789", output: "987654321", isSample: false },
                        { input: "1\n1000000000", output: "1", isSample: false },
                        { input: "1\n5", output: "5", isSample: false },
                        { input: "1\n10", output: "1", isSample: false },
                        { input: "1\n99", output: "99", isSample: false },
                        { input: "1\n12321", output: "12321", isSample: false },
                        { input: "1\n1000", output: "1", isSample: false },
                        { input: "1\n9876543", output: "3456789", isSample: false },
                        { input: "1\n101", output: "101", isSample: false },
                ],
        },

        // Problem 14: Good Program (NIBBLE) - Difficulty 593
        {
                title: "Good Program",
                slug: "good-program",
                difficulty: Difficulty.EASY,
                statement: `A program is considered "good" if it has an even number of 1-bits in its binary representation.

Given an integer N, determine if it represents a good program.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single integer N.`,
                outputFormat: `For each test case, output "EVEN" if the number of 1-bits is even, otherwise output "ODD".`,
                constraints: `1 ≤ T ≤ 1000
0 ≤ N ≤ 10^9`,
                sampleInput: `3
4
7
12`,
                sampleOutput: `ODD
ODD
EVEN`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Count the 1-bits using N & (N-1) technique or built-in popcount. Check if count is even.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n4\n7\n12", output: "ODD\nODD\nEVEN", isSample: true },
                        { input: "1\n0", output: "EVEN", isSample: false },
                        { input: "1\n1", output: "ODD", isSample: false },
                        { input: "1\n3", output: "EVEN", isSample: false },
                        { input: "1\n15", output: "EVEN", isSample: false },
                        { input: "1\n16", output: "ODD", isSample: false },
                        { input: "1\n255", output: "EVEN", isSample: false },
                        { input: "1\n256", output: "ODD", isSample: false },
                        { input: "1\n1023", output: "EVEN", isSample: false },
                        { input: "1\n1000000000", output: "EVEN", isSample: false },
                ],
        },

        // Problem 15: Elections in Buddyland (ELECTN) - Difficulty 604 [REBRANDED]
        {
                title: "Elections in Buddyland",
                slug: "elections-in-buddyland",
                difficulty: Difficulty.EASY,
                statement: `Elections are being held in Buddyland. There are two candidates: A and B.

N people have voted. Given the votes, determine the winner. If it's a tie, output "TIE".`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains:
- First line: integer N (number of votes)
- Second line: N space-separated integers, each either 0 (vote for A) or 1 (vote for B)`,
                outputFormat: `For each test case, output:
- "A" if candidate A wins
- "B" if candidate B wins
- "TIE" if it's a tie`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N ≤ 1000`,
                sampleInput: `3
5
0 0 1 1 1
4
0 0 1 1
3
0 0 0`,
                sampleOutput: `B
TIE
A`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Count zeros (votes for A) and ones (votes for B). Compare counts.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "3\n5\n0 0 1 1 1\n4\n0 0 1 1\n3\n0 0 0", output: "B\nTIE\nA", isSample: true },
                        { input: "1\n1\n0", output: "A", isSample: false },
                        { input: "1\n1\n1", output: "B", isSample: false },
                        { input: "1\n6\n0 0 0 1 1 1", output: "TIE", isSample: false },
                        { input: "1\n7\n1 1 1 1 0 0 0", output: "B", isSample: false },
                        { input: "1\n10\n0 0 0 0 0 1 1 1 1 1", output: "TIE", isSample: false },
                        { input: "1\n5\n0 0 0 0 0", output: "A", isSample: false },
                        { input: "1\n5\n1 1 1 1 1", output: "B", isSample: false },
                        { input: "1\n9\n0 1 0 1 0 1 0 1 0", output: "A", isSample: false },
                        { input: "1\n2\n0 1", output: "TIE", isSample: false },
                ],
        },

        // Problem 16: ATM Withdrawal - Difficulty 500
        {
                title: "ATM Withdrawal",
                slug: "atm-withdrawal",
                difficulty: Difficulty.EASY,
                statement: `Buddy would like to withdraw X dollars from an ATM. The cash machine will only accept the transaction if X is a multiple of 5, and Buddy's account balance has enough cash to perform the withdrawal transaction (including bank charges).

For each successful withdrawal, the bank charges 0.50 dollars.

Calculate Buddy's account balance after an attempted transaction.`,
                inputFormat: `A single line containing two space-separated values:
- X: the amount of cash Buddy wishes to withdraw (positive integer, 0 < X <= 2000)
- Y: Buddy's initial account balance (non-negative number with two decimal places, 0 <= Y <= 2000)`,
                outputFormat: `Output the account balance after the attempted transaction, given as a number with two digits of precision.
If there is not enough money in the account or X is not a multiple of 5, output the current bank balance.`,
                constraints: `0 < X <= 2000
0 <= Y <= 2000`,
                sampleInput: `30 120.00`,
                sampleOutput: `89.50`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Check if X is a multiple of 5 AND if Y >= X + 0.50. If both conditions are met, subtract X + 0.50 from Y.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "30 120.00", output: "89.50", isSample: true },
                        { input: "42 120.00", output: "120.00", isSample: false },
                        { input: "300 120.00", output: "120.00", isSample: false },
                        { input: "100 100.50", output: "0.00", isSample: false },
                        { input: "5 5.50", output: "0.00", isSample: false },
                        { input: "50 50.00", output: "50.00", isSample: false },
                        { input: "10 20.00", output: "9.50", isSample: false },
                        { input: "15 100.00", output: "84.50", isSample: false },
                        { input: "200 500.00", output: "299.50", isSample: false },
                        { input: "5 6.00", output: "0.50", isSample: false },
                ],
        },

        // Problem 17: Factorial Zeros
        {
                title: "Factorial Zeros",
                slug: "factorial-zeros",
                difficulty: Difficulty.EASY,
                statement: `For any positive integer N, define Z(N) as the number of zeros at the end of the decimal form of N!.

Given T test cases, find Z(N) for each value of N.

Note: The trailing zeros in a factorial are determined by the number of times 10 is a factor. Since 10 = 2 × 5, and there are always more factors of 2 than 5 in a factorial, count the factors of 5.`,
                inputFormat: `The first line contains T, the number of test cases.
Each of the next T lines contains a positive integer N.`,
                outputFormat: `For each test case, output Z(N) on a separate line.`,
                constraints: `1 ≤ T ≤ 100000
1 ≤ N ≤ 1000000000`,
                sampleInput: `6
3
60
100
1024
23456
8735373`,
                sampleOutput: `0
14
24
253
5861
2183837`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Count factors of 5: Z(N) = floor(N/5) + floor(N/25) + floor(N/125) + ...",
                tags: ["math", "number-theory"],
                testCases: [
                        { input: "6\n3\n60\n100\n1024\n23456\n8735373", output: "0\n14\n24\n253\n5861\n2183837", isSample: true },
                        { input: "1\n1", output: "0", isSample: false },
                        { input: "1\n5", output: "1", isSample: false },
                        { input: "1\n25", output: "6", isSample: false },
                        { input: "1\n125", output: "31", isSample: false },
                        { input: "1\n1000", output: "249", isSample: false },
                        { input: "1\n10000", output: "2499", isSample: false },
                        { input: "1\n100000", output: "24999", isSample: false },
                        { input: "1\n1000000", output: "249998", isSample: false },
                        { input: "1\n10", output: "2", isSample: false },
                ],
        },

        // Problem 18: Turbo Sort
        {
                title: "Turbo Sort",
                slug: "turbo-sort",
                difficulty: Difficulty.EASY,
                statement: `Given a list of N integers, sort them in non-decreasing order.`,
                inputFormat: `The first line contains N, the number of integers.
Each of the next N lines contains a single integer.`,
                outputFormat: `Output the sorted integers, one per line.`,
                constraints: `1 ≤ N ≤ 1000000
0 ≤ each integer ≤ 1000000`,
                sampleInput: `5
5
3
6
7
1`,
                sampleOutput: `1
3
5
6
7`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use an efficient sorting algorithm like quicksort or mergesort, or counting sort for this range.",
                tags: ["sorting", "arrays"],
                testCases: [
                        { input: "5\n5\n3\n6\n7\n1", output: "1\n3\n5\n6\n7", isSample: true },
                        { input: "3\n1\n2\n3", output: "1\n2\n3", isSample: false },
                        { input: "3\n3\n2\n1", output: "1\n2\n3", isSample: false },
                        { input: "1\n42", output: "42", isSample: false },
                        { input: "5\n5\n5\n5\n5\n5", output: "5\n5\n5\n5\n5", isSample: false },
                        { input: "4\n10\n1\n100\n50", output: "1\n10\n50\n100", isSample: false },
                        { input: "6\n0\n0\n1\n0\n1\n0", output: "0\n0\n0\n0\n1\n1", isSample: false },
                        { input: "4\n1000000\n0\n500000\n1", output: "0\n1\n500000\n1000000", isSample: false },
                        { input: "2\n2\n1", output: "1\n2", isSample: false },
                        { input: "7\n7\n6\n5\n4\n3\n2\n1", output: "1\n2\n3\n4\n5\n6\n7", isSample: false },
                ],
        },

        // Problem 19: Add Two Numbers
        {
                title: "Add Two Numbers",
                slug: "add-two-numbers",
                difficulty: Difficulty.EASY,
                statement: `Buddy is learning basic arithmetic. Given two integers A and B, help Buddy find their sum.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains two space-separated integers A and B.`,
                outputFormat: `For each test case, output the sum A + B on a separate line.`,
                constraints: `1 ≤ T ≤ 1000
-1000 ≤ A, B ≤ 1000`,
                sampleInput: `3
1 2
-5 10
100 200`,
                sampleOutput: `3
5
300`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Simply calculate and print A + B.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n1 2\n-5 10\n100 200", output: "3\n5\n300", isSample: true },
                        { input: "1\n0 0", output: "0", isSample: false },
                        { input: "1\n-1000 1000", output: "0", isSample: false },
                        { input: "1\n1000 1000", output: "2000", isSample: false },
                        { input: "1\n-1000 -1000", output: "-2000", isSample: false },
                        { input: "1\n123 456", output: "579", isSample: false },
                        { input: "1\n-50 -50", output: "-100", isSample: false },
                        { input: "1\n999 1", output: "1000", isSample: false },
                        { input: "1\n-1 1", output: "0", isSample: false },
                        { input: "1\n500 -250", output: "250", isSample: false },
                ],
        },

        // Problem 20: Enormous Input Test
        {
                title: "Enormous Input Test",
                slug: "enormous-input-test",
                difficulty: Difficulty.EASY,
                statement: `The purpose of this problem is to verify whether your programming language can handle large input/output efficiently.

Given N numbers and a divisor K, count how many of the N numbers are divisible by K.`,
                inputFormat: `The first line contains two integers N and K.
Each of the next N lines contains a single integer.`,
                outputFormat: `Output the count of numbers divisible by K.`,
                constraints: `1 ≤ N ≤ 10000000
1 ≤ K ≤ 10000
Each number is between 1 and 10000000`,
                sampleInput: `7 3
1
51
966369
7
9
999996
11`,
                sampleOutput: `4`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Use fast I/O. Count numbers where num % K == 0.",
                tags: ["implementation", "i/o"],
                testCases: [
                        { input: "7 3\n1\n51\n966369\n7\n9\n999996\n11", output: "4", isSample: true },
                        { input: "5 2\n2\n4\n6\n8\n10", output: "5", isSample: false },
                        { input: "5 2\n1\n3\n5\n7\n9", output: "0", isSample: false },
                        { input: "3 1\n100\n200\n300", output: "3", isSample: false },
                        { input: "4 5\n5\n10\n15\n17", output: "3", isSample: false },
                        { input: "6 7\n7\n14\n21\n22\n23\n28", output: "4", isSample: false },
                        { input: "1 1000\n1000", output: "1", isSample: false },
                        { input: "3 100\n100\n200\n50", output: "2", isSample: false },
                        { input: "5 10\n10\n20\n30\n40\n50", output: "5", isSample: false },
                        { input: "4 3\n9\n18\n27\n36", output: "4", isSample: false },
                ],
        },

        // Problem 21: Small Factorials
        {
                title: "Small Factorials",
                slug: "small-factorials",
                difficulty: Difficulty.EASY,
                statement: `Buddy wants to compute factorials of small numbers. Given N, compute N!.`,
                inputFormat: `The first line contains T, the number of test cases.
Each of the next T lines contains a single integer N.`,
                outputFormat: `For each test case, output N! on a separate line.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N ≤ 100`,
                sampleInput: `4
1
2
5
3`,
                sampleOutput: `1
2
120
6`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "For N up to 100, you need big integers. Multiply iteratively from 1 to N.",
                tags: ["math", "big-integers"],
                testCases: [
                        { input: "4\n1\n2\n5\n3", output: "1\n2\n120\n6", isSample: true },
                        { input: "1\n0", output: "1", isSample: false },
                        { input: "1\n10", output: "3628800", isSample: false },
                        { input: "1\n6", output: "720", isSample: false },
                        { input: "1\n7", output: "5040", isSample: false },
                        { input: "1\n8", output: "40320", isSample: false },
                        { input: "1\n4", output: "24", isSample: false },
                        { input: "1\n9", output: "362880", isSample: false },
                        { input: "1\n12", output: "479001600", isSample: false },
                        { input: "1\n15", output: "1307674368000", isSample: false },
                ],
        },

        // Problem 22: Find Remainder
        {
                title: "Find Remainder",
                slug: "find-remainder",
                difficulty: Difficulty.EASY,
                statement: `Buddy is practicing modular arithmetic. Given two integers A and B, find the remainder when A is divided by B.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains two space-separated integers A and B.`,
                outputFormat: `For each test case, output A % B on a separate line.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ A, B ≤ 10000`,
                sampleInput: `3
10 3
17 5
100 7`,
                sampleOutput: `1
2
2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Simply compute and print A % B.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n10 3\n17 5\n100 7", output: "1\n2\n2", isSample: true },
                        { input: "1\n10 10", output: "0", isSample: false },
                        { input: "1\n9 10", output: "9", isSample: false },
                        { input: "1\n25 6", output: "1", isSample: false },
                        { input: "1\n100 100", output: "0", isSample: false },
                        { input: "1\n1 1", output: "0", isSample: false },
                        { input: "1\n999 1000", output: "999", isSample: false },
                        { input: "1\n50 7", output: "1", isSample: false },
                        { input: "1\n81 9", output: "0", isSample: false },
                        { input: "1\n123 11", output: "2", isSample: false },
                ],
        },

        // Problem 23: First and Last Digit
        {
                title: "First and Last Digit",
                slug: "first-and-last-digit",
                difficulty: Difficulty.EASY,
                statement: `Given a number N, find the sum of its first and last digits.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single integer N.`,
                outputFormat: `For each test case, output the sum of the first and last digits of N.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N ≤ 1000000000`,
                sampleInput: `3
1234
99
5`,
                sampleOutput: `5
18
10`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Last digit = N % 10. For first digit, keep dividing by 10 until you get a single digit.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n1234\n99\n5", output: "5\n18\n10", isSample: true },
                        { input: "1\n11", output: "2", isSample: false },
                        { input: "1\n123456789", output: "10", isSample: false },
                        { input: "1\n1000000000", output: "1", isSample: false },
                        { input: "1\n9999", output: "18", isSample: false },
                        { input: "1\n100", output: "1", isSample: false },
                        { input: "1\n55", output: "10", isSample: false },
                        { input: "1\n1", output: "2", isSample: false },
                        { input: "1\n91", output: "10", isSample: false },
                        { input: "1\n19", output: "10", isSample: false },
                ],
        },

        // Problem 24: Lucky Four
        {
                title: "Lucky Four",
                slug: "lucky-four",
                difficulty: Difficulty.EASY,
                statement: `Buddy considers the digit 4 to be lucky. Given an integer N, count how many times the digit 4 appears in N.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single integer N.`,
                outputFormat: `For each test case, output the count of digit 4 in N.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N ≤ 1000000000`,
                sampleInput: `5
447474
228
6664
40
81`,
                sampleOutput: `4
0
1
1
0`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Check each digit by taking modulo 10, then divide by 10. Count occurrences of 4.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "5\n447474\n228\n6664\n40\n81", output: "4\n0\n1\n1\n0", isSample: true },
                        { input: "1\n4", output: "1", isSample: false },
                        { input: "1\n44", output: "2", isSample: false },
                        { input: "1\n444444444", output: "9", isSample: false },
                        { input: "1\n123456789", output: "1", isSample: false },
                        { input: "1\n1000000000", output: "0", isSample: false },
                        { input: "1\n4444", output: "4", isSample: false },
                        { input: "1\n414141", output: "3", isSample: false },
                        { input: "1\n999999999", output: "0", isSample: false },
                        { input: "1\n404040", output: "3", isSample: false },
                ],
        },

        // Problem 25: Sum of Digits
        {
                title: "Sum of Digits",
                slug: "sum-of-digits",
                difficulty: Difficulty.EASY,
                statement: `Given an integer N, find the sum of all its digits.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single integer N.`,
                outputFormat: `For each test case, output the sum of digits of N.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N ≤ 1000000000`,
                sampleInput: `3
12345
99
100`,
                sampleOutput: `15
18
1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Extract each digit using modulo 10 and add to sum, then divide by 10.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n12345\n99\n100", output: "15\n18\n1", isSample: true },
                        { input: "1\n1", output: "1", isSample: false },
                        { input: "1\n999999999", output: "81", isSample: false },
                        { input: "1\n1000000000", output: "1", isSample: false },
                        { input: "1\n123456789", output: "45", isSample: false },
                        { input: "1\n111111111", output: "9", isSample: false },
                        { input: "1\n55", output: "10", isSample: false },
                        { input: "1\n9", output: "9", isSample: false },
                        { input: "1\n10", output: "1", isSample: false },
                        { input: "1\n500", output: "5", isSample: false },
                ],
        },

        // Problem 26: Counting Vowels
        {
                title: "Counting Vowels",
                slug: "counting-vowels",
                difficulty: Difficulty.EASY,
                statement: `Buddy wants to count vowels in a string. Given a string S containing only lowercase letters, count the number of vowels (a, e, i, o, u).`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single string S.`,
                outputFormat: `For each test case, output the count of vowels in S.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ |S| ≤ 1000
S contains only lowercase English letters`,
                sampleInput: `3
hello
world
aeiou`,
                sampleOutput: `2
1
5`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Check each character if it's in {a, e, i, o, u} and count.",
                tags: ["strings", "implementation"],
                testCases: [
                        { input: "3\nhello\nworld\naeiou", output: "2\n1\n5", isSample: true },
                        { input: "1\nbcdfg", output: "0", isSample: false },
                        { input: "1\naaaaa", output: "5", isSample: false },
                        { input: "1\nprogramming", output: "3", isSample: false },
                        { input: "1\nbuddy", output: "1", isSample: false },
                        { input: "1\neducation", output: "5", isSample: false },
                        { input: "1\nxyz", output: "0", isSample: false },
                        { input: "1\nqueue", output: "4", isSample: false },
                        { input: "1\na", output: "1", isSample: false },
                        { input: "1\nz", output: "0", isSample: false },
                ],
        },

        // Problem 27: Buddy and String Rotation
        {
                title: "Buddy and String Rotation",
                slug: "buddy-and-string-rotation",
                difficulty: Difficulty.EASY,
                statement: `Buddy has a string S. He wants to check if rotating string S by K positions to the left gives the same string.

A left rotation of K positions on a string means moving the first K characters to the end of the string.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains:
- First line: two integers N (length of string) and K (rotation amount)
- Second line: string S`,
                outputFormat: `For each test case, output YES if rotating S by K positions gives the same string, NO otherwise.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N ≤ 1000
0 ≤ K ≤ N`,
                sampleInput: `3
4 2
abab
3 1
abc
6 3
abcabc`,
                sampleOutput: `YES
NO
YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "After K rotations, check if S[K:] + S[:K] equals S.",
                tags: ["strings", "implementation"],
                testCases: [
                        { input: "3\n4 2\nabab\n3 1\nabc\n6 3\nabcabc", output: "YES\nNO\nYES", isSample: true },
                        { input: "1\n3 0\nabc", output: "YES", isSample: false },
                        { input: "1\n4 4\nabcd", output: "YES", isSample: false },
                        { input: "1\n3 3\nabc", output: "YES", isSample: false },
                        { input: "1\n6 2\nababab", output: "YES", isSample: false },
                        { input: "1\n4 1\naaaa", output: "YES", isSample: false },
                        { input: "1\n5 2\nabcde", output: "NO", isSample: false },
                        { input: "1\n2 1\nab", output: "NO", isSample: false },
                        { input: "1\n2 1\naa", output: "YES", isSample: false },
                        { input: "1\n8 4\nabcdabcd", output: "YES", isSample: false },
                ],
        },

        // Problem 28: Buddy and Candies
        {
                title: "Buddy and Candies",
                slug: "buddy-and-candies",
                difficulty: Difficulty.EASY,
                statement: `Buddy has N candies and wants to distribute them equally among K friends. Each friend must get the same number of candies. What is the maximum number of candies each friend can get, and how many candies will be left over?`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains two integers N (candies) and K (friends).`,
                outputFormat: `For each test case, output two space-separated integers: the number of candies each friend gets, and the number of candies left over.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N ≤ 1000000
1 ≤ K ≤ 1000`,
                sampleInput: `3
10 3
20 4
7 2`,
                sampleOutput: `3 1
5 0
3 1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Each friend gets N / K candies. Leftover is N % K.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n10 3\n20 4\n7 2", output: "3 1\n5 0\n3 1", isSample: true },
                        { input: "1\n100 100", output: "1 0", isSample: false },
                        { input: "1\n1 1", output: "1 0", isSample: false },
                        { input: "1\n1 100", output: "0 1", isSample: false },
                        { input: "1\n1000000 7", output: "142857 1", isSample: false },
                        { input: "1\n50 6", output: "8 2", isSample: false },
                        { input: "1\n99 10", output: "9 9", isSample: false },
                        { input: "1\n15 5", output: "3 0", isSample: false },
                        { input: "1\n17 4", output: "4 1", isSample: false },
                        { input: "1\n1000 1000", output: "1 0", isSample: false },
                ],
        },

        // Problem 29: Temperature Conversion
        {
                title: "Temperature Conversion",
                slug: "temperature-conversion",
                difficulty: Difficulty.EASY,
                statement: `Buddy is a scientist and needs to convert temperatures from Celsius to Fahrenheit.

The formula is: F = (C × 9/5) + 32

Given a temperature in Celsius, convert it to Fahrenheit.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single integer C, the temperature in Celsius.`,
                outputFormat: `For each test case, output the temperature in Fahrenheit (as a floating point with 2 decimal places).`,
                constraints: `1 ≤ T ≤ 1000
-100 ≤ C ≤ 100`,
                sampleInput: `3
0
100
-40`,
                sampleOutput: `32.00
212.00
-40.00`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Apply the formula F = (C * 9 / 5) + 32 and format to 2 decimal places.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n0\n100\n-40", output: "32.00\n212.00\n-40.00", isSample: true },
                        { input: "1\n25", output: "77.00", isSample: false },
                        { input: "1\n37", output: "98.60", isSample: false },
                        { input: "1\n-100", output: "-148.00", isSample: false },
                        { input: "1\n50", output: "122.00", isSample: false },
                        { input: "1\n-20", output: "-4.00", isSample: false },
                        { input: "1\n10", output: "50.00", isSample: false },
                        { input: "1\n15", output: "59.00", isSample: false },
                        { input: "1\n-10", output: "14.00", isSample: false },
                        { input: "1\n30", output: "86.00", isSample: false },
                ],
        },

        // Problem 30: Leap Year Check
        {
                title: "Leap Year Check",
                slug: "leap-year-check",
                difficulty: Difficulty.EASY,
                statement: `Buddy wants to check if a given year is a leap year.

A year is a leap year if:
- It is divisible by 4
- BUT NOT divisible by 100
- UNLESS it is also divisible by 400`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single integer Y, the year to check.`,
                outputFormat: `For each test case, output YES if it's a leap year, NO otherwise.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ Y ≤ 10000`,
                sampleInput: `4
2000
1900
2024
2023`,
                sampleOutput: `YES
NO
YES
NO`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Check: (Y % 400 == 0) OR (Y % 4 == 0 AND Y % 100 != 0)",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "4\n2000\n1900\n2024\n2023", output: "YES\nNO\nYES\nNO", isSample: true },
                        { input: "1\n4", output: "YES", isSample: false },
                        { input: "1\n100", output: "NO", isSample: false },
                        { input: "1\n400", output: "YES", isSample: false },
                        { input: "1\n2020", output: "YES", isSample: false },
                        { input: "1\n2100", output: "NO", isSample: false },
                        { input: "1\n2400", output: "YES", isSample: false },
                        { input: "1\n1", output: "NO", isSample: false },
                        { input: "1\n1996", output: "YES", isSample: false },
                        { input: "1\n2001", output: "NO", isSample: false },
                ],
        },

        // Problem 31: Odd or Even
        {
                title: "Odd or Even",
                slug: "odd-or-even",
                difficulty: Difficulty.EASY,
                statement: `Buddy is learning about parity. Given N integers, count how many are odd and how many are even.`,
                inputFormat: `The first line contains N, the count of integers.
The second line contains N space-separated integers.`,
                outputFormat: `Output two space-separated integers: the count of even numbers followed by the count of odd numbers.`,
                constraints: `1 ≤ N ≤ 1000
-1000 ≤ each integer ≤ 1000`,
                sampleInput: `5
1 2 3 4 5`,
                sampleOutput: `2 3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "A number is even if N % 2 == 0, odd otherwise. Count each.",
                tags: ["math", "arrays"],
                testCases: [
                        { input: "5\n1 2 3 4 5", output: "2 3", isSample: true },
                        { input: "4\n2 4 6 8", output: "4 0", isSample: false },
                        { input: "4\n1 3 5 7", output: "0 4", isSample: false },
                        { input: "1\n0", output: "1 0", isSample: false },
                        { input: "6\n-1 -2 -3 -4 -5 -6", output: "3 3", isSample: false },
                        { input: "3\n0 0 0", output: "3 0", isSample: false },
                        { input: "5\n100 101 102 103 104", output: "3 2", isSample: false },
                        { input: "2\n1 2", output: "1 1", isSample: false },
                        { input: "1\n1", output: "0 1", isSample: false },
                        { input: "7\n10 20 30 40 50 60 70", output: "7 0", isSample: false },
                ],
        },

        // Problem 32: Buddy and Multiplication Table
        {
                title: "Buddy and Multiplication Table",
                slug: "buddy-and-multiplication-table",
                difficulty: Difficulty.EASY,
                statement: `Buddy needs help printing a multiplication table. Given a number N, print its multiplication table from 1 to 10.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single integer N.`,
                outputFormat: `For each test case, print 10 lines showing "N x i = N*i" for i from 1 to 10.`,
                constraints: `1 ≤ T ≤ 10
1 ≤ N ≤ 100`,
                sampleInput: `1
5`,
                sampleOutput: `5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use a loop from 1 to 10 and print the formatted output.",
                tags: ["implementation", "loops"],
                testCases: [
                        { input: "1\n5", output: "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50", isSample: true },
                        { input: "1\n1", output: "1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n1 x 5 = 5\n1 x 6 = 6\n1 x 7 = 7\n1 x 8 = 8\n1 x 9 = 9\n1 x 10 = 10", isSample: false },
                        { input: "1\n10", output: "10 x 1 = 10\n10 x 2 = 20\n10 x 3 = 30\n10 x 4 = 40\n10 x 5 = 50\n10 x 6 = 60\n10 x 7 = 70\n10 x 8 = 80\n10 x 9 = 90\n10 x 10 = 100", isSample: false },
                        { input: "1\n7", output: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70", isSample: false },
                        { input: "1\n2", output: "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20", isSample: false },
                        { input: "1\n9", output: "9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45\n9 x 6 = 54\n9 x 7 = 63\n9 x 8 = 72\n9 x 9 = 81\n9 x 10 = 90", isSample: false },
                        { input: "1\n3", output: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30", isSample: false },
                        { input: "1\n12", output: "12 x 1 = 12\n12 x 2 = 24\n12 x 3 = 36\n12 x 4 = 48\n12 x 5 = 60\n12 x 6 = 72\n12 x 7 = 84\n12 x 8 = 96\n12 x 9 = 108\n12 x 10 = 120", isSample: false },
                        { input: "1\n6", output: "6 x 1 = 6\n6 x 2 = 12\n6 x 3 = 18\n6 x 4 = 24\n6 x 5 = 30\n6 x 6 = 36\n6 x 7 = 42\n6 x 8 = 48\n6 x 9 = 54\n6 x 10 = 60", isSample: false },
                        { input: "1\n8", output: "8 x 1 = 8\n8 x 2 = 16\n8 x 3 = 24\n8 x 4 = 32\n8 x 5 = 40\n8 x 6 = 48\n8 x 7 = 56\n8 x 8 = 64\n8 x 9 = 72\n8 x 10 = 80", isSample: false },
                ],
        },

        // Problem 33: Maximum of Three
        {
                title: "Maximum of Three",
                slug: "maximum-of-three",
                difficulty: Difficulty.EASY,
                statement: `Buddy is given three integers A, B, and C. Find the maximum among them.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains three space-separated integers A, B, and C.`,
                outputFormat: `For each test case, output the maximum of the three numbers.`,
                constraints: `1 ≤ T ≤ 1000
-1000 ≤ A, B, C ≤ 1000`,
                sampleInput: `3
1 2 3
5 5 5
-1 0 1`,
                sampleOutput: `3
5
1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Compare all three and return the largest.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n1 2 3\n5 5 5\n-1 0 1", output: "3\n5\n1", isSample: true },
                        { input: "1\n100 200 150", output: "200", isSample: false },
                        { input: "1\n-1000 -999 -998", output: "-998", isSample: false },
                        { input: "1\n0 0 0", output: "0", isSample: false },
                        { input: "1\n1000 1000 999", output: "1000", isSample: false },
                        { input: "1\n7 3 5", output: "7", isSample: false },
                        { input: "1\n-5 -10 -3", output: "-3", isSample: false },
                        { input: "1\n999 1000 998", output: "1000", isSample: false },
                        { input: "1\n50 50 49", output: "50", isSample: false },
                        { input: "1\n1 1 1", output: "1", isSample: false },
                ],
        },

        // Problem 34: Buddy and Buddyland Flag
        {
                title: "Buddy and Buddyland Flag",
                slug: "buddy-and-buddyland-flag",
                difficulty: Difficulty.EASY,
                statement: `Buddyland has a unique flag pattern. The flag has R rows and C columns. Buddy needs to count the total number of cells in the flag.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains two integers R and C.`,
                outputFormat: `For each test case, output the total number of cells (R × C).`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ R, C ≤ 1000`,
                sampleInput: `3
2 3
5 5
1 10`,
                sampleOutput: `6
25
10`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Simply multiply R and C.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "3\n2 3\n5 5\n1 10", output: "6\n25\n10", isSample: true },
                        { input: "1\n1 1", output: "1", isSample: false },
                        { input: "1\n1000 1000", output: "1000000", isSample: false },
                        { input: "1\n100 50", output: "5000", isSample: false },
                        { input: "1\n7 8", output: "56", isSample: false },
                        { input: "1\n12 12", output: "144", isSample: false },
                        { input: "1\n99 100", output: "9900", isSample: false },
                        { input: "1\n500 2", output: "1000", isSample: false },
                        { input: "1\n10 10", output: "100", isSample: false },
                        { input: "1\n1 1000", output: "1000", isSample: false },
                ],
        },

        // Problem 35: Palindrome Check
        {
                title: "Palindrome Check",
                slug: "palindrome-check",
                difficulty: Difficulty.EASY,
                statement: `Buddy wants to check if a given string is a palindrome. A palindrome is a string that reads the same forwards and backwards.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single string S (lowercase letters only).`,
                outputFormat: `For each test case, output YES if S is a palindrome, NO otherwise.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ |S| ≤ 1000`,
                sampleInput: `4
madam
hello
racecar
abc`,
                sampleOutput: `YES
NO
YES
NO`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Reverse the string and compare with original.",
                tags: ["strings", "implementation"],
                testCases: [
                        { input: "4\nmadam\nhello\nracecar\nabc", output: "YES\nNO\nYES\nNO", isSample: true },
                        { input: "1\na", output: "YES", isSample: false },
                        { input: "1\naa", output: "YES", isSample: false },
                        { input: "1\nab", output: "NO", isSample: false },
                        { input: "1\nlevel", output: "YES", isSample: false },
                        { input: "1\nnoon", output: "YES", isSample: false },
                        { input: "1\nworld", output: "NO", isSample: false },
                        { input: "1\nradar", output: "YES", isSample: false },
                        { input: "1\nbuddy", output: "NO", isSample: false },
                        { input: "1\nabba", output: "YES", isSample: false },
                ],
        },

        // Problem 36: Reverse a Number
        {
                title: "Reverse a Number",
                slug: "reverse-a-number",
                difficulty: Difficulty.EASY,
                statement: `Buddy wants to reverse a number. Given a positive integer N, reverse its digits.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single positive integer N.`,
                outputFormat: `For each test case, output the reversed number without leading zeros.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N ≤ 1000000000`,
                sampleInput: `4
12345
100
999
1`,
                sampleOutput: `54321
1
999
1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Extract digits using modulo and division, build the reversed number.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "4\n12345\n100\n999\n1", output: "54321\n1\n999\n1", isSample: true },
                        { input: "1\n1000000000", output: "1", isSample: false },
                        { input: "1\n123456789", output: "987654321", isSample: false },
                        { input: "1\n10", output: "1", isSample: false },
                        { input: "1\n1001", output: "1001", isSample: false },
                        { input: "1\n505", output: "505", isSample: false },
                        { input: "1\n12321", output: "12321", isSample: false },
                        { input: "1\n90", output: "9", isSample: false },
                        { input: "1\n98765", output: "56789", isSample: false },
                        { input: "1\n11111", output: "11111", isSample: false },
                ],
        },

        // Problem 37: Prime Number Check
        {
                title: "Prime Number Check",
                slug: "prime-number-check",
                difficulty: Difficulty.EASY,
                statement: `Buddy is learning about prime numbers. Given an integer N, determine if it is a prime number.

A prime number is greater than 1 and has exactly two divisors: 1 and itself.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single integer N.`,
                outputFormat: `For each test case, output YES if N is prime, NO otherwise.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N ≤ 1000000`,
                sampleInput: `5
2
7
1
4
17`,
                sampleOutput: `YES
YES
NO
NO
YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Check divisibility from 2 to sqrt(N). If any divides N, it's not prime.",
                tags: ["math", "number-theory"],
                testCases: [
                        { input: "5\n2\n7\n1\n4\n17", output: "YES\nYES\nNO\nNO\nYES", isSample: true },
                        { input: "1\n3", output: "YES", isSample: false },
                        { input: "1\n9", output: "NO", isSample: false },
                        { input: "1\n97", output: "YES", isSample: false },
                        { input: "1\n100", output: "NO", isSample: false },
                        { input: "1\n1000000", output: "NO", isSample: false },
                        { input: "1\n999983", output: "YES", isSample: false },
                        { input: "1\n25", output: "NO", isSample: false },
                        { input: "1\n29", output: "YES", isSample: false },
                        { input: "1\n49", output: "NO", isSample: false },
                ],
        },

        // Problem 38: Fibonacci Number
        {
                title: "Fibonacci Number",
                slug: "fibonacci-number",
                difficulty: Difficulty.EASY,
                statement: `Buddy wants to find the Nth Fibonacci number.

The Fibonacci sequence is: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
F(0) = 0, F(1) = 1, F(N) = F(N-1) + F(N-2) for N > 1`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single integer N.`,
                outputFormat: `For each test case, output the Nth Fibonacci number.`,
                constraints: `1 ≤ T ≤ 100
0 ≤ N ≤ 30`,
                sampleInput: `5
0
1
5
10
15`,
                sampleOutput: `0
1
5
55
610`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use iterative approach with two variables for F(N-1) and F(N-2).",
                tags: ["math", "dp"],
                testCases: [
                        { input: "5\n0\n1\n5\n10\n15", output: "0\n1\n5\n55\n610", isSample: true },
                        { input: "1\n2", output: "1", isSample: false },
                        { input: "1\n3", output: "2", isSample: false },
                        { input: "1\n20", output: "6765", isSample: false },
                        { input: "1\n25", output: "75025", isSample: false },
                        { input: "1\n30", output: "832040", isSample: false },
                        { input: "1\n6", output: "8", isSample: false },
                        { input: "1\n7", output: "13", isSample: false },
                        { input: "1\n8", output: "21", isSample: false },
                        { input: "1\n12", output: "144", isSample: false },
                ],
        },

        // Problem 39: GCD of Two Numbers
        {
                title: "GCD of Two Numbers",
                slug: "gcd-of-two-numbers",
                difficulty: Difficulty.EASY,
                statement: `Buddy needs to find the Greatest Common Divisor (GCD) of two numbers A and B.

The GCD is the largest positive integer that divides both A and B.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains two space-separated integers A and B.`,
                outputFormat: `For each test case, output the GCD of A and B.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ A, B ≤ 1000000`,
                sampleInput: `4
12 18
7 3
100 25
17 17`,
                sampleOutput: `6
1
25
17`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use Euclidean algorithm: GCD(a, b) = GCD(b, a % b) until b = 0.",
                tags: ["math", "number-theory"],
                testCases: [
                        { input: "4\n12 18\n7 3\n100 25\n17 17", output: "6\n1\n25\n17", isSample: true },
                        { input: "1\n1 1", output: "1", isSample: false },
                        { input: "1\n1000000 500000", output: "500000", isSample: false },
                        { input: "1\n48 18", output: "6", isSample: false },
                        { input: "1\n13 7", output: "1", isSample: false },
                        { input: "1\n100 100", output: "100", isSample: false },
                        { input: "1\n36 24", output: "12", isSample: false },
                        { input: "1\n81 27", output: "27", isSample: false },
                        { input: "1\n56 42", output: "14", isSample: false },
                        { input: "1\n121 11", output: "11", isSample: false },
                ],
        },

        // Problem 40: LCM of Two Numbers
        {
                title: "LCM of Two Numbers",
                slug: "lcm-of-two-numbers",
                difficulty: Difficulty.EASY,
                statement: `Buddy needs to find the Least Common Multiple (LCM) of two numbers A and B.

The LCM is the smallest positive integer that is divisible by both A and B.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains two space-separated integers A and B.`,
                outputFormat: `For each test case, output the LCM of A and B.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ A, B ≤ 10000`,
                sampleInput: `4
4 6
7 3
5 5
12 18`,
                sampleOutput: `12
21
5
36`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "LCM(a, b) = (a * b) / GCD(a, b). Use Euclidean algorithm for GCD.",
                tags: ["math", "number-theory"],
                testCases: [
                        { input: "4\n4 6\n7 3\n5 5\n12 18", output: "12\n21\n5\n36", isSample: true },
                        { input: "1\n1 1", output: "1", isSample: false },
                        { input: "1\n10 15", output: "30", isSample: false },
                        { input: "1\n3 7", output: "21", isSample: false },
                        { input: "1\n100 25", output: "100", isSample: false },
                        { input: "1\n8 12", output: "24", isSample: false },
                        { input: "1\n9 6", output: "18", isSample: false },
                        { input: "1\n14 21", output: "42", isSample: false },
                        { input: "1\n11 13", output: "143", isSample: false },
                        { input: "1\n20 30", output: "60", isSample: false },
                ],
        },

        // Problem 41: Power of Two
        {
                title: "Power of Two",
                slug: "power-of-two",
                difficulty: Difficulty.EASY,
                statement: `Buddy wants to check if a given number N is a power of 2.

A number is a power of 2 if it can be expressed as 2^k for some non-negative integer k.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single positive integer N.`,
                outputFormat: `For each test case, output YES if N is a power of 2, NO otherwise.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N ≤ 1000000000`,
                sampleInput: `5
1
2
3
16
15`,
                sampleOutput: `YES
YES
NO
YES
NO`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "N is a power of 2 if N > 0 and (N & (N-1)) == 0.",
                tags: ["math", "bit-manipulation"],
                testCases: [
                        { input: "5\n1\n2\n3\n16\n15", output: "YES\nYES\nNO\nYES\nNO", isSample: true },
                        { input: "1\n4", output: "YES", isSample: false },
                        { input: "1\n8", output: "YES", isSample: false },
                        { input: "1\n1024", output: "YES", isSample: false },
                        { input: "1\n1000", output: "NO", isSample: false },
                        { input: "1\n536870912", output: "YES", isSample: false },
                        { input: "1\n1000000000", output: "NO", isSample: false },
                        { input: "1\n64", output: "YES", isSample: false },
                        { input: "1\n63", output: "NO", isSample: false },
                        { input: "1\n256", output: "YES", isSample: false },
                ],
        },

        // Problem 42: Perfect Square
        {
                title: "Perfect Square",
                slug: "perfect-square",
                difficulty: Difficulty.EASY,
                statement: `Buddy wants to check if a given number N is a perfect square.

A perfect square is an integer that is the square of another integer.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single positive integer N.`,
                outputFormat: `For each test case, output YES if N is a perfect square, NO otherwise.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N ≤ 1000000000`,
                sampleInput: `5
1
4
5
16
17`,
                sampleOutput: `YES
YES
NO
YES
NO`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Take square root of N, round it, and check if its square equals N.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "5\n1\n4\n5\n16\n17", output: "YES\nYES\nNO\nYES\nNO", isSample: true },
                        { input: "1\n9", output: "YES", isSample: false },
                        { input: "1\n100", output: "YES", isSample: false },
                        { input: "1\n101", output: "NO", isSample: false },
                        { input: "1\n1000000000", output: "NO", isSample: false },
                        { input: "1\n1000000", output: "YES", isSample: false },
                        { input: "1\n81", output: "YES", isSample: false },
                        { input: "1\n82", output: "NO", isSample: false },
                        { input: "1\n144", output: "YES", isSample: false },
                        { input: "1\n225", output: "YES", isSample: false },
                ],
        },

        // Problem 43: Armstrong Number
        {
                title: "Armstrong Number",
                slug: "armstrong-number",
                difficulty: Difficulty.EASY,
                statement: `Buddy is learning about Armstrong numbers.

An Armstrong number of n digits is a number where the sum of each digit raised to the power of n equals the number itself.

For example: 153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single positive integer N.`,
                outputFormat: `For each test case, output YES if N is an Armstrong number, NO otherwise.`,
                constraints: `1 ≤ T ≤ 1000
1 ≤ N ≤ 1000000`,
                sampleInput: `5
153
370
9
10
1634`,
                sampleOutput: `YES
YES
YES
NO
YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Count digits, then sum each digit raised to the power of digit count.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "5\n153\n370\n9\n10\n1634", output: "YES\nYES\nYES\nNO\nYES", isSample: true },
                        { input: "1\n1", output: "YES", isSample: false },
                        { input: "1\n2", output: "YES", isSample: false },
                        { input: "1\n371", output: "YES", isSample: false },
                        { input: "1\n407", output: "YES", isSample: false },
                        { input: "1\n100", output: "NO", isSample: false },
                        { input: "1\n8208", output: "YES", isSample: false },
                        { input: "1\n9474", output: "YES", isSample: false },
                        { input: "1\n500", output: "NO", isSample: false },
                        { input: "1\n5", output: "YES", isSample: false },
                ],
        },

        // Problem 44: Buddy's Age
        {
                title: "Buddy's Age",
                slug: "buddys-age",
                difficulty: Difficulty.EASY,
                statement: `Buddy was born in year Y. Given the current year C, find Buddy's age.

If Buddy hasn't been born yet (C < Y), output 0.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains two integers Y (birth year) and C (current year).`,
                outputFormat: `For each test case, output Buddy's age.`,
                constraints: `1 ≤ T ≤ 1000
1900 ≤ Y, C ≤ 2100`,
                sampleInput: `4
2000 2024
1990 2024
2025 2024
2024 2024`,
                sampleOutput: `24
34
0
0`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "If C >= Y, age = C - Y. Otherwise, age = 0.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "4\n2000 2024\n1990 2024\n2025 2024\n2024 2024", output: "24\n34\n0\n0", isSample: true },
                        { input: "1\n1900 2024", output: "124", isSample: false },
                        { input: "1\n2100 2100", output: "0", isSample: false },
                        { input: "1\n1950 2000", output: "50", isSample: false },
                        { input: "1\n2000 2001", output: "1", isSample: false },
                        { input: "1\n1999 2099", output: "100", isSample: false },
                        { input: "1\n2050 2024", output: "0", isSample: false },
                        { input: "1\n1980 2020", output: "40", isSample: false },
                        { input: "1\n2010 2024", output: "14", isSample: false },
                        { input: "1\n1995 2024", output: "29", isSample: false },
                ],
        },

        // Problem 45: Array Sum
        {
                title: "Array Sum",
                slug: "array-sum",
                difficulty: Difficulty.EASY,
                statement: `Buddy has an array of N integers. Find the sum of all elements.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case consists of:
- First line: integer N (size of array)
- Second line: N space-separated integers`,
                outputFormat: `For each test case, output the sum of all elements.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N ≤ 1000
-1000 ≤ each element ≤ 1000`,
                sampleInput: `3
5
1 2 3 4 5
3
-1 0 1
4
100 200 300 400`,
                sampleOutput: `15
0
1000`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Iterate through the array and sum all elements.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "3\n5\n1 2 3 4 5\n3\n-1 0 1\n4\n100 200 300 400", output: "15\n0\n1000", isSample: true },
                        { input: "1\n1\n42", output: "42", isSample: false },
                        { input: "1\n5\n0 0 0 0 0", output: "0", isSample: false },
                        { input: "1\n3\n-1000 -1000 -1000", output: "-3000", isSample: false },
                        { input: "1\n3\n1000 1000 1000", output: "3000", isSample: false },
                        { input: "1\n10\n1 2 3 4 5 6 7 8 9 10", output: "55", isSample: false },
                        { input: "1\n2\n-500 500", output: "0", isSample: false },
                        { input: "1\n4\n25 25 25 25", output: "100", isSample: false },
                        { input: "1\n1\n-1", output: "-1", isSample: false },
                        { input: "1\n6\n10 20 30 40 50 60", output: "210", isSample: false },
                ],
        },

        // Problem 46: Array Product
        {
                title: "Array Product",
                slug: "array-product",
                difficulty: Difficulty.EASY,
                statement: `Buddy has an array of N integers. Find the product of all elements.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case consists of:
- First line: integer N (size of array)
- Second line: N space-separated integers`,
                outputFormat: `For each test case, output the product of all elements.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N ≤ 10
-100 ≤ each element ≤ 100`,
                sampleInput: `3
3
1 2 3
3
-1 2 3
4
2 2 2 2`,
                sampleOutput: `6
-6
16`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Iterate through the array and multiply all elements.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "3\n3\n1 2 3\n3\n-1 2 3\n4\n2 2 2 2", output: "6\n-6\n16", isSample: true },
                        { input: "1\n1\n42", output: "42", isSample: false },
                        { input: "1\n3\n0 100 200", output: "0", isSample: false },
                        { input: "1\n2\n-10 -10", output: "100", isSample: false },
                        { input: "1\n5\n1 1 1 1 1", output: "1", isSample: false },
                        { input: "1\n3\n-1 -1 -1", output: "-1", isSample: false },
                        { input: "1\n4\n5 4 3 2", output: "120", isSample: false },
                        { input: "1\n2\n10 10", output: "100", isSample: false },
                        { input: "1\n3\n-2 3 4", output: "-24", isSample: false },
                        { input: "1\n1\n-50", output: "-50", isSample: false },
                ],
        },

        // Problem 47: Find Minimum Element
        {
                title: "Find Minimum Element",
                slug: "find-minimum-element",
                difficulty: Difficulty.EASY,
                statement: `Buddy has an array of N integers. Find the minimum element.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case consists of:
- First line: integer N (size of array)
- Second line: N space-separated integers`,
                outputFormat: `For each test case, output the minimum element.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N ≤ 1000
-1000000 ≤ each element ≤ 1000000`,
                sampleInput: `3
5
5 3 8 1 9
3
100 200 300
4
-5 -10 -3 -1`,
                sampleOutput: `1
100
-10`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Initialize min with first element, compare with rest.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "3\n5\n5 3 8 1 9\n3\n100 200 300\n4\n-5 -10 -3 -1", output: "1\n100\n-10", isSample: true },
                        { input: "1\n1\n42", output: "42", isSample: false },
                        { input: "1\n5\n1 1 1 1 1", output: "1", isSample: false },
                        { input: "1\n3\n-1000000 0 1000000", output: "-1000000", isSample: false },
                        { input: "1\n5\n5 4 3 2 1", output: "1", isSample: false },
                        { input: "1\n5\n1 2 3 4 5", output: "1", isSample: false },
                        { input: "1\n4\n0 0 0 -1", output: "-1", isSample: false },
                        { input: "1\n3\n999 998 997", output: "997", isSample: false },
                        { input: "1\n2\n50 49", output: "49", isSample: false },
                        { input: "1\n6\n10 20 5 30 40 50", output: "5", isSample: false },
                ],
        },

        // Problem 48: Find Maximum Element
        {
                title: "Find Maximum Element",
                slug: "find-maximum-element",
                difficulty: Difficulty.EASY,
                statement: `Buddy has an array of N integers. Find the maximum element.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case consists of:
- First line: integer N (size of array)
- Second line: N space-separated integers`,
                outputFormat: `For each test case, output the maximum element.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N ≤ 1000
-1000000 ≤ each element ≤ 1000000`,
                sampleInput: `3
5
5 3 8 1 9
3
100 200 300
4
-5 -10 -3 -1`,
                sampleOutput: `9
300
-1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Initialize max with first element, compare with rest.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "3\n5\n5 3 8 1 9\n3\n100 200 300\n4\n-5 -10 -3 -1", output: "9\n300\n-1", isSample: true },
                        { input: "1\n1\n42", output: "42", isSample: false },
                        { input: "1\n5\n1 1 1 1 1", output: "1", isSample: false },
                        { input: "1\n3\n-1000000 0 1000000", output: "1000000", isSample: false },
                        { input: "1\n5\n5 4 3 2 1", output: "5", isSample: false },
                        { input: "1\n5\n1 2 3 4 5", output: "5", isSample: false },
                        { input: "1\n4\n0 0 0 1", output: "1", isSample: false },
                        { input: "1\n3\n997 998 999", output: "999", isSample: false },
                        { input: "1\n2\n49 50", output: "50", isSample: false },
                        { input: "1\n6\n10 20 50 30 40 5", output: "50", isSample: false },
                ],
        },

        // Problem 49: Count Occurrences
        {
                title: "Count Occurrences",
                slug: "count-occurrences",
                difficulty: Difficulty.EASY,
                statement: `Buddy has an array of N integers. Count how many times a given number X appears in the array.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case consists of:
- First line: two integers N (size of array) and X (number to count)
- Second line: N space-separated integers`,
                outputFormat: `For each test case, output the count of X in the array.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N ≤ 1000
-1000 ≤ X ≤ 1000
-1000 ≤ each element ≤ 1000`,
                sampleInput: `3
5 3
1 3 3 4 3
4 5
1 2 3 4
6 0
0 0 1 0 2 0`,
                sampleOutput: `3
0
4`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Iterate through array and count elements equal to X.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "3\n5 3\n1 3 3 4 3\n4 5\n1 2 3 4\n6 0\n0 0 1 0 2 0", output: "3\n0\n4", isSample: true },
                        { input: "1\n1 42\n42", output: "1", isSample: false },
                        { input: "1\n5 1\n1 1 1 1 1", output: "5", isSample: false },
                        { input: "1\n3 10\n1 2 3", output: "0", isSample: false },
                        { input: "1\n4 -5\n-5 -5 5 5", output: "2", isSample: false },
                        { input: "1\n10 7\n7 7 7 7 7 7 7 7 7 7", output: "10", isSample: false },
                        { input: "1\n3 0\n1 2 3", output: "0", isSample: false },
                        { input: "1\n5 100\n100 200 100 300 100", output: "3", isSample: false },
                        { input: "1\n2 1\n1 2", output: "1", isSample: false },
                        { input: "1\n6 5\n1 2 3 4 6 7", output: "0", isSample: false },
                ],
        },

        // Problem 50: Reverse Array
        {
                title: "Reverse Array",
                slug: "reverse-array",
                difficulty: Difficulty.EASY,
                statement: `Buddy has an array of N integers. Reverse the array.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case consists of:
- First line: integer N (size of array)
- Second line: N space-separated integers`,
                outputFormat: `For each test case, output the reversed array as space-separated integers.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N ≤ 1000
-1000 ≤ each element ≤ 1000`,
                sampleInput: `3
5
1 2 3 4 5
3
10 20 30
1
42`,
                sampleOutput: `5 4 3 2 1
30 20 10
42`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Swap elements from both ends moving toward center, or use built-in reverse.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "3\n5\n1 2 3 4 5\n3\n10 20 30\n1\n42", output: "5 4 3 2 1\n30 20 10\n42", isSample: true },
                        { input: "1\n2\n1 2", output: "2 1", isSample: false },
                        { input: "1\n4\n1 1 1 1", output: "1 1 1 1", isSample: false },
                        { input: "1\n5\n-5 -4 -3 -2 -1", output: "-1 -2 -3 -4 -5", isSample: false },
                        { input: "1\n6\n1 2 3 3 2 1", output: "1 2 3 3 2 1", isSample: false },
                        { input: "1\n3\n100 0 -100", output: "-100 0 100", isSample: false },
                        { input: "1\n7\n7 6 5 4 3 2 1", output: "1 2 3 4 5 6 7", isSample: false },
                        { input: "1\n4\n0 0 0 0", output: "0 0 0 0", isSample: false },
                        { input: "1\n2\n999 -999", output: "-999 999", isSample: false },
                        { input: "1\n5\n11 22 33 44 55", output: "55 44 33 22 11", isSample: false },
                ],
        },

        // Problem 51: Second Largest Element
        {
                title: "Second Largest Element",
                slug: "second-largest-element",
                difficulty: Difficulty.EASY,
                statement: `Buddy has an array of N distinct integers. Find the second largest element.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case consists of:
- First line: integer N (size of array)
- Second line: N space-separated distinct integers`,
                outputFormat: `For each test case, output the second largest element.`,
                constraints: `1 ≤ T ≤ 100
2 ≤ N ≤ 1000
-1000000 ≤ each element ≤ 1000000
All elements are distinct`,
                sampleInput: `3
5
5 3 8 1 9
3
100 200 300
4
-5 -10 -3 -1`,
                sampleOutput: `8
200
-3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Track both largest and second largest while iterating.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "3\n5\n5 3 8 1 9\n3\n100 200 300\n4\n-5 -10 -3 -1", output: "8\n200\n-3", isSample: true },
                        { input: "1\n2\n1 2", output: "1", isSample: false },
                        { input: "1\n5\n10 20 30 40 50", output: "40", isSample: false },
                        { input: "1\n3\n-1000000 0 1000000", output: "0", isSample: false },
                        { input: "1\n5\n5 4 3 2 1", output: "4", isSample: false },
                        { input: "1\n4\n1 3 2 4", output: "3", isSample: false },
                        { input: "1\n6\n10 20 5 30 40 50", output: "40", isSample: false },
                        { input: "1\n3\n-1 -2 -3", output: "-2", isSample: false },
                        { input: "1\n2\n100 99", output: "99", isSample: false },
                        { input: "1\n5\n1 5 2 4 3", output: "4", isSample: false },
                ],
        },

        // Problem 52: Binary to Decimal
        {
                title: "Binary to Decimal",
                slug: "binary-to-decimal",
                difficulty: Difficulty.EASY,
                statement: `Buddy wants to convert a binary number to decimal.

Given a binary string, convert it to its decimal equivalent.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a binary string (consisting of only 0s and 1s).`,
                outputFormat: `For each test case, output the decimal equivalent.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ length of binary string ≤ 30`,
                sampleInput: `4
101
1111
10000
1`,
                sampleOutput: `5
15
16
1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Process from right to left, multiply each bit by 2^position and sum.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "4\n101\n1111\n10000\n1", output: "5\n15\n16\n1", isSample: true },
                        { input: "1\n0", output: "0", isSample: false },
                        { input: "1\n11111111", output: "255", isSample: false },
                        { input: "1\n100000000", output: "256", isSample: false },
                        { input: "1\n1010101010", output: "682", isSample: false },
                        { input: "1\n111111111111111111111111111111", output: "1073741823", isSample: false },
                        { input: "1\n10", output: "2", isSample: false },
                        { input: "1\n11", output: "3", isSample: false },
                        { input: "1\n100", output: "4", isSample: false },
                        { input: "1\n1000", output: "8", isSample: false },
                ],
        },

        // Problem 53: Decimal to Binary
        {
                title: "Decimal to Binary",
                slug: "decimal-to-binary",
                difficulty: Difficulty.EASY,
                statement: `Buddy wants to convert a decimal number to binary.

Given a non-negative integer N, convert it to its binary representation.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a non-negative integer N.`,
                outputFormat: `For each test case, output the binary representation (without leading zeros, except for 0 itself).`,
                constraints: `1 ≤ T ≤ 100
0 ≤ N ≤ 1000000000`,
                sampleInput: `5
5
15
16
1
0`,
                sampleOutput: `101
1111
10000
1
0`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Repeatedly divide by 2 and collect remainders, then reverse.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "5\n5\n15\n16\n1\n0", output: "101\n1111\n10000\n1\n0", isSample: true },
                        { input: "1\n255", output: "11111111", isSample: false },
                        { input: "1\n256", output: "100000000", isSample: false },
                        { input: "1\n2", output: "10", isSample: false },
                        { input: "1\n3", output: "11", isSample: false },
                        { input: "1\n4", output: "100", isSample: false },
                        { input: "1\n8", output: "1000", isSample: false },
                        { input: "1\n1024", output: "10000000000", isSample: false },
                        { input: "1\n100", output: "1100100", isSample: false },
                        { input: "1\n999", output: "1111100111", isSample: false },
                ],
        },

        // Problem 54: Perfect Number
        {
                title: "Perfect Number",
                slug: "perfect-number",
                difficulty: Difficulty.EASY,
                statement: `Buddy wants to check if a given number is a perfect number.

A perfect number is a positive integer that equals the sum of its proper divisors (excluding itself).

For example: 6 = 1 + 2 + 3 is a perfect number.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single positive integer N.`,
                outputFormat: `For each test case, output YES if N is a perfect number, NO otherwise.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N ≤ 1000000`,
                sampleInput: `5
6
28
12
1
496`,
                sampleOutput: `YES
YES
NO
NO
YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Sum all proper divisors (1 to N/2 that divide N) and check if sum equals N.",
                tags: ["math", "number-theory"],
                testCases: [
                        { input: "5\n6\n28\n12\n1\n496", output: "YES\nYES\nNO\nNO\nYES", isSample: true },
                        { input: "1\n2", output: "NO", isSample: false },
                        { input: "1\n3", output: "NO", isSample: false },
                        { input: "1\n8128", output: "YES", isSample: false },
                        { input: "1\n100", output: "NO", isSample: false },
                        { input: "1\n500", output: "NO", isSample: false },
                        { input: "1\n10", output: "NO", isSample: false },
                        { input: "1\n4", output: "NO", isSample: false },
                        { input: "1\n5", output: "NO", isSample: false },
                        { input: "1\n27", output: "NO", isSample: false },
                ],
        },

        // Problem 55: Buddy and Stairs
        {
                title: "Buddy and Stairs",
                slug: "buddy-and-stairs",
                difficulty: Difficulty.EASY,
                statement: `Buddy is climbing a staircase with N steps. He can climb either 1 or 2 steps at a time.

How many distinct ways can Buddy climb to the top?`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case contains a single integer N.`,
                outputFormat: `For each test case, output the number of distinct ways to climb N steps.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N ≤ 30`,
                sampleInput: `5
1
2
3
4
5`,
                sampleOutput: `1
2
3
5
8`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "This is the Fibonacci sequence! ways(N) = ways(N-1) + ways(N-2).",
                tags: ["math", "dp"],
                testCases: [
                        { input: "5\n1\n2\n3\n4\n5", output: "1\n2\n3\n5\n8", isSample: true },
                        { input: "1\n6", output: "13", isSample: false },
                        { input: "1\n7", output: "21", isSample: false },
                        { input: "1\n10", output: "89", isSample: false },
                        { input: "1\n15", output: "987", isSample: false },
                        { input: "1\n20", output: "10946", isSample: false },
                        { input: "1\n25", output: "121393", isSample: false },
                        { input: "1\n30", output: "1346269", isSample: false },
                        { input: "1\n8", output: "34", isSample: false },
                        { input: "1\n12", output: "233", isSample: false },
                ],
        },
];

// Export the questions
export default codechefQuestions;
