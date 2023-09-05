## Project
This is a coding challenge for Parallel Markets to intake and save data.

## Installation
First, set up the database.
```bash
npx prisma generate
npx prisma migrate dev
# or use yarn or pnpm
```

## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Database
[Prisma ORM](https://www.prisma.io/) with [SQLite](https://www.sqlite.org/index.html) so that we can do minimal installation.

### API
Next.js encourages using [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations) for form input, but this has an API because the author wanted to explore the framework (for better or worse).

The API route exists at `/pages/api/investor.ts`.

### Saving Files
This saves files to `/tmp/investors/files`. This is not ideal, but at least they're on disk, per instructions.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


