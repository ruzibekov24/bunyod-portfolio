/*
 * Portfolio behaviour: translations, rendering from config, theme,
 * menu, and the scroll effects (Lenis smooth scroll + GSAP ScrollTrigger).
 * Content lives in js/config.js and js/i18n.js, not here.
 *
 * With "reduce motion" turned on (or if the animation libraries fail to
 * load) every effect is skipped and the content is shown statically.
 */
(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const translations = window.TRANSLATIONS || {};
  const BRANDS = window.BRAND_ICONS || {};
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const root = document.documentElement;

  const LANG_KEY = "portfolio-language";
  const THEME_KEY = "theme";
  const SVG_NS = "http://www.w3.org/2000/svg";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canAnimate = !reducedMotion && Boolean(gsap && ScrollTrigger);
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* Display fonts the hero letters swap to. Order matches .sk-0 … .sk-35 in the CSS. */
  const DISPLAY_FONTS = [
    "Nabla", "Honk", "Bungee Spice", "Bungee Shade", "Monoton", "Faster One",
    "Rubik Glitch", "Rubik Wet Paint", "Rubik Spray Paint", "Rubik Burned",
    "Rubik Bubbles", "Rubik Mono One", "Abril Fatface", "Special Elite",
    "Press Start 2P", "Black Ops One", "Permanent Marker", "UnifrakturCook",
    "Modak", "Bagel Fat One", "Tilt Prism", "Foldit", "Sixtyfour",
    "Londrina Shadow", "Climate Crisis", "Shrikhand", "Lilita One",
    "Luckiest Guy", "Kumar One Outline", "Bungee Inline", "Rubik Marker Hatch",
    "Tilt Neon", "Bowlby One", "Emilys Candy", "Rye", "Fascinate Inline",
  ];
  /* Must match the &text= list in the display-font <link> in index.html. */
  const FONT_SAMPLE = "HhIiMmBbUuNnYyOoDdSsAaLlEe";

  let currentLang = "en";
  let lenis = null;
  let scrollVelocity = 0;

  const fx = {
    hero: null,
    allChars: [],
    letters: [],
    letterTimers: new Map(),
    loopTimer: 0,
    lastFont: -1,
    scrubCtx: null,
    pinned: false,
    step: 0,
    marqueeRows: [],
  };

  const $$ = (selector, scope) => Array.from((scope || document).querySelectorAll(selector));
  const rand = (min, max) => min + Math.random() * (max - min);
  const pad = (n) => String(n).padStart(2, "0");

  /* ---------------- Translation helpers ---------------- */
  function lookup(dict, key) {
    return key.split(".").reduce((obj, part) => (obj && obj[part] !== undefined ? obj[part] : undefined), dict);
  }

  function t(key, extra) {
    let value = lookup(translations[currentLang], key);
    if (value === undefined) value = lookup(translations.en, key);
    if (value === undefined) return key;
    const vars = Object.assign(
      {
        name: config.name || "",
        firstName: config.firstName || "",
        age: config.age !== undefined ? config.age : "",
        year: new Date().getFullYear(),
      },
      extra
    );
    return String(value).replace(/\{(\w+)\}/g, (match, name) => (vars[name] !== undefined ? vars[name] : match));
  }

  /** Content from config: either a plain string or { en, uz }. */
  function localize(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    return value[currentLang] || value.en || "";
  }

  /* ---------------- URL helpers ---------------- */
  function safeUrl(raw) {
    if (!raw || typeof raw !== "string") return null;
    let value = raw.trim();
    if (!value) return null;
    // Allow a bare email address in the config.
    if (/^[^\s@:/]+@[^\s@/]+\.[^\s@/]+$/.test(value)) value = "mailto:" + value;
    try {
      const url = new URL(value, window.location.href);
      return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.href : null;
    } catch (e) {
      return null;
    }
  }

  function displayUrl(href) {
    return href
      .replace(/^mailto:/, "")
      .replace(/^https?:\/\/(www\.)?/, "")
      .replace(/\/$/, "");
  }

  /* ---------------- DOM helpers ---------------- */
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function brandIcon(name) {
    const icon = BRANDS[name];
    if (!icon) return null;
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "ico");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", icon.path);
    path.setAttribute("fill", icon.color || "currentColor");
    svg.appendChild(path);
    return svg;
  }

  function externalLink(href, className) {
    const a = el("a", className);
    a.href = href;
    if (!href.startsWith("mailto:")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  }

  function addNewTabHint(a) {
    if (a.target === "_blank") a.appendChild(el("span", "visually-hidden", " " + t("a11y.newTab")));
  }

  /** Text where [words] become chips, e.g. "I build [websites]". */
  function setRichText(node, text) {
    node.textContent = "";
    text.split(/(\[[^\]]+\])/).forEach((part) => {
      if (!part) return;
      const chip = part.match(/^\[([^\]]+)\]$/);
      node.appendChild(chip ? el("span", "chip", chip[1]) : document.createTextNode(part));
    });
  }

  /* ---------------- Renderers ---------------- */
  function renderSkills(container, items) {
    const fragment = document.createDocumentFragment();
    (items || []).forEach((skill, index) => {
      const cell = el("li", "cell");
      const top = el("div", "cell-top");
      top.appendChild(brandIcon(skill.icon) || el("span"));
      top.appendChild(el("span", "mono", pad(index + 1)));
      cell.appendChild(top);
      cell.appendChild(el("h4", "h-lg", localize(skill.name)));
      cell.appendChild(el("p", "muted", localize(skill.description)));
      fragment.appendChild(cell);
    });
    container.replaceChildren(fragment);
  }

  function marqueeItems(which) {
    const skills = config.skills || {};
    if (which === "a") return skills.technologies || [];
    return (skills.tools || []).concat(config.interests || []);
  }

  /** Fills a marquee row with enough copies to loop seamlessly. */
  function renderMarquee(row, items) {
    row.replaceChildren();
    if (!items.length) return;
    const makeSet = () =>
      items.map((item) => {
        const span = el("span");
        const icon = brandIcon(item.icon);
        if (icon) span.appendChild(icon);
        span.appendChild(document.createTextNode(localize(item.name) + " ✦"));
        return span;
      });
    makeSet().forEach((span) => row.appendChild(span));
    const setWidth = row.scrollWidth || 1;
    const copies = Math.max(1, Math.ceil((window.innerWidth * 1.15) / setWidth));
    for (let i = 1; i < copies; i++) makeSet().forEach((span) => row.appendChild(span));
    // Second identical half: the row moves by half its width, then wraps.
    Array.from(row.children).forEach((span) => row.appendChild(span.cloneNode(true)));
  }

  function renderMarquees() {
    const a = document.querySelector('[data-render="marquee-a"]');
    const b = document.querySelector('[data-render="marquee-b"]');
    if (a) renderMarquee(a, marqueeItems("a"));
    if (b) renderMarquee(b, marqueeItems("b"));
    fx.marqueeRows.forEach((r) => {
      r.w = r.el.scrollWidth / 2;
    });
  }

  function projectImageAlt(project, title) {
    if (project.imageAlt) return localize(project.imageAlt);
    return project.placeholder ? t("projects.imageAltPlaceholder") : t("projects.imageAlt", { title });
  }

  function renderProjects() {
    const projects = config.projects || [];
    const steps = document.querySelector('[data-render="projects"]');
    const screens = document.querySelector('[data-render="screens"]');
    const progress = document.querySelector("[data-progress]");
    const total = document.querySelector("[data-project-total]");
    if (!steps) return;

    const stepFragment = document.createDocumentFragment();
    const screenFragment = document.createDocumentFragment();
    const progressFragment = document.createDocumentFragment();

    projects.forEach((project, index) => {
      const title = localize(project.title);
      const step = el("li", "step" + (project.placeholder ? " is-placeholder" : ""));
      step.dataset.index = String(index);

      const body = el("div", "step-body");
      const tag = el("p", "mono step-tag", pad(index + 1));
      const category = localize(project.category);
      if (category) tag.append(" · " + category);
      if (project.featured) tag.append(" · " + t("projects.featured"));
      if (project.placeholder) {
        tag.append(" · ");
        tag.appendChild(el("span", "placeholder", t("projects.placeholder")));
      }
      body.appendChild(tag);
      body.appendChild(el("h3", "", title));
      body.appendChild(el("p", "lead muted step-desc", localize(project.description)));

      const meta = el("div", "step-meta");
      const tech = (project.tech || []).filter(Boolean);
      if (tech.length) meta.appendChild(el("p", "mono", tech.join(" · ")));
      else if (project.placeholder) meta.appendChild(el("p", "mono", t("projects.techPending")));

      const links = [
        { href: safeUrl(project.liveUrl), label: t("projects.liveDemo"), cls: "btn btn-sm" },
        { href: safeUrl(project.githubUrl), label: t("projects.github"), cls: "btn btn-ghost btn-sm", icon: "github" },
      ].filter((link) => link.href);

      if (links.length) {
        const row = el("div", "step-links");
        links.forEach((link) => {
          const a = externalLink(link.href, link.cls);
          const icon = link.icon && brandIcon(link.icon);
          if (icon) a.appendChild(icon);
          a.appendChild(el("span", "", link.label));
          a.appendChild(el("span", "", "↗")).setAttribute("aria-hidden", "true");
          addNewTabHint(a);
          row.appendChild(a);
        });
        meta.appendChild(row);
      } else if (project.placeholder) {
        meta.appendChild(el("p", "mono", t("projects.linksPending")));
      }
      body.appendChild(meta);
      step.appendChild(body);

      if (project.image) {
        // Shown in the static (reduced motion) layout.
        const thumb = el("img", "step-thumb");
        thumb.src = project.image;
        thumb.alt = projectImageAlt(project, title);
        thumb.loading = "lazy";
        thumb.decoding = "async";
        thumb.width = 1280;
        thumb.height = 800;
        step.appendChild(thumb);

        // Shown inside the browser frame of the pinned layout.
        const screen = el("img", "screen");
        screen.src = project.image;
        screen.alt = "";
        screen.decoding = "async";
        screen.width = 1280;
        screen.height = 800;
        screenFragment.appendChild(screen);
      }

      stepFragment.appendChild(step);
      progressFragment.appendChild(el("i"));
    });

    steps.replaceChildren(stepFragment);
    if (screens) screens.replaceChildren(screenFragment);
    if (progress) progress.replaceChildren(progressFragment);
    if (total) total.textContent = "( " + pad(projects.length) + " )";
  }

  function renderContacts() {
    const container = document.querySelector('[data-render="contacts"]');
    if (!container) return;
    const fragment = document.createDocumentFragment();
    (config.contacts || []).forEach((contact, index) => {
      const href = safeUrl(contact.url);
      const row = href ? externalLink(href, "row") : el("div", "row is-empty");
      row.appendChild(el("span", "mono", pad(index + 1)));

      const main = el("div");
      const title = el("h3", "h-lg row-title");
      const icon = brandIcon(contact.icon);
      if (icon) title.appendChild(icon);
      title.appendChild(document.createTextNode(localize(contact.label)));
      main.appendChild(title);
      main.appendChild(
        el("p", "muted", href ? localize(contact.display) || displayUrl(href) : t("contact.notAdded"))
      );
      row.appendChild(main);

      const side = el("div", "row-side");
      const mark = el("span", href ? "arrow" : "mono", href ? "↗" : "—");
      mark.setAttribute("aria-hidden", "true");
      side.appendChild(mark);
      row.appendChild(side);
      addNewTabHint(row);

      const item = el("li");
      item.appendChild(row);
      fragment.appendChild(item);
    });
    container.replaceChildren(fragment);
  }

  /** Big contact line: the email address when it is configured. */
  function renderContactHeadline() {
    const heading = document.querySelector('[data-render="contact-headline"]');
    if (!heading) return;
    const email = (config.contacts || []).find((c) => c.id === "email");
    const href = email && safeUrl(email.url);
    if (href && href.startsWith("mailto:")) {
      const a = el("a", "cta-mail", displayUrl(href) + " ↗");
      a.href = href;
      heading.replaceChildren(a);
    } else {
      heading.textContent = t("contact.headline");
    }
  }

  function renderFooterLinks() {
    const list = document.querySelector('[data-render="footer-links"]');
    if (!list) return;
    const fragment = document.createDocumentFragment();
    (config.contacts || []).forEach((contact) => {
      const href = safeUrl(contact.url);
      if (!href) return;
      const a = externalLink(href, "nav-link");
      const icon = brandIcon(contact.icon);
      if (icon) a.appendChild(icon);
      a.appendChild(document.createTextNode(localize(contact.label) + " ↗"));
      addNewTabHint(a);
      const item = el("li");
      item.appendChild(a);
      fragment.appendChild(item);
    });
    list.replaceChildren(fragment);
  }

  function renderDynamic() {
    const skills = config.skills || {};
    const technologies = document.querySelector('[data-render="technologies"]');
    const tools = document.querySelector('[data-render="tools"]');
    if (technologies) renderSkills(technologies, skills.technologies);
    if (tools) renderSkills(tools, skills.tools);
    renderMarquees();
    renderProjects();
    renderContacts();
    renderContactHeadline();
    renderFooterLinks();
  }

  /* ---------------- Language ---------------- */
  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* storage unavailable: the choice just won't be remembered */
    }
  }

  function initialLanguage() {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    const candidates = [fromUrl, readStorage(LANG_KEY), config.defaultLanguage, "en"];
    return candidates.find((lang) => lang && translations[lang]) || "en";
  }

  function applyLanguage(lang) {
    currentLang = translations[lang] ? lang : "en";
    root.lang = currentLang;

    $$("[data-i18n]").forEach((node) => {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    $$("[data-i18n-rich]").forEach((node) => {
      setRichText(node, t(node.getAttribute("data-i18n-rich")));
    });
    $$("[data-i18n-attr]").forEach((node) => {
      node.getAttribute("data-i18n-attr").split(";").forEach((pair) => {
        const parts = pair.split(":");
        if (parts.length === 2) node.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
    $$("[data-config]").forEach((node) => {
      const value = config[node.getAttribute("data-config")];
      if (value !== undefined) node.textContent = value;
    });

    document.title = t("meta.title");
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t("meta.description"));

    $$("[data-lang]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-lang") === currentLang));
    });

    renderDynamic();
  }

  function initLanguageSwitch() {
    $$("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => {
        const lang = button.getAttribute("data-lang");
        if (lang === currentLang) return;
        teardownHero();
        applyLanguage(lang);
        writeStorage(LANG_KEY, lang);
        if (canAnimate) {
          buildHero(false);
          buildScrub();
          if (fx.pinned) setStep(fx.step);
          ScrollTrigger.refresh();
        }
      });
    });
  }

  /* ---------------- Theme, clock, cursor light ---------------- */
  function initTheme() {
    const meta = document.querySelector('meta[name="theme-color"]');
    const syncMeta = () => {
      if (meta) meta.setAttribute("content", getComputedStyle(document.body).getPropertyValue("--bg").trim() || "#050505");
    };
    $$("[data-theme-toggle]").forEach((button) =>
      button.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        writeStorage(THEME_KEY, next);
        syncMeta();
      })
    );
    syncMeta();
  }

  function initClock() {
    const clocks = $$("[data-clock]");
    if (!clocks.length) return;
    let format;
    try {
      format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tashkent" });
    } catch (e) {
      return;
    }
    const tick = () => clocks.forEach((node) => (node.textContent = format.format(new Date())));
    tick();
    window.setInterval(tick, 20000);
  }

  function initCursorLight() {
    let frame = 0;
    window.addEventListener("pointermove", (event) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        root.style.setProperty("--mx", event.clientX + "px");
        root.style.setProperty("--my", event.clientY + "px");
      });
    });
  }

  /* ---------------- Menu & in-page links ---------------- */
  function closeMenu(returnFocus) {
    const menu = document.querySelector("[data-menu]");
    if (!menu || !menu.open) return;
    menu.open = false;
    if (returnFocus) menu.querySelector("summary").focus();
  }

  function initMenu() {
    const menu = document.querySelector("[data-menu]");
    if (!menu) return;
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu(true);
    });
    document.addEventListener("click", (event) => {
      if (menu.open && !menu.contains(event.target)) closeMenu(false);
    });
  }

  function headerOffset() {
    const header = document.querySelector(".site-header");
    return header ? header.offsetHeight : 0;
  }

  function initAnchors() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const id = link.getAttribute("href").slice(1);
      const target = id && document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      closeMenu(false);
      if (lenis) {
        lenis.scrollTo(id === "top" || id === "main" ? 0 : target, { offset: -headerOffset(), duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (window.history && window.history.replaceState) window.history.replaceState(null, "", "#" + id);
    });
  }

  /* Underline the menu link of the section currently in view. */
  function initScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    const links = $$("[data-nav-link]");
    const byId = {};
    links.forEach((link) => (byId[link.getAttribute("href").slice(1)] = link));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = byId[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach((other) => other.removeAttribute("aria-current"));
            link.setAttribute("aria-current", "true");
          } else if (link.hasAttribute("aria-current")) {
            link.removeAttribute("aria-current");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(byId).forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------------- Effects ---------------- */
  function initLenis() {
    if (typeof window.Lenis !== "function") return;
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", (event) => {
      scrollVelocity = event.velocity || 0;
    });
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  function initReveal() {
    ScrollTrigger.batch(".reveal", {
      start: "top 92%",
      once: true,
      onEnter: (batch) => batch.forEach((node, i) => window.setTimeout(() => node.classList.add("in"), i * 70)),
    });
  }

  /* Hero: every letter is its own span; hovering one swaps it to a random display font. */
  function lockLetterWidths() {
    if (fx.letterTimers.size) return; // wait until no letter is swapped
    fx.allChars.forEach((ch) => (ch.style.width = ""));
    fx.allChars.forEach((ch) => (ch.style.width = ch.offsetWidth + "px"));
  }

  function swapLetter(span, hold) {
    const pending = fx.letterTimers.get(span);
    if (pending !== undefined) {
      window.clearTimeout(pending);
    } else {
      const available = DISPLAY_FONTS.map((font, i) =>
        document.fonts.check('1em "' + font + '"', FONT_SAMPLE) && i !== fx.lastFont ? i : -1
      ).filter((i) => i >= 0);
      if (!available.length) return;
      const pick = available[Math.floor(Math.random() * available.length)];
      fx.lastFont = pick;
      span.classList.add("sk", "sk-" + pick);
      gsap.fromTo(
        span,
        { scale: 1.35, rotate: rand(-14, 14) },
        { scale: 1, rotate: rand(-5, 5), duration: 0.7, ease: "elastic.out(1, 0.5)" }
      );
    }
    fx.letterTimers.set(
      span,
      window.setTimeout(() => {
        gsap.to(span, {
          scale: 0.6,
          opacity: 0,
          duration: 0.18,
          ease: "power2.in",
          onComplete: () => {
            span.className = "ch";
            gsap.set(span, { rotate: 0 });
            gsap.to(span, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" });
            fx.letterTimers.delete(span);
          },
        });
      }, hold)
    );
  }

  function teardownHero() {
    window.clearTimeout(fx.loopTimer);
    fx.letterTimers.forEach((timer) => window.clearTimeout(timer));
    fx.letterTimers.clear();
    if (gsap && fx.allChars.length) gsap.killTweensOf(fx.allChars);
    fx.allChars = [];
    fx.letters = [];
  }

  function buildHero(playIntro) {
    const hero = fx.hero;
    if (!hero) return;
    $$("[data-line]", hero).forEach((line) => {
      const text = line.textContent || "";
      line.textContent = "";
      for (const char of text) {
        const span = el("span", "ch", char === " " ? " " : char);
        line.appendChild(span);
        fx.allChars.push(span);
        if (/\p{L}/u.test(char)) fx.letters.push(span);
      }
    });

    fx.letters.forEach((span) => {
      span.addEventListener("pointerenter", () => finePointer && swapLetter(span, 1100));
      span.addEventListener("pointerdown", () => swapLetter(span, 1500));
    });

    Promise.all([document.fonts.load('500 64px "Geist"'), document.fonts.ready])
      .catch(() => {})
      .then(() => window.requestAnimationFrame(lockLetterWidths));

    if (playIntro) {
      gsap.from(fx.allChars, {
        yPercent: 60,
        opacity: 0,
        filter: "blur(8px)",
        duration: 1,
        ease: "expo.out",
        stagger: 0.04,
        delay: 0.1,
      });
    }

    const loop = () => {
      const idle = fx.letters.filter((span) => !fx.letterTimers.has(span));
      if (idle.length && !document.hidden) swapLetter(idle[Math.floor(Math.random() * idle.length)], rand(1300, 2000));
      fx.loopTimer = window.setTimeout(loop, rand(finePointer ? 1700 : 1100, finePointer ? 3200 : 2200));
    };
    fx.loopTimer = window.setTimeout(loop, playIntro ? 1900 : 800);
  }

  function initHero() {
    fx.hero = document.querySelector("[data-hero]");
    if (!fx.hero) return;
    DISPLAY_FONTS.forEach((font) => document.fonts.load('1em "' + font + '"', FONT_SAMPLE).catch(() => {}));
    buildHero(true);

    gsap.from("[data-hero-fade]", { opacity: 0, y: 12, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.7 });
    gsap.to(fx.hero, {
      yPercent: -8,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: { trigger: fx.hero, start: "top 30%", end: "bottom top", scrub: true },
    });

    let resizeTimer = 0;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(lockLetterWidths, 150);
    });
  }

  /* About: words light up one by one while scrolling. */
  function splitWords(node, words) {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const fragment = document.createDocumentFragment();
        (child.textContent || "").split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(" "));
            return;
          }
          const word = el("span", "word", part);
          fragment.appendChild(word);
          words.push(word);
        });
        child.replaceWith(fragment);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.classList.contains("chip")) {
          child.classList.add("word");
          words.push(child);
        } else {
          splitWords(child, words);
        }
      }
    });
    return words;
  }

  function buildScrub() {
    if (fx.scrubCtx) fx.scrubCtx.revert();
    fx.scrubCtx = gsap.context(() => {
      $$("[data-scrub]").forEach((node) => {
        const words = splitWords(node, []);
        gsap.to(words, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: node, start: "top 80%", end: "bottom 45%", scrub: true },
        });
      });
    });
  }

  /* Marquee rows drift on their own and speed up with scroll velocity. */
  function initMarquee() {
    fx.marqueeRows = $$(".vm-row").map((row) => ({
      el: row,
      dir: row.dataset.dir === "r" ? 1 : -1,
      x: 0,
      w: row.scrollWidth / 2,
    }));
    gsap.ticker.add(() => {
      const v = scrollVelocity;
      fx.marqueeRows.forEach((row) => {
        if (!row.w) return;
        row.x += row.dir * (0.6 + Math.min(Math.abs(v), 40) * 0.5) * (v < 0 ? -1 : 1);
        if (row.x <= -row.w) row.x += row.w;
        if (row.x >= 0) row.x -= row.w;
        row.el.style.transform = "translate3d(" + row.x + "px,0,0)";
      });
    });
  }

  /* Projects: the section is pinned and each scroll segment shows the next project. */
  function setStep(index) {
    const show = document.querySelector("[data-show]");
    if (!show) return;
    const projects = config.projects || [];
    fx.step = index;
    $$(".step", show).forEach((step, i) => step.classList.toggle("on", i === index));
    $$(".screen", show).forEach((screen, i) => screen.classList.toggle("on", i <= index));
    $$(".progress i", show).forEach((bar, i) => bar.classList.toggle("on", i === index));
    const count = show.querySelector("[data-count]");
    if (count) count.textContent = pad(index + 1) + " / " + pad(projects.length);
    const url = show.querySelector("[data-url]");
    const project = projects[index];
    if (url && project) {
      const live = safeUrl(project.liveUrl);
      url.textContent = live ? displayUrl(live) : t("projects.notPublished");
    }
  }

  function initShow() {
    const show = document.querySelector("[data-show]");
    if (!show) return;
    const total = (config.projects || []).length;
    if (!canAnimate || total < 2) {
      show.classList.add("is-static");
      return;
    }
    fx.pinned = true;
    show.style.height = total * 90 + "vh";
    show.style.height = total * 90 + "svh";
    setStep(0);
    ScrollTrigger.create({
      trigger: show,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const index = Math.min(total - 1, Math.floor(self.progress * total));
        if (index !== fx.step) setStep(index);
      },
    });

    // Keyboard users: tabbing to a link in a hidden project scrolls to that project.
    show.addEventListener("focusin", (event) => {
      const step = event.target.closest(".step");
      if (!step) return;
      const index = Number(step.dataset.index);
      if (index === fx.step) return;
      const top = show.getBoundingClientRect().top + window.scrollY;
      const y = top + (show.offsetHeight - window.innerHeight) * ((index + 0.5) / total);
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
      else window.scrollTo(0, y);
      setStep(index);
    });
  }

  /* ---------------- Start ---------------- */
  function init() {
    applyLanguage(initialLanguage());
    initTheme();
    initClock();
    initCursorLight();
    initMenu();
    initAnchors();
    initLanguageSwitch();
    initScrollSpy();

    if (canAnimate) {
      gsap.registerPlugin(ScrollTrigger);
      initLenis();
      initReveal();
      initHero();
      buildScrub();
      initMarquee();
      initShow();
    } else {
      $$(".reveal").forEach((node) => node.classList.add("in"));
      initShow();
    }

    // Web fonts change text widths: re-measure once they are ready.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        renderMarquees();
        if (canAnimate) ScrollTrigger.refresh();
      });
    }

    let resizeTimer = 0;
    let lastWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      if (window.innerWidth === lastWidth) return; // ignore mobile toolbar height changes
      lastWidth = window.innerWidth;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(renderMarquees, 200);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
