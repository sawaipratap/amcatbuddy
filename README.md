<p align="center">
  <img src="public/logo.svg" alt="AMCATBuddy Logo" width="120" height="120" />
</p>

<h1 align="center">AMCATBuddy</h1>

<p align="center">
  <strong>🎯 Your Personal AMCAT Coding Preparation Platform</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

---

## ✨ Features

### 🖥️ Code Execution Engine
- **Real-time code execution** with Judge0 integration
- Support for **C++, Python, Java, JavaScript, Go, Rust**
- Automatic test case validation with detailed feedback

### 📚 AMCAT Problem Bank
- Curated collection of **AMCAT-style coding problems**
- Problems categorized by difficulty (Easy, Medium, Hard)
- Tagged by topics: Arrays, Strings, DP, Trees, and more

### 🏆 Progress Tracking
- Personal dashboard with solved problems count
- Rating system (ELO-based)
- Submission history with verdicts

### 🔐 Authentication
- Secure OAuth login via Google
- NextAuth.js powered sessions

### 🎨 Modern UI/UX
- Clean, minimalist interface
- Monaco Editor (VS Code engine) for coding
- Responsive design for all devices

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Editor** | Monaco Editor |
| **Backend** | Next.js API Routes, Server Actions |
| **Database** | PostgreSQL (Neon), Prisma ORM |
| **Auth** | NextAuth.js v5 (Google OAuth) |
| **Code Execution** | Judge0 CE |
| **Caching** | Upstash Redis |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or [Neon](https://neon.tech) account)
- Judge0 instance (local or [cloud](https://judge0.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sawaipratap/amcatbuddy.git
   cd amcatbuddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="your-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-secret"
   JUDGE0_API_URL="http://localhost:2358"
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📦 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sawaipratap/amcatbuddy)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

### Judge0 Setup

For code execution, you'll need a Judge0 instance:

- **Cloud**: Use [ce.judge0.com](https://ce.judge0.com) (50 free submissions/day)
- **Self-hosted**: See [Judge0 documentation](https://github.com/judge0/judge0)

---

## 📁 Project Structure

```
amcatbuddy/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Seed data with AMCAT problems
│   └── amcat-questions*.ts # Problem definitions
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # API routes
│   │   ├── problems/      # Problem pages
│   │   ├── contests/      # Contest pages
│   │   └── profile/       # User profile
│   ├── components/        # React components
│   ├── lib/               # Utilities (auth, prisma, judge)
│   └── types/             # TypeScript types
└── public/                # Static assets
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Judge0](https://judge0.com) for the code execution engine
- [Neon](https://neon.tech) for serverless PostgreSQL
- [Vercel](https://vercel.com) for hosting
- AMCAT for inspiration on problem patterns

---

<p align="center">
  Made with ❤️ for AMCAT aspirants
</p>
