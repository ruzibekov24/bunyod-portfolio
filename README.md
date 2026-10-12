# Bunyod Baxodirzoda — Developer Portfolio

A personal portfolio website with a dark / light theme, smooth scroll animations, an English / Uzbek language switch, and responsive, accessible layouts.

Built with plain **HTML, CSS and JavaScript**. There is no framework and no build step. Animations use [GSAP](https://gsap.com) + ScrollTrigger and [Lenis](https://lenis.darkroom.engineering) smooth scrolling, included locally in `vendor/`.

## File structure

```
bunyod-portfolio/
├── index.html              Page structure (sections, SEO tags)
├── css/
│   └── styles.css          All styles (colors are variables at the top)
├── js/
│   ├── config.js           ← YOUR CONTENT: skills, projects, contact links
│   ├── i18n.js             ← Interface text in English and Uzbek
│   ├── icons.js            Brand icons (HTML, Python, GitHub, Telegram…)
│   └── main.js             Behaviour: rendering, theme, menu, animations
├── vendor/                 GSAP, ScrollTrigger and Lenis (do not edit)
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

- An empty `url: ""` shows a muted row that says **"Not added yet"**. It is not a link, so nobody gets sent to a fake account.
- For email you can write just the address; `mailto:` is added automatically. Your email then also becomes the big link in the Contact section.
- Added links also appear in the footer.
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
| `category` | Short label shown above the title, e.g. `{ en: "Website", uz: "Veb-sayt" }` |
| `placeholder` | `true` shows a red "Placeholder" label. Set to `false` once the details are real |
| `featured` | `true` adds a "Main project" label (use for your best project) |

Screenshots look best at a **16:10** ratio, for example 1280 × 800.

### Skills

Edit `skills.technologies` and `skills.tools`. `icon` is a name from `js/icons.js` (`html`, `css`, `javascript`, `python`, `vscode`, `pycharm`, `canva`, `minecraft`, …). The big scrolling text below Skills is built from these lists plus `interests`.

To add a new brand icon, copy its SVG path from [simpleicons.org](https://simpleicons.org) into `js/icons.js`.

### Text and translations

- Interface text (menu, headings, buttons, About text) lives in `js/i18n.js`, with an `en` block and a `uz` block. In `about.scrub`, words in `[square brackets]` become highlighted chips.
- Content text (projects, skills) lives in `config.js` as `{ en: "...", uz: "..." }`.
- If an Uzbek translation is missing, the English text is shown instead.
- The visitor's language choice is remembered. You can link straight to the Uzbek version with `?lang=uz`, e.g. `https://your-site/?lang=uz`.

> Note: `index.html` also contains the English text, so search engines and visitors without JavaScript still see it. If you change wording in `i18n.js`, update the same sentence in `index.html` too.

### Name, age, colors

- Name and age are in `config.js` (`name`, `firstName`, `age`). The name also appears in `index.html` (`<title>`, meta tags, footer), so use *Find and Replace* to change it everywhere.
- Colors are CSS variables at the top of `css/styles.css`: one block for the light theme (`:root`) and one for the dark theme (`:root[data-theme="dark"]`). Change `--accent` to change the red highlight color.
- If you change the hero headline, also update the `&text=` list in the display-font `<link>` in `index.html` (and `FONT_SAMPLE` in `js/main.js`) so every letter has the fun fonts.

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

- **Hero letters:** hover (or tap) a letter and it jumps into a random display font; letters also change on their own every few seconds
- **Smooth scrolling** (Lenis) and blur-in reveals as sections enter the screen
- **About text** that lights up word by word as you scroll
- **Scrolling marquee** of technologies that speeds up with your scroll
- **Pinned project showcase:** the Projects section stays on screen while scrolling flips through each project and its screenshot
- Dark / light theme (remembered), a live Uzbekistan clock, and a dot grid that lights up around the cursor
- Responsive layout for phone, tablet and desktop, plus a mobile menu that works with the keyboard (Esc closes it)
- Respects the "reduce motion" setting: animations turn off and projects are shown as a simple list
- SEO: title, description, Open Graph tags and structured data
- English by default, with an EN / UZ switch

Credits: design language based on [ilyos.pages.dev](https://ilyos.pages.dev). Fonts are Geist, Geist Mono and display fonts from Google Fonts. Brand icons come from [Simple Icons](https://simpleicons.org) (CC0). GSAP is under its [standard no-charge license](https://gsap.com/standard-license) and Lenis is MIT.

---

## Oʻzbekcha qisqacha

- **Ochish:** `index.html` faylini ikki marta bosing yoki `python -m http.server 8000` buyrugʻini ishga tushirib, <http://localhost:8000> manziliga kiring.
- **Havolalar va loyihalar:** `js/config.js` faylini tahrirlang. Boʻsh qoldirilgan havola saytda tugma boʻlib chiqmaydi, oʻrnida "Hali qoʻshilmagan" yozuvi turadi.
- **Matnlar va tarjima:** interfeys matnlari `js/i18n.js` faylida (`en` va `uz`).
- **Ranglar:** `css/styles.css` boshidagi `--accent` va boshqa oʻzgaruvchilar (yorugʻ va qorongʻi mavzu uchun alohida).
- **Joylash (bepul):** GitHub'da **Settings → Pages → Deploy from a branch → main / (root)** ni tanlang, yoki loyihani Vercel'ga import qiling.
