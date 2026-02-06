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

        // ============== MEDIUM PROBLEMS ==============

        // Problem 56: Longest Increasing Subsequence
        {
                title: "Longest Increasing Subsequence",
                slug: "longest-increasing-subsequence",
                difficulty: Difficulty.MEDIUM,
                statement: `Buddy has an array of N integers. Find the length of the longest strictly increasing subsequence.

A subsequence is a sequence derived from another sequence by deleting some or no elements without changing the order.`,
                inputFormat: `The first line contains T, the number of test cases.
Each test case consists of:
- First line: integer N
- Second line: N space-separated integers`,
                outputFormat: `For each test case, output the length of the longest increasing subsequence.`,
                constraints: `1 ≤ T ≤ 100
1 ≤ N ≤ 1000
1 ≤ each element ≤ 10^9`,
                sampleInput: `2
6
10 22 9 33 21 50
5
5 4 3 2 1`,
                sampleOutput: `4
1`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Use dynamic programming. For O(n²): dp[i] = max(dp[j]+1) where j<i and arr[j]<arr[i]. For O(n log n): use binary search.",
                tags: ["dynamic-programming", "binary-search"],
                testCases: [
                        { input: "2\n6\n10 22 9 33 21 50\n5\n5 4 3 2 1", output: "4\n1", isSample: true },
                        { input: "1\n5\n1 2 3 4 5", output: "5", isSample: false },
                        { input: "1\n5\n3 10 2 1 20", output: "3", isSample: false },
                        { input: "1\n1\n100", output: "1", isSample: false },
                        { input: "1\n8\n0 8 4 12 2 10 6 14", output: "4", isSample: false },
                        { input: "1\n7\n7 7 7 7 7 7 7", output: "1", isSample: false },
                        { input: "1\n6\n1 3 2 4 3 5", output: "4", isSample: false },
                        { input: "1\n4\n10 20 10 30", output: "3", isSample: false },
                        { input: "1\n10\n1 2 3 4 5 6 7 8 9 10", output: "10", isSample: false },
                        { input: "1\n6\n50 40 30 20 10 60", output: "2", isSample: false },
                ],
        },

        // Problem 57: Coin Change
        {
                title: "Coin Change",
                slug: "coin-change",
                difficulty: Difficulty.MEDIUM,
                statement: `Buddy has coins of different denominations and a total amount. Find the minimum number of coins needed to make that amount. If it's not possible, return -1.`,
                inputFormat: `First line: N (number of coin types) and amount
Second line: N coin denominations`,
                outputFormat: `Minimum coins needed, or -1 if impossible.`,
                constraints: `1 ≤ N ≤ 100
1 ≤ amount ≤ 10000
1 ≤ coin value ≤ 10000`,
                sampleInput: `3 11
1 2 5`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use DP: dp[i] = min coins to make amount i. dp[i] = min(dp[i-coin]+1) for all coins.",
                tags: ["dynamic-programming", "greedy"],
                testCases: [
                        { input: "3 11\n1 2 5", output: "3", isSample: true },
                        { input: "2 3\n2 5", output: "-1", isSample: false },
                        { input: "1 0\n1", output: "0", isSample: false },
                        { input: "3 6\n1 3 4", output: "2", isSample: false },
                        { input: "3 100\n1 5 10", output: "10", isSample: false },
                        { input: "4 15\n1 5 10 25", output: "2", isSample: false },
                        { input: "2 7\n3 5", output: "-1", isSample: false },
                        { input: "3 12\n1 5 6", output: "2", isSample: false },
                        { input: "1 5\n2", output: "-1", isSample: false },
                        { input: "3 30\n1 5 10", output: "3", isSample: false },
                ],
        },

        // Problem 58: 0/1 Knapsack
        {
                title: "Buddy's Knapsack",
                slug: "buddys-knapsack",
                difficulty: Difficulty.MEDIUM,
                statement: `Buddy has N items, each with a weight and value. He has a knapsack with capacity W. Find the maximum value he can carry.`,
                inputFormat: `First line: N and W
Next N lines: weight and value of each item`,
                outputFormat: `Maximum value that fits in the knapsack.`,
                constraints: `1 ≤ N ≤ 100
1 ≤ W ≤ 1000
1 ≤ weight, value ≤ 1000`,
                sampleInput: `3 50
10 60
20 100
30 120`,
                sampleOutput: `220`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Classic DP: dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])",
                tags: ["dynamic-programming", "greedy"],
                testCases: [
                        { input: "3 50\n10 60\n20 100\n30 120", output: "220", isSample: true },
                        { input: "4 10\n5 10\n4 40\n6 30\n3 50", output: "90", isSample: false },
                        { input: "1 5\n10 100", output: "0", isSample: false },
                        { input: "2 100\n50 50\n50 50", output: "100", isSample: false },
                        { input: "3 6\n1 1\n2 6\n5 18", output: "18", isSample: false },
                        { input: "4 7\n1 1\n3 4\n4 5\n5 7", output: "9", isSample: false },
                        { input: "2 3\n2 3\n2 4", output: "4", isSample: false },
                        { input: "3 10\n3 4\n4 5\n5 6", output: "11", isSample: false },
                        { input: "1 100\n50 200", output: "200", isSample: false },
                        { input: "5 15\n1 1\n5 5\n10 10\n3 3\n7 7", output: "15", isSample: false },
                ],
        },

        // Problem 59: Two Sum with Target
        {
                title: "Two Sum",
                slug: "two-sum",
                difficulty: Difficulty.MEDIUM,
                statement: `Given an array and a target sum, find two distinct indices such that arr[i] + arr[j] = target. Return the indices (1-indexed).`,
                inputFormat: `First line: N and target
Second line: N integers`,
                outputFormat: `Two space-separated indices, or -1 if not found.`,
                constraints: `2 ≤ N ≤ 10000
-10^9 ≤ elements, target ≤ 10^9`,
                sampleInput: `4 9
2 7 11 15`,
                sampleOutput: `1 2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use a hash map to store seen values and their indices.",
                tags: ["arrays", "hash-table"],
                testCases: [
                        { input: "4 9\n2 7 11 15", output: "1 2", isSample: true },
                        { input: "3 6\n3 2 4", output: "2 3", isSample: false },
                        { input: "2 6\n3 3", output: "1 2", isSample: false },
                        { input: "5 10\n1 2 3 4 5", output: "-1", isSample: false },
                        { input: "4 0\n-1 1 -2 2", output: "1 2", isSample: false },
                        { input: "5 100\n50 25 75 50 100", output: "2 3", isSample: false },
                        { input: "3 8\n4 4 5", output: "1 2", isSample: false },
                        { input: "6 15\n1 2 3 5 10 12", output: "3 5", isSample: false },
                        { input: "4 -5\n-10 5 -3 2", output: "1 2", isSample: false },
                        { input: "5 20\n5 10 15 20 25", output: "1 4", isSample: false },
                ],
        },

        // Problem 60: Merge Two Sorted Arrays
        {
                title: "Merge Sorted Arrays",
                slug: "merge-sorted-arrays",
                difficulty: Difficulty.MEDIUM,
                statement: `Given two sorted arrays, merge them into one sorted array.`,
                inputFormat: `First line: N and M (sizes)
Second line: N sorted integers
Third line: M sorted integers`,
                outputFormat: `The merged sorted array.`,
                constraints: `1 ≤ N, M ≤ 10000
-10^9 ≤ elements ≤ 10^9`,
                sampleInput: `3 3
1 3 5
2 4 6`,
                sampleOutput: `1 2 3 4 5 6`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use two pointers, one for each array. Compare and add smaller element.",
                tags: ["arrays", "sorting"],
                testCases: [
                        { input: "3 3\n1 3 5\n2 4 6", output: "1 2 3 4 5 6", isSample: true },
                        { input: "2 3\n1 2\n3 4 5", output: "1 2 3 4 5", isSample: false },
                        { input: "3 2\n3 4 5\n1 2", output: "1 2 3 4 5", isSample: false },
                        { input: "1 1\n1\n2", output: "1 2", isSample: false },
                        { input: "4 2\n1 1 1 1\n1 1", output: "1 1 1 1 1 1", isSample: false },
                        { input: "3 3\n-5 -3 0\n-4 -2 1", output: "-5 -4 -3 -2 0 1", isSample: false },
                        { input: "5 1\n1 2 3 4 5\n3", output: "1 2 3 3 4 5", isSample: false },
                        { input: "2 4\n10 20\n5 15 25 30", output: "5 10 15 20 25 30", isSample: false },
                        { input: "1 5\n50\n10 20 30 40 60", output: "10 20 30 40 50 60", isSample: false },
                        { input: "3 3\n100 200 300\n150 250 350", output: "100 150 200 250 300 350", isSample: false },
                ],
        },

        // Problem 61: Subarray with Given Sum
        {
                title: "Subarray Sum",
                slug: "subarray-sum",
                difficulty: Difficulty.MEDIUM,
                statement: `Find a contiguous subarray with sum equal to target. Return start and end indices (1-indexed).`,
                inputFormat: `First line: N and target
Second line: N non-negative integers`,
                outputFormat: `Start and end indices, or -1 if not found.`,
                constraints: `1 ≤ N ≤ 10^5
0 ≤ target ≤ 10^9
0 ≤ elements ≤ 10^6`,
                sampleInput: `5 12
1 2 3 7 5`,
                sampleOutput: `2 4`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use sliding window technique for non-negative numbers.",
                tags: ["arrays", "sliding-window"],
                testCases: [
                        { input: "5 12\n1 2 3 7 5", output: "2 4", isSample: true },
                        { input: "10 15\n1 2 3 4 5 6 7 8 9 10", output: "1 5", isSample: false },
                        { input: "5 0\n0 0 0 1 0", output: "1 1", isSample: false },
                        { input: "3 100\n1 2 3", output: "-1", isSample: false },
                        { input: "4 10\n5 5 5 5", output: "1 2", isSample: false },
                        { input: "6 21\n1 2 3 4 5 6", output: "1 6", isSample: false },
                        { input: "5 7\n1 4 0 0 3", output: "2 5", isSample: false },
                        { input: "3 6\n1 2 3", output: "1 3", isSample: false },
                        { input: "4 9\n4 2 3 5", output: "2 4", isSample: false },
                        { input: "1 5\n5", output: "1 1", isSample: false },
                ],
        },

        // Problem 62: Kadane's Algorithm (Max Subarray Sum)
        {
                title: "Maximum Subarray Sum",
                slug: "maximum-subarray-sum",
                difficulty: Difficulty.MEDIUM,
                statement: `Find the contiguous subarray with the largest sum.`,
                inputFormat: `First line: N
Second line: N integers (can be negative)`,
                outputFormat: `The maximum subarray sum.`,
                constraints: `1 ≤ N ≤ 10^5
-10^6 ≤ elements ≤ 10^6`,
                sampleInput: `8
-2 -3 4 -1 -2 1 5 -3`,
                sampleOutput: `7`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Kadane's algorithm: max_ending_here = max(element, max_ending_here + element)",
                tags: ["arrays", "dynamic-programming"],
                testCases: [
                        { input: "8\n-2 -3 4 -1 -2 1 5 -3", output: "7", isSample: true },
                        { input: "5\n1 2 3 4 5", output: "15", isSample: false },
                        { input: "5\n-1 -2 -3 -4 -5", output: "-1", isSample: false },
                        { input: "1\n100", output: "100", isSample: false },
                        { input: "6\n-2 1 -3 4 -1 2", output: "5", isSample: false },
                        { input: "4\n5 -9 6 -2", output: "6", isSample: false },
                        { input: "7\n-1 3 -5 4 6 -1 2", output: "11", isSample: false },
                        { input: "3\n-1 -2 1", output: "1", isSample: false },
                        { input: "5\n0 0 0 0 0", output: "0", isSample: false },
                        { input: "6\n2 -1 2 3 -9 3", output: "6", isSample: false },
                ],
        },

        // Problem 63: Next Greater Element
        {
                title: "Next Greater Element",
                slug: "next-greater-element",
                difficulty: Difficulty.MEDIUM,
                statement: `For each element in the array, find the next greater element to its right. If none exists, output -1.`,
                inputFormat: `First line: N
Second line: N integers`,
                outputFormat: `N space-separated integers (next greater elements).`,
                constraints: `1 ≤ N ≤ 10^5
1 ≤ elements ≤ 10^9`,
                sampleInput: `4
4 5 2 25`,
                sampleOutput: `5 25 25 -1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use a stack. Process from right to left, pop elements smaller than current.",
                tags: ["arrays", "stack"],
                testCases: [
                        { input: "4\n4 5 2 25", output: "5 25 25 -1", isSample: true },
                        { input: "5\n5 4 3 2 1", output: "-1 -1 -1 -1 -1", isSample: false },
                        { input: "5\n1 2 3 4 5", output: "2 3 4 5 -1", isSample: false },
                        { input: "1\n100", output: "-1", isSample: false },
                        { input: "6\n13 7 6 12 8 10", output: "-1 12 12 -1 10 -1", isSample: false },
                        { input: "3\n1 1 1", output: "-1 -1 -1", isSample: false },
                        { input: "4\n6 8 0 1", output: "8 -1 1 -1", isSample: false },
                        { input: "5\n3 2 1 5 4", output: "5 5 5 -1 -1", isSample: false },
                        { input: "4\n10 20 10 20", output: "20 -1 20 -1", isSample: false },
                        { input: "6\n1 3 2 4 3 5", output: "3 4 4 5 5 -1", isSample: false },
                ],
        },

        // Problem 64: Rotate Array
        {
                title: "Rotate Array by K",
                slug: "rotate-array-by-k",
                difficulty: Difficulty.MEDIUM,
                statement: `Rotate array to the right by K steps.`,
                inputFormat: `First line: N and K
Second line: N integers`,
                outputFormat: `The rotated array.`,
                constraints: `1 ≤ N ≤ 10^5
0 ≤ K ≤ 10^9
-10^9 ≤ elements ≤ 10^9`,
                sampleInput: `7 3
1 2 3 4 5 6 7`,
                sampleOutput: `5 6 7 1 2 3 4`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use K = K % N. Reverse entire array, reverse first K, reverse remaining.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "7 3\n1 2 3 4 5 6 7", output: "5 6 7 1 2 3 4", isSample: true },
                        { input: "5 0\n1 2 3 4 5", output: "1 2 3 4 5", isSample: false },
                        { input: "5 5\n1 2 3 4 5", output: "1 2 3 4 5", isSample: false },
                        { input: "4 2\n-1 -100 3 99", output: "3 99 -1 -100", isSample: false },
                        { input: "3 10\n1 2 3", output: "3 1 2", isSample: false },
                        { input: "1 100\n42", output: "42", isSample: false },
                        { input: "6 1\n1 2 3 4 5 6", output: "6 1 2 3 4 5", isSample: false },
                        { input: "5 7\n10 20 30 40 50", output: "40 50 10 20 30", isSample: false },
                        { input: "4 4\n1 2 3 4", output: "1 2 3 4", isSample: false },
                        { input: "8 5\n1 2 3 4 5 6 7 8", output: "4 5 6 7 8 1 2 3", isSample: false },
                ],
        },

        // Problem 65: Valid Parentheses
        {
                title: "Valid Parentheses",
                slug: "valid-parentheses",
                difficulty: Difficulty.MEDIUM,
                statement: `Check if a string containing (){}[] has valid matching parentheses.`,
                inputFormat: `A single string containing only (){}[]`,
                outputFormat: `YES if valid, NO otherwise.`,
                constraints: `1 ≤ length ≤ 10^4`,
                sampleInput: `{[()]}`,
                sampleOutput: `YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use a stack. Push opening brackets, pop and match for closing.",
                tags: ["strings", "stack"],
                testCases: [
                        { input: "{[()]}", output: "YES", isSample: true },
                        { input: "([)]", output: "NO", isSample: false },
                        { input: "()", output: "YES", isSample: false },
                        { input: "((()))", output: "YES", isSample: false },
                        { input: "{{}[]}", output: "YES", isSample: false },
                        { input: "[", output: "NO", isSample: false },
                        { input: "]", output: "NO", isSample: false },
                        { input: "{{{{))))", output: "NO", isSample: false },
                        { input: "()[]{}", output: "YES", isSample: false },
                        { input: "{[}]", output: "NO", isSample: false },
                ],
        },

        // Problem 66: Binary Search
        {
                title: "Binary Search",
                slug: "binary-search",
                difficulty: Difficulty.MEDIUM,
                statement: `Find the index of target in a sorted array using binary search. Return -1 if not found.`,
                inputFormat: `First line: N and target
Second line: N sorted integers`,
                outputFormat: `Index of target (0-indexed), or -1.`,
                constraints: `1 ≤ N ≤ 10^5
-10^9 ≤ elements, target ≤ 10^9`,
                sampleInput: `5 3
1 2 3 4 5`,
                sampleOutput: `2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Compare middle element with target. Go left or right accordingly.",
                tags: ["binary-search", "arrays"],
                testCases: [
                        { input: "5 3\n1 2 3 4 5", output: "2", isSample: true },
                        { input: "5 6\n1 2 3 4 5", output: "-1", isSample: false },
                        { input: "1 1\n1", output: "0", isSample: false },
                        { input: "1 2\n1", output: "-1", isSample: false },
                        { input: "10 1\n1 2 3 4 5 6 7 8 9 10", output: "0", isSample: false },
                        { input: "10 10\n1 2 3 4 5 6 7 8 9 10", output: "9", isSample: false },
                        { input: "6 -5\n-10 -5 0 5 10 15", output: "1", isSample: false },
                        { input: "4 7\n2 4 6 8", output: "-1", isSample: false },
                        { input: "7 50\n10 20 30 40 50 60 70", output: "4", isSample: false },
                        { input: "3 100\n100 200 300", output: "0", isSample: false },
                ],
        },

        // Problem 67: Power Function
        {
                title: "Power Function",
                slug: "power-function",
                difficulty: Difficulty.MEDIUM,
                statement: `Calculate x^n mod (10^9 + 7) efficiently.`,
                inputFormat: `Two integers x and n.`,
                outputFormat: `x^n mod (10^9 + 7).`,
                constraints: `1 ≤ x ≤ 10^9
0 ≤ n ≤ 10^9`,
                sampleInput: `2 10`,
                sampleOutput: `1024`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use binary exponentiation: x^n = (x^(n/2))^2 for even n.",
                tags: ["math", "binary-search"],
                testCases: [
                        { input: "2 10", output: "1024", isSample: true },
                        { input: "2 0", output: "1", isSample: false },
                        { input: "5 3", output: "125", isSample: false },
                        { input: "10 9", output: "1000000000", isSample: false },
                        { input: "2 30", output: "73741817", isSample: false },
                        { input: "3 20", output: "486784380", isSample: false },
                        { input: "7 7", output: "823543", isSample: false },
                        { input: "1 1000000000", output: "1", isSample: false },
                        { input: "2 1", output: "2", isSample: false },
                        { input: "100 2", output: "10000", isSample: false },
                ],
        },

        // Problem 68: Count Inversions
        {
                title: "Count Inversions",
                slug: "count-inversions",
                difficulty: Difficulty.MEDIUM,
                statement: `Count pairs (i,j) where i < j but arr[i] > arr[j].`,
                inputFormat: `First line: N
Second line: N integers`,
                outputFormat: `Number of inversions.`,
                constraints: `1 ≤ N ≤ 10^5
1 ≤ elements ≤ 10^9`,
                sampleInput: `5
2 4 1 3 5`,
                sampleOutput: `3`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Use modified merge sort to count inversions in O(n log n).",
                tags: ["sorting", "arrays"],
                testCases: [
                        { input: "5\n2 4 1 3 5", output: "3", isSample: true },
                        { input: "5\n1 2 3 4 5", output: "0", isSample: false },
                        { input: "5\n5 4 3 2 1", output: "10", isSample: false },
                        { input: "1\n1", output: "0", isSample: false },
                        { input: "3\n3 1 2", output: "2", isSample: false },
                        { input: "4\n4 3 2 1", output: "6", isSample: false },
                        { input: "6\n1 3 5 2 4 6", output: "3", isSample: false },
                        { input: "4\n1 1 1 1", output: "0", isSample: false },
                        { input: "3\n2 1 3", output: "1", isSample: false },
                        { input: "6\n6 5 4 3 2 1", output: "15", isSample: false },
                ],
        },

        // Problem 69: Longest Common Subsequence
        {
                title: "Longest Common Subsequence",
                slug: "longest-common-subsequence",
                difficulty: Difficulty.MEDIUM,
                statement: `Find the length of the longest common subsequence of two strings.`,
                inputFormat: `Two strings on separate lines.`,
                outputFormat: `Length of LCS.`,
                constraints: `1 ≤ |s1|, |s2| ≤ 1000`,
                sampleInput: `abcde
ace`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP: if s1[i]==s2[j], dp[i][j]=dp[i-1][j-1]+1, else max(dp[i-1][j], dp[i][j-1]).",
                tags: ["dynamic-programming", "strings"],
                testCases: [
                        { input: "abcde\nace", output: "3", isSample: true },
                        { input: "abc\ndef", output: "0", isSample: false },
                        { input: "abc\nabc", output: "3", isSample: false },
                        { input: "abcd\nabdc", output: "3", isSample: false },
                        { input: "a\na", output: "1", isSample: false },
                        { input: "aaa\naa", output: "2", isSample: false },
                        { input: "abcdefgh\naceg", output: "4", isSample: false },
                        { input: "xyz\nxyz", output: "3", isSample: false },
                        { input: "abab\nbaba", output: "3", isSample: false },
                        { input: "hello\nworld", output: "1", isSample: false },
                ],
        },

        // Problem 70: Edit Distance
        {
                title: "Edit Distance",
                slug: "edit-distance",
                difficulty: Difficulty.MEDIUM,
                statement: `Find minimum operations (insert, delete, replace) to convert s1 to s2.`,
                inputFormat: `Two strings on separate lines.`,
                outputFormat: `Minimum edit distance.`,
                constraints: `0 ≤ |s1|, |s2| ≤ 500`,
                sampleInput: `horse
ros`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP: dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1] + (s1[i]!=s2[j])).",
                tags: ["dynamic-programming", "strings"],
                testCases: [
                        { input: "horse\nros", output: "3", isSample: true },
                        { input: "intention\nexecution", output: "5", isSample: false },
                        { input: "abc\nabc", output: "0", isSample: false },
                        { input: "abc\n", output: "3", isSample: false },
                        { input: "\nabc", output: "3", isSample: false },
                        { input: "a\nb", output: "1", isSample: false },
                        { input: "kitten\nsitting", output: "3", isSample: false },
                        { input: "saturday\nsunday", output: "3", isSample: false },
                        { input: "ab\nba", output: "2", isSample: false },
                        { input: "aaa\nbbb", output: "3", isSample: false },
                ],
        },

        // Problem 71: Matrix Chain Multiplication
        {
                title: "Matrix Chain Multiplication",
                slug: "matrix-chain-multiplication",
                difficulty: Difficulty.MEDIUM,
                statement: `Find minimum scalar multiplications needed to multiply chain of matrices.`,
                inputFormat: `First line: N (number of matrices)
Second line: N+1 dimensions`,
                outputFormat: `Minimum multiplications.`,
                constraints: `1 ≤ N ≤ 100
1 ≤ dimensions ≤ 500`,
                sampleInput: `4
10 20 30 40 30`,
                sampleOutput: `30000`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "dp[i][j] = min(dp[i][k] + dp[k+1][j] + dims[i-1]*dims[k]*dims[j]) for all k.",
                tags: ["dynamic-programming", "math"],
                testCases: [
                        { input: "4\n10 20 30 40 30", output: "30000", isSample: true },
                        { input: "3\n10 30 5 60", output: "4500", isSample: false },
                        { input: "2\n40 20 30", output: "24000", isSample: false },
                        { input: "1\n10 20", output: "0", isSample: false },
                        { input: "4\n1 2 3 4 3", output: "30", isSample: false },
                        { input: "3\n5 10 20 35", output: "4500", isSample: false },
                        { input: "5\n2 3 4 5 6 7", output: "228", isSample: false },
                        { input: "3\n100 100 100 100", output: "2000000", isSample: false },
                        { input: "4\n5 4 6 2 7", output: "158", isSample: false },
                        { input: "2\n10 10 10", output: "1000", isSample: false },
                ],
        },

        // Problem 72: Jump Game
        {
                title: "Jump Game",
                slug: "jump-game",
                difficulty: Difficulty.MEDIUM,
                statement: `Given array of jump lengths, determine if you can reach the last index starting from index 0.`,
                inputFormat: `First line: N
Second line: N non-negative integers`,
                outputFormat: `YES if reachable, NO otherwise.`,
                constraints: `1 ≤ N ≤ 10^5
0 ≤ elements ≤ 10^5`,
                sampleInput: `5
2 3 1 1 4`,
                sampleOutput: `YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Track maximum reachable index. Update as you iterate.",
                tags: ["greedy", "arrays"],
                testCases: [
                        { input: "5\n2 3 1 1 4", output: "YES", isSample: true },
                        { input: "5\n3 2 1 0 4", output: "NO", isSample: false },
                        { input: "1\n0", output: "YES", isSample: false },
                        { input: "2\n0 1", output: "NO", isSample: false },
                        { input: "3\n2 0 0", output: "YES", isSample: false },
                        { input: "4\n1 1 1 1", output: "YES", isSample: false },
                        { input: "5\n5 0 0 0 0", output: "YES", isSample: false },
                        { input: "6\n1 2 3 0 0 0", output: "YES", isSample: false },
                        { input: "4\n1 0 0 1", output: "NO", isSample: false },
                        { input: "3\n0 2 3", output: "NO", isSample: false },
                ],
        },

        // Problem 73: House Robber
        {
                title: "Buddy's Heist",
                slug: "buddys-heist",
                difficulty: Difficulty.MEDIUM,
                statement: `Buddy plans to rob houses. He cannot rob two adjacent houses. Find maximum money he can rob.`,
                inputFormat: `First line: N
Second line: N values`,
                outputFormat: `Maximum money.`,
                constraints: `1 ≤ N ≤ 10^5
0 ≤ values ≤ 10^4`,
                sampleInput: `4
1 2 3 1`,
                sampleOutput: `4`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "dp[i] = max(dp[i-1], dp[i-2] + arr[i]).",
                tags: ["dynamic-programming", "arrays"],
                testCases: [
                        { input: "4\n1 2 3 1", output: "4", isSample: true },
                        { input: "5\n2 7 9 3 1", output: "12", isSample: false },
                        { input: "1\n100", output: "100", isSample: false },
                        { input: "2\n1 2", output: "2", isSample: false },
                        { input: "3\n5 5 5", output: "10", isSample: false },
                        { input: "6\n1 2 3 4 5 6", output: "12", isSample: false },
                        { input: "5\n10 1 10 1 10", output: "30", isSample: false },
                        { input: "4\n0 0 0 0", output: "0", isSample: false },
                        { input: "3\n100 1 100", output: "200", isSample: false },
                        { input: "7\n1 3 1 3 100 3 1", output: "106", isSample: false },
                ],
        },

        // Problem 74: Longest Palindromic Substring
        {
                title: "Longest Palindromic Substring",
                slug: "longest-palindromic-substring",
                difficulty: Difficulty.MEDIUM,
                statement: `Find the longest palindromic substring in a string.`,
                inputFormat: `A single string.`,
                outputFormat: `Length of longest palindromic substring.`,
                constraints: `1 ≤ |s| ≤ 1000`,
                sampleInput: `babad`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Expand around center for each character and between pairs.",
                tags: ["strings", "dynamic-programming"],
                testCases: [
                        { input: "babad", output: "3", isSample: true },
                        { input: "cbbd", output: "2", isSample: false },
                        { input: "a", output: "1", isSample: false },
                        { input: "ac", output: "1", isSample: false },
                        { input: "racecar", output: "7", isSample: false },
                        { input: "aaa", output: "3", isSample: false },
                        { input: "abcba", output: "5", isSample: false },
                        { input: "abcd", output: "1", isSample: false },
                        { input: "abacdfgdcaba", output: "3", isSample: false },
                        { input: "aaaa", output: "4", isSample: false },
                ],
        },

        // Problem 75: Partition Equal Subset Sum
        {
                title: "Partition Equal Subset",
                slug: "partition-equal-subset",
                difficulty: Difficulty.MEDIUM,
                statement: `Can the array be partitioned into two subsets with equal sum?`,
                inputFormat: `First line: N
Second line: N positive integers`,
                outputFormat: `YES or NO.`,
                constraints: `1 ≤ N ≤ 200
1 ≤ elements ≤ 100`,
                sampleInput: `4
1 5 11 5`,
                sampleOutput: `YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "If sum is odd, NO. Else, find subset with sum = total/2 using DP.",
                tags: ["dynamic-programming", "arrays"],
                testCases: [
                        { input: "4\n1 5 11 5", output: "YES", isSample: true },
                        { input: "3\n1 2 3", output: "YES", isSample: false },
                        { input: "3\n1 2 5", output: "NO", isSample: false },
                        { input: "1\n1", output: "NO", isSample: false },
                        { input: "2\n5 5", output: "YES", isSample: false },
                        { input: "6\n1 2 3 4 5 5", output: "YES", isSample: false },
                        { input: "4\n1 1 1 1", output: "YES", isSample: false },
                        { input: "5\n2 2 2 2 2", output: "NO", isSample: false },
                        { input: "4\n100 100 100 100", output: "YES", isSample: false },
                        { input: "3\n3 3 3", output: "NO", isSample: false },
                ],
        },

        // Problem 76: Word Break
        {
                title: "Word Break",
                slug: "word-break",
                difficulty: Difficulty.MEDIUM,
                statement: `Check if a string can be segmented into dictionary words.`,
                inputFormat: `First line: string s
Second line: N (number of words in dictionary)
Next N lines: dictionary words`,
                outputFormat: `YES or NO.`,
                constraints: `1 ≤ |s| ≤ 300
1 ≤ N ≤ 1000`,
                sampleInput: `leetcode
2
leet
code`,
                sampleOutput: `YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP: dp[i] = true if s[0..i] can be segmented.",
                tags: ["dynamic-programming", "strings"],
                testCases: [
                        { input: "leetcode\n2\nleet\ncode", output: "YES", isSample: true },
                        { input: "applepenapple\n2\napple\npen", output: "YES", isSample: false },
                        { input: "catsandog\n3\ncats\ndog\nand", output: "NO", isSample: false },
                        { input: "a\n1\na", output: "YES", isSample: false },
                        { input: "ab\n2\na\nb", output: "YES", isSample: false },
                        { input: "cars\n2\ncar\nca", output: "NO", isSample: false },
                        { input: "goal\n2\ngo\ngoal", output: "YES", isSample: false },
                        { input: "aaab\n2\na\naa", output: "NO", isSample: false },
                        { input: "bb\n2\na\nb", output: "YES", isSample: false },
                        { input: "abc\n3\na\nb\nc", output: "YES", isSample: false },
                ],
        },

        // Problem 77: Decode Ways
        {
                title: "Decode Ways",
                slug: "decode-ways",
                difficulty: Difficulty.MEDIUM,
                statement: `A message with letters A-Z is encoded to numbers 1-26. Count ways to decode a digit string.`,
                inputFormat: `A string of digits.`,
                outputFormat: `Number of ways to decode.`,
                constraints: `1 ≤ |s| ≤ 100
String contains only digits`,
                sampleInput: `226`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP: consider taking 1 or 2 digits at each step.",
                tags: ["dynamic-programming", "strings"],
                testCases: [
                        { input: "226", output: "3", isSample: true },
                        { input: "12", output: "2", isSample: false },
                        { input: "1", output: "1", isSample: false },
                        { input: "0", output: "0", isSample: false },
                        { input: "10", output: "1", isSample: false },
                        { input: "27", output: "1", isSample: false },
                        { input: "111", output: "3", isSample: false },
                        { input: "101", output: "1", isSample: false },
                        { input: "2101", output: "1", isSample: false },
                        { input: "1234", output: "3", isSample: false },
                ],
        },

        // Problem 78: Number of Islands
        {
                title: "Number of Islands",
                slug: "number-of-islands",
                difficulty: Difficulty.MEDIUM,
                statement: `Count number of islands in a grid. '1' is land, '0' is water. An island is surrounded by water.`,
                inputFormat: `First line: N M (rows, cols)
Next N lines: M characters (0 or 1)`,
                outputFormat: `Number of islands.`,
                constraints: `1 ≤ N, M ≤ 300`,
                sampleInput: `4 5
11110
11010
11000
00000`,
                sampleOutput: `1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use DFS/BFS to mark visited cells when you find land.",
                tags: ["graphs", "arrays"],
                testCases: [
                        { input: "4 5\n11110\n11010\n11000\n00000", output: "1", isSample: true },
                        { input: "4 5\n11000\n11000\n00100\n00011", output: "3", isSample: false },
                        { input: "1 1\n1", output: "1", isSample: false },
                        { input: "1 1\n0", output: "0", isSample: false },
                        { input: "3 3\n101\n010\n101", output: "5", isSample: false },
                        { input: "2 2\n11\n11", output: "1", isSample: false },
                        { input: "3 3\n000\n000\n000", output: "0", isSample: false },
                        { input: "3 3\n111\n111\n111", output: "1", isSample: false },
                        { input: "2 4\n1010\n0101", output: "4", isSample: false },
                        { input: "4 3\n100\n010\n001\n000", output: "3", isSample: false },
                ],
        },

        // Problem 79: Product of Array Except Self
        {
                title: "Product Except Self",
                slug: "product-except-self",
                difficulty: Difficulty.MEDIUM,
                statement: `For each index, compute product of all elements except the element at that index.`,
                inputFormat: `First line: N
Second line: N integers`,
                outputFormat: `N space-separated products.`,
                constraints: `2 ≤ N ≤ 10^5
-30 ≤ elements ≤ 30
Product fits in 32-bit integer`,
                sampleInput: `4
1 2 3 4`,
                sampleOutput: `24 12 8 6`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use prefix and suffix products without division.",
                tags: ["arrays", "math"],
                testCases: [
                        { input: "4\n1 2 3 4", output: "24 12 8 6", isSample: true },
                        { input: "5\n-1 1 0 -3 3", output: "0 0 9 0 0", isSample: false },
                        { input: "2\n1 2", output: "2 1", isSample: false },
                        { input: "3\n2 2 2", output: "4 4 4", isSample: false },
                        { input: "4\n0 0 0 0", output: "0 0 0 0", isSample: false },
                        { input: "3\n1 0 3", output: "0 3 0", isSample: false },
                        { input: "4\n5 4 3 2", output: "24 30 40 60", isSample: false },
                        { input: "5\n1 1 1 1 1", output: "1 1 1 1 1", isSample: false },
                        { input: "3\n-1 -1 -1", output: "1 1 1", isSample: false },
                        { input: "4\n2 -2 3 -3", output: "18 -18 -12 12", isSample: false },
                ],
        },

        // Problem 80: Sort Colors (Dutch National Flag)
        {
                title: "Sort Colors",
                slug: "sort-colors",
                difficulty: Difficulty.MEDIUM,
                statement: `Sort array containing only 0, 1, and 2 in-place in one pass.`,
                inputFormat: `First line: N
Second line: N integers (0, 1, or 2)`,
                outputFormat: `Sorted array.`,
                constraints: `1 ≤ N ≤ 300
Elements are 0, 1, or 2`,
                sampleInput: `6
2 0 2 1 1 0`,
                sampleOutput: `0 0 1 1 2 2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Dutch National Flag algorithm: use three pointers.",
                tags: ["arrays", "sorting"],
                testCases: [
                        { input: "6\n2 0 2 1 1 0", output: "0 0 1 1 2 2", isSample: true },
                        { input: "3\n2 0 1", output: "0 1 2", isSample: false },
                        { input: "1\n0", output: "0", isSample: false },
                        { input: "3\n0 0 0", output: "0 0 0", isSample: false },
                        { input: "3\n2 2 2", output: "2 2 2", isSample: false },
                        { input: "5\n1 1 1 1 1", output: "1 1 1 1 1", isSample: false },
                        { input: "6\n0 1 2 0 1 2", output: "0 0 1 1 2 2", isSample: false },
                        { input: "4\n1 0 2 1", output: "0 1 1 2", isSample: false },
                        { input: "2\n1 0", output: "0 1", isSample: false },
                        { input: "7\n2 1 0 2 1 0 1", output: "0 0 1 1 1 2 2", isSample: false },
                ],
        },

        // Problem 81: Find Peak Element
        {
                title: "Find Peak Element",
                slug: "find-peak-element",
                difficulty: Difficulty.MEDIUM,
                statement: `Find any peak element (greater than neighbors). Return its index.`,
                inputFormat: `First line: N
Second line: N integers`,
                outputFormat: `Index of a peak element (0-indexed).`,
                constraints: `1 ≤ N ≤ 10^5
nums[i] ≠ nums[i+1] for all i`,
                sampleInput: `4
1 2 3 1`,
                sampleOutput: `2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Binary search: if mid < mid+1, peak is on right; else left.",
                tags: ["binary-search", "arrays"],
                testCases: [
                        { input: "4\n1 2 3 1", output: "2", isSample: true },
                        { input: "5\n1 2 1 3 5", output: "4", isSample: false },
                        { input: "1\n1", output: "0", isSample: false },
                        { input: "2\n1 2", output: "1", isSample: false },
                        { input: "2\n2 1", output: "0", isSample: false },
                        { input: "3\n1 3 2", output: "1", isSample: false },
                        { input: "5\n5 4 3 2 1", output: "0", isSample: false },
                        { input: "5\n1 2 3 4 5", output: "4", isSample: false },
                        { input: "6\n1 6 5 4 3 2", output: "1", isSample: false },
                        { input: "4\n1 3 2 4", output: "3", isSample: false },
                ],
        },

        // Problem 82: Search in Rotated Sorted Array
        {
                title: "Search in Rotated Array",
                slug: "search-rotated-array",
                difficulty: Difficulty.MEDIUM,
                statement: `Search for target in a rotated sorted array. Return index or -1.`,
                inputFormat: `First line: N and target
Second line: N distinct integers (rotated sorted)`,
                outputFormat: `Index of target or -1.`,
                constraints: `1 ≤ N ≤ 5000
-10^4 ≤ elements, target ≤ 10^4`,
                sampleInput: `7 0
4 5 6 7 0 1 2`,
                sampleOutput: `4`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Modified binary search. Check which half is sorted.",
                tags: ["binary-search", "arrays"],
                testCases: [
                        { input: "7 0\n4 5 6 7 0 1 2", output: "4", isSample: true },
                        { input: "7 3\n4 5 6 7 0 1 2", output: "-1", isSample: false },
                        { input: "1 0\n1", output: "-1", isSample: false },
                        { input: "1 1\n1", output: "0", isSample: false },
                        { input: "5 4\n3 4 5 1 2", output: "1", isSample: false },
                        { input: "5 1\n3 4 5 1 2", output: "3", isSample: false },
                        { input: "4 2\n2 3 4 1", output: "0", isSample: false },
                        { input: "6 6\n6 7 1 2 3 4", output: "0", isSample: false },
                        { input: "6 4\n6 7 1 2 3 4", output: "5", isSample: false },
                        { input: "3 2\n1 2 3", output: "1", isSample: false },
                ],
        },

        // Problem 83: Container With Most Water
        {
                title: "Container With Most Water",
                slug: "container-most-water",
                difficulty: Difficulty.MEDIUM,
                statement: `Find two lines that form a container holding the most water.`,
                inputFormat: `First line: N
Second line: N heights`,
                outputFormat: `Maximum water area.`,
                constraints: `2 ≤ N ≤ 10^5
0 ≤ heights ≤ 10^4`,
                sampleInput: `9
1 8 6 2 5 4 8 3 7`,
                sampleOutput: `49`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Two pointers from both ends. Move the shorter line inward.",
                tags: ["arrays", "greedy"],
                testCases: [
                        { input: "9\n1 8 6 2 5 4 8 3 7", output: "49", isSample: true },
                        { input: "2\n1 1", output: "1", isSample: false },
                        { input: "3\n4 3 2", output: "4", isSample: false },
                        { input: "4\n1 2 4 3", output: "4", isSample: false },
                        { input: "5\n1 1 1 1 1", output: "4", isSample: false },
                        { input: "6\n2 3 4 5 18 17", output: "17", isSample: false },
                        { input: "4\n1 8 6 2", output: "6", isSample: false },
                        { input: "5\n5 4 3 2 1", output: "6", isSample: false },
                        { input: "3\n1 2 1", output: "2", isSample: false },
                        { input: "6\n10 9 8 7 6 5", output: "25", isSample: false },
                ],
        },

        // Problem 84: 3Sum
        {
                title: "Three Sum",
                slug: "three-sum",
                difficulty: Difficulty.MEDIUM,
                statement: `Find all unique triplets that sum to zero.`,
                inputFormat: `First line: N
Second line: N integers`,
                outputFormat: `Number of unique triplets.`,
                constraints: `3 ≤ N ≤ 3000
-10^5 ≤ elements ≤ 10^5`,
                sampleInput: `6
-1 0 1 2 -1 -4`,
                sampleOutput: `2`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Sort, then use two pointers for each fixed first element.",
                tags: ["arrays", "sorting"],
                testCases: [
                        { input: "6\n-1 0 1 2 -1 -4", output: "2", isSample: true },
                        { input: "3\n0 1 1", output: "0", isSample: false },
                        { input: "3\n0 0 0", output: "1", isSample: false },
                        { input: "4\n-1 0 1 0", output: "1", isSample: false },
                        { input: "6\n-2 0 1 1 2 2", output: "2", isSample: false },
                        { input: "5\n1 2 -2 -1 0", output: "1", isSample: false },
                        { input: "6\n-4 -2 -1 0 1 2", output: "2", isSample: false },
                        { input: "7\n-1 -1 -1 0 1 1 1", output: "1", isSample: false },
                        { input: "4\n1 1 1 1", output: "0", isSample: false },
                        { input: "9\n-4 -2 -2 -2 0 1 2 2 2", output: "3", isSample: false },
                ],
        },

        // Problem 85: Minimum Path Sum
        {
                title: "Minimum Path Sum",
                slug: "minimum-path-sum",
                difficulty: Difficulty.MEDIUM,
                statement: `Find minimum sum path from top-left to bottom-right in a grid (only move right or down).`,
                inputFormat: `First line: N M
Next N lines: M integers`,
                outputFormat: `Minimum path sum.`,
                constraints: `1 ≤ N, M ≤ 200
0 ≤ grid values ≤ 200`,
                sampleInput: `3 3
1 3 1
1 5 1
4 2 1`,
                sampleOutput: `7`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).",
                tags: ["dynamic-programming", "arrays"],
                testCases: [
                        { input: "3 3\n1 3 1\n1 5 1\n4 2 1", output: "7", isSample: true },
                        { input: "2 3\n1 2 3\n4 5 6", output: "12", isSample: false },
                        { input: "1 1\n5", output: "5", isSample: false },
                        { input: "1 3\n1 2 3", output: "6", isSample: false },
                        { input: "3 1\n1\n2\n3", output: "6", isSample: false },
                        { input: "2 2\n1 2\n3 4", output: "7", isSample: false },
                        { input: "3 3\n0 0 0\n0 0 0\n0 0 0", output: "0", isSample: false },
                        { input: "2 2\n1 1\n1 1", output: "3", isSample: false },
                        { input: "4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16", output: "40", isSample: false },
                        { input: "3 2\n1 100\n1 100\n1 1", output: "4", isSample: false },
                ],
        },

        // Problem 86: Unique Paths
        {
                title: "Unique Paths",
                slug: "unique-paths",
                difficulty: Difficulty.MEDIUM,
                statement: `Count unique paths from top-left to bottom-right in an m x n grid (only move right or down).`,
                inputFormat: `Two integers m and n.`,
                outputFormat: `Number of unique paths.`,
                constraints: `1 ≤ m, n ≤ 100`,
                sampleInput: `3 7`,
                sampleOutput: `28`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "dp[i][j] = dp[i-1][j] + dp[i][j-1]. Or use combinations: C(m+n-2, m-1).",
                tags: ["dynamic-programming", "math"],
                testCases: [
                        { input: "3 7", output: "28", isSample: true },
                        { input: "3 2", output: "3", isSample: false },
                        { input: "1 1", output: "1", isSample: false },
                        { input: "1 10", output: "1", isSample: false },
                        { input: "10 1", output: "1", isSample: false },
                        { input: "2 2", output: "2", isSample: false },
                        { input: "4 4", output: "20", isSample: false },
                        { input: "5 5", output: "70", isSample: false },
                        { input: "3 3", output: "6", isSample: false },
                        { input: "10 10", output: "48620", isSample: false },
                ],
        },

        // Problem 87: Spiral Matrix
        {
                title: "Spiral Matrix",
                slug: "spiral-matrix",
                difficulty: Difficulty.MEDIUM,
                statement: `Print elements of a matrix in spiral order.`,
                inputFormat: `First line: N M
Next N lines: M integers`,
                outputFormat: `Elements in spiral order.`,
                constraints: `1 ≤ N, M ≤ 10
-100 ≤ elements ≤ 100`,
                sampleInput: `3 3
1 2 3
4 5 6
7 8 9`,
                sampleOutput: `1 2 3 6 9 8 7 4 5`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Maintain four boundaries and traverse in order: right, down, left, up.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "3 3\n1 2 3\n4 5 6\n7 8 9", output: "1 2 3 6 9 8 7 4 5", isSample: true },
                        { input: "1 4\n1 2 3 4", output: "1 2 3 4", isSample: false },
                        { input: "4 1\n1\n2\n3\n4", output: "1 2 3 4", isSample: false },
                        { input: "1 1\n5", output: "5", isSample: false },
                        { input: "2 2\n1 2\n3 4", output: "1 2 4 3", isSample: false },
                        { input: "2 3\n1 2 3\n4 5 6", output: "1 2 3 6 5 4", isSample: false },
                        { input: "3 2\n1 2\n3 4\n5 6", output: "1 2 4 6 5 3", isSample: false },
                        { input: "4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16", output: "1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10", isSample: false },
                        { input: "2 4\n1 2 3 4\n5 6 7 8", output: "1 2 3 4 8 7 6 5", isSample: false },
                        { input: "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12", output: "1 2 3 4 8 12 11 10 9 5 6 7", isSample: false },
                ],
        },

        // Problem 88: Set Matrix Zeroes
        {
                title: "Set Matrix Zeroes",
                slug: "set-matrix-zeroes",
                difficulty: Difficulty.MEDIUM,
                statement: `If an element is 0, set its entire row and column to 0.`,
                inputFormat: `First line: N M
Next N lines: M integers`,
                outputFormat: `Modified matrix.`,
                constraints: `1 ≤ N, M ≤ 200
-2^31 ≤ elements ≤ 2^31 - 1`,
                sampleInput: `3 3
1 1 1
1 0 1
1 1 1`,
                sampleOutput: `1 0 1
0 0 0
1 0 1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use first row/column as markers to achieve O(1) extra space.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "3 3\n1 1 1\n1 0 1\n1 1 1", output: "1 0 1\n0 0 0\n1 0 1", isSample: true },
                        { input: "3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5", output: "0 0 0 0\n0 4 5 0\n0 3 1 0", isSample: false },
                        { input: "1 1\n0", output: "0", isSample: false },
                        { input: "1 1\n1", output: "1", isSample: false },
                        { input: "2 2\n1 2\n3 4", output: "1 2\n3 4", isSample: false },
                        { input: "2 2\n0 1\n1 1", output: "0 0\n0 1", isSample: false },
                        { input: "3 3\n1 2 3\n4 0 6\n7 8 9", output: "1 0 3\n0 0 0\n7 0 9", isSample: false },
                        { input: "2 3\n1 0 1\n0 1 1", output: "0 0 0\n0 0 0", isSample: false },
                        { input: "3 2\n1 1\n1 0\n1 1", output: "1 0\n0 0\n1 0", isSample: false },
                        { input: "4 4\n1 0 1 1\n1 1 1 1\n1 1 1 1\n1 1 1 0", output: "0 0 0 0\n1 0 1 0\n1 0 1 0\n0 0 0 0", isSample: false },
                ],
        },

        // Problem 89: Group Anagrams
        {
                title: "Group Anagrams",
                slug: "group-anagrams",
                difficulty: Difficulty.MEDIUM,
                statement: `Group strings that are anagrams of each other.`,
                inputFormat: `First line: N
Next N lines: strings`,
                outputFormat: `Number of anagram groups.`,
                constraints: `1 ≤ N ≤ 10^4
0 ≤ string length ≤ 100`,
                sampleInput: `6
eat
tea
tan
ate
nat
bat`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use sorted string as key in a hash map.",
                tags: ["strings", "hash-table"],
                testCases: [
                        { input: "6\neat\ntea\ntan\nate\nnat\nbat", output: "3", isSample: true },
                        { input: "1\na", output: "1", isSample: false },
                        { input: "1\n", output: "1", isSample: false },
                        { input: "3\nabc\ncba\nbac", output: "1", isSample: false },
                        { input: "4\na\nb\nc\nd", output: "4", isSample: false },
                        { input: "2\nab\nba", output: "1", isSample: false },
                        { input: "5\nlisten\nsilent\nenlist\ninlets\ntinsel", output: "1", isSample: false },
                        { input: "4\ncat\ndog\ntac\ngod", output: "2", isSample: false },
                        { input: "3\naa\naa\naa", output: "1", isSample: false },
                        { input: "6\na\nb\na\nb\na\nb", output: "2", isSample: false },
                ],
        },

        // Problem 90: Subsets
        {
                title: "Generate Subsets",
                slug: "generate-subsets",
                difficulty: Difficulty.MEDIUM,
                statement: `Generate all subsets (power set) of a set of distinct integers.`,
                inputFormat: `First line: N
Second line: N distinct integers`,
                outputFormat: `Total number of subsets (2^N).`,
                constraints: `0 ≤ N ≤ 10
-10 ≤ elements ≤ 10`,
                sampleInput: `3
1 2 3`,
                sampleOutput: `8`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use backtracking or bit manipulation. Total subsets = 2^n.",
                tags: ["arrays", "backtracking"],
                testCases: [
                        { input: "3\n1 2 3", output: "8", isSample: true },
                        { input: "0", output: "1", isSample: false },
                        { input: "1\n0", output: "2", isSample: false },
                        { input: "2\n1 2", output: "4", isSample: false },
                        { input: "4\n1 2 3 4", output: "16", isSample: false },
                        { input: "5\n1 2 3 4 5", output: "32", isSample: false },
                        { input: "6\n1 2 3 4 5 6", output: "64", isSample: false },
                        { input: "7\n1 2 3 4 5 6 7", output: "128", isSample: false },
                        { input: "8\n1 2 3 4 5 6 7 8", output: "256", isSample: false },
                        { input: "10\n1 2 3 4 5 6 7 8 9 10", output: "1024", isSample: false },
                ],
        },

        // Problem 91: Permutations
        {
                title: "Generate Permutations",
                slug: "generate-permutations",
                difficulty: Difficulty.MEDIUM,
                statement: `Generate all permutations of distinct integers.`,
                inputFormat: `First line: N
Second line: N distinct integers`,
                outputFormat: `Total number of permutations (N!).`,
                constraints: `1 ≤ N ≤ 8`,
                sampleInput: `3
1 2 3`,
                sampleOutput: `6`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use backtracking. Swap elements and recurse.",
                tags: ["arrays", "backtracking"],
                testCases: [
                        { input: "3\n1 2 3", output: "6", isSample: true },
                        { input: "1\n1", output: "1", isSample: false },
                        { input: "2\n1 2", output: "2", isSample: false },
                        { input: "4\n1 2 3 4", output: "24", isSample: false },
                        { input: "5\n1 2 3 4 5", output: "120", isSample: false },
                        { input: "6\n1 2 3 4 5 6", output: "720", isSample: false },
                        { input: "7\n1 2 3 4 5 6 7", output: "5040", isSample: false },
                        { input: "8\n1 2 3 4 5 6 7 8", output: "40320", isSample: false },
                        { input: "2\n0 1", output: "2", isSample: false },
                        { input: "3\n-1 0 1", output: "6", isSample: false },
                ],
        },

        // Problem 92: Combination Sum
        {
                title: "Combination Sum",
                slug: "combination-sum",
                difficulty: Difficulty.MEDIUM,
                statement: `Find all unique combinations that sum to target. Each number can be used unlimited times.`,
                inputFormat: `First line: N and target
Second line: N distinct positive integers`,
                outputFormat: `Number of unique combinations.`,
                constraints: `1 ≤ N ≤ 30
1 ≤ target ≤ 200
1 ≤ elements ≤ 200`,
                sampleInput: `4 7
2 3 6 7`,
                sampleOutput: `2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use backtracking. For each element, choose to include it or move on.",
                tags: ["arrays", "backtracking"],
                testCases: [
                        { input: "4 7\n2 3 6 7", output: "2", isSample: true },
                        { input: "3 8\n2 3 5", output: "3", isSample: false },
                        { input: "1 1\n2", output: "0", isSample: false },
                        { input: "1 2\n1", output: "1", isSample: false },
                        { input: "2 4\n1 2", output: "3", isSample: false },
                        { input: "3 9\n2 3 4", output: "3", isSample: false },
                        { input: "2 10\n2 5", output: "2", isSample: false },
                        { input: "4 10\n2 3 5 7", output: "5", isSample: false },
                        { input: "1 7\n7", output: "1", isSample: false },
                        { input: "3 12\n2 4 6", output: "4", isSample: false },
                ],
        },

        // Problem 93: Letter Combinations of Phone Number
        {
                title: "Phone Letter Combinations",
                slug: "phone-letter-combinations",
                difficulty: Difficulty.MEDIUM,
                statement: `Given digits 2-9, return all possible letter combinations (like phone keypad).`,
                inputFormat: `A string of digits.`,
                outputFormat: `Number of letter combinations.`,
                constraints: `0 ≤ length ≤ 4
Digits are 2-9`,
                sampleInput: `23`,
                sampleOutput: `9`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Backtracking. Map each digit to its letters and generate combinations.",
                tags: ["strings", "backtracking"],
                testCases: [
                        { input: "23", output: "9", isSample: true },
                        { input: "", output: "0", isSample: false },
                        { input: "2", output: "3", isSample: false },
                        { input: "7", output: "4", isSample: false },
                        { input: "9", output: "4", isSample: false },
                        { input: "234", output: "27", isSample: false },
                        { input: "79", output: "16", isSample: false },
                        { input: "22", output: "9", isSample: false },
                        { input: "2345", output: "108", isSample: false },
                        { input: "7777", output: "256", isSample: false },
                ],
        },

        // Problem 94: Kth Largest Element
        {
                title: "Kth Largest Element",
                slug: "kth-largest-element",
                difficulty: Difficulty.MEDIUM,
                statement: `Find the kth largest element in an unsorted array.`,
                inputFormat: `First line: N and K
Second line: N integers`,
                outputFormat: `The kth largest element.`,
                constraints: `1 ≤ K ≤ N ≤ 10^5
-10^4 ≤ elements ≤ 10^4`,
                sampleInput: `6 2
3 2 1 5 6 4`,
                sampleOutput: `5`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use quickselect for O(n) average, or heap for O(n log k).",
                tags: ["arrays", "sorting"],
                testCases: [
                        { input: "6 2\n3 2 1 5 6 4", output: "5", isSample: true },
                        { input: "9 4\n3 2 3 1 2 4 5 5 6", output: "4", isSample: false },
                        { input: "1 1\n1", output: "1", isSample: false },
                        { input: "5 1\n5 4 3 2 1", output: "5", isSample: false },
                        { input: "5 5\n5 4 3 2 1", output: "1", isSample: false },
                        { input: "4 2\n1 1 1 1", output: "1", isSample: false },
                        { input: "7 3\n7 6 5 4 3 2 1", output: "5", isSample: false },
                        { input: "10 5\n1 2 3 4 5 6 7 8 9 10", output: "6", isSample: false },
                        { input: "5 3\n-1 -2 -3 -4 -5", output: "-3", isSample: false },
                        { input: "6 1\n-10 0 10 -20 20 -30", output: "20", isSample: false },
                ],
        },

        // Problem 95: Merge Intervals
        {
                title: "Merge Intervals",
                slug: "merge-intervals",
                difficulty: Difficulty.MEDIUM,
                statement: `Given intervals, merge all overlapping intervals.`,
                inputFormat: `First line: N
Next N lines: start end of each interval`,
                outputFormat: `Number of merged intervals.`,
                constraints: `1 ≤ N ≤ 10^4
0 ≤ start ≤ end ≤ 10^4`,
                sampleInput: `4
1 3
2 6
8 10
15 18`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Sort by start time. Merge if current start ≤ previous end.",
                tags: ["arrays", "sorting"],
                testCases: [
                        { input: "4\n1 3\n2 6\n8 10\n15 18", output: "3", isSample: true },
                        { input: "2\n1 4\n4 5", output: "1", isSample: false },
                        { input: "1\n1 5", output: "1", isSample: false },
                        { input: "3\n1 2\n3 4\n5 6", output: "3", isSample: false },
                        { input: "3\n1 10\n2 5\n6 8", output: "1", isSample: false },
                        { input: "5\n1 4\n0 4\n2 3\n3 5\n4 6", output: "1", isSample: false },
                        { input: "4\n1 2\n2 3\n3 4\n4 5", output: "1", isSample: false },
                        { input: "2\n1 5\n6 10", output: "2", isSample: false },
                        { input: "3\n0 0\n1 1\n2 2", output: "3", isSample: false },
                        { input: "5\n1 5\n2 3\n4 6\n7 8\n8 9", output: "2", isSample: false },
                ],
        },

        // Problem 96: Top K Frequent Elements
        {
                title: "Top K Frequent Elements",
                slug: "top-k-frequent-elements",
                difficulty: Difficulty.MEDIUM,
                statement: `Find the k most frequent elements in an array.`,
                inputFormat: `First line: N and K
Second line: N integers`,
                outputFormat: `K elements sorted by frequency (highest first).`,
                constraints: `1 ≤ K ≤ number of unique elements ≤ N ≤ 10^5`,
                sampleInput: `6 2
1 1 1 2 2 3`,
                sampleOutput: `1 2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use hash map for frequency, then heap or bucket sort.",
                tags: ["arrays", "hash-table"],
                testCases: [
                        { input: "6 2\n1 1 1 2 2 3", output: "1 2", isSample: true },
                        { input: "1 1\n1", output: "1", isSample: false },
                        { input: "5 2\n1 2 3 4 5", output: "1 2", isSample: false },
                        { input: "7 3\n1 1 2 2 3 3 3", output: "3 1 2", isSample: false },
                        { input: "4 1\n4 4 4 4", output: "4", isSample: false },
                        { input: "8 2\n1 2 1 2 1 2 3 4", output: "1 2", isSample: false },
                        { input: "5 3\n5 5 4 4 3", output: "5 4 3", isSample: false },
                        { input: "6 2\n-1 -1 2 2 3 3", output: "-1 2", isSample: false },
                        { input: "10 1\n1 2 3 4 5 1 2 3 4 1", output: "1", isSample: false },
                        { input: "9 3\n1 1 1 2 2 2 3 3 3", output: "1 2 3", isSample: false },
                ],
        },

        // Problem 97: LRU Cache
        {
                title: "LRU Cache Operations",
                slug: "lru-cache-operations",
                difficulty: Difficulty.MEDIUM,
                statement: `Implement LRU cache with get and put operations. Output results of get operations.`,
                inputFormat: `First line: capacity and Q (queries)
Next Q lines: GET key or PUT key value`,
                outputFormat: `Results of GET operations (-1 if not found).`,
                constraints: `1 ≤ capacity ≤ 3000
1 ≤ Q ≤ 10^4`,
                sampleInput: `2 5
PUT 1 1
PUT 2 2
GET 1
PUT 3 3
GET 2`,
                sampleOutput: `1
-1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use hash map + doubly linked list for O(1) operations.",
                tags: ["implementation", "hash-table"],
                testCases: [
                        { input: "2 5\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2", output: "1\n-1", isSample: true },
                        { input: "1 3\nPUT 1 1\nGET 1\nPUT 2 2", output: "1", isSample: false },
                        { input: "2 4\nGET 1\nPUT 1 1\nGET 1\nGET 2", output: "-1\n1\n-1", isSample: false },
                        { input: "3 6\nPUT 1 1\nPUT 2 2\nPUT 3 3\nGET 1\nGET 2\nGET 3", output: "1\n2\n3", isSample: false },
                        { input: "2 6\nPUT 1 1\nPUT 2 2\nPUT 1 10\nGET 1\nGET 2\nGET 3", output: "10\n2\n-1", isSample: false },
                        { input: "1 4\nPUT 1 1\nPUT 2 2\nGET 1\nGET 2", output: "-1\n2", isSample: false },
                        { input: "3 5\nPUT 1 1\nGET 1\nPUT 2 2\nPUT 3 3\nGET 1", output: "1\n1", isSample: false },
                        { input: "2 3\nPUT 1 5\nPUT 1 10\nGET 1", output: "10", isSample: false },
                        { input: "2 4\nPUT 1 1\nGET 1\nPUT 2 2\nGET 1", output: "1\n1", isSample: false },
                        { input: "3 7\nPUT 1 1\nPUT 2 2\nPUT 3 3\nPUT 4 4\nGET 1\nGET 2\nGET 4", output: "-1\n2\n4", isSample: false },
                ],
        },

        // Problem 98: Trapping Rain Water
        {
                title: "Trapping Rain Water",
                slug: "trapping-rain-water",
                difficulty: Difficulty.MEDIUM,
                statement: `Given elevation map, compute how much water can be trapped after rain.`,
                inputFormat: `First line: N
Second line: N non-negative heights`,
                outputFormat: `Total water trapped.`,
                constraints: `1 ≤ N ≤ 2 × 10^4
0 ≤ heights ≤ 10^5`,
                sampleInput: `12
0 1 0 2 1 0 1 3 2 1 2 1`,
                sampleOutput: `6`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "For each position, water = min(maxLeft, maxRight) - height.",
                tags: ["arrays", "dynamic-programming"],
                testCases: [
                        { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6", isSample: true },
                        { input: "6\n4 2 0 3 2 5", output: "9", isSample: false },
                        { input: "1\n5", output: "0", isSample: false },
                        { input: "2\n1 2", output: "0", isSample: false },
                        { input: "3\n2 0 2", output: "2", isSample: false },
                        { input: "5\n3 0 0 2 0", output: "2", isSample: false },
                        { input: "6\n0 1 2 3 2 1", output: "0", isSample: false },
                        { input: "5\n5 4 3 2 1", output: "0", isSample: false },
                        { input: "5\n1 2 3 2 1", output: "0", isSample: false },
                        { input: "7\n3 0 2 0 4 0 1", output: "8", isSample: false },
                ],
        },

        // Problem 99: Longest Substring Without Repeating
        {
                title: "Longest Substring Without Repeating",
                slug: "longest-substring-no-repeat",
                difficulty: Difficulty.MEDIUM,
                statement: `Find the length of the longest substring without repeating characters.`,
                inputFormat: `A single string.`,
                outputFormat: `Length of longest substring.`,
                constraints: `0 ≤ |s| ≤ 5 × 10^4`,
                sampleInput: `abcabcbb`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Sliding window with hash set to track characters.",
                tags: ["strings", "sliding-window"],
                testCases: [
                        { input: "abcabcbb", output: "3", isSample: true },
                        { input: "bbbbb", output: "1", isSample: false },
                        { input: "pwwkew", output: "3", isSample: false },
                        { input: "", output: "0", isSample: false },
                        { input: "a", output: "1", isSample: false },
                        { input: "abcdef", output: "6", isSample: false },
                        { input: "aab", output: "2", isSample: false },
                        { input: "dvdf", output: "3", isSample: false },
                        { input: "anviaj", output: "5", isSample: false },
                        { input: "tmmzuxt", output: "5", isSample: false },
                ],
        },

        // Problem 100: Minimum Window Substring
        {
                title: "Minimum Window Substring",
                slug: "minimum-window-substring",
                difficulty: Difficulty.MEDIUM,
                statement: `Find minimum window in s containing all characters of t.`,
                inputFormat: `Two strings s and t.`,
                outputFormat: `Length of minimum window, or 0 if not found.`,
                constraints: `1 ≤ |s|, |t| ≤ 10^5`,
                sampleInput: `ADOBECODEBANC
ABC`,
                sampleOutput: `4`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Sliding window with character count. Expand right, shrink left.",
                tags: ["strings", "sliding-window"],
                testCases: [
                        { input: "ADOBECODEBANC\nABC", output: "4", isSample: true },
                        { input: "a\na", output: "1", isSample: false },
                        { input: "a\naa", output: "0", isSample: false },
                        { input: "aa\naa", output: "2", isSample: false },
                        { input: "abc\ncba", output: "3", isSample: false },
                        { input: "aaflslflsldkalskabc\nabc", output: "3", isSample: false },
                        { input: "cabwefgewcwaefgcf\ncae", output: "4", isSample: false },
                        { input: "bba\nab", output: "2", isSample: false },
                        { input: "bdab\nab", output: "2", isSample: false },
                        { input: "abcd\nz", output: "0", isSample: false },
                ],
        },

        // Problem 101: Course Schedule
        {
                title: "Course Schedule",
                slug: "course-schedule",
                difficulty: Difficulty.MEDIUM,
                statement: `Check if all courses can be finished given prerequisites (detect cycle).`,
                inputFormat: `First line: N courses, M prerequisites
Next M lines: course prerequisite pairs`,
                outputFormat: `YES if possible, NO if there's a cycle.`,
                constraints: `1 ≤ N ≤ 2000
0 ≤ M ≤ 5000`,
                sampleInput: `2 1
1 0`,
                sampleOutput: `YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Topological sort using DFS or BFS (Kahn's algorithm).",
                tags: ["graphs", "topological-sort"],
                testCases: [
                        { input: "2 1\n1 0", output: "YES", isSample: true },
                        { input: "2 2\n1 0\n0 1", output: "NO", isSample: false },
                        { input: "1 0", output: "YES", isSample: false },
                        { input: "3 2\n1 0\n2 1", output: "YES", isSample: false },
                        { input: "3 3\n0 1\n1 2\n2 0", output: "NO", isSample: false },
                        { input: "4 4\n1 0\n2 0\n3 1\n3 2", output: "YES", isSample: false },
                        { input: "5 4\n1 0\n2 1\n3 2\n4 3", output: "YES", isSample: false },
                        { input: "4 5\n1 0\n2 1\n3 2\n0 3\n2 0", output: "NO", isSample: false },
                        { input: "20 0", output: "YES", isSample: false },
                        { input: "3 3\n0 1\n0 2\n1 2", output: "YES", isSample: false },
                ],
        },

        // Problem 102: Clone Graph
        {
                title: "Clone Graph Nodes",
                slug: "clone-graph-nodes",
                difficulty: Difficulty.MEDIUM,
                statement: `Given an undirected graph, count the total number of nodes.`,
                inputFormat: `First line: N nodes, M edges
Next M lines: node1 node2 pairs`,
                outputFormat: `Total nodes in graph.`,
                constraints: `0 ≤ N ≤ 100
0 ≤ M ≤ 500`,
                sampleInput: `4 4
1 2
1 4
2 3
3 4`,
                sampleOutput: `4`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use BFS or DFS to traverse and count all nodes.",
                tags: ["graphs", "implementation"],
                testCases: [
                        { input: "4 4\n1 2\n1 4\n2 3\n3 4", output: "4", isSample: true },
                        { input: "1 0", output: "1", isSample: false },
                        { input: "0 0", output: "0", isSample: false },
                        { input: "3 2\n1 2\n2 3", output: "3", isSample: false },
                        { input: "5 5\n1 2\n2 3\n3 4\n4 5\n5 1", output: "5", isSample: false },
                        { input: "6 4\n1 2\n3 4\n5 6\n1 3", output: "6", isSample: false },
                        { input: "2 1\n1 2", output: "2", isSample: false },
                        { input: "10 9\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7\n7 8\n8 9\n9 10", output: "10", isSample: false },
                        { input: "4 6\n1 2\n1 3\n1 4\n2 3\n2 4\n3 4", output: "4", isSample: false },
                        { input: "7 0", output: "7", isSample: false },
                ],
        },

        // Problem 103: Word Ladder Length
        {
                title: "Word Ladder Length",
                slug: "word-ladder-length",
                difficulty: Difficulty.MEDIUM,
                statement: `Find shortest transformation sequence length from begin to end word, changing one letter at a time.`,
                inputFormat: `First line: begin word
Second line: end word
Third line: N (dictionary size)
Next N lines: dictionary words`,
                outputFormat: `Minimum number of words in sequence, or 0 if impossible.`,
                constraints: `1 ≤ word length ≤ 10
1 ≤ N ≤ 5000`,
                sampleInput: `hit
cog
6
hot
dot
dog
lot
log
cog`,
                sampleOutput: `5`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "BFS from start word. Each level changes one character.",
                tags: ["graphs", "strings"],
                testCases: [
                        { input: "hit\ncog\n6\nhot\ndot\ndog\nlot\nlog\ncog", output: "5", isSample: true },
                        { input: "hit\ncog\n5\nhot\ndot\ndog\nlot\nlog", output: "0", isSample: false },
                        { input: "a\nc\n2\na\nc", output: "2", isSample: false },
                        { input: "hot\ndog\n3\nhot\ndog\ndot", output: "3", isSample: false },
                        { input: "cat\ndog\n4\ncot\ncog\ndog\ncat", output: "4", isSample: false },
                        { input: "abc\nabc\n1\nabc", output: "1", isSample: false },
                        { input: "ab\ncd\n0", output: "0", isSample: false },
                        { input: "aa\nbb\n2\nab\nba", output: "0", isSample: false },
                        { input: "leet\ncode\n6\nlest\nleet\nlose\ncode\nlode\nrode", output: "0", isSample: false },
                        { input: "talk\ntale\n5\ntalk\ntalk\nwalk\ntale\ntalk", output: "3", isSample: false },
                ],
        },

        // Problem 104: Find Median from Data Stream
        {
                title: "Running Median",
                slug: "running-median",
                difficulty: Difficulty.MEDIUM,
                statement: `Find median after each insertion in a stream of integers.`,
                inputFormat: `First line: N
Second line: N integers to insert`,
                outputFormat: `Median after all insertions (floor if even count).`,
                constraints: `1 ≤ N ≤ 10^5
-10^5 ≤ elements ≤ 10^5`,
                sampleInput: `5
2 3 4 1 5`,
                sampleOutput: `3`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Use two heaps: max-heap for lower half, min-heap for upper half.",
                tags: ["sorting", "heap"],
                testCases: [
                        { input: "5\n2 3 4 1 5", output: "3", isSample: true },
                        { input: "1\n5", output: "5", isSample: false },
                        { input: "2\n1 2", output: "1", isSample: false },
                        { input: "3\n3 1 2", output: "2", isSample: false },
                        { input: "4\n1 2 3 4", output: "2", isSample: false },
                        { input: "6\n6 5 4 3 2 1", output: "3", isSample: false },
                        { input: "7\n1 2 3 4 5 6 7", output: "4", isSample: false },
                        { input: "5\n5 5 5 5 5", output: "5", isSample: false },
                        { input: "4\n-1 -2 -3 -4", output: "-2", isSample: false },
                        { input: "10\n1 2 3 4 5 6 7 8 9 10", output: "5", isSample: false },
                ],
        },

        // Problem 105: Serialize and Deserialize Binary Tree
        {
                title: "Count Tree Nodes",
                slug: "count-tree-nodes",
                difficulty: Difficulty.MEDIUM,
                statement: `Given a binary tree in preorder with nulls marked as -1, count total non-null nodes.`,
                inputFormat: `Space-separated integers (-1 for null).`,
                outputFormat: `Total nodes.`,
                constraints: `0 ≤ nodes ≤ 10^4`,
                sampleInput: `1 2 -1 -1 3 4 -1 -1 5 -1 -1`,
                sampleOutput: `5`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Count all values that are not -1.",
                tags: ["trees", "implementation"],
                testCases: [
                        { input: "1 2 -1 -1 3 4 -1 -1 5 -1 -1", output: "5", isSample: true },
                        { input: "-1", output: "0", isSample: false },
                        { input: "1 -1 -1", output: "1", isSample: false },
                        { input: "1 2 -1 -1 -1", output: "2", isSample: false },
                        { input: "1 2 3 -1 -1 -1 4 -1 -1", output: "4", isSample: false },
                        { input: "5 3 2 -1 -1 4 -1 -1 7 6 -1 -1 8 -1 -1", output: "7", isSample: false },
                        { input: "1 -1 2 -1 3 -1 -1", output: "3", isSample: false },
                        { input: "10 20 30 -1 -1 40 -1 -1 50 60 -1 -1 70 -1 -1", output: "7", isSample: false },
                        { input: "1 1 1 -1 -1 1 -1 -1 1 1 -1 -1 1 -1 -1", output: "7", isSample: false },
                        { input: "100 -1 -1", output: "1", isSample: false },
                ],
        },

        // ============== HARD PROBLEMS ==============

        // Problem 106: N-Queens
        {
                title: "N-Queens",
                slug: "n-queens",
                difficulty: Difficulty.HARD,
                statement: `Count the number of distinct solutions to place N queens on an N×N chessboard.`,
                inputFormat: `A single integer N.`,
                outputFormat: `Number of solutions.`,
                constraints: `1 ≤ N ≤ 9`,
                sampleInput: `4`,
                sampleOutput: `2`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Use backtracking. Track columns and diagonals attacked.",
                tags: ["backtracking", "arrays"],
                testCases: [
                        { input: "4", output: "2", isSample: true },
                        { input: "1", output: "1", isSample: false },
                        { input: "2", output: "0", isSample: false },
                        { input: "3", output: "0", isSample: false },
                        { input: "5", output: "10", isSample: false },
                        { input: "6", output: "4", isSample: false },
                        { input: "7", output: "40", isSample: false },
                        { input: "8", output: "92", isSample: false },
                        { input: "9", output: "352", isSample: false },
                        { input: "0", output: "1", isSample: false },
                ],
        },

        // Problem 107: Sudoku Solver
        {
                title: "Sudoku Validator",
                slug: "sudoku-validator",
                difficulty: Difficulty.HARD,
                statement: `Check if a partially filled 9x9 Sudoku board is valid.`,
                inputFormat: `9 lines of 9 characters (1-9 or . for empty).`,
                outputFormat: `YES if valid, NO otherwise.`,
                constraints: `Board is 9x9`,
                sampleInput: `53..7....
6..195...
.98....6.
8...6...3
4..8.3..1
7...2...6
.6....28.
...419..5
....8..79`,
                sampleOutput: `YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Check each row, column, and 3x3 box for duplicates.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79", output: "YES", isSample: true },
                        { input: "83..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79", output: "NO", isSample: false },
                        { input: ".........\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n.........", output: "YES", isSample: false },
                        { input: "123456789\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n.........", output: "YES", isSample: false },
                        { input: "11.......\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n.........", output: "NO", isSample: false },
                        { input: "1........\n2........\n3........\n4........\n5........\n6........\n7........\n8........\n9........", output: "YES", isSample: false },
                        { input: "1........\n1........\n.........\n.........\n.........\n.........\n.........\n.........\n.........", output: "NO", isSample: false },
                        { input: "123......\n456......\n789......\n.........\n.........\n.........\n.........\n.........\n.........", output: "YES", isSample: false },
                        { input: "12.......\n.........\n.........\n3........\n.........\n.........\n.........\n.........\n.........", output: "YES", isSample: false },
                        { input: "111......\n.........\n.........\n.........\n.........\n.........\n.........\n.........\n.........", output: "NO", isSample: false },
                ],
        },

        // Problem 108: Regular Expression Matching
        {
                title: "Regex Matching",
                slug: "regex-matching",
                difficulty: Difficulty.HARD,
                statement: `Implement regex matching with '.' (any char) and '*' (zero or more of preceding).`,
                inputFormat: `First line: string s
Second line: pattern p`,
                outputFormat: `YES if matches, NO otherwise.`,
                constraints: `1 ≤ |s|, |p| ≤ 20`,
                sampleInput: `aa
a*`,
                sampleOutput: `YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP: dp[i][j] = does s[0..i] match p[0..j]?",
                tags: ["dynamic-programming", "strings"],
                testCases: [
                        { input: "aa\na*", output: "YES", isSample: true },
                        { input: "aa\na", output: "NO", isSample: false },
                        { input: "ab\n.*", output: "YES", isSample: false },
                        { input: "aab\nc*a*b", output: "YES", isSample: false },
                        { input: "mississippi\nmis*is*p*.", output: "NO", isSample: false },
                        { input: "a\n.", output: "YES", isSample: false },
                        { input: "ab\n..", output: "YES", isSample: false },
                        { input: "aaa\na*a", output: "YES", isSample: false },
                        { input: "a\na*a", output: "YES", isSample: false },
                        { input: "ab\na*b*", output: "YES", isSample: false },
                ],
        },

        // Problem 109: Wildcard Matching
        {
                title: "Wildcard Matching",
                slug: "wildcard-matching",
                difficulty: Difficulty.HARD,
                statement: `Match pattern with '?' (any single char) and '*' (any sequence including empty).`,
                inputFormat: `First line: string s
Second line: pattern p`,
                outputFormat: `YES if matches, NO otherwise.`,
                constraints: `0 ≤ |s|, |p| ≤ 2000`,
                sampleInput: `adceb
*a*b`,
                sampleOutput: `YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP or greedy with backtracking for '*'.",
                tags: ["dynamic-programming", "strings"],
                testCases: [
                        { input: "adceb\n*a*b", output: "YES", isSample: true },
                        { input: "aa\na", output: "NO", isSample: false },
                        { input: "aa\n*", output: "YES", isSample: false },
                        { input: "cb\n?a", output: "NO", isSample: false },
                        { input: "acdcb\na*c?b", output: "NO", isSample: false },
                        { input: "a\n?", output: "YES", isSample: false },
                        { input: "ab\n??", output: "YES", isSample: false },
                        { input: "\n*", output: "YES", isSample: false },
                        { input: "abc\na*c", output: "YES", isSample: false },
                        { input: "abcd\n*?*?*?*?", output: "YES", isSample: false },
                ],
        },

        // Problem 110: Longest Valid Parentheses
        {
                title: "Longest Valid Parentheses",
                slug: "longest-valid-parentheses",
                difficulty: Difficulty.HARD,
                statement: `Find the length of the longest valid (well-formed) parentheses substring.`,
                inputFormat: `A string containing only '(' and ')'.`,
                outputFormat: `Length of longest valid substring.`,
                constraints: `0 ≤ |s| ≤ 3 × 10^4`,
                sampleInput: `(()`,
                sampleOutput: `2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use stack to track indices, or DP where dp[i] = length ending at i.",
                tags: ["dynamic-programming", "stack"],
                testCases: [
                        { input: "(()", output: "2", isSample: true },
                        { input: ")()())", output: "4", isSample: false },
                        { input: "", output: "0", isSample: false },
                        { input: "()", output: "2", isSample: false },
                        { input: "()()", output: "4", isSample: false },
                        { input: "((()))", output: "6", isSample: false },
                        { input: "()(()", output: "2", isSample: false },
                        { input: "()(())", output: "6", isSample: false },
                        { input: "))(((", output: "0", isSample: false },
                        { input: "(()())", output: "6", isSample: false },
                ],
        },

        // Problem 111: Median of Two Sorted Arrays
        {
                title: "Median of Two Sorted Arrays",
                slug: "median-two-sorted-arrays",
                difficulty: Difficulty.HARD,
                statement: `Find median of two sorted arrays of sizes m and n in O(log(m+n)) time.`,
                inputFormat: `First line: m n
Second line: m sorted integers
Third line: n sorted integers`,
                outputFormat: `Median (if even, floor of average).`,
                constraints: `0 ≤ m, n ≤ 1000
m + n ≥ 1`,
                sampleInput: `2 2
1 3
2 4`,
                sampleOutput: `2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Binary search on the smaller array to find the partition.",
                tags: ["binary-search", "arrays"],
                testCases: [
                        { input: "2 2\n1 3\n2 4", output: "2", isSample: true },
                        { input: "2 1\n1 2\n3", output: "2", isSample: false },
                        { input: "0 1\n\n1", output: "1", isSample: false },
                        { input: "1 0\n1\n", output: "1", isSample: false },
                        { input: "3 3\n1 2 3\n4 5 6", output: "3", isSample: false },
                        { input: "5 5\n1 3 5 7 9\n2 4 6 8 10", output: "5", isSample: false },
                        { input: "2 2\n1 2\n3 4", output: "2", isSample: false },
                        { input: "1 1\n1\n2", output: "1", isSample: false },
                        { input: "4 4\n1 2 3 4\n5 6 7 8", output: "4", isSample: false },
                        { input: "3 2\n1 3 5\n2 4", output: "3", isSample: false },
                ],
        },

        // Problem 112: Merge K Sorted Lists
        {
                title: "Merge K Sorted Arrays",
                slug: "merge-k-sorted-arrays",
                difficulty: Difficulty.HARD,
                statement: `Merge k sorted arrays into one sorted array.`,
                inputFormat: `First line: K (number of arrays)
Next K pairs of lines: length and sorted array`,
                outputFormat: `Merged sorted array.`,
                constraints: `1 ≤ K ≤ 10^4
0 ≤ total elements ≤ 10^4`,
                sampleInput: `3
3
1 4 5
3
1 3 4
2
2 6`,
                sampleOutput: `1 1 2 3 4 4 5 6`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Use min-heap with size K, or divide and conquer.",
                tags: ["sorting", "heap"],
                testCases: [
                        { input: "3\n3\n1 4 5\n3\n1 3 4\n2\n2 6", output: "1 1 2 3 4 4 5 6", isSample: true },
                        { input: "1\n3\n1 2 3", output: "1 2 3", isSample: false },
                        { input: "2\n2\n1 3\n2\n2 4", output: "1 2 3 4", isSample: false },
                        { input: "3\n1\n5\n1\n3\n1\n1", output: "1 3 5", isSample: false },
                        { input: "2\n3\n1 1 1\n3\n1 1 1", output: "1 1 1 1 1 1", isSample: false },
                        { input: "4\n1\n1\n1\n2\n1\n3\n1\n4", output: "1 2 3 4", isSample: false },
                        { input: "2\n0\n\n3\n1 2 3", output: "1 2 3", isSample: false },
                        { input: "3\n2\n1 2\n2\n3 4\n2\n5 6", output: "1 2 3 4 5 6", isSample: false },
                        { input: "2\n4\n1 3 5 7\n4\n2 4 6 8", output: "1 2 3 4 5 6 7 8", isSample: false },
                        { input: "1\n5\n10 20 30 40 50", output: "10 20 30 40 50", isSample: false },
                ],
        },

        // Problem 113: Reverse Nodes in K-Group
        {
                title: "Reverse in K-Groups",
                slug: "reverse-k-groups",
                difficulty: Difficulty.HARD,
                statement: `Reverse elements in groups of K. If remaining elements < K, leave them as is.`,
                inputFormat: `First line: N K
Second line: N integers`,
                outputFormat: `Modified array.`,
                constraints: `1 ≤ K ≤ N ≤ 5000`,
                sampleInput: `5 2
1 2 3 4 5`,
                sampleOutput: `2 1 4 3 5`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Reverse each group of K elements, skip last group if < K.",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "5 2\n1 2 3 4 5", output: "2 1 4 3 5", isSample: true },
                        { input: "5 3\n1 2 3 4 5", output: "3 2 1 4 5", isSample: false },
                        { input: "4 4\n1 2 3 4", output: "4 3 2 1", isSample: false },
                        { input: "4 5\n1 2 3 4", output: "1 2 3 4", isSample: false },
                        { input: "6 2\n1 2 3 4 5 6", output: "2 1 4 3 6 5", isSample: false },
                        { input: "6 3\n1 2 3 4 5 6", output: "3 2 1 6 5 4", isSample: false },
                        { input: "1 1\n1", output: "1", isSample: false },
                        { input: "3 1\n1 2 3", output: "1 2 3", isSample: false },
                        { input: "8 3\n1 2 3 4 5 6 7 8", output: "3 2 1 6 5 4 7 8", isSample: false },
                        { input: "10 5\n1 2 3 4 5 6 7 8 9 10", output: "5 4 3 2 1 10 9 8 7 6", isSample: false },
                ],
        },

        // Problem 114: First Missing Positive
        {
                title: "First Missing Positive",
                slug: "first-missing-positive",
                difficulty: Difficulty.HARD,
                statement: `Find the smallest missing positive integer in unsorted array in O(n) time, O(1) space.`,
                inputFormat: `First line: N
Second line: N integers`,
                outputFormat: `Smallest missing positive.`,
                constraints: `1 ≤ N ≤ 10^5
-10^9 ≤ elements ≤ 10^9`,
                sampleInput: `3
1 2 0`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Place each number n at index n-1. Then find first mismatch.",
                tags: ["arrays", "hash-table"],
                testCases: [
                        { input: "3\n1 2 0", output: "3", isSample: true },
                        { input: "4\n3 4 -1 1", output: "2", isSample: false },
                        { input: "3\n7 8 9", output: "1", isSample: false },
                        { input: "1\n1", output: "2", isSample: false },
                        { input: "1\n-1", output: "1", isSample: false },
                        { input: "5\n1 2 3 4 5", output: "6", isSample: false },
                        { input: "5\n5 4 3 2 1", output: "6", isSample: false },
                        { input: "6\n1 1 1 1 1 1", output: "2", isSample: false },
                        { input: "4\n2 3 4 5", output: "1", isSample: false },
                        { input: "3\n0 0 0", output: "1", isSample: false },
                ],
        },

        // Problem 115: Largest Rectangle in Histogram
        {
                title: "Largest Rectangle in Histogram",
                slug: "largest-rectangle-histogram",
                difficulty: Difficulty.HARD,
                statement: `Find the largest rectangular area in a histogram.`,
                inputFormat: `First line: N
Second line: N non-negative heights`,
                outputFormat: `Maximum rectangular area.`,
                constraints: `1 ≤ N ≤ 10^5
0 ≤ heights ≤ 10^4`,
                sampleInput: `6
2 1 5 6 2 3`,
                sampleOutput: `10`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use stack to track increasing heights. Pop when decrease found.",
                tags: ["stack", "arrays"],
                testCases: [
                        { input: "6\n2 1 5 6 2 3", output: "10", isSample: true },
                        { input: "2\n2 4", output: "4", isSample: false },
                        { input: "1\n5", output: "5", isSample: false },
                        { input: "5\n1 1 1 1 1", output: "5", isSample: false },
                        { input: "3\n6 2 5", output: "6", isSample: false },
                        { input: "4\n1 2 3 4", output: "6", isSample: false },
                        { input: "4\n4 3 2 1", output: "6", isSample: false },
                        { input: "5\n2 4 6 4 2", output: "12", isSample: false },
                        { input: "6\n1 2 3 4 5 6", output: "12", isSample: false },
                        { input: "7\n3 3 3 3 3 3 3", output: "21", isSample: false },
                ],
        },

        // Problem 116: Maximal Rectangle
        {
                title: "Maximal Rectangle in Matrix",
                slug: "maximal-rectangle-matrix",
                difficulty: Difficulty.HARD,
                statement: `Find the largest rectangle containing only 1s in a binary matrix.`,
                inputFormat: `First line: N M
Next N lines: M characters (0 or 1)`,
                outputFormat: `Maximum rectangle area.`,
                constraints: `1 ≤ N, M ≤ 200`,
                sampleInput: `4 5
10100
10111
11111
10010`,
                sampleOutput: `6`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Build histogram for each row, apply largest rectangle in histogram.",
                tags: ["stack", "dynamic-programming"],
                testCases: [
                        { input: "4 5\n10100\n10111\n11111\n10010", output: "6", isSample: true },
                        { input: "1 1\n0", output: "0", isSample: false },
                        { input: "1 1\n1", output: "1", isSample: false },
                        { input: "2 2\n11\n11", output: "4", isSample: false },
                        { input: "3 3\n111\n111\n111", output: "9", isSample: false },
                        { input: "3 3\n101\n111\n101", output: "3", isSample: false },
                        { input: "2 3\n011\n111", output: "4", isSample: false },
                        { input: "4 4\n1111\n1111\n1111\n1111", output: "16", isSample: false },
                        { input: "3 4\n0110\n0110\n0110", output: "6", isSample: false },
                        { input: "2 5\n11111\n11111", output: "10", isSample: false },
                ],
        },

        // Problem 117: Word Search II (Trie + Backtracking)
        {
                title: "Word Search Count",
                slug: "word-search-count",
                difficulty: Difficulty.HARD,
                statement: `Count how many words from dictionary can be found in the grid using adjacent cells.`,
                inputFormat: `First line: N M K
Next N lines: M characters (grid)
Next K lines: words to find`,
                outputFormat: `Number of words found.`,
                constraints: `1 ≤ N, M ≤ 12
1 ≤ K ≤ 3 × 10^4`,
                sampleInput: `3 4 3
oaan
etae
ihkr
eat
oath
rain`,
                sampleOutput: `2`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Build Trie with words, DFS from each cell with Trie navigation.",
                tags: ["backtracking", "trees"],
                testCases: [
                        { input: "3 4 3\noaan\netae\nihkr\neat\noath\nrain", output: "2", isSample: true },
                        { input: "2 2 2\nab\ncd\nabcd\nab", output: "1", isSample: false },
                        { input: "1 1 1\na\na", output: "1", isSample: false },
                        { input: "1 1 1\na\nb", output: "0", isSample: false },
                        { input: "2 2 4\naa\naa\na\naa\naaa\naaaa", output: "4", isSample: false },
                        { input: "3 3 2\nabc\ndef\nghi\nabc\nghi", output: "2", isSample: false },
                        { input: "2 3 3\ncat\ndog\ncat\ntac\nact", output: "2", isSample: false },
                        { input: "3 3 3\nxyy\nyxx\nxyx\nxyx\nyxy\nxxy", output: "2", isSample: false },
                        { input: "2 2 1\nab\nba\nabba", output: "1", isSample: false },
                        { input: "4 4 2\ntest\nest!\nstar\ntart\ntest\nstar", output: "2", isSample: false },
                ],
        },

        // Problem 118: Palindrome Pairs
        {
                title: "Palindrome Pair Count",
                slug: "palindrome-pair-count",
                difficulty: Difficulty.HARD,
                statement: `Count pairs (i, j) where words[i] + words[j] forms a palindrome.`,
                inputFormat: `First line: N
Next N lines: words`,
                outputFormat: `Number of palindrome pairs.`,
                constraints: `1 ≤ N ≤ 5000
0 ≤ word length ≤ 300`,
                sampleInput: `3
abcd
dcba
lls`,
                sampleOutput: `2`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Use hash map with reversed words. Check for palindrome prefixes/suffixes.",
                tags: ["strings", "hash-table"],
                testCases: [
                        { input: "3\nabcd\ndcba\nlls", output: "2", isSample: true },
                        { input: "3\nbat\ntab\ncat", output: "2", isSample: false },
                        { input: "2\na\n", output: "2", isSample: false },
                        { input: "2\nab\nba", output: "2", isSample: false },
                        { input: "4\na\nb\nc\nd", output: "0", isSample: false },
                        { input: "2\naa\naa", output: "2", isSample: false },
                        { input: "3\n\na\na", output: "4", isSample: false },
                        { input: "4\nabc\ncba\nab\nba", output: "4", isSample: false },
                        { input: "2\nrace\ncar", output: "0", isSample: false },
                        { input: "5\na\nb\nab\nba\naba", output: "8", isSample: false },
                ],
        },

        // Problem 119: Skyline Problem
        {
                title: "Skyline Points",
                slug: "skyline-points",
                difficulty: Difficulty.HARD,
                statement: `Count the number of key points in the skyline formed by buildings.`,
                inputFormat: `First line: N
Next N lines: left right height of each building`,
                outputFormat: `Number of key points in skyline.`,
                constraints: `1 ≤ N ≤ 10^4
0 ≤ coordinates ≤ 2^31 - 1`,
                sampleInput: `5
2 9 10
3 7 15
5 12 12
15 20 10
19 24 8`,
                sampleOutput: `7`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Use events (start/end) with max-heap for current heights.",
                tags: ["sorting", "heap"],
                testCases: [
                        { input: "5\n2 9 10\n3 7 15\n5 12 12\n15 20 10\n19 24 8", output: "7", isSample: true },
                        { input: "1\n0 2 3", output: "2", isSample: false },
                        { input: "2\n0 2 3\n2 5 3", output: "2", isSample: false },
                        { input: "2\n0 5 3\n2 7 3", output: "2", isSample: false },
                        { input: "2\n0 3 5\n1 2 3", output: "2", isSample: false },
                        { input: "3\n0 5 10\n0 5 10\n0 5 10", output: "2", isSample: false },
                        { input: "3\n0 2 5\n3 5 5\n6 8 5", output: "6", isSample: false },
                        { input: "2\n0 10 5\n2 8 7", output: "4", isSample: false },
                        { input: "4\n0 2 3\n1 3 4\n2 4 5\n3 5 6", output: "5", isSample: false },
                        { input: "1\n0 100 50", output: "2", isSample: false },
                ],
        },

        // Problem 120: Burst Balloons
        {
                title: "Burst Balloons",
                slug: "burst-balloons",
                difficulty: Difficulty.HARD,
                statement: `Burst balloons [nums] wisely to get max coins. When burst balloon i, get nums[i-1]*nums[i]*nums[i+1] coins.`,
                inputFormat: `First line: N
Second line: N values`,
                outputFormat: `Maximum coins.`,
                constraints: `1 ≤ N ≤ 500
0 ≤ nums ≤ 100`,
                sampleInput: `4
3 1 5 8`,
                sampleOutput: `167`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP: dp[i][j] = max coins to burst all balloons between i and j.",
                tags: ["dynamic-programming", "arrays"],
                testCases: [
                        { input: "4\n3 1 5 8", output: "167", isSample: true },
                        { input: "2\n1 5", output: "10", isSample: false },
                        { input: "1\n5", output: "5", isSample: false },
                        { input: "3\n1 2 3", output: "12", isSample: false },
                        { input: "3\n3 2 1", output: "12", isSample: false },
                        { input: "4\n1 1 1 1", output: "4", isSample: false },
                        { input: "2\n10 10", output: "200", isSample: false },
                        { input: "5\n1 2 3 4 5", output: "110", isSample: false },
                        { input: "3\n9 1 9", output: "162", isSample: false },
                        { input: "4\n5 5 5 5", output: "375", isSample: false },
                ],
        },

        // Problem 121: Alien Dictionary
        {
                title: "Alien Dictionary Order",
                slug: "alien-dictionary-order",
                difficulty: Difficulty.HARD,
                statement: `Given sorted words in alien language, determine if valid order exists. Return 1 if valid, 0 otherwise.`,
                inputFormat: `First line: N
Next N lines: words in sorted order`,
                outputFormat: `1 if valid order exists, 0 otherwise.`,
                constraints: `1 ≤ N ≤ 100
1 ≤ word length ≤ 100`,
                sampleInput: `3
wrt
wrf
er`,
                sampleOutput: `1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Build graph from adjacent word comparisons. Topological sort.",
                tags: ["graphs", "topological-sort"],
                testCases: [
                        { input: "3\nwrt\nwrf\ner", output: "1", isSample: true },
                        { input: "2\nz\nx", output: "1", isSample: false },
                        { input: "2\nz\nz", output: "1", isSample: false },
                        { input: "3\na\nb\na", output: "0", isSample: false },
                        { input: "2\nabc\nab", output: "0", isSample: false },
                        { input: "1\nabc", output: "1", isSample: false },
                        { input: "4\na\nb\nc\nd", output: "1", isSample: false },
                        { input: "3\nab\nabc\nabcd", output: "1", isSample: false },
                        { input: "3\nabc\nab\na", output: "0", isSample: false },
                        { input: "5\nac\nab\nzc\nzb\nchd", output: "1", isSample: false },
                ],
        },

        // Problem 122: Minimum Window Subsequence
        {
                title: "Minimum Window Subsequence Length",
                slug: "min-window-subsequence-length",
                difficulty: Difficulty.HARD,
                statement: `Find length of minimum window in s1 that contains s2 as subsequence.`,
                inputFormat: `Two strings s1 and s2.`,
                outputFormat: `Minimum window length, or 0 if not found.`,
                constraints: `1 ≤ |s1|, |s2| ≤ 2 × 10^4`,
                sampleInput: `abcdebdde
bde`,
                sampleOutput: `4`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP or two-pointer: find s2 as subsequence, then shrink window.",
                tags: ["dynamic-programming", "strings"],
                testCases: [
                        { input: "abcdebdde\nbde", output: "4", isSample: true },
                        { input: "jmeqksfrsdcmsiwvaovztaqenprpvnbstl\nu", output: "0", isSample: false },
                        { input: "a\na", output: "1", isSample: false },
                        { input: "ab\nb", output: "1", isSample: false },
                        { input: "abc\nac", output: "3", isSample: false },
                        { input: "abcde\nace", output: "5", isSample: false },
                        { input: "aaaa\naa", output: "2", isSample: false },
                        { input: "axxbxxcxx\nabc", output: "9", isSample: false },
                        { input: "xyz\nxyz", output: "3", isSample: false },
                        { input: "fgrqsqsnodwmxzkzxwqegkndaa\nkzed", output: "11", isSample: false },
                ],
        },

        // Problem 123: Sliding Window Maximum
        {
                title: "Sliding Window Maximum",
                slug: "sliding-window-maximum",
                difficulty: Difficulty.HARD,
                statement: `Find max in each sliding window of size k.`,
                inputFormat: `First line: N K
Second line: N integers`,
                outputFormat: `Space-separated maximums.`,
                constraints: `1 ≤ K ≤ N ≤ 10^5`,
                sampleInput: `8 3
1 3 -1 -3 5 3 6 7`,
                sampleOutput: `3 3 5 5 6 7`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use deque to maintain decreasing order of elements in window.",
                tags: ["arrays", "sliding-window"],
                testCases: [
                        { input: "8 3\n1 3 -1 -3 5 3 6 7", output: "3 3 5 5 6 7", isSample: true },
                        { input: "1 1\n1", output: "1", isSample: false },
                        { input: "2 1\n1 2", output: "1 2", isSample: false },
                        { input: "3 3\n1 2 3", output: "3", isSample: false },
                        { input: "5 2\n5 4 3 2 1", output: "5 4 3 2", isSample: false },
                        { input: "5 2\n1 2 3 4 5", output: "2 3 4 5", isSample: false },
                        { input: "6 3\n7 2 4 1 3 5", output: "7 4 4 5", isSample: false },
                        { input: "4 2\n1 1 1 1", output: "1 1 1", isSample: false },
                        { input: "5 5\n1 3 5 7 9", output: "9", isSample: false },
                        { input: "7 4\n8 5 10 7 9 4 15", output: "10 10 10 15", isSample: false },
                ],
        },

        // Problem 124: Minimum Cost to Merge Stones
        {
                title: "Minimum Cost Merge Stones",
                slug: "min-cost-merge-stones",
                difficulty: Difficulty.HARD,
                statement: `Merge K consecutive piles until one pile. Cost = sum of merged stones. Return min cost or -1 if impossible.`,
                inputFormat: `First line: N K
Second line: N stones per pile`,
                outputFormat: `Minimum cost or -1.`,
                constraints: `1 ≤ N ≤ 30
2 ≤ K ≤ 30`,
                sampleInput: `5 3
3 2 4 1 5`,
                sampleOutput: `25`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP with interval: check if (n-1) % (k-1) == 0 first.",
                tags: ["dynamic-programming", "arrays"],
                testCases: [
                        { input: "5 3\n3 2 4 1 5", output: "25", isSample: true },
                        { input: "3 2\n1 2 3", output: "9", isSample: false },
                        { input: "4 3\n1 1 1 1", output: "-1", isSample: false },
                        { input: "5 2\n1 1 1 1 1", output: "12", isSample: false },
                        { input: "4 2\n3 5 1 2", output: "22", isSample: false },
                        { input: "3 3\n1 2 3", output: "6", isSample: false },
                        { input: "7 3\n1 1 1 1 1 1 1", output: "15", isSample: false },
                        { input: "2 2\n1 1", output: "2", isSample: false },
                        { input: "1 2\n5", output: "0", isSample: false },
                        { input: "6 2\n1 2 3 4 5 6", output: "51", isSample: false },
                ],
        },

        // Problem 125: Count of Smaller Numbers After Self
        {
                title: "Count Smaller After",
                slug: "count-smaller-after",
                difficulty: Difficulty.HARD,
                statement: `For each element, count elements to its right that are smaller.`,
                inputFormat: `First line: N
Second line: N integers`,
                outputFormat: `Space-separated counts.`,
                constraints: `1 ≤ N ≤ 10^5
-10^4 ≤ elements ≤ 10^4`,
                sampleInput: `4
5 2 6 1`,
                sampleOutput: `2 1 1 0`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Use merge sort with index tracking, or BST/BIT.",
                tags: ["sorting", "binary-search"],
                testCases: [
                        { input: "4\n5 2 6 1", output: "2 1 1 0", isSample: true },
                        { input: "1\n-1", output: "0", isSample: false },
                        { input: "2\n-1 -1", output: "0 0", isSample: false },
                        { input: "5\n1 2 3 4 5", output: "0 0 0 0 0", isSample: false },
                        { input: "5\n5 4 3 2 1", output: "4 3 2 1 0", isSample: false },
                        { input: "6\n26 78 27 100 33 67", output: "1 2 0 2 0 0", isSample: false },
                        { input: "3\n2 2 2", output: "0 0 0", isSample: false },
                        { input: "4\n1 6 3 4", output: "0 2 0 0", isSample: false },
                        { input: "7\n7 6 5 4 3 2 1", output: "6 5 4 3 2 1 0", isSample: false },
                        { input: "5\n3 1 2 5 4", output: "2 0 0 1 0", isSample: false },
                ],
        },

        // Problem 126: Dungeon Game
        {
                title: "Dungeon Game",
                slug: "dungeon-game",
                difficulty: Difficulty.HARD,
                statement: `Find min initial health to reach bottom-right from top-left. Each cell adds/subtracts health. Health must always be > 0.`,
                inputFormat: `First line: N M
Next N lines: M integers (negative = damage)`,
                outputFormat: `Minimum initial health.`,
                constraints: `1 ≤ N, M ≤ 200
-1000 ≤ cell value ≤ 1000`,
                sampleInput: `3 3
-2 -3 3
-5 -10 1
10 30 -5`,
                sampleOutput: `7`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP from bottom-right. dp[i][j] = min health needed at (i,j).",
                tags: ["dynamic-programming", "arrays"],
                testCases: [
                        { input: "3 3\n-2 -3 3\n-5 -10 1\n10 30 -5", output: "7", isSample: true },
                        { input: "1 1\n0", output: "1", isSample: false },
                        { input: "1 1\n-5", output: "6", isSample: false },
                        { input: "1 1\n5", output: "1", isSample: false },
                        { input: "2 2\n-1 -1\n-1 -1", output: "4", isSample: false },
                        { input: "2 2\n1 1\n1 1", output: "1", isSample: false },
                        { input: "1 3\n-1 -2 -3", output: "7", isSample: false },
                        { input: "3 1\n-1\n-2\n-3", output: "7", isSample: false },
                        { input: "2 3\n1 -3 3\n0 -2 0", output: "3", isSample: false },
                        { input: "3 3\n0 0 0\n0 0 0\n0 0 0", output: "1", isSample: false },
                ],
        },

        // Problem 127: Expression Add Operators
        {
                title: "Expression Add Operators Count",
                slug: "expression-add-operators-count",
                difficulty: Difficulty.HARD,
                statement: `Count ways to insert +, -, * between digits to make expression equal target.`,
                inputFormat: `First line: digit string
Second line: target value`,
                outputFormat: `Number of valid expressions.`,
                constraints: `1 ≤ |digits| ≤ 10
-2^31 ≤ target ≤ 2^31 - 1`,
                sampleInput: `123
6`,
                sampleOutput: `2`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Backtracking with careful handling of * operator precedence.",
                tags: ["backtracking", "strings"],
                testCases: [
                        { input: "123\n6", output: "2", isSample: true },
                        { input: "232\n8", output: "2", isSample: false },
                        { input: "105\n5", output: "2", isSample: false },
                        { input: "00\n0", output: "3", isSample: false },
                        { input: "3456237490\n9191", output: "0", isSample: false },
                        { input: "1\n1", output: "1", isSample: false },
                        { input: "12\n3", output: "1", isSample: false },
                        { input: "123\n123", output: "1", isSample: false },
                        { input: "111\n3", output: "1", isSample: false },
                        { input: "2222\n8", output: "9", isSample: false },
                ],
        },

        // Problem 128: Candy Distribution
        {
                title: "Candy Distribution",
                slug: "candy-distribution",
                difficulty: Difficulty.HARD,
                statement: `Distribute candies to children. Each child must have at least 1. Child with higher rating than neighbor gets more candies. Find minimum total.`,
                inputFormat: `First line: N
Second line: N ratings`,
                outputFormat: `Minimum candies.`,
                constraints: `1 ≤ N ≤ 2 × 10^4`,
                sampleInput: `3
1 0 2`,
                sampleOutput: `5`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Two passes: left-to-right, then right-to-left.",
                tags: ["greedy", "arrays"],
                testCases: [
                        { input: "3\n1 0 2", output: "5", isSample: true },
                        { input: "3\n1 2 2", output: "4", isSample: false },
                        { input: "1\n1", output: "1", isSample: false },
                        { input: "2\n1 2", output: "3", isSample: false },
                        { input: "2\n2 1", output: "3", isSample: false },
                        { input: "5\n1 2 3 4 5", output: "15", isSample: false },
                        { input: "5\n5 4 3 2 1", output: "15", isSample: false },
                        { input: "4\n1 2 2 1", output: "6", isSample: false },
                        { input: "5\n1 3 2 2 1", output: "7", isSample: false },
                        { input: "6\n1 1 1 1 1 1", output: "6", isSample: false },
                ],
        },

        // Problem 129: Binary Tree Maximum Path Sum
        {
                title: "Max Path Sum in Tree",
                slug: "max-path-sum-tree",
                difficulty: Difficulty.HARD,
                statement: `Find maximum path sum in binary tree. Path can start and end at any node.`,
                inputFormat: `Preorder traversal with -1001 as null marker.`,
                outputFormat: `Maximum path sum.`,
                constraints: `1 ≤ nodes ≤ 3 × 10^4
-1000 ≤ node value ≤ 1000`,
                sampleInput: `-10 9 -1001 -1001 20 15 -1001 -1001 7 -1001 -1001`,
                sampleOutput: `42`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "At each node: max(left, 0) + val + max(right, 0). Return max to extend path.",
                tags: ["trees", "dynamic-programming"],
                testCases: [
                        { input: "-10 9 -1001 -1001 20 15 -1001 -1001 7 -1001 -1001", output: "42", isSample: true },
                        { input: "1 2 -1001 -1001 3 -1001 -1001", output: "6", isSample: false },
                        { input: "-3 -1001 -1001", output: "-3", isSample: false },
                        { input: "1 -1001 -1001", output: "1", isSample: false },
                        { input: "2 -1 -1001 -1001 -1001", output: "2", isSample: false },
                        { input: "5 4 3 -1001 -1001 -1001 6 7 -1001 -1001 -1001", output: "22", isSample: false },
                        { input: "1 -2 -1001 -1001 -2 -1001 -1001", output: "1", isSample: false },
                        { input: "10 -1001 -1001", output: "10", isSample: false },
                        { input: "5 3 2 -1001 -1001 1 -1001 -1001 4 6 -1001 -1001 8 -1001 -1001", output: "26", isSample: false },
                        { input: "-1 -2 -1001 -1001 -3 -1001 -1001", output: "-1", isSample: false },
                ],
        },

        // Problem 130: Distinct Subsequences
        {
                title: "Distinct Subsequences",
                slug: "distinct-subsequences",
                difficulty: Difficulty.HARD,
                statement: `Count distinct subsequences of s that equal t.`,
                inputFormat: `Two strings s and t.`,
                outputFormat: `Number of distinct subsequences.`,
                constraints: `1 ≤ |s|, |t| ≤ 1000`,
                sampleInput: `rabbbit
rabbit`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP: dp[i][j] = ways to form t[0..j] from s[0..i].",
                tags: ["dynamic-programming", "strings"],
                testCases: [
                        { input: "rabbbit\nrabbit", output: "3", isSample: true },
                        { input: "babgbag\nbag", output: "5", isSample: false },
                        { input: "a\na", output: "1", isSample: false },
                        { input: "a\nb", output: "0", isSample: false },
                        { input: "aa\na", output: "2", isSample: false },
                        { input: "aaa\naa", output: "3", isSample: false },
                        { input: "abc\nabc", output: "1", isSample: false },
                        { input: "abc\nab", output: "1", isSample: false },
                        { input: "aab\nab", output: "2", isSample: false },
                        { input: "aaaaa\naaa", output: "10", isSample: false },
                ],
        },

        // Problem 131: Interleaving String
        {
                title: "Interleaving String",
                slug: "interleaving-string",
                difficulty: Difficulty.HARD,
                statement: `Check if s3 is formed by interleaving s1 and s2.`,
                inputFormat: `Three strings s1, s2, s3.`,
                outputFormat: `YES or NO.`,
                constraints: `0 ≤ |s1|, |s2| ≤ 100`,
                sampleInput: `aabcc
dbbca
aadbbcbcac`,
                sampleOutput: `YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP: dp[i][j] = can form s3[0..i+j] using s1[0..i] and s2[0..j]?",
                tags: ["dynamic-programming", "strings"],
                testCases: [
                        { input: "aabcc\ndbbca\naadbbcbcac", output: "YES", isSample: true },
                        { input: "aabcc\ndbbca\naadbbbaccc", output: "NO", isSample: false },
                        { input: "\n\n", output: "YES", isSample: false },
                        { input: "a\n\na", output: "YES", isSample: false },
                        { input: "\nb\nb", output: "YES", isSample: false },
                        { input: "ab\ncd\nabcd", output: "YES", isSample: false },
                        { input: "ab\ncd\nacbd", output: "YES", isSample: false },
                        { input: "ab\ncd\nacdb", output: "YES", isSample: false },
                        { input: "ab\ncd\nadbc", output: "NO", isSample: false },
                        { input: "aa\nab\naaba", output: "NO", isSample: false },
                ],
        },

        // Problem 132: Scramble String
        {
                title: "Scramble String",
                slug: "scramble-string",
                difficulty: Difficulty.HARD,
                statement: `Check if s2 is a scrambled version of s1 (by splitting and swapping subtrees).`,
                inputFormat: `Two strings.`,
                outputFormat: `YES or NO.`,
                constraints: `1 ≤ |s| ≤ 30`,
                sampleInput: `great
rgeat`,
                sampleOutput: `YES`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "DP with memoization. Try all split points recursively.",
                tags: ["dynamic-programming", "strings"],
                testCases: [
                        { input: "great\nrgeat", output: "YES", isSample: true },
                        { input: "abcde\ncaebd", output: "NO", isSample: false },
                        { input: "a\na", output: "YES", isSample: false },
                        { input: "a\nb", output: "NO", isSample: false },
                        { input: "ab\nba", output: "YES", isSample: false },
                        { input: "ab\nab", output: "YES", isSample: false },
                        { input: "abc\nbca", output: "YES", isSample: false },
                        { input: "abc\ncba", output: "YES", isSample: false },
                        { input: "abcd\nbdca", output: "NO", isSample: false },
                        { input: "abb\nbba", output: "YES", isSample: false },
                ],
        },

        // Problem 133: Recover Binary Search Tree
        {
                title: "BST Swap Detection",
                slug: "bst-swap-detection",
                difficulty: Difficulty.HARD,
                statement: `Two nodes in BST are swapped. Find which two values were swapped.`,
                inputFormat: `Preorder with -1 as null.`,
                outputFormat: `Two swapped values (smaller first).`,
                constraints: `2 ≤ nodes ≤ 1000`,
                sampleInput: `3 1 -1 -1 4 2 -1 -1 -1`,
                sampleOutput: `2 3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Inorder traversal should be sorted. Find two elements out of place.",
                tags: ["trees", "implementation"],
                testCases: [
                        { input: "3 1 -1 -1 4 2 -1 -1 -1", output: "2 3", isSample: true },
                        { input: "1 3 -1 2 -1 -1 -1", output: "1 2", isSample: false },
                        { input: "2 1 -1 -1 3 -1 -1", output: "No swap needed", isSample: false },
                        { input: "3 2 1 -1 -1 -1 -1", output: "1 3", isSample: false },
                        { input: "4 2 -1 -1 3 -1 -1", output: "3 4", isSample: false },
                        { input: "1 -1 2 -1 -1", output: "No swap needed", isSample: false },
                        { input: "2 -1 1 -1 -1", output: "1 2", isSample: false },
                        { input: "5 3 2 -1 -1 1 -1 -1 7 -1 -1", output: "1 4", isSample: false },
                        { input: "4 1 -1 -1 5 3 -1 -1 6 -1 -1", output: "3 4", isSample: false },
                        { input: "6 2 1 -1 -1 3 -1 -1 7 5 -1 -1 8 -1 -1", output: "5 6", isSample: false },
                ],
        },

        // Problem 134: Palindrome Partitioning II
        {
                title: "Min Palindrome Cuts",
                slug: "min-palindrome-cuts",
                difficulty: Difficulty.HARD,
                statement: `Find minimum cuts to partition string into palindromic substrings.`,
                inputFormat: `A string.`,
                outputFormat: `Minimum cuts.`,
                constraints: `1 ≤ |s| ≤ 2000`,
                sampleInput: `aab`,
                sampleOutput: `1`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP: precompute palindrome table, then dp[i] = min cuts for s[0..i].",
                tags: ["dynamic-programming", "strings"],
                testCases: [
                        { input: "aab", output: "1", isSample: true },
                        { input: "a", output: "0", isSample: false },
                        { input: "ab", output: "1", isSample: false },
                        { input: "aa", output: "0", isSample: false },
                        { input: "aaa", output: "0", isSample: false },
                        { input: "abc", output: "2", isSample: false },
                        { input: "abcba", output: "0", isSample: false },
                        { input: "abccba", output: "0", isSample: false },
                        { input: "abcd", output: "3", isSample: false },
                        { input: "ababab", output: "1", isSample: false },
                ],
        },

        // Problem 135: Max Points on a Line
        {
                title: "Max Points on Line",
                slug: "max-points-on-line",
                difficulty: Difficulty.HARD,
                statement: `Find maximum number of points that lie on a single line.`,
                inputFormat: `First line: N
Next N lines: x y coordinates`,
                outputFormat: `Maximum collinear points.`,
                constraints: `1 ≤ N ≤ 300
-10^4 ≤ x, y ≤ 10^4`,
                sampleInput: `4
1 1
2 2
3 3
1 4`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "For each point, map slopes to other points using GCD for precision.",
                tags: ["math", "hash-table"],
                testCases: [
                        { input: "4\n1 1\n2 2\n3 3\n1 4", output: "3", isSample: true },
                        { input: "6\n1 1\n3 2\n5 3\n4 1\n2 3\n1 4", output: "4", isSample: false },
                        { input: "1\n0 0", output: "1", isSample: false },
                        { input: "2\n0 0\n1 1", output: "2", isSample: false },
                        { input: "3\n0 0\n0 0\n0 0", output: "3", isSample: false },
                        { input: "4\n0 0\n1 0\n2 0\n3 0", output: "4", isSample: false },
                        { input: "4\n0 0\n0 1\n0 2\n0 3", output: "4", isSample: false },
                        { input: "5\n1 1\n2 2\n3 3\n4 4\n5 5", output: "5", isSample: false },
                        { input: "5\n1 2\n2 4\n3 6\n4 8\n5 10", output: "5", isSample: false },
                        { input: "4\n1 1\n2 3\n1 5\n3 1", output: "2", isSample: false },
                ],
        },

        // Problem 136: Cherry Pickup
        {
                title: "Cherry Pickup",
                slug: "cherry-pickup",
                difficulty: Difficulty.HARD,
                statement: `Two paths from (0,0) to (n-1,n-1), maximize cherries collected. Can't walk through -1.`,
                inputFormat: `First line: N
Next N lines: N integers (0, 1, or -1)`,
                outputFormat: `Maximum cherries (0 if impossible).`,
                constraints: `1 ≤ N ≤ 50`,
                sampleInput: `3
0 1 1
1 0 1
1 1 1`,
                sampleOutput: `5`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP with two paths simultaneously: 3D DP(r1, c1, r2) where c2 = r1+c1-r2.",
                tags: ["dynamic-programming", "arrays"],
                testCases: [
                        { input: "3\n0 1 1\n1 0 1\n1 1 1", output: "5", isSample: true },
                        { input: "3\n1 1 -1\n1 -1 1\n-1 1 1", output: "0", isSample: false },
                        { input: "1\n1", output: "1", isSample: false },
                        { input: "2\n1 1\n1 1", output: "4", isSample: false },
                        { input: "2\n0 0\n0 0", output: "0", isSample: false },
                        { input: "3\n1 1 1\n1 1 1\n1 1 1", output: "8", isSample: false },
                        { input: "3\n1 -1 1\n1 1 1\n1 -1 1", output: "6", isSample: false },
                        { input: "2\n1 -1\n-1 1", output: "0", isSample: false },
                        { input: "4\n1 1 1 1\n1 1 1 1\n1 1 1 1\n1 1 1 1", output: "12", isSample: false },
                        { input: "3\n0 1 0\n1 1 1\n0 1 0", output: "5", isSample: false },
                ],
        },

        // Problem 137: Frog Jump
        {
                title: "Frog Jump",
                slug: "frog-jump",
                difficulty: Difficulty.HARD,
                statement: `Frog crosses river by jumping on stones. From stone at position p with last jump k, can jump k-1, k, k+1 units. Can reach last stone?`,
                inputFormat: `First line: N
Second line: N stone positions (sorted)`,
                outputFormat: `YES or NO.`,
                constraints: `2 ≤ N ≤ 2000
First stone always at 0`,
                sampleInput: `5
0 1 3 5 6`,
                sampleOutput: `YES`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP with set of reachable jump sizes at each stone.",
                tags: ["dynamic-programming", "hash-table"],
                testCases: [
                        { input: "5\n0 1 3 5 6", output: "YES", isSample: true },
                        { input: "2\n0 2", output: "NO", isSample: false },
                        { input: "2\n0 1", output: "YES", isSample: false },
                        { input: "6\n0 1 3 6 10 15", output: "YES", isSample: false },
                        { input: "6\n0 1 2 3 4 8", output: "NO", isSample: false },
                        { input: "3\n0 1 2", output: "YES", isSample: false },
                        { input: "4\n0 1 3 4", output: "YES", isSample: false },
                        { input: "5\n0 1 2 4 5", output: "YES", isSample: false },
                        { input: "8\n0 1 3 5 6 8 12 17", output: "YES", isSample: false },
                        { input: "5\n0 1 2 4 100", output: "NO", isSample: false },
                ],
        },

        // Problem 138: Split Array Largest Sum
        {
                title: "Split Array Largest Sum",
                slug: "split-array-largest-sum",
                difficulty: Difficulty.HARD,
                statement: `Split array into m subarrays to minimize the largest sum among them.`,
                inputFormat: `First line: N M
Second line: N non-negative integers`,
                outputFormat: `Minimum possible largest sum.`,
                constraints: `1 ≤ N ≤ 1000
1 ≤ M ≤ min(50, N)`,
                sampleInput: `5 2
7 2 5 10 8`,
                sampleOutput: `18`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Binary search on answer + greedy check, or DP.",
                tags: ["binary-search", "dynamic-programming"],
                testCases: [
                        { input: "5 2\n7 2 5 10 8", output: "18", isSample: true },
                        { input: "4 2\n1 2 3 4", output: "6", isSample: false },
                        { input: "1 1\n10", output: "10", isSample: false },
                        { input: "4 4\n1 2 3 4", output: "4", isSample: false },
                        { input: "5 1\n1 2 3 4 5", output: "15", isSample: false },
                        { input: "3 3\n1 1 1", output: "1", isSample: false },
                        { input: "4 2\n1 4 4 1", output: "5", isSample: false },
                        { input: "6 3\n1 2 3 4 5 6", output: "9", isSample: false },
                        { input: "5 3\n2 3 1 2 4", output: "4", isSample: false },
                        { input: "4 2\n10 10 10 10", output: "20", isSample: false },
                ],
        },

        // Problem 139: Shortest Palindrome
        {
                title: "Shortest Palindrome Length",
                slug: "shortest-palindrome-length",
                difficulty: Difficulty.HARD,
                statement: `Find length of shortest palindrome by adding characters in front of string.`,
                inputFormat: `A string.`,
                outputFormat: `Length of shortest palindrome.`,
                constraints: `0 ≤ |s| ≤ 5 × 10^4`,
                sampleInput: `aacecaaa`,
                sampleOutput: `9`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Find longest palindrome prefix using KMP or Z-algorithm.",
                tags: ["strings", "implementation"],
                testCases: [
                        { input: "aacecaaa", output: "9", isSample: true },
                        { input: "abcd", output: "7", isSample: false },
                        { input: "", output: "0", isSample: false },
                        { input: "a", output: "1", isSample: false },
                        { input: "aa", output: "2", isSample: false },
                        { input: "ab", output: "3", isSample: false },
                        { input: "aba", output: "3", isSample: false },
                        { input: "abba", output: "4", isSample: false },
                        { input: "abc", output: "5", isSample: false },
                        { input: "aabba", output: "7", isSample: false },
                ],
        },

        // Problem 140: Paint House III (Fancy)
        {
                title: "Paint Houses",
                slug: "paint-houses",
                difficulty: Difficulty.HARD,
                statement: `N houses, m colors, target t neighborhoods. Find minimum cost to paint all houses to form exactly t neighborhoods.`,
                inputFormat: `First line: n m t
Second line: n house current colors (0 = unpainted)
Next n lines: m costs for each house`,
                outputFormat: `Minimum cost or -1.`,
                constraints: `1 ≤ n ≤ 100
1 ≤ m ≤ 20
1 ≤ t ≤ 100`,
                sampleInput: `5 2 3
0 0 0 0 0
1 10
10 1
10 1
1 10
5 1`,
                sampleOutput: `9`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "3D DP: dp[house][color][neighborhoods] = min cost.",
                tags: ["dynamic-programming", "arrays"],
                testCases: [
                        { input: "5 2 3\n0 0 0 0 0\n1 10\n10 1\n10 1\n1 10\n5 1", output: "9", isSample: true },
                        { input: "3 2 3\n0 0 0\n1 1\n1 1\n1 1", output: "3", isSample: false },
                        { input: "3 2 2\n0 1 0\n1 1\n1 1\n1 1", output: "2", isSample: false },
                        { input: "3 2 1\n0 0 0\n1 1\n1 1\n1 1", output: "3", isSample: false },
                        { input: "4 3 1\n0 0 0 0\n1 1 1\n1 1 1\n1 1 1\n1 1 1", output: "4", isSample: false },
                        { input: "2 2 1\n1 1\n1 1\n1 1", output: "0", isSample: false },
                        { input: "2 2 2\n1 2\n1 1\n1 1", output: "0", isSample: false },
                        { input: "3 2 4\n0 0 0\n1 1\n1 1\n1 1", output: "-1", isSample: false },
                        { input: "1 1 1\n0\n5", output: "5", isSample: false },
                        { input: "2 2 2\n0 0\n5 3\n3 5", output: "6", isSample: false },
                ],
        },

        // Problem 141: Kth Smallest in Sorted Matrix
        {
                title: "Kth Smallest in Matrix",
                slug: "kth-smallest-matrix",
                difficulty: Difficulty.HARD,
                statement: `Find kth smallest element in row-wise and column-wise sorted matrix.`,
                inputFormat: `First line: N K
Next N lines: N sorted integers per row`,
                outputFormat: `Kth smallest element.`,
                constraints: `1 ≤ N ≤ 300
1 ≤ K ≤ N²`,
                sampleInput: `3 8
1 5 9
10 11 13
12 13 15`,
                sampleOutput: `13`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Binary search on value range with counting, or min-heap.",
                tags: ["binary-search", "heap"],
                testCases: [
                        { input: "3 8\n1 5 9\n10 11 13\n12 13 15", output: "13", isSample: true },
                        { input: "1 1\n-5", output: "-5", isSample: false },
                        { input: "2 1\n1 2\n3 4", output: "1", isSample: false },
                        { input: "2 4\n1 2\n3 4", output: "4", isSample: false },
                        { input: "3 5\n1 2 3\n4 5 6\n7 8 9", output: "5", isSample: false },
                        { input: "3 9\n1 2 3\n4 5 6\n7 8 9", output: "9", isSample: false },
                        { input: "2 2\n1 3\n2 4", output: "2", isSample: false },
                        { input: "3 1\n1 1 1\n2 2 2\n3 3 3", output: "1", isSample: false },
                        { input: "4 8\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16", output: "8", isSample: false },
                        { input: "2 3\n1 5\n2 6", output: "5", isSample: false },
                ],
        },

        // Problem 142: Range Sum Query 2D - Mutable
        {
                title: "2D Range Sum Query",
                slug: "2d-range-sum-query",
                difficulty: Difficulty.HARD,
                statement: `Given 2D matrix, answer range sum queries from (r1,c1) to (r2,c2).`,
                inputFormat: `First line: N M Q
Next N lines: M integers
Next Q lines: r1 c1 r2 c2 (0-indexed)`,
                outputFormat: `Sum for each query.`,
                constraints: `1 ≤ N, M ≤ 200
1 ≤ Q ≤ 5000`,
                sampleInput: `3 3 3
3 0 1
5 6 3
1 2 4
0 0 2 2
1 1 2 2
0 0 0 0`,
                sampleOutput: `25
15
3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use 2D prefix sums: sum = prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1].",
                tags: ["arrays", "implementation"],
                testCases: [
                        { input: "3 3 3\n3 0 1\n5 6 3\n1 2 4\n0 0 2 2\n1 1 2 2\n0 0 0 0", output: "25\n15\n3", isSample: true },
                        { input: "1 1 1\n5\n0 0 0 0", output: "5", isSample: false },
                        { input: "2 2 2\n1 2\n3 4\n0 0 1 1\n0 0 0 1", output: "10\n3", isSample: false },
                        { input: "2 3 1\n1 2 3\n4 5 6\n0 0 1 2", output: "21", isSample: false },
                        { input: "3 3 1\n1 1 1\n1 1 1\n1 1 1\n0 0 2 2", output: "9", isSample: false },
                        { input: "2 2 4\n1 2\n3 4\n0 0 0 0\n0 1 0 1\n1 0 1 0\n1 1 1 1", output: "1\n2\n3\n4", isSample: false },
                        { input: "4 4 2\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16\n0 0 3 3\n1 1 2 2", output: "136\n34", isSample: false },
                        { input: "3 3 2\n0 0 0\n0 5 0\n0 0 0\n1 1 1 1\n0 0 2 2", output: "5\n5", isSample: false },
                        { input: "2 4 1\n1 2 3 4\n5 6 7 8\n0 1 1 3", output: "30", isSample: false },
                        { input: "1 5 1\n10 20 30 40 50\n0 0 0 4", output: "150", isSample: false },
                ],
        },

        // Problem 143: Best Time to Buy/Sell Stock IV
        {
                title: "Stock Buy Sell K Times",
                slug: "stock-buy-sell-k-times",
                difficulty: Difficulty.HARD,
                statement: `Maximum profit with at most K transactions. Must sell before buying again.`,
                inputFormat: `First line: N K
Second line: N prices`,
                outputFormat: `Maximum profit.`,
                constraints: `1 ≤ N ≤ 1000
0 ≤ K ≤ 100`,
                sampleInput: `5 2
2 4 1 5 3`,
                sampleOutput: `6`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP: dp[k][i] = max profit with k transactions up to day i.",
                tags: ["dynamic-programming", "arrays"],
                testCases: [
                        { input: "5 2\n2 4 1 5 3", output: "6", isSample: true },
                        { input: "6 2\n3 2 6 5 0 3", output: "7", isSample: false },
                        { input: "1 1\n5", output: "0", isSample: false },
                        { input: "2 1\n1 5", output: "4", isSample: false },
                        { input: "2 1\n5 1", output: "0", isSample: false },
                        { input: "5 1\n1 2 3 4 5", output: "4", isSample: false },
                        { input: "5 100\n1 2 3 4 5", output: "4", isSample: false },
                        { input: "6 3\n1 2 4 2 5 7", output: "8", isSample: false },
                        { input: "4 0\n1 2 3 4", output: "0", isSample: false },
                        { input: "7 2\n1 4 2 7 3 5 8", output: "11", isSample: false },
                ],
        },

        // Problem 144: Super Egg Drop
        {
                title: "Super Egg Drop",
                slug: "super-egg-drop",
                difficulty: Difficulty.HARD,
                statement: `Given K eggs and N floors, find minimum moves to determine the critical floor.`,
                inputFormat: `Two integers K and N.`,
                outputFormat: `Minimum moves needed.`,
                constraints: `1 ≤ K ≤ 100
1 ≤ N ≤ 10^4`,
                sampleInput: `2 6`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP with binary search: dp[m][k] = max floors checkable with m moves and k eggs.",
                tags: ["dynamic-programming", "binary-search"],
                testCases: [
                        { input: "2 6", output: "3", isSample: true },
                        { input: "1 2", output: "2", isSample: false },
                        { input: "3 14", output: "4", isSample: false },
                        { input: "1 1", output: "1", isSample: false },
                        { input: "2 1", output: "1", isSample: false },
                        { input: "1 10", output: "10", isSample: false },
                        { input: "2 10", output: "4", isSample: false },
                        { input: "3 25", output: "5", isSample: false },
                        { input: "4 100", output: "7", isSample: false },
                        { input: "2 100", output: "14", isSample: false },
                ],
        },

        // Problem 145: Russian Doll Envelopes
        {
                title: "Russian Doll Envelopes",
                slug: "russian-doll-envelopes",
                difficulty: Difficulty.HARD,
                statement: `Max envelopes that can be nested (each must be strictly larger in both dimensions).`,
                inputFormat: `First line: N
Next N lines: width height`,
                outputFormat: `Maximum nesting depth.`,
                constraints: `1 ≤ N ≤ 10^5`,
                sampleInput: `4
5 4
6 4
6 7
2 3`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Sort by width asc, height desc. Then LIS on heights.",
                tags: ["binary-search", "sorting"],
                testCases: [
                        { input: "4\n5 4\n6 4\n6 7\n2 3", output: "3", isSample: true },
                        { input: "1\n1 1", output: "1", isSample: false },
                        { input: "2\n1 2\n2 3", output: "2", isSample: false },
                        { input: "3\n1 1\n1 1\n1 1", output: "1", isSample: false },
                        { input: "5\n1 2\n2 3\n3 4\n4 5\n5 6", output: "5", isSample: false },
                        { input: "4\n4 5\n4 6\n6 7\n2 3", output: "3", isSample: false },
                        { input: "3\n1 3\n3 5\n6 7", output: "3", isSample: false },
                        { input: "4\n2 4\n1 3\n3 5\n4 6", output: "4", isSample: false },
                        { input: "5\n10 1\n9 2\n8 3\n7 4\n6 5", output: "1", isSample: false },
                        { input: "3\n1 1\n2 2\n3 3", output: "3", isSample: false },
                ],
        },

        // Problem 146: Minimum Cost to Cut a Stick
        {
                title: "Minimum Cost to Cut Stick",
                slug: "min-cost-cut-stick",
                difficulty: Difficulty.HARD,
                statement: `Cut stick of length N at given positions. Cost to cut = length of stick being cut. Find min total cost.`,
                inputFormat: `First line: N C
Second line: C cut positions`,
                outputFormat: `Minimum total cost.`,
                constraints: `1 ≤ N ≤ 10^6
1 ≤ C ≤ min(N-1, 100)`,
                sampleInput: `7 4
1 3 4 5`,
                sampleOutput: `16`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP: dp[i][j] = min cost to cut segment from cuts[i] to cuts[j].",
                tags: ["dynamic-programming", "arrays"],
                testCases: [
                        { input: "7 4\n1 3 4 5", output: "16", isSample: true },
                        { input: "9 2\n5 6", output: "13", isSample: false },
                        { input: "5 1\n3", output: "5", isSample: false },
                        { input: "10 3\n2 5 8", output: "21", isSample: false },
                        { input: "4 2\n1 2", output: "7", isSample: false },
                        { input: "6 3\n1 2 3", output: "12", isSample: false },
                        { input: "100 2\n25 75", output: "200", isSample: false },
                        { input: "5 2\n1 4", output: "9", isSample: false },
                        { input: "8 4\n1 2 5 7", output: "19", isSample: false },
                        { input: "10 1\n5", output: "10", isSample: false },
                ],
        },

        // Problem 147: Maximum Gap
        {
                title: "Maximum Gap",
                slug: "maximum-gap",
                difficulty: Difficulty.HARD,
                statement: `Find maximum gap between successive elements in sorted form of unsorted array in O(n) time.`,
                inputFormat: `First line: N
Second line: N non-negative integers`,
                outputFormat: `Maximum gap.`,
                constraints: `2 ≤ N ≤ 10^5
0 ≤ elements ≤ 10^9`,
                sampleInput: `4
3 6 9 1`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Use bucket sort / radix sort or pigeonhole principle.",
                tags: ["sorting", "arrays"],
                testCases: [
                        { input: "4\n3 6 9 1", output: "3", isSample: true },
                        { input: "2\n10 0", output: "10", isSample: false },
                        { input: "3\n1 1 1", output: "0", isSample: false },
                        { input: "5\n1 2 3 4 5", output: "1", isSample: false },
                        { input: "5\n1 10 100 1000 10000", output: "9000", isSample: false },
                        { input: "2\n1 100", output: "99", isSample: false },
                        { input: "6\n3 1 7 2 8 4", output: "3", isSample: false },
                        { input: "4\n1 3 9 27", output: "18", isSample: false },
                        { input: "3\n0 0 0", output: "0", isSample: false },
                        { input: "5\n5 5 5 5 10", output: "5", isSample: false },
                ],
        },

        // Problem 148: Longest Duplicate Substring
        {
                title: "Longest Duplicate Substring Length",
                slug: "longest-duplicate-substring-length",
                difficulty: Difficulty.HARD,
                statement: `Find length of longest duplicate substring.`,
                inputFormat: `A string.`,
                outputFormat: `Length of longest duplicate substring.`,
                constraints: `2 ≤ |s| ≤ 3 × 10^4`,
                sampleInput: `banana`,
                sampleOutput: `3`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Binary search on length + rolling hash to find duplicate.",
                tags: ["binary-search", "strings"],
                testCases: [
                        { input: "banana", output: "3", isSample: true },
                        { input: "abcd", output: "0", isSample: false },
                        { input: "aa", output: "1", isSample: false },
                        { input: "aaa", output: "2", isSample: false },
                        { input: "aaaa", output: "3", isSample: false },
                        { input: "abcabc", output: "3", isSample: false },
                        { input: "abab", output: "2", isSample: false },
                        { input: "abcde", output: "0", isSample: false },
                        { input: "ababab", output: "4", isSample: false },
                        { input: "mississippi", output: "4", isSample: false },
                ],
        },

        // Problem 149: Count of Range Sum
        {
                title: "Count Range Sums",
                slug: "count-range-sums",
                difficulty: Difficulty.HARD,
                statement: `Count subarray sums that lie in [lower, upper] range.`,
                inputFormat: `First line: N lower upper
Second line: N integers`,
                outputFormat: `Count of valid range sums.`,
                constraints: `1 ≤ N ≤ 10^5
-10^9 ≤ elements ≤ 10^9`,
                sampleInput: `3 -2 2
-2 5 -1`,
                sampleOutput: `3`,
                timeLimit: 2000,
                memoryLimit: 256,
                hint: "Use merge sort with prefix sums, or BIT/Segment Tree.",
                tags: ["sorting", "binary-search"],
                testCases: [
                        { input: "3 -2 2\n-2 5 -1", output: "3", isSample: true },
                        { input: "1 0 0\n0", output: "1", isSample: false },
                        { input: "2 0 0\n0 0", output: "3", isSample: false },
                        { input: "3 -1 1\n1 -1 1", output: "5", isSample: false },
                        { input: "4 -3 3\n1 2 -1 -2", output: "8", isSample: false },
                        { input: "5 0 5\n1 1 1 1 1", output: "15", isSample: false },
                        { input: "3 -100 100\n1 2 3", output: "6", isSample: false },
                        { input: "4 2 4\n1 1 1 1", output: "6", isSample: false },
                        { input: "2 5 10\n1 2", output: "0", isSample: false },
                        { input: "3 -5 -1\n-1 -2 -3", output: "4", isSample: false },
                ],
        },

        // Problem 150: Minimum Number of Refueling Stops
        {
                title: "Minimum Refueling Stops",
                slug: "min-refueling-stops",
                difficulty: Difficulty.HARD,
                statement: `Car starts with fuel. Gas stations [position, fuel]. Find min stops to reach target, or -1.`,
                inputFormat: `First line: target startFuel N
Next N lines: position fuel (sorted by position)`,
                outputFormat: `Minimum stops or -1.`,
                constraints: `1 ≤ target ≤ 10^9
0 ≤ startFuel ≤ 10^9
0 ≤ N ≤ 500`,
                sampleInput: `100 10 4
10 60
20 30
30 30
60 40`,
                sampleOutput: `2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Greedy with max-heap: when stuck, refuel from best station passed.",
                tags: ["greedy", "heap"],
                testCases: [
                        { input: "100 10 4\n10 60\n20 30\n30 30\n60 40", output: "2", isSample: true },
                        { input: "1 1 0", output: "0", isSample: false },
                        { input: "100 1 0", output: "-1", isSample: false },
                        { input: "100 50 1\n25 50", output: "1", isSample: false },
                        { input: "100 100 0", output: "0", isSample: false },
                        { input: "200 50 2\n50 50\n100 50", output: "2", isSample: false },
                        { input: "100 25 3\n25 25\n50 25\n75 25", output: "3", isSample: false },
                        { input: "100 10 2\n10 100\n50 10", output: "1", isSample: false },
                        { input: "500 100 3\n100 100\n200 100\n300 100", output: "3", isSample: false },
                        { input: "200 50 3\n10 100\n100 10\n150 30", output: "1", isSample: false },
                ],
        },

        // Problem 151: Strange Printer
        {
                title: "Strange Printer",
                slug: "strange-printer",
                difficulty: Difficulty.HARD,
                statement: `Printer can only print a sequence of same chars at a time. Find min turns to print string.`,
                inputFormat: `A string.`,
                outputFormat: `Minimum turns.`,
                constraints: `1 ≤ |s| ≤ 100`,
                sampleInput: `aaabbb`,
                sampleOutput: `2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "DP: dp[i][j] = min turns for s[i..j]. If s[i]==s[k], try merging.",
                tags: ["dynamic-programming", "strings"],
                testCases: [
                        { input: "aaabbb", output: "2", isSample: true },
                        { input: "aba", output: "2", isSample: false },
                        { input: "a", output: "1", isSample: false },
                        { input: "aa", output: "1", isSample: false },
                        { input: "ab", output: "2", isSample: false },
                        { input: "abab", output: "3", isSample: false },
                        { input: "abcabc", output: "5", isSample: false },
                        { input: "aabb", output: "2", isSample: false },
                        { input: "abba", output: "2", isSample: false },
                        { input: "abcba", output: "3", isSample: false },
                ],
        },

        // Problem 152: Integer to English Words
        {
                title: "Integer to Words",
                slug: "integer-to-words",
                difficulty: Difficulty.HARD,
                statement: `Convert non-negative integer to English words. Output word count.`,
                inputFormat: `A non-negative integer.`,
                outputFormat: `Word count in English representation.`,
                constraints: `0 ≤ num ≤ 2^31 - 1`,
                sampleInput: `123`,
                sampleOutput: `3`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Handle groups of 3 digits. Special cases for 11-19.",
                tags: ["strings", "implementation"],
                testCases: [
                        { input: "123", output: "3", isSample: true },
                        { input: "0", output: "1", isSample: false },
                        { input: "1", output: "1", isSample: false },
                        { input: "10", output: "1", isSample: false },
                        { input: "11", output: "1", isSample: false },
                        { input: "100", output: "2", isSample: false },
                        { input: "1000", output: "2", isSample: false },
                        { input: "1000000", output: "2", isSample: false },
                        { input: "12345", output: "6", isSample: false },
                        { input: "1234567", output: "8", isSample: false },
                ],
        },

        // Problem 153: Number of Digit One
        {
                title: "Count Digit One",
                slug: "count-digit-one",
                difficulty: Difficulty.HARD,
                statement: `Count total occurrences of digit 1 in all non-negative integers up to n.`,
                inputFormat: `A non-negative integer n.`,
                outputFormat: `Total count of 1s.`,
                constraints: `0 ≤ n ≤ 2 × 10^9`,
                sampleInput: `13`,
                sampleOutput: `6`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Digit DP: count 1s at each position separately.",
                tags: ["math", "dynamic-programming"],
                testCases: [
                        { input: "13", output: "6", isSample: true },
                        { input: "0", output: "0", isSample: false },
                        { input: "1", output: "1", isSample: false },
                        { input: "10", output: "2", isSample: false },
                        { input: "100", output: "21", isSample: false },
                        { input: "99", output: "20", isSample: false },
                        { input: "11", output: "4", isSample: false },
                        { input: "111", output: "36", isSample: false },
                        { input: "20", output: "12", isSample: false },
                        { input: "1000", output: "301", isSample: false },
                ],
        },

        // Problem 154: Minimum Moves to Equal Array Elements II
        {
                title: "Min Moves Equal Array",
                slug: "min-moves-equal-array",
                difficulty: Difficulty.HARD,
                statement: `Find minimum moves to make all elements equal. Each move increments or decrements one element by 1.`,
                inputFormat: `First line: N
Second line: N integers`,
                outputFormat: `Minimum moves.`,
                constraints: `1 ≤ N ≤ 10^5
-10^9 ≤ elements ≤ 10^9`,
                sampleInput: `3
1 2 3`,
                sampleOutput: `2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Find median. Total moves = sum of distances to median.",
                tags: ["math", "sorting"],
                testCases: [
                        { input: "3\n1 2 3", output: "2", isSample: true },
                        { input: "1\n5", output: "0", isSample: false },
                        { input: "2\n1 10", output: "9", isSample: false },
                        { input: "4\n1 0 0 1", output: "2", isSample: false },
                        { input: "5\n1 2 3 4 5", output: "6", isSample: false },
                        { input: "3\n1 1 1", output: "0", isSample: false },
                        { input: "4\n1 2 3 4", output: "4", isSample: false },
                        { input: "5\n10 10 10 10 10", output: "0", isSample: false },
                        { input: "3\n-1 0 1", output: "2", isSample: false },
                        { input: "4\n-5 0 5 10", output: "20", isSample: false },
                ],
        },

        // Problem 155: Poor Pigs
        {
                title: "Poor Pigs",
                slug: "poor-pigs",
                difficulty: Difficulty.HARD,
                statement: `Find minimum pigs to identify poisoned bucket in given rounds.`,
                inputFormat: `Three integers: buckets minutesToDie minutesToTest`,
                outputFormat: `Minimum pigs needed.`,
                constraints: `1 ≤ buckets ≤ 1000
1 ≤ minutesToDie ≤ minutesToTest ≤ 100`,
                sampleInput: `4 15 15`,
                sampleOutput: `2`,
                timeLimit: 1000,
                memoryLimit: 256,
                hint: "Each pig can have (minutesToTest/minutesToDie + 1) states. Need states^pigs >= buckets.",
                tags: ["math", "implementation"],
                testCases: [
                        { input: "4 15 15", output: "2", isSample: true },
                        { input: "1 1 1", output: "0", isSample: false },
                        { input: "2 1 1", output: "1", isSample: false },
                        { input: "8 15 15", output: "3", isSample: false },
                        { input: "1000 15 60", output: "5", isSample: false },
                        { input: "125 1 4", output: "3", isSample: false },
                        { input: "100 1 1", output: "7", isSample: false },
                        { input: "5 15 30", output: "2", isSample: false },
                        { input: "27 1 2", output: "3", isSample: false },
                        { input: "9 1 2", output: "2", isSample: false },
                ],
        },
];

// Export the questions
export default codechefQuestions;
