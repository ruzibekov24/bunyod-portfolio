/*
 * ============================================================
 *  SITE CONFIG: edit this file to update your portfolio.
 * ============================================================
 *
 *  - Text that changes with the language uses { en: "...", uz: "..." }.
 *    If the "uz" value is missing, the English text is shown instead.
 *  - Leave a URL as "" (empty) until you have a real one.
 *    Empty links are NOT shown as clickable buttons on the site.
 *  - Interface text (menu, buttons, headings) lives in js/i18n.js.
 */
window.SITE_CONFIG = {
  name: "Bunyod Baxodirzoa",
  firstName: "Bunyod",
  age: 15,
  defaultLanguage: "en",

  /* ---------------------------------------------------------- */
  /*  SKILLS                                                     */
  /*  "glyph" shows short text in the icon tile (e.g. "TS").     */
  /*  "icon" uses a drawn icon: editor | terminal | palette      */
  /* ---------------------------------------------------------- */
  skills: {
    technologies: [
      {
        name: "HTML",
        glyph: "</>",
        description: {
          en: "Structuring web pages with clear, semantic markup.",
          uz: "Veb-sahifalarni aniq va semantik tuzilma bilan qurish.",
        },
      },
      {
        name: "CSS",
        glyph: "{ }",
        description: {
          en: "Styling layouts, colors and responsive designs.",
          uz: "Sahifalarni bezash, ranglar va moslashuvchan dizayn.",
        },
      },
      {
        name: "JavaScript",
        glyph: "JS",
        description: {
          en: "Adding interactivity and logic to websites.",
          uz: "Veb-saytlarga interaktivlik va mantiq qoʻshish.",
        },
      },
      {
        name: "Python",
        glyph: "Py",
        description: {
          en: "Writing scripts, small programs and games.",
          uz: "Skriptlar, kichik dasturlar va oʻyinlar yozish.",
        },
      },
    ],
    tools: [
      {
        name: "Visual Studio Code",
        icon: "editor",
        description: {
          en: "Code editor I use for web projects.",
          uz: "Veb-loyihalar uchun foydalanadigan kod muharririm.",
        },
      },
      {
        name: "PyCharm",
        icon: "terminal",
        description: {
          en: "IDE I use for Python projects.",
          uz: "Python loyihalari uchun foydalanadigan IDE.",
        },
      },
      {
        name: "Canva",
        icon: "palette",
        description: {
          en: "Designing graphics, thumbnails and visuals.",
          uz: "Grafika, muqova va vizual dizaynlar yaratish.",
        },
      },
    ],
  },

  /* ---------------------------------------------------------- */
  /*  PROJECTS                                                   */
  /*  placeholder: true  -> card is marked "Placeholder".        */
  /*  Set it to false once the real details are filled in.       */
  /*  featured: true     -> card is shown larger.                */
  /*  tech: ["HTML", "CSS"] -> technologies used.                */
  /*  image: swap the .svg for a real screenshot, e.g.           */
  /*         "assets/projects/gaming-hub.png" (16:10 works best) */
  /*  liveUrl / githubUrl: only shown when they are not empty.   */
  /* ---------------------------------------------------------- */
  projects: [
    {
      featured: true,
      placeholder: true,
      title: { en: "Gaming Hub Website", uz: "Gaming Hub veb-sayti" },
      description: {
        en: "My main website project. A full description is coming soon.",
        uz: "Asosiy veb-sayt loyiham. Toʻliq tavsif tez orada qoʻshiladi.",
      },
      tech: [],
      image: "assets/projects/gaming-hub.svg",
      imageAlt: null,
      liveUrl: "",
      githubUrl: "",
    },
    {
      placeholder: true,
      title: { en: "Telegram Bot", uz: "Telegram bot" },
      description: {
        en: "A Telegram bot project. A full description is coming soon.",
        uz: "Telegram bot loyihasi. Toʻliq tavsif tez orada qoʻshiladi.",
      },
      tech: [],
      image: "assets/projects/telegram-bot.svg",
      imageAlt: null,
      liveUrl: "",
      githubUrl: "",
    },
    {
      placeholder: true,
      title: { en: "Minecraft Project", uz: "Minecraft loyihasi" },
      description: {
        en: "A Minecraft-related project. A full description is coming soon.",
        uz: "Minecraft bilan bogʻliq loyiha. Toʻliq tavsif tez orada qoʻshiladi.",
      },
      tech: [],
      image: "assets/projects/minecraft.svg",
      imageAlt: null,
      liveUrl: "",
      githubUrl: "",
    },
    {
      placeholder: true,
      title: { en: "Python Game", uz: "Python oʻyini" },
      description: {
        en: "A game written in Python. A full description is coming soon.",
        uz: "Python tilida yozilgan oʻyin. Toʻliq tavsif tez orada qoʻshiladi.",
      },
      tech: ["Python"],
      image: "assets/projects/python-game.svg",
      imageAlt: null,
      liveUrl: "",
      githubUrl: "",
    },
    {
      placeholder: true,
      title: { en: "Other Websites", uz: "Boshqa veb-saytlar" },
      description: {
        en: "Other websites I have built. Details are coming soon.",
        uz: "Men yaratgan boshqa veb-saytlar. Tafsilotlar tez orada.",
      },
      tech: [],
      image: "assets/projects/other-websites.svg",
      imageAlt: null,
      liveUrl: "",
      githubUrl: "",
    },
  ],

  /* ---------------------------------------------------------- */
  /*  CONTACT LINKS                                              */
  /*  Paste your real profile links. Examples (do not copy):     */
  /*    GitHub:    "https://github.com/USERNAME"                 */
  /*    Telegram:  "https://t.me/USERNAME"                       */
  /*    Email:     "name@example.com"  (mailto: is added)        */
  /*    Instagram: "https://instagram.com/USERNAME"              */
  /*    YouTube:   "https://youtube.com/@CHANNEL"                */
  /*  Optional: display: "@username" to change the shown text.   */
  /* ---------------------------------------------------------- */
  contacts: [
    { id: "github", label: "GitHub", icon: "github", url: "" },
    { id: "telegram", label: "Telegram", icon: "telegram", url: "" },
    { id: "email", label: { en: "Email", uz: "Elektron pochta" }, icon: "mail", url: "" },
    { id: "instagram", label: "Instagram", icon: "instagram", url: "" },
    { id: "youtube", label: "YouTube", icon: "youtube", url: "" },
  ],
};
