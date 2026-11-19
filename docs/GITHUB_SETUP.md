# Create the final team repository

The local `freelancehub-final` folder is independent of all bakeoff repositories. Publish it as a new repository, suggested name **FreelanceHub-Final**. The remote repository has not been created automatically. GitHub CLI is not installed and GitHub account access is not connected in this session.

## Owner's initial setup

1. On GitHub, create a new empty repository. Use your team organization if available, otherwise the designated owner's account. Choose visibility according to the team's/course's requirements. Do not initialize a README, license, or ignore file; these source files already exist locally.
2. From `freelancehub-final`, add its actual URL and push:

```sh
git remote add origin https://github.com/YOUR-OWNER/FreelanceHub-Final.git
git push -u origin main
```

Replace the owner/repository names with the actual new URL. Do not reuse the bakeoff remote. If `origin` already exists, inspect `git remote -v` before changing it.

3. In repository Settings → Collaborators (or the organization's access/team settings), invite each teammate's GitHub account with permission to contribute. Each must accept the invitation. Do not share the owner's password or token.
4. Let the first CI run finish. In branch protection or rulesets for `main`, require a pull request, at least one teammate approval, resolved conversations, and the **Validate** status check. Prevent force pushes/deletion of main and direct routine pushes. Require up-to-date checks if appropriate. Availability depends on repository visibility/account plan; if the plan cannot enforce the rules, agree to follow the review process manually. No settings have been applied remotely by these files.
5. Enable squash merging and optionally automatic deletion of merged branches. Agree on who merges reviewed PRs. Add reviewers/CODEOWNERS only after the actual teammates' usernames are known.

## Each teammate

```sh
git clone https://github.com/YOUR-OWNER/FreelanceHub-Final.git
cd FreelanceHub-Final
npm ci
npm run dev
```

Follow [CONTRIBUTING.md](../CONTRIBUTING.md): create your own feature branch, push it, open a pull request into main, get review and CI approval, then merge. Pull requests are GitHub's review mechanism; `git pull` updates your local branch.

If the original owner's terminal reports Git's ownership warning because this starter was created by the assistant's sandbox account, trust only this folder once:

```powershell
git config --global --add safe.directory 'C:/Users/natha/OneDrive/WDD 430/freelancehub-final'
```

Teammates who clone normally should not need that exception.

Official references: [collaborator access](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository), [protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).
