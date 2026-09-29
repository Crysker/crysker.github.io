# Serkan Sönmez – Portfolio

Plain HTML/CSS/JS, no build step. Open `index.html` in a browser to preview.

## Files
- `index.html` – page structure
- `styles.css` – all styling (colors are variables at the top)
- `main.js` – **all texts (EN + DE)**, project data, stack cards
- `assets/thesis/` – thesis screenshots

- `assets/Serkan-Soenmez-CV-DE.pdf` – CV, linked via `CV_URL` at the top of `main.js`

## Linking a single project
Every project has its own link that opens it directly – handy in cover letters:
`https://crysker.github.io/#project-historia` (also `sounds`, `grim`, `paper`, `hue`).

## After changing styles.css or main.js
Bump the `?v=` number where the file is linked at the bottom/top of `index.html`,
otherwise returning visitors may get a mix of old and new files for up to 10 minutes.

## Placeholders
Texts in `[brackets]` in `main.js` are never shown on the page, and a project whose
summary is still a placeholder is hidden entirely. Still open: the #SaveTheOcean texts.

## Publish free on GitHub Pages
1. Create a repo (e.g. `portfolio`) on github.com and upload all files.
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / root → Save.
3. After ~1 min it's live at `https://<username>.github.io/portfolio/`.
4. Own domain: buy e.g. `serkan-soenmez.at`, enter it under Settings → Pages → Custom domain,
   and set the DNS records your registrar shows (GitHub docs: "Managing a custom domain").
