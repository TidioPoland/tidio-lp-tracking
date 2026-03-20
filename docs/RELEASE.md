# Release process — `tidio-lp-tracking`

A short guide to **shipping new features**, **bumping the version**, and **publishing a tag** on GitHub.

## Semantic versioning

- **PATCH** (`0.2.0` → `0.2.1`) — fixes and small backward-compatible changes  
- **MINOR** (`0.2.1` → `0.3.0`) — new features, still backward compatible  
- **MAJOR** (`0.3.0` → `1.0.0`) — breaking changes (when you move to a stable API)

Version format in `package.json`: `x.y.z` (e.g. `0.2.1`).

---

## Recommended workflow: `release.sh` 

Use this **after** your feature work is committed and pushed (including `src/`, `dist/`, docs).

### 1. Ship the feature (normal PR / commits)

```bash
npm run build
git add .
git status   # ensure src/ and dist/ are included
git commit -m "feat: short description"
git push origin "$(git branch --show-current)"
```

### 2. Cut a release with the script

From the repo root:

```bash
chmod +x ./release.sh   # once, if needed
./release.sh 0.2.2
```

What `release.sh` does:

1. Sets the version in `package.json` and `package-lock.json` (`npm version … --no-git-tag-version`, which also runs the `version` script: build + stage `dist`)  
2. Runs `npm run build` again so `dist/` matches the release  
3. Commits **`package.json` + `package-lock.json` + `dist/`** with `chore: bump version to vX.Y.Z`  
4. Creates tag `vX.Y.Z`  
5. Pushes the **current branch** to `origin` and pushes the tag (`git push origin vX.Y.Z`)

### 3. Verify

- GitHub → **Tags**: `vX.Y.Z` exists  
- Install in a consumer app:

```bash
npm install "github:TidioPoland/tidio-lp-tracking#v0.2.2"
```

---

## Pre-release checklist (before `./release.sh`)

1. Feature changes in `src/` are merged or committed.  
2. **`npm run build`** succeeds.  
3. Your feature commit includes **updated `dist/`** (this package ships compiled output).  
   After `./release.sh`, **`package-lock.json`** on `origin` should match `package.json` (the script stages all three).  
4. `README.md` / types updated if the public API changed.

---

## Manual workflow (Option B — optional)

Use this if you cannot run the script or need full control over each Git step. See the previous revision history or ask maintainers — the steps are: bump version, build, commit `package.json` + `dist/`, tag, `git push` branch, `git push origin vX.Y.Z`.

---

## Common pitfall: “the tag didn’t publish”

- Tags are **not** pushed by `git push` alone — `release.sh` runs `git push origin vX.Y.Z` for you.  
- If you tag manually, always: `git push origin <branch>` **and** `git push origin vX.Y.Z`.

---

## Short checklist for agents / Cursor (skill)

1. Implement in `src/`, `npm run build`, commit **including `dist/`**, push feature.  
2. Run `./release.sh X.Y.Z`.  
3. Confirm tag on GitHub.

---

*Last updated: January 2026*
