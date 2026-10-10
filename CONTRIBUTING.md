# Contributing to Callisto

Thanks for helping improve the Callisto website! This guide explains how to pick up an issue, get it assigned to you, and get your change merged.

## TL;DR

1. Find an open issue that nobody is working on.
2. Comment **`/assign`** on it. You are assigned automatically.
3. Make your change on a branch and open a pull request that says `Closes #<issue number>`.

---

## 1. Find an issue

- [Open issues nobody has claimed](https://github.com/Hasalawa/callisto/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee)
- [Good first issues](https://github.com/Hasalawa/callisto/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee+label%3A%22good+first+issue%22): small, well-defined tasks and a good place to start

Found a bug or have an idea that isn't listed? Open a new issue and pick the **Bug report** or **Feature request** template.

### Labels

New issues are labeled automatically from their title and text. Maintainers can change the labels at any time.

| Label | Meaning |
|---|---|
| `bug` | Something isn't working |
| `enhancement` | New feature or improvement |
| `documentation` | Docs, README or typos |
| `question` | A question rather than a task |
| `frontend` | React / Vite / UI work |
| `backend` | Express API and the contact-form email |
| `deployment` | Vercel, CI or build problems |
| `needs-triage` | Not reviewed yet, type unclear |
| `good first issue`, `help wanted` | Added by maintainers by hand |

---

## 2. Claim an issue

Write a comment on the issue. A bot assigns you and replies to confirm.

| You write | What happens |
|---|---|
| `/assign` (or `/claim`, `/take`) | You are assigned to the issue |
| "assign me", "I'll take this", "I'd like to work on this", "Can I work on this?" | Same as `/assign` |
| `/unassign` (or `/unclaim`, `/release`) | You are removed, so someone else can take it |

Slash commands must be at the start of a line.

**Rules**

- **One person per issue.** If someone is already assigned, the bot tells you who. Pick another issue, or ask them to `/unassign` if they can't continue.
- Closed issues can't be assigned.
- If the bot can't assign you (for example, you don't have access to the repository yet), a maintainer can assign you by hand from the issue sidebar.
- Can't finish what you claimed? Comment `/unassign` so others can pick it up. That's completely fine.

---

## 3. Set up the project

You need [Node.js](https://nodejs.org/) 22 (the version CI uses).

**Get the code**

- Team members: clone the repository and create a branch in it.
- Everyone else: fork the repository on GitHub first, then clone your fork.

```bash
git clone https://github.com/Hasalawa/callisto.git
cd callisto
npm install
npm run dev
```

The site runs at `http://localhost:5173`.

**Backend (only if you work on the contact form)**

```bash
cd backend
npm install
```

Create `backend/.env` with:

```env
EMAIL_USER=your-gmail-address
EMAIL_PASS=your-gmail-app-password
RECEIVER_EMAIL=where-inquiries-should-arrive
PORT=5000
```

`EMAIL_PASS` must be a Gmail **App Password**, not your normal password. Then start the server with `npm start`. The frontend sends the contact form to `/api/contact`, so during development the Vite dev server has to forward `/api` to `http://localhost:5000` (see `vite.config.js`).

> **Never commit `.env` or any other secret.** Run `git status` before every commit and check what you are about to add.

---

## 4. Make your change

Create a branch from an up-to-date `main`. A name that says what you do works well, for example `feature/team-photos`, `fix/navbar-overlap` or `docs/readme-update`.

```bash
git checkout main
git pull
git checkout -b feature/team-photos
```

Then:

- Keep the change focused on the issue you claimed.
- Follow the existing structure: pages in `src/pages`, reusable components in `src/components`, static files (images, icons) in `public`.
- Write short, clear commit messages that say what changed, for example `Add real photos to the Team section`.

Before you push, run the same checks CI runs:

```bash
npm run lint
npm run build
node --check backend/server.js
```

---

## 5. Open a pull request

1. Push your branch and open a pull request into `main`.
2. Write `Closes #<issue number>` in the description. The issue closes automatically when the PR is merged.
3. Describe what you changed and, for visual changes, add a screenshot.
4. Check the results on the pull request:
   - **CI** runs lint, a production build and a backend syntax check. The build and the syntax check must pass. Lint is informational for now, but please fix warnings in the code you touched.
   - **Vercel** builds a preview of your branch. Open it and test your change there.
5. A maintainer reviews the PR. Push more commits to the same branch to address feedback.

---

## Security

- Never put passwords, API keys or tokens in code, issues or pull requests.
- Found a security problem? Please **don't** open a public issue. Contact the maintainer directly through [@Hasalawa](https://github.com/Hasalawa) on GitHub.

## License

By contributing, you agree that your contribution is covered by the project's license (see the `LICENSE` file).