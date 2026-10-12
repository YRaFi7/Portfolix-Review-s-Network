# Portfolix Reviews Network

**Portfolix Reviews Network** is a multi-brand customer review and digital reputation platform engineered for three distinct brand properties on a single, shared Next.js + TypeScript + PostgreSQL architecture:

1. **Portfolio Builders** — [`portfoliobuilders.reviews`](https://portfoliobuilders.reviews)
2. **Portfolix.Tech** — [`portfolixtech.reviews`](https://portfolixtech.reviews)
3. **Portfolix Entreprise** — [`portfolixentreprise.reviews`](https://portfolixentreprise.reviews)

---

## 🚀 Key Features

- **Multi-Tenant Host Routing**: Automatic domain detection via Next.js Middleware with brand-specific theming, metadata, brand facts, methodology, and reviews.
- **Review Submission & Anti-Spam**: Zod schema validation, honeypot spam protection, verified buyer status tags, and email verification tokens.
- **Central Admin Moderation Dashboard (`/admin`)**:
  - Live review queues: `Pending`, `Approved`, `Rejected`, and `Flagged for Audit`.
  - One-click approval and rejection with audit reasoning.
  - Official Company Response authoring with representative title.
  - Community incident reports manager.
  - Cryptographic audit log stream.
- **Trust & Reputation Engine**:
  - Interactive star breakdown & recommendation percentage.
  - Multi-parameter filter & search (keywords, stars, verified buyers only, third-party source attribution).
  - Helpful / unhelpful live voting counter.
  - Dedicated individual review permalink pages (`/reviews/[id]`).
- **SEO, AEO & GEO Foundations**:
  - Schema.org JSON-LD structured data (`AggregateRating`, `Organization`, `Review`, `FAQPage`).
  - Dynamic `sitemap.xml` and `robots.txt` optimized for AI engines (GPTBot, Perplexity, ClaudeBot).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 App Router (React 18, TypeScript)
- **Database / ORM**: PostgreSQL + Prisma Client
- **Authentication & Security**: Auth.js / NextAuth, Zod validation, Honeypots
- **Styling**: Tailwind CSS + CSS3 custom variables

---

## ⚡ Quick Start

### 1. Configure PostgreSQL Connection
Update `.env` with your PostgreSQL database connection URL:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/portfolix_reviews?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secure_secret_here"
```

### 2. Push Database Schema & Seed Data
```bash
# Push schema to PostgreSQL
npx prisma db push

# (Optional) Seed the database
npm run db:seed
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## 🌐 Testing Different Brands Locally

You can preview the platform as any of the three brands in development:

- **Portfolio Builders**: [http://localhost:3000/?brand=portfolio-builders](http://localhost:3000/?brand=portfolio-builders)
- **Portfolix.Tech**: [http://localhost:3000/?brand=portfolix-tech](http://localhost:3000/?brand=portfolix-tech)
- **Portfolix Entreprise**: [http://localhost:3000/?brand=portfolix-entreprise](http://localhost:3000/?brand=portfolix-entreprise)

You can also use the **Network Switcher** dropdown in the top navigation bar.

---

## 🛡️ Central Admin Portal

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Admin Email**: `admin@portfolix.tech`
- **Admin Password**: `PortfolixAdmin2026!Secure` (configured in `.env`)
