/*
 * ============================================================
 *  INTERFACE TRANSLATIONS
 * ============================================================
 *  Every key in "en" should also exist in "uz". A missing "uz"
 *  key falls back to English automatically.
 *
 *  {name}, {firstName}, {age} and {year} are replaced with the
 *  values from js/config.js (year = the current year).
 *  In "about.scrub", words in [square brackets] become highlighted chips.
 *
 *  To add a language: copy the "en" block, give it a new code
 *  (e.g. "ru"), translate it, and add a button for it in
 *  index.html (inside .lang-switch).
 */
window.TRANSLATIONS = {
  en: {
    meta: {
      title: "{name} | Aspiring Developer & Web Creator",
      description:
        "Portfolio of {name}, a young developer from Uzbekistan who builds websites and explores programming with HTML, CSS, JavaScript and Python.",
    },
    a11y: {
      skip: "Skip to content",
      home: "{name}, back to top",
      mainNav: "Main",
      language: "Language",
      theme: "Switch between dark and light theme",
      newTab: "(opens in a new tab)",
    },
    header: {
      place: "Uzbekistan",
      theme: "Dark / Light",
    },
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      menu: "Menu",
    },
    hero: {
      status: "Open to new projects",
      place: "Uzbekistan",
      titleA11y: "Hi, I’m Bunyod.",
      line1: "Hi, I’m",
      line2: "Bunyod.",
      role1: "Aspiring Developer",
      role2: "Web Creator",
      role3: "Technology Enthusiast",
      text:
        "I'm a young developer from Uzbekistan who enjoys building websites, exploring programming, and turning creative ideas into digital projects.",
      ctaProjects: "Explore My Projects",
      ctaContact: "Contact Me",
      hint: "Hover over the letters",
    },
    about: {
      label: "( Who I am )",
      scrub:
        "I’m {firstName}, a {age}-year-old developer from Uzbekistan. I build [websites] with HTML, CSS and JavaScript, write [Python] programs and games, and spend my free time on [Minecraft] and gaming.",
      more:
        "I’m still learning, and I like it that way. Every project teaches me something new, and I’m always curious about the next tool, language or idea to try.",
      fact1: "years old, from Uzbekistan",
      fact2Value: "4",
      fact2: "technologies I build with: HTML, CSS, JavaScript and Python",
      fact3Value: "B1",
      fact3: "English level; I also speak Uzbek",
    },
    skills: {
      title: "Skills & tools",
      lead: "The languages and tools I use to build my projects.",
      technologies: "( Technologies )",
      tools: "( Tools )",
    },
    projects: {
      title: "My projects",
      lead: "Things I’ve built and am working on. Details, screenshots and links are on the way.",
      counter: "Project",
      placeholder: "Placeholder",
      featured: "Main project",
      techPending: "Tech stack: to be added",
      linksPending: "Links: coming soon",
      liveDemo: "Live Demo",
      github: "GitHub",
      notPublished: "not published yet",
      imageAltPlaceholder: "Placeholder image: screenshot coming soon",
      imageAlt: "Screenshot of {title}",
    },
    contact: {
      label: "( Have a project idea? )",
      headline: "Let’s build something together.",
      lead: "Have a project idea, a question, or want to work together? Message me on any platform below.",
      notAdded: "Not added yet",
    },
    footer: {
      copyright: "© {year} {name}\u00a0·\u00a0Uzbekistan",
      backToTop: "Back to top ↑",
    },
    noscript: "Turn on JavaScript to see this section.",
  },

  uz: {
    meta: {
      title: "{name} | Yosh dasturchi va veb-sayt yaratuvchisi",
      description:
        "{name} portfoliosi: veb-saytlar yaratadigan va HTML, CSS, JavaScript hamda Python bilan dasturlashni oʻrganayotgan oʻzbekistonlik yosh dasturchi.",
    },
    a11y: {
      skip: "Asosiy mazmunga oʻtish",
      home: "{name}, sahifa boshiga",
      mainNav: "Asosiy menyu",
      language: "Til",
      theme: "Qora va oq mavzu oʻrtasida almashtirish",
      newTab: "(yangi oynada ochiladi)",
    },
    header: {
      place: "Oʻzbekiston",
      theme: "Qora / Oq",
    },
    nav: {
      about: "Haqimda",
      skills: "Koʻnikmalar",
      projects: "Loyihalar",
      contact: "Bogʻlanish",
      menu: "Menyu",
    },
    hero: {
      status: "Yangi loyihalarga ochiq",
      place: "Oʻzbekiston",
      titleA11y: "Salom, men Bunyodman.",
      line1: "Salom, men",
      line2: "Bunyodman.",
      role1: "Yosh dasturchi",
      role2: "Veb-sayt yaratuvchisi",
      role3: "Texnologiya ishqibozi",
      text:
        "Men oʻzbekistonlik yosh dasturchiman. Veb-saytlar yaratish, dasturlashni oʻrganish va ijodiy gʻoyalarni raqamli loyihalarga aylantirishni yaxshi koʻraman.",
      ctaProjects: "Loyihalarimni koʻrish",
      ctaContact: "Bogʻlanish",
      hint: "Harflar ustiga kursorni olib boring",
    },
    about: {
      label: "( Men kimman )",
      scrub:
        "Men {firstName}, oʻzbekistonlik {age} yoshli dasturchiman. HTML, CSS va JavaScript bilan [veb-saytlar] yarataman, [Python] tilida dasturlar va oʻyinlar yozaman, boʻsh vaqtimni esa [Minecraft] va oʻyinlarga bagʻishlayman.",
      more:
        "Men hali oʻrganyapman va bu menga yoqadi. Har bir loyiha menga yangi narsa oʻrgatadi va men doim keyingi vosita, til yoki gʻoyani sinab koʻrishga qiziqaman.",
      fact1: "yoshdaman, Oʻzbekistondanman",
      fact2Value: "4",
      fact2: "ta texnologiya bilan ishlayman: HTML, CSS, JavaScript va Python",
      fact3Value: "B1",
      fact3: "ingliz tili darajam; oʻzbek tilida ham gapiraman",
    },
    skills: {
      title: "Koʻnikmalar va vositalar",
      lead: "Loyihalarimni yaratishda foydalanadigan tillar va vositalar.",
      technologies: "( Texnologiyalar )",
      tools: "( Vositalar )",
    },
    projects: {
      title: "Loyihalarim",
      lead: "Men yaratgan va ustida ishlayotgan loyihalar. Tafsilotlar, skrinshotlar va havolalar tez orada qoʻshiladi.",
      counter: "Loyiha",
      placeholder: "Vaqtinchalik",
      featured: "Asosiy loyiha",
      techPending: "Texnologiyalar: tez orada qoʻshiladi",
      linksPending: "Havolalar: tez orada",
      liveDemo: "Jonli demo",
      github: "GitHub",
      notPublished: "hali joylanmagan",
      imageAltPlaceholder: "Vaqtinchalik rasm: skrinshot tez orada qoʻshiladi",
      imageAlt: "{title} skrinshoti",
    },
    contact: {
      label: "( Loyiha gʻoyangiz bormi? )",
      headline: "Keling, birga nimadir yaratamiz.",
      lead: "Loyiha gʻoyangiz, savolingiz bormi yoki birga ishlashni xohlaysizmi? Quyidagi platformalarning istalganida menga yozing.",
      notAdded: "Hali qoʻshilmagan",
    },
    footer: {
      copyright: "© {year} {name}\u00a0·\u00a0Oʻzbekiston",
      backToTop: "Yuqoriga ↑",
    },
    noscript: "Bu boʻlimni koʻrish uchun JavaScriptni yoqing.",
  },
};
