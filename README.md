# Bunyod Baxodirzoa — Developer Portfolio

A personal portfolio website: dark theme, neon-blue accents, responsive, accessible, with an English / Uzbek language switch.

Built with plain **HTML, CSS and JavaScript**. There is no framework and no build step.

## File structure

```
bunyod-portfolio/
├── index.html              Page structure (sections, SEO tags)
├── css/
│   └── styles.css          All styles (colors are variables at the top)
├── js/
│   ├── config.js           ← YOUR CONTENT: skills, projects, contact links
│   ├── i18n.js             ← Interface text in English and Uzbek
│   └── main.js             Behaviour (menu, language switch, rendering)
├── assets/
│   ├── favicon.svg         Browser tab icon
│   ├── apple-touch-icon.png
│   ├── og-image.png        Preview image when the link is shared
│   └── projects/           Project thumbnails (placeholders for now)
└── .nojekyll               Tells GitHub Pages to serve files as they are
```

## Run it locally

**Option 1: just open it.** Double-click `index.html`. It works straight from your computer.

**Option 2: local server (recommended).** In this folder, run:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. (On some computers the command is `python3`.)

**Option 3: VS Code.** Install the *Live Server* extension, right-click `index.html`, then choose **Open with Live Server**. The page reloads every time you save.

## Edit your content

Most changes only need `js/config.js`.

### Add your contact links

Find `contacts` in `js/config.js` and paste your real links:

```js
{ id: "github", label: "GitHub", icon: "github", url: "https://github.com/your-real-username" },
{ id: "email",  label: { en: "Email", uz: "Elektron pochta" }, icon: "mail", url: "you@example.com" },
```

- An empty `url: ""` shows a dashed card that says **"Not added yet"**. It is not a link, so nobody gets sent to a fake account.
- For email you can write just the address; `mailto:` is added automatically.
- Optional: add `display: "@username"` to change the text shown under the name.

### Update a project

Each project in `projects` has these fields:

| Field | What it does |
| --- | --- |
| `title`, `description` | Text in `{ en: "...", uz: "..." }` form |
| `tech` | Technologies used, e.g. `["HTML", "CSS", "JavaScript"]` |
| `image` | Thumbnail path. Put a screenshot in `assets/projects/` and point to it |
| `imageAlt` | Short description of the screenshot (for screen readers) |
| `liveUrl`, `githubUrl` | Buttons appear **only** when these are filled in |
| `placeholder` | `true` shows a "Placeholder" badge. Set to `false` once the details are real |
| `featured` | `true` makes the card larger (use for your best project) |

Screenshots look best at a **16:10** ratio, for example 1280 × 800.

### Skills

Edit `skills.technologies` and `skills.tools`. Use `glyph: "TS"` for a short text icon, or `icon: "editor" | "terminal" | "palette"` for a drawn one.

### Text and translations

- Interface text (menu, headings, buttons, About paragraphs) lives in `js/i18n.js`, with an `en` block and a `uz` block.
- Content text (projects, skills) lives in `config.js` as `{ en: "...", uz: "..." }`.
- If an Uzbek translation is missing, the English text is shown instead.
- The visitor's language choice is remembered. You can link straight to the Uzbek version with `?lang=uz`, e.g. `https://your-site/?lang=uz`.

> Note: `index.html` also contains the English text, so search engines and visitors without JavaScript still see it. If you change wording in `i18n.js`, update the same sentence in `index.html` too.

### Name, age, colors

- Name and age are in `config.js` (`name`, `firstName`, `age`). The name also appears in `index.html` (`<title>`, meta tags, footer), so use *Find and Replace* to change it everywhere.
- Colors are CSS variables at the top of `css/styles.css` (`--accent`, `--cyan`, `--bg`, …).

## Deploy for free

### GitHub Pages

1. Push this folder to a GitHub repository (the files must be at the top level of the repo, next to `index.html`).
2. On GitHub, open the repository, then go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**, choose your branch (e.g. `main`) and the **/ (root)** folder, then click **Save**.
4. After a minute or two the address appears at the top of that page, usually `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

### Vercel

1. Sign in at <https://vercel.com> with your GitHub account.
2. Click **Add New… → Project** and import this repository.
3. Framework preset: **Other**. Leave the build command empty and the output directory as the project root.
4. Click **Deploy**. Vercel gives you an address like `https://your-project.vercel.app`.

### After deploying

Open `index.html` and, near the top:

1. Uncomment the `canonical` and `og:url` lines and put in your real address.
2. Change `og:image` to the full address, e.g. `https://your-site/assets/og-image.png`. Telegram, Instagram and other apps need the full URL to show the preview picture.

Then open your live site and check that every link you added actually works.

## Features

- Responsive layout for phone, tablet and desktop
- Mobile menu that works with the keyboard (Esc closes it)
- Smooth scrolling between sections, plus a "Skip to content" link
- Respects the "reduce motion" system setting
- SEO: title, description, Open Graph tags and structured data
- English by default, with an EN / UZ switch

Icons are adapted from [Lucide](https://lucide.dev) (ISC License). Fonts: Space Grotesk, Manrope and JetBrains Mono from Google Fonts.

---

## Oʻzbekcha qisqacha

- **Ochish:** `index.html` faylini ikki marta bosing yoki `python -m http.server 8000` buyrugʻini ishga tushirib, <http://localhost:8000> manziliga kiring.
- **Havolalar va loyihalar:** `js/config.js` faylini tahrirlang. Boʻsh qoldirilgan havola saytda tugma boʻlib chiqmaydi, oʻrnida "Hali qoʻshilmagan" yozuvi turadi.
- **Matnlar va tarjima:** interfeys matnlari `js/i18n.js` faylida (`en` va `uz`).
- **Joylash (bepul):** GitHub'da **Settings → Pages → Deploy from a branch → main / (root)** ni tanlang, yoki loyihani Vercel'ga import qiling.
