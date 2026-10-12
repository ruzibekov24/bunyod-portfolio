/*
 * ============================================================
 *  INTERFACE TRANSLATIONS
 * ============================================================
 *  Every key in "en" should also exist in "uz". A missing "uz"
 *  key falls back to English automatically.
 *
 *  {name}, {firstName}, {age} and {year} are replaced with the
 *  values from js/config.js (year = the current year).
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
      home: "{firstName}, back to top",
      mainNav: "Main",
      language: "Language",
      newTab: "(opens in a new tab)",
    },
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      menu: "Menu",
    },
    hero: {
      eyebrow: "// hello, world",
      titleBefore: "Hi, I'm ",
      titleAfter: ".",
      role1: "Aspiring Developer",
      role2: "Web Creator",
      role3: "Technology Enthusiast",
      text:
        "I'm a young developer from Uzbekistan who enjoys building websites, exploring programming, and turning creative ideas into digital projects.",
      ctaProjects: "Explore My Projects",
      ctaContact: "Contact Me",
    },
    about: {
      eyebrow: "01 / About",
      title: "A little about me",
      p1:
        "I'm {firstName}, a {age}-year-old developer from Uzbekistan. I enjoy building websites, exploring programming and turning creative ideas into real digital projects.",
      p2:
        "On the web I work with HTML, CSS and JavaScript, and I use Python for programming projects like games. Many of my ideas come from the things I enjoy most: Minecraft, gaming and technology.",
      p3:
        "I'm still learning, and I like it that way. Every project teaches me something new, and I'm always curious about the next tool, language or idea to try.",
      factAge: "Age",
      factLocation: "Location",
      factLocationValue: "Uzbekistan",
      factLanguages: "Languages",
      factLanguagesValue: "Uzbek, English (B1)",
      factInterests: "Interests",
      factInterestsValue: "Minecraft, gaming, programming, technology",
    },
    skills: {
      eyebrow: "02 / Skills",
      title: "Skills & tools",
      lead: "The languages and tools I use to build my projects.",
      technologies: "Technologies",
      tools: "Tools",
    },
    projects: {
      eyebrow: "03 / Projects",
      title: "My projects",
      lead: "Things I have built and am working on. More details are on the way.",
      placeholder: "Placeholder",
      featured: "Main project",
      techLabel: "Technologies used",
      techPending: "Tech stack: to be added",
      linksPending: "Links: coming soon",
      liveDemo: "Live Demo",
      github: "GitHub",
      imageAltPlaceholder: "Placeholder image: screenshot coming soon",
      imageAlt: "Screenshot of {title}",
    },
    contact: {
      eyebrow: "04 / Contact",
      title: "Let's build something together",
      lead: "Have a project idea, a question, or want to work together? Reach out on any of the platforms below.",
      notAdded: "Not added yet",
    },
    footer: {
      copyright: "© {year} {name}. All rights reserved.",
      built: "Built with HTML, CSS & JavaScript.",
      backToTop: "Back to top",
    },
    noscript: "Turn on JavaScript to see this section.",
  },

  uz: {
    meta: {
      title: "{name} | Yosh dasturchi va veb-sayt yaratuvchisi",
      description:
        "{name} portfoliosi: veb-saytlar yaratadigan va HTML, CSS, JavaScript hamda Python bilan dasturlashni oʻrganayotgan Oʻzbekistonlik yosh dasturchi.",
    },
    a11y: {
      skip: "Asosiy mazmunga oʻtish",
      home: "{firstName}, sahifa boshiga",
      mainNav: "Asosiy menyu",
      language: "Til",
      newTab: "(yangi oynada ochiladi)",
    },
    nav: {
      about: "Men haqimda",
      skills: "Koʻnikmalar",
      projects: "Loyihalar",
      contact: "Aloqa",
      menu: "Menyu",
    },
    hero: {
      eyebrow: "// salom, dunyo",
      titleBefore: "Salom, men ",
      titleAfter: "man.",
      role1: "Yosh dasturchi",
      role2: "Veb-sayt yaratuvchisi",
      role3: "Texnologiya ishqibozi",
      text:
        "Men Oʻzbekistonlik yosh dasturchiman. Veb-saytlar yaratish, dasturlashni oʻrganish va ijodiy gʻoyalarni raqamli loyihalarga aylantirishni yaxshi koʻraman.",
      ctaProjects: "Loyihalarimni koʻrish",
      ctaContact: "Bogʻlanish",
    },
    about: {
      eyebrow: "01 / Men haqimda",
      title: "Men haqimda qisqacha",
      p1:
        "Men {firstName}, Oʻzbekistonlik {age} yoshli dasturchiman. Veb-saytlar yaratish, dasturlashni oʻrganish va ijodiy gʻoyalarni haqiqiy raqamli loyihalarga aylantirishni yaxshi koʻraman.",
      p2:
        "Veb-saytlar uchun HTML, CSS va JavaScript bilan ishlayman, oʻyinlar kabi dasturlash loyihalari uchun esa Python tilidan foydalanaman. Koʻp gʻoyalarim eng sevgan narsalarimdan kelib chiqadi: Minecraft, oʻyinlar va texnologiya.",
      p3:
        "Men hali oʻrganyapman va bu menga yoqadi. Har bir loyiha menga yangi narsa oʻrgatadi, va men doim keyingi vosita, til yoki gʻoyani sinab koʻrishga qiziqaman.",
      factAge: "Yosh",
      factLocation: "Joylashuv",
      factLocationValue: "Oʻzbekiston",
      factLanguages: "Tillar",
      factLanguagesValue: "Oʻzbek, ingliz (B1)",
      factInterests: "Qiziqishlar",
      factInterestsValue: "Minecraft, oʻyinlar, dasturlash, texnologiya",
    },
    skills: {
      eyebrow: "02 / Koʻnikmalar",
      title: "Koʻnikmalar va vositalar",
      lead: "Loyihalarimni yaratishda foydalanadigan tillar va vositalar.",
      technologies: "Texnologiyalar",
      tools: "Vositalar",
    },
    projects: {
      eyebrow: "03 / Loyihalar",
      title: "Loyihalarim",
      lead: "Men yaratgan va ustida ishlayotgan loyihalar. Batafsil maʼlumot tez orada qoʻshiladi.",
      placeholder: "Namuna",
      featured: "Asosiy loyiha",
      techLabel: "Foydalanilgan texnologiyalar",
      techPending: "Texnologiyalar: tez orada qoʻshiladi",
      linksPending: "Havolalar: tez orada",
      liveDemo: "Jonli demo",
      github: "GitHub",
      imageAltPlaceholder: "Namuna rasm: skrinshot tez orada qoʻshiladi",
      imageAlt: "{title} skrinshoti",
    },
    contact: {
      eyebrow: "04 / Aloqa",
      title: "Keling, birga nimadir yaratamiz",
      lead: "Loyiha gʻoyangiz, savolingiz bormi yoki birga ishlashni xohlaysizmi? Quyidagi platformalarning istalganida menga yozing.",
      notAdded: "Hali qoʻshilmagan",
    },
    footer: {
      copyright: "© {year} {name}. Barcha huquqlar himoyalangan.",
      built: "HTML, CSS va JavaScript yordamida yaratilgan.",
      backToTop: "Yuqoriga qaytish",
    },
    noscript: "Bu boʻlimni koʻrish uchun JavaScriptni yoqing.",
  },
};
