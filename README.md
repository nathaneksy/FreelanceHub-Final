# FreelanceHub

Shared project workspace for freelancers and their clients. This is the team's final-project starter, based on the Svelte/SvelteKit prototype. It is an independent repository, not a bakeoff branch or linked worktree.

## Current state

The interface runs as a **read-only preview with fictional data**. There is no database driver, local database, SQL query layer, password store, or session implementation. Accounts, invitations, and saving are deliberately unavailable until the team integrates its chosen backend. No input is persisted or silently accepted. Direct mutation and login requests return HTTP 503.

The role switch is a preview tool, **not authentication or access control**. All sample data is public; never put real client data in the fixtures. `event.locals.user` remains null. The client preview filters internal sample tasks only to demonstrate the intended interface. Real identity, role checks, ownership, and participant permissions must be implemented and tested on the server before using real accounts.

## Start developing

Install Node.js 24 and npm, then clone this new repository and run:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. No database account, seed command, or credentials are needed. Use the banner to switch freelancer/client preview. The original project requirements are in `docs/PROJECT_SPECIFICATION.docx`.

Optional local settings: copy `.env.example` to `.env`. Provider credentials will be added later; do not commit real environment files. `APP_ORIGIN` is an optional **build-time** canonical origin for SvelteKit 3; leave it unset locally. `PORT`/`HOST` configure the Node adapter at runtime. Keep CSRF origin protection enabled.

## Checks

```sh
npm run format
npm run validate
```

`validate` checks formatting, Svelte diagnostics, unit tests, and the production build. The lockfile is committed so CI and teammates install the same versions. Use `npm ci` after pulling dependency changes; use `npm install <package>` only when intentionally changing dependencies and commit both manifest and lockfile.

Production: `npm run build`, then `npm start`. For browser QA, build with `APP_ORIGIN=http://127.0.0.1:5180`, start with `PORT=5180` and `HOST=127.0.0.1`, install Chromium once (`npx playwright install chromium`), and run `npm run test:e2e` in another terminal. `E2E_BASE_URL` and `PLAYWRIGHT_CHROMIUM_EXECUTABLE` can select another server/browser. Stop the production server before rebuilding. See [development commands](CONTRIBUTING.md).

## Where to work

| Area                           | Files                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------- |
| Shared shell/navigation        | `src/routes/+page.svelte`, `src/routes/+layout.svelte`, `src/app.css`            |
| Dashboard/projects list        | `src/lib/views/DashboardView.svelte`                                             |
| Client management view         | `src/lib/views/ClientsView.svelte`                                               |
| Tasks/messages/project details | `src/lib/views/ProjectDetails.svelte`                                            |
| Profile view                   | `src/lib/views/ProfileView.svelte`                                               |
| Shared form components         | `src/lib/Action.svelte`, `Field.svelte`, `ProjectForm.svelte`, `WorkForm.svelte` |
| Server loads/actions           | `src/routes/+page.server.js`, `src/routes/login/+page.server.js`                 |
| Backend handoff                | `src/lib/server/backend.js`, `contracts.ts`, `docs/BACKEND_INTEGRATION.md`       |
| Temporary sample data          | `src/lib/server/preview.js`                                                      |

Forms remain disabled through the shared `Action` component. Server actions reject writes independently of the UI. `/api/health` reports application liveness and explicitly marks the database/authentication as not configured; it is not a database-readiness assertion.

## Team workflow

Start an issue, make a short-lived feature branch, open a pull request into `main`, pass CI, and get a teammate review before merging. Do not share passwords or make routine direct pushes to `main`. Each teammate uses their own clone and GitHub account. See [CONTRIBUTING.md](CONTRIBUTING.md) and [GitHub setup](docs/GITHUB_SETUP.md) for exact commands, collaborator invitations, and branch rules.

GitHub's required-review/check settings are configured in the remote repository, not automatically by these files. The included CI workflow and templates become available after the first push. Browser tests are available locally; CI currently runs format, diagnostics, unit tests, and build.

## Next work

1. Agree on provider, schema, migrations, and shared domain types.
2. Implement authentication, secure sessions, and invitations.
3. Replace preview loading with authorized repository calls, then implement mutations and permission tests.
4. Enable forms only after the actual server operations work.
5. Review each requirement in the specification and plan remaining field/feature work.

No automated deployment is configured for this starter. Agree on hosting, provider credentials, and environment separation first. Team members and responsibilities can be recorded in [docs/TEAM.md](docs/TEAM.md). Choose a project license with the team before adding one.

The changes and local verification evidence are summarized in [the starter review](docs/REVIEW.md).
