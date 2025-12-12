# Aldott TechSolution Website

Wind energy R&D and consulting website built with Next.js (App Router), Tailwind CSS, Prisma, and PostgreSQL. Includes marketing pages, blog scaffolding, author dashboard placeholder, and OpenFAST cloud simulation placeholder.

## Features
- Marketing pages: Home, About, Services, Projects with case studies, Contact, OpenFAST placeholder.
- Blog structure with author pages, related posts, and SEO-friendly routing.
- Dashboard placeholder for profile, post management, and LinkedIn-style TipTap editor.
- Prisma schema for users, posts, tags, projects, testimonials, and contact messages with seed data.
- Docker Compose for local Postgres + web runtime.

## Getting Started (non-Docker)
1. Install Node.js 20+
2. Copy `.env.example` to `.env` and adjust values.
3. Install dependencies (requires npm registry access):
   ```bash
   npm install
   ```
4. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npm run seed
   ```
5. Start dev server:
   ```bash
   npm run dev
   ```

## Docker
1. Copy `.env.example` to `.env`.
2. Start services:
   ```bash
   docker compose up --build
   ```
3. Web available at http://localhost:3000.

## Auth & Roles
- Seed creates admin user `admin@aldott.test` with password `changeme`.
- Role enum supports ADMIN, AUTHOR, READER. Dashboard pages should be protected once NextAuth wiring is completed.

## Blog Authoring
- TipTap editor and CRUD endpoints are stubbed in the dashboard placeholder; wire to Prisma models for full authoring flow.
- Posts support SEO title/description, tags, cover images, and draft/publish workflow per Prisma schema.

## OpenFAST Roadmap
- `/openfast` includes disabled form elements and TODO note. Integrate with a future microservice that queues OpenFAST jobs, stores results, and streams status to the UI.

## Notes
- Package installation may require npm registry access; update `package.json` as needed.
- Add sitemap and RSS generation via `next-sitemap` once deployment URL is finalized.
