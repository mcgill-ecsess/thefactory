# Deploying to Vercel

This repo has no `package.json` at the root (the app lives in `frontend/`). You must set the **Root Directory** to `frontend` and avoid wrong build overrides, or you'll get a **404 NOT_FOUND**.

## 1. Root Directory (required)

1. Vercel project → **Settings** → **General**.
2. **Root Directory** → **Edit** → set to **`frontend`** → Save.

## 2. Build & Development Settings (fix 404 after root is set)

If you still get 404 after setting Root Directory:

1. Go to **Settings** → **General** → **Build & Development Settings**.
2. **Framework Preset**: must be **Next.js** (or leave as "Other"; `frontend/vercel.json` sets `"framework": "nextjs"`).
3. **Output Directory**: leave **empty**. Do not set it to `dist`, `.next`, or anything else. Next.js is handled by Vercel; setting this can cause 404.
4. **Install Command**: leave default (`npm install`). The `frontend/.npmrc` (e.g. `legacy-peer-deps`) is used because the build runs from `frontend/`.
5. **Build Command**: leave default (`next build` or `npm run build`).

## 3. Redeploy with clean cache

1. Go to the **Deployments** tab.
2. Open the **⋯** menu on the latest deployment → **Redeploy**.
3. Check **Clear cache and deploy** → **Redeploy**.

## 4. Confirm the build actually succeeded

In **Deployments** → click the latest deployment → **Building** / **Logs**. Check that:

- `npm install` (or install step) finishes without errors.
- `next build` runs and completes (e.g. "Compiled successfully", "Generating static pages").
- No step fails or is skipped.

If the build fails, the deployment can still show a 404. Fix the error in the logs (e.g. missing env vars, Node version) then redeploy.
