# freetoolonline-web

Static GitHub Pages site for FreeToolOnline.

## What this repo does

- Crawls the live site or a local preview site and exports rendered HTML into `dist/`.
- Keeps the site origin as `https://freetoolonline.com` while routing AJAX calls to the API origin.
- Deploys the static output to GitHub Pages through GitHub Actions.

## Environment

- `SOURCE_URL`: source site to crawl, default `https://freetoolonline.com`
- `API_ORIGIN`: API root injected into `getRootPath()`, default `https://service.us-east-1a.freetool.online/`
- `DIST_DIR`: output directory, default `dist`

## Local build

```bash
npm install
npx playwright install chromium
npm run export
```

The exporter fetches `sitemap.xml`, downloads each page, and rewrites the client bootstrap so AJAX endpoints point at `API_ORIGIN`.

## Deploy

GitHub Actions publishes the generated `dist/` directory to GitHub Pages.

## Cutover notes

- Set the GitHub Pages custom domain to `freetoolonline.com`.
- Point DNS for `freetoolonline.com` at GitHub Pages before disabling the old `web` Elastic Beanstalk environment.
- After cutover, verify `/ajax/*` traffic is landing on `webservice` and the old EB public IPv4 billing line disappears.
- See [`CUTOVER.md`](./CUTOVER.md) for the final handoff checklist.
