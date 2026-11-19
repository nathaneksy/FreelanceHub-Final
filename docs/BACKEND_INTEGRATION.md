# Backend integration handoff

## Removed from the prototype

The prior database module, embedded queries/schema initialization, password hashing, sessions, invitation consumption, mutations, database-dependent tests, seed data, and storage/hosting settings were not carried into this repository. No database package, runtime local-file database access, or migration runs here. This starter deliberately does not pick a replacement provider.

`preview.js` provides cloned fictional data for interface development, not an in-memory application database. Writes fail with 503; sample identities never enter `locals.user`. Login does not accept credentials. The role query parameter only controls the sample UI and offers no security guarantees.

## Decide together before implementation

- Provider and schema: logical users, workspaces/owners, clients, projects, tasks/milestones, messages, invitations, and session/auth identity association.
- Consistent ID types, field naming, timestamps, nullability, archive semantics, migrations, and transaction support. Current UI fixtures use the prototype's numeric IDs and snake_case fields; map provider results to a documented shared view model instead of leaking raw provider rows.
- Authentication: hosted identity vs custom credentials, signup/login/logout, session cookies, password reset/email verification, and the secure single-use client association flow.
- Environment separation, credential names, local/test setup, deterministic test fixtures, and how migrations are applied. Add variable names to `.env.example`; store actual secrets locally and in the host/GitHub settings.

`contracts.ts` contains initial async interface shapes only. Replace `unknown` results with agreed domain types and explicit mutation methods in the design PR. These interfaces are not a claim that a backend is implemented.

## Integration order

1. Implement/test the selected provider in server-only modules. Keep provider connections out of Svelte components.
2. Resolve verified identity in `hooks.server.js`. Set `event.locals.user` only after verification. Expired/revoked sessions must be rejected.
3. Replace `previewWorkspace()` in the root server load. Return only records authorized for that user; redirect anonymous users to login. Keep internal work out of client responses entirely.
4. Implement signup/login/logout with validated inputs and explicit provider failures. Consume invitations atomically, match the intended contact, and prevent duplicate association.
5. Implement validated mutations. Check role, workspace ownership, project association, and message authorship/participant rules on every request. Do not trust posted user/owner/role IDs. Protect form origins and keep private responses uncached.
6. Replace the current 503 actions, set the real capability flags, and enable the shared form fieldset only when actual operations are ready. Remove public role switching and the sample preview from the real-account workflow.
7. Replace preview tests with backend integration tests and add both role journeys to browser QA. Upgrade health checks to readiness only when a provider is connected.

## Acceptance tests required before real data

- Anonymous requests cannot read private resources or mutate them.
- Freelancers cannot read or change another workspace by changing an ID.
- Clients read only linked projects and never receive internal tasks.
- Clients cannot mutate clients, projects, tasks, or progress using forged POSTs.
- Participants post within authorized projects; authors or workspace owners edit/delete messages.
- Invitation replay, mismatched email, and duplicate account association are rejected.
- Signup/login/logout/expiry work, with secrets and hashes absent from client payloads and logs.
- Validation failures preserve useful context and do not report false success.
- Archive/history and confirmed task deletion match the specification.

The original project specification remains the product contract. The copied interface still omits some proposed fields (for example project start dates, richer profile/contact information, and task priority/description). Track those as issues rather than assuming the prototype completed the final project's scope.
