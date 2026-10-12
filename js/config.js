/*
 * ============================================================
 *  SITE CONFIG: edit this file to update your portfolio.
 * ============================================================
 *
 *  - Text that changes with the language uses { en: "...", uz: "..." }.
 *    If the "uz" value is missing, the English text is shown instead.
 *  - Leave a URL as "" (empty) until you have a real one.
 *    Empty links are NOT shown as clickable on the site.
 *  - Interface text (menu, headings, About text) lives in js/i18n.js.
 *  - Icon names come from js/icons.js: html, css, javascript, python,
 *    vscode, pycharm, canva, minecraft, github, telegram, instagram,
 *    youtube, email.
 */
window.SITE_CONFIG = {
  name: "Bunyod Baxodirzoda",
  firstName: "Bunyod",
  age: 15,
  defaultLanguage: "en",

  /* ---------------------------------------------------------- */
  /*  SKILLS                                                     */
  /* ---------------------------------------------------------- */
  skills: {
    technologies: [
      {
        name: "HTML",
        icon: "html",
        description: {
          en: "Structuring web pages with clear, semantic markup.",
          uz: "Veb-sahifalarni aniq va semantik tuzilma bilan qurish.",
        },
      },
      {
        name: "CSS",
        icon: "css",
        description: {
          en: "Styling layouts, colors and responsive designs.",
          uz: "Sahifalarni bezash, ranglar va moslashuvchan dizayn.",
        },
      },
      {
        name: "JavaScript",
        icon: "javascript",
        description: {
          en: "Adding interactivity and logic to websites.",
          uz: "Veb-saytlarga interaktivlik va mantiq qoʻshish.",
        },
      },
      {
        name: "Python",
        icon: "python",
        description: {
          en: "Writing scripts, small programs and games.",
          uz: "Skriptlar, kichik dasturlar va oʻyinlar yozish.",
        },
      },
    ],
    tools: [
      {
        name: "VS Code",
        icon: "vscode",
        description: {
          en: "Code editor I use for web projects.",
          uz: "Veb-loyihalar uchun foydalanadigan kod muharririm.",
        },
      },
      {
        name: "PyCharm",
        icon: "pycharm",
        description: {
          en: "IDE I use for Python projects.",
          uz: "Python loyihalari uchun foydalanadigan IDE.",
        },
      },
      {
        name: "Canva",
        icon: "canva",
        description: {
          en: "Designing graphics, thumbnails and visuals.",
          uz: "Grafika, muqova va vizual dizaynlar yaratish.",
        },
      },
    ],
  },

  /* Extra words for the big scrolling text (after the tools). */
  interests: [
    { name: "Minecraft", icon: "minecraft" },
    { name: { en: "Gaming", uz: "Oʻyinlar" } },
  ],

  /* ---------------------------------------------------------- */
  /*  PROJECTS                                                   */
  /*  placeholder: true  -> marked "Placeholder" on the site.    */
  /*  Set it to false once the real details are filled in.      */
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
      category: { en: "Website", uz: "Veb-sayt" },
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
      category: { en: "Bot", uz: "Bot" },
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
      category: { en: "Minecraft", uz: "Minecraft" },
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
      category: { en: "Game", uz: "Oʻyin" },
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
      category: { en: "Websites", uz: "Veb-saytlar" },
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
  /*  The email address also becomes the big link in Contact.    */
  /* ---------------------------------------------------------- */
  contacts: [
    { id: "github", label: "GitHub", icon: "github", url: "" },
    { id: "telegram", label: "Telegram", icon: "telegram", url: "" },
    { id: "email", label: { en: "Email", uz: "Elektron pochta" }, icon: "email", url: "" },
    { id: "instagram", label: "Instagram", icon: "instagram", url: "" },
    { id: "youtube", label: "YouTube", icon: "youtube", url: "" },
  ],
};
