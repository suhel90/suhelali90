# Portfolio Website — Suhel Ali

A static portfolio built with plain HTML, CSS and JavaScript. No frameworks, no build step.

## Run it locally

Open `index.html` in any modern browser. That is all.

Optional: for a closer match to the live site, serve the folder instead:

```
cd portfolio
python3 -m http.server 8000
```

then visit http://localhost:8000. (When served this way the site can also detect missing PDFs and disable their buttons; opened straight from disk, browsers block that check, so the buttons stay enabled.)

## Files and exact filenames

```
portfolio/
├── index.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/script.js                 <- all your content lives at the top of this file
    ├── images/profile.jpg           <- passport-size photo (35:45)
    └── documents/
        ├── resume.pdf               <- add your own
        ├── class-12-marksheet.pdf   <- add your own
        ├── class-10-marksheet.pdf   <- add your own
        └── certificates/            <- empty, no certifications for now
```

Names must match exactly (lowercase, hyphens). Until a PDF is added, its button is disabled with a friendly note when the site is served over http(s). Nothing is faked.

## Updating your content

Open `assets/js/script.js`. Section **1. CONFIGURATION** holds everything:

| What | Where |
|---|---|
| Name, headline, intro, About text, email | `PERSONAL` |
| LinkedIn / GitHub / HackerRank | `SOCIAL_LINKS` |
| Education | `EDUCATION` |
| Technical foundations | `SKILLS` |
| Projects | `PROJECTS` |
| Extracurricular achievements | `ACHIEVEMENTS` |
| Resume and marksheets | `RESUME_FILE`, `ACADEMIC_DOCUMENTS` |

The colours of the sky-blue theme are the variables at the top of `assets/css/style.css`.
The DNA background animation is `initHeroCanvas()` in `script.js`.

## Replacing the profile photo

Save your photo as `assets/images/profile.jpg` (replace the existing file). A portrait crop around 900×1000 px works best.

## Adding documents

Save your resume as `assets/documents/resume.pdf`, and your Class XII and Class X marksheets as `class-12-marksheet.pdf` and `class-10-marksheet.pdf` in `assets/documents/`.

## Contact form

A static site has no server, so the form cannot deliver messages. It opens the visitor's own email app with a prepared draft and says plainly that nothing is sent until they press Send. To receive messages directly, connect an external form service (e.g. Formspree or Web3Forms).

## Deploy to GitHub Pages

1. Create a GitHub repository and upload the *contents* of `portfolio/` (so `index.html` is at the repository root).
2. Repository **Settings → Pages**.
3. Under *Build and deployment*, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
4. After a minute your site is live at `https://<username>.github.io/<repository>/`.

Netlify and Cloudflare Pages also work: drag the `portfolio` folder into their dashboard; no build settings needed.

## Privacy note

The marksheet PDFs are publicly downloadable once the site is live, and they may contain personal details. Consider whether you want them public, or share them only on request (remove the entries from `ACADEMIC_DOCUMENTS`).

## Accessibility

Skip link, semantic landmarks, keyboard-operable menu (Esc closes it), visible focus outlines, and `prefers-reduced-motion` support (animations and the hero background stop).
