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
];

// Export the questions
export default codechefQuestions;
