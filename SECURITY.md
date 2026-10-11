# Security Policy

Thank you for helping keep Callisto Software Solution and its visitors safe.

## Supported versions

Callisto is a website that is deployed continuously from the `main` branch. Only the latest version on `main` (the one running on the live site) receives security fixes. Older commits, forks and preview deployments are not supported.

## Reporting a vulnerability

**Please do not report security problems in a public issue, pull request or discussion.** Anyone could read it before a fix is ready.

Report it privately instead:

1. Go to the **[Security tab](https://github.com/Hasalawa/callisto/security)** of this repository.
2. Click **Report a vulnerability**.
3. Describe the problem and send the report. Only the maintainer can see it.

Please include, as far as you can:

- What the problem is and where it is (page, URL, file or API route)
- Steps to reproduce it, or a small proof of concept
- What an attacker could do with it
- Your browser, device or environment, if it matters

Please do not include real personal data of other people in your report.

## What to expect

| Step | Target time |
| --- | --- |
| We confirm we received your report | within 3 days |
| We tell you whether we accept it and how serious it is | within 7 days |
| We fix confirmed problems | as soon as possible, serious ones first |

This is a small project maintained by volunteers, so these are targets, not guarantees. If you hear nothing after 7 days, please add a comment to your report to remind us.

When the fix is released, we credit you in the release notes or the advisory, unless you prefer to stay anonymous. Please give us reasonable time to fix the problem before you share it publicly.

## What counts as a security problem

Examples of things we want to hear about:

- Ways to read or send email through the contact form that were not meant to be possible (header or email injection, abuse as a spam relay)
- Cross-site scripting (XSS) or other injection in the website
- Secrets in the repository or its history, such as the `EMAIL_USER`, `EMAIL_PASS` or `RECEIVER_EMAIL` values, API keys or webhook URLs
- Weaknesses in the backend API under `/api`, such as missing validation or missing rate limiting
- Vulnerable dependencies that can actually be exploited in this project
- Weak points in our GitHub Actions workflows or Vercel configuration

Usually not a security problem:

- Missing best-practice headers or settings with no real attack behind them
- Reports from automated scanners with no proof that the problem can be used
- Spam or abuse that needs no vulnerability (for example, someone filling in the form by hand)
- Attacks that need a stolen or already compromised account or device
- Denial-of-service by sending huge amounts of traffic

## Rules for testing

Please:

- Only test against your own copy of the project (`npm run dev`), or very lightly against the live site
- Do not access, change or delete data that is not yours
- Do not send spam through the contact form or run load tests against the live site
- Stop and report as soon as you have shown the problem exists

We will not take legal action against anyone who follows this policy and acts in good faith.

## If you are a contributor

- Never commit secrets. Keep them in a local `.env` file (it is ignored by Git) and in the Vercel project settings.
- If you committed a secret by mistake, **tell the maintainer right away**. Removing it in a later commit is not enough, the secret must be replaced with a new one.
- Keep dependencies up to date and do not add packages you do not need.
- Do not turn off checks in `.github/workflows` to make a pull request pass.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the normal way to contribute.