Deploying to Netlify

1. Create a Netlify site

- In Netlify, click "Add new site" → "Import from Git" and connect your GitHub/Git provider.
- Select the `GosalaDavid/my-streaming-dashboard` repository and the `main` branch.

2. Configure build settings

- Build command: `npm --prefix ./--experimental-app run build`
- Publish directory: leave as default or set to `--experimental-app/.next` (the plugin will manage outputs)

3. Environment variables

- Add the following environment variables in Netlify Site settings → Build & deploy → Environment:
  - `NEXT_PUBLIC_TMDB_API_KEY` = 9d5b686a767f229bf24631bd80bdbc33
  - If you use any other secrets add them here (e.g., `TMDB_API_KEY`)

4. Netlify plugin

- The repository includes `netlify.toml` which enables the official Netlify Next.js plugin. The root `package.json` includes the plugin in `devDependencies` so Netlify will install it during the build.

5. Local testing

- To test the build locally run:

```powershell
npm install
npm run build
npm --prefix ./--experimental-app run start
```

6. Troubleshooting

- If the build fails on Netlify with router/SSR errors, ensure pages that rely on client-only APIs are either:

  - Marked as client components (`"use client"`) and/or wrapped so they don't run on the server, or
  - Converted to Next app-router equivalents.

- If you need me to make additional changes for Netlify compatibility (move pages to `app/`, convert router usage, or disable prerender for specific pages), tell me which you'd prefer and I will implement them.
