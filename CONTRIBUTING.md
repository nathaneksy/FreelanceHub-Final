# Contributing to FreelanceHub

## Daily workflow

Keep commits focused and use branches such as `feature/client-edit`, `fix/mobile-navigation`, or `docs/backend-design`.

```sh
git switch main
git pull --ff-only origin main
git switch -c feature/your-task
npm ci
npm run dev
```

Implement the issue, then:

```sh
npm run format
npm run validate
git status
git add path/to/changed-files
git commit -m "Describe the resulting change"
git push -u origin feature/your-task
```

Open a pull request on GitHub from your branch into `main`, link the issue, describe the behavior, and provide relevant test evidence/screenshots. Ask another teammate to review. Address comments, wait for CI, then squash-merge after approval. Update your local main with `git pull --ff-only` before starting another task. Do not force-push shared branches or commit build output, secrets, credentials, or real client data.

If main advances while your PR is open, merge `origin/main` into your feature branch and resolve conflicts with the affected teammate. Run validation again. Avoid editing shared formatting/configuration files incidentally in feature PRs.

## Commands

| Command                | Purpose                                           |
| ---------------------- | ------------------------------------------------- |
| `npm ci`               | Install the committed lockfile                    |
| `npm run dev`          | Development server at port 5173                   |
| `npm run format`       | Apply shared Prettier rules                       |
| `npm run format:check` | Check formatting without editing                  |
| `npm run check`        | Svelte diagnostics                                |
| `npm test`             | Focused server/preview unit tests                 |
| `npm run build`        | Node SSR production output                        |
| `npm start`            | Run built server                                  |
| `npm run test:e2e`     | Browser tests against a running production server |
| `npm run validate`     | The same required checks as CI                    |

For local production browser QA in PowerShell:

```powershell
$env:APP_ORIGIN='http://127.0.0.1:5180'
npm run build
$env:PORT='5180'
$env:HOST='127.0.0.1'
npm start
```

In a second terminal, run `npx playwright install chromium` once and `npm run test:e2e`. Close/clear those environment variables before building for a different host. Test screenshots and build artifacts are ignored.

## Design and backend conventions

Use the existing components and CSS variables. Keep view changes in the relevant view module. Keep private credentials, provider calls, and authorization under `src/lib/server` or server route files. Validate on the server, not just with HTML inputs. Never trust user-submitted owner IDs, roles, or visibility flags to grant access.

There is deliberately no persistence implementation yet. Do not build new features by mutating the sample fixture or pretending that a successful UI update saved data. Coordinate the schema and backend interfaces in one reviewed design PR before parallel integration work. Every real account/task/message mutation needs role and ownership/participation tests.
