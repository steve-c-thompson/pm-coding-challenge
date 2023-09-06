## Project
This is a coding challenge for Parallel Markets to input and save Investor data.

## Installation
First, set up the database.

Create a `.env` file in the root of your project
```bash
echo -e 'DATABASE_URL="file:./dev.db"' > .env
```
Now generate the database and run any migrations.

```bash
npx prisma generate
npx prisma migrate dev
# or use yarn or pnpm
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Functionality
* Form input where all fields are required
* Saving data to a local database
* Saving file to disk
* Some basic Tailwind styling on the form

### Where I Got Stuck
* ~~User feedback. The app doesn't tell you anything upon form submission, so you have to watch the terminal and Developer Console to see success.~~
  * My intention with `onSubmit` was to clear the form and show a toast success message. (I may be doing something wrong with `useState`. _Update: I did not have `value` or `onChange` in the form fields._)
* Using an API rather than a Next JS `serverAction` proved pointless given the above non-functionality. A `serverAction` could have at least cleared the form by redirecting back to itself (gross).
* Figuring out multi-part form data took a long time.

### Future Improvements
- [x] Figure out the toast and form clearing. This is not an MVP product.
- [ ] Abstract file writing to an interface. Then I could have a concrete class for local development (into the `tmp` directory) or something more production-oriented, like an S3 bucket. Which leads to...
- [ ] Dependency Injection. I've done something like this in other projects (see [appContext.ts](https://github.com/steve-c-thompson/standup-bot-serverless/blob/main/src/utils/appContext.ts)) but there has to be some kind of IoC container for this.
- [ ] Unit tests, especially for the FileWriter above
   * To test locally, I'd check that a file was created
   * For testing writing to an S3 bucket, spin up LocalStack in a Docker container.
- [ ] End-to-end tests with Cypress or maybe Playwright
- [ ] Frontend validation on phone numbers and zip codes.
- [ ] Backend validation on the API: it assumes best case
- [ ] Authentication and authorization
- [ ] For large files I'd use some kind of chunking and progress indicator
- [ ] Allow upload of multiple files
- [ ] List added investors below the form - paginated or maybe searchable
- [ ] Dockerize this so that all the database setup and launch can be as simple as `docker-compose up`


## Design Notes
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Database
[Prisma ORM](https://www.prisma.io/) with [SQLite](https://www.sqlite.org/index.html) so that we can don't need to install something like MySQL.

### API
Next.js encourages using [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations) for form input, but this has an API because the author wanted to explore the framework (for better or worse).

The API route exists at `/pages/api/investor.ts` because that's how Next.js wants it.

### Saving Files
This saves files to `/tmp/investors/files`. This is not ideal, but at least they're on disk, per instructions.



