/*
 * Portfolio behaviour: translations, rendering from config,
 * mobile navigation, active-section highlighting and reveals.
 * Content lives in js/config.js and js/i18n.js, not here.
 */
(function () {
  "use strict";

  var config = window.SITE_CONFIG || {};
  var translations = window.TRANSLATIONS || {};
  var STORAGE_KEY = "portfolio-language";
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var currentLang = "en";

  /* ---------------- Icons (Lucide-style, ISC licence) ---------------- */
  var ICONS = {
    editor: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/>',
    terminal: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m7 11 2-2-2-2M11 13h4"/>',
    palette:
      '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2Z"/>',
    github:
      '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    telegram: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    instagram:
      '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/><path d="M17.5 6.5h.01"/>',
    youtube:
      '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3Z"/>',
    external: '<path d="M7 17 17 7M7 7h10v10"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  };

  function svgIcon(name, className) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    if (className) svg.setAttribute("class", className);
    // ICONS are fixed strings defined above, never user content.
    svg.innerHTML = ICONS[name] || ICONS.link;
    return svg;
  }

  /* ---------------- Translation helpers ---------------- */
  function lookup(dict, key) {
    return key.split(".").reduce(function (obj, part) {
      return obj && obj[part] !== undefined ? obj[part] : undefined;
    }, dict);
  }

  function interpolate(text, vars) {
    return String(text).replace(/\{(\w+)\}/g, function (match, name) {
      return vars[name] !== undefined ? vars[name] : match;
    });
  }

  function baseVars() {
    return {
      name: config.name || "",
      firstName: config.firstName || "",
      age: config.age !== undefined ? config.age : "",
      year: new Date().getFullYear(),
    };
  }

  function t(key, extra) {
    var value = lookup(translations[currentLang], key);
    if (value === undefined) value = lookup(translations.en, key);
    if (value === undefined) return key;
    var vars = baseVars();
    if (extra) Object.keys(extra).forEach(function (k) { vars[k] = extra[k]; });
    return interpolate(value, vars);
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
    var value = raw.trim();
    if (!value) return null;
    // Allow a bare email address in the config.
    if (/^[^\s@:/]+@[^\s@/]+\.[^\s@/]+$/.test(value)) value = "mailto:" + value;
    try {
      var url = new URL(value, window.location.href);
      if (["http:", "https:", "mailto:"].indexOf(url.protocol) === -1) return null;
      return url.href;
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

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function externalLink(href, className) {
    var a = el("a", className);
    a.href = href;
    if (!/^mailto:/.test(href)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  }

  function newTabHint(a) {
    if (a.target === "_blank") a.appendChild(el("span", "visually-hidden", " " + t("a11y.newTab")));
  }

  /* ---------------- Renderers ---------------- */
  function renderSkills(container, items, variant) {
    var fragment = document.createDocumentFragment();
    (items || []).forEach(function (skill, index) {
      var card = el("li", (variant === "tools" ? "tool-card" : "skill-card") + " glass stagger");
      card.style.setProperty("--i", index);

      var tile = el("span", "skill-icon");
      tile.setAttribute("aria-hidden", "true");
      if (skill.glyph) {
        tile.classList.add("mono");
        tile.textContent = skill.glyph;
      } else {
        tile.appendChild(svgIcon(skill.icon));
      }

      var body = el("div", "skill-body");
      body.appendChild(el("h4", "skill-name", localize(skill.name)));
      body.appendChild(el("p", "skill-desc", localize(skill.description)));

      card.appendChild(tile);
      card.appendChild(body);
      fragment.appendChild(card);
    });
    container.replaceChildren(fragment);
  }

  function renderProjects(container) {
    var fragment = document.createDocumentFragment();
    (config.projects || []).forEach(function (project, index) {
      var title = localize(project.title);
      var classes = ["project-card", "glass", "stagger"];
      if (project.featured) classes.push("is-featured");
      if (project.placeholder) classes.push("is-placeholder");
      var card = el("li", classes.join(" "));
      card.style.setProperty("--i", index);

      // Media
      var media = el("div", "project-media");
      if (project.image) {
        var img = el("img");
        img.src = project.image;
        img.width = 640;
        img.height = 400;
        img.loading = "lazy";
        img.decoding = "async";
        img.alt = project.imageAlt
          ? localize(project.imageAlt)
          : project.placeholder
            ? t("projects.imageAltPlaceholder")
            : t("projects.imageAlt", { title: title });
        media.appendChild(img);
      }
      if (project.placeholder) {
        media.appendChild(el("span", "badge badge-placeholder mono", t("projects.placeholder")));
      }

      // Body
      var body = el("div", "project-body");
      if (project.featured) body.appendChild(el("p", "badge badge-featured mono", t("projects.featured")));
      body.appendChild(el("h3", "project-title", title));
      body.appendChild(el("p", "project-desc", localize(project.description)));

      var footer = el("div", "project-footer");
      var tech = (project.tech || []).filter(Boolean);
      if (tech.length) {
        var tags = el("ul", "tags");
        tags.setAttribute("aria-label", t("projects.techLabel"));
        tech.forEach(function (name) { tags.appendChild(el("li", "tag mono", name)); });
        footer.appendChild(tags);
      } else if (project.placeholder) {
        footer.appendChild(el("p", "pending mono", t("projects.techPending")));
      }

      var links = [
        { href: safeUrl(project.liveUrl), label: t("projects.liveDemo"), icon: "external", cls: "btn btn-primary btn-sm" },
        { href: safeUrl(project.githubUrl), label: t("projects.github"), icon: "github", cls: "btn btn-ghost btn-sm" },
      ].filter(function (link) { return link.href; });

      if (links.length) {
        var actions = el("div", "project-links");
        links.forEach(function (link) {
          var a = externalLink(link.href, link.cls);
          a.appendChild(svgIcon(link.icon, "btn-icon"));
          a.appendChild(el("span", "", link.label));
          newTabHint(a);
          actions.appendChild(a);
        });
        footer.appendChild(actions);
      } else if (project.placeholder) {
        footer.appendChild(el("p", "pending mono", t("projects.linksPending")));
      }
      if (footer.childNodes.length) body.appendChild(footer);

      card.appendChild(media);
      card.appendChild(body);
      fragment.appendChild(card);
    });
    container.replaceChildren(fragment);
  }

  function renderContacts(container) {
    var fragment = document.createDocumentFragment();
    (config.contacts || []).forEach(function (contact, index) {
      var item = el("li", "stagger");
      item.style.setProperty("--i", index);
      var href = safeUrl(contact.url);
      var label = localize(contact.label);

      var card;
      if (href) {
        card = externalLink(href, "contact-card glass");
      } else {
        card = el("div", "contact-card glass is-empty");
      }

      var icon = el("span", "contact-icon");
      icon.appendChild(svgIcon(contact.icon));
      var text = el("span", "contact-text");
      text.appendChild(el("span", "contact-label", label));
      text.appendChild(
        el("span", "contact-value mono", href ? localize(contact.display) || displayUrl(href) : t("contact.notAdded"))
      );

      card.appendChild(icon);
      card.appendChild(text);
      if (href) {
        card.appendChild(svgIcon("external", "contact-arrow"));
        newTabHint(card);
      }
      item.appendChild(card);
      fragment.appendChild(item);
    });
    container.replaceChildren(fragment);
  }

  function renderDynamic() {
    var targets = {
      technologies: function (node) { renderSkills(node, config.skills && config.skills.technologies, "technologies"); },
      tools: function (node) { renderSkills(node, config.skills && config.skills.tools, "tools"); },
      projects: renderProjects,
      contacts: renderContacts,
    };
    document.querySelectorAll("[data-render]").forEach(function (node) {
      var render = targets[node.getAttribute("data-render")];
      if (render) render(node);
    });
  }

  /* ---------------- Language ---------------- */
  function readSavedLanguage() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveLanguage(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* storage unavailable: the choice just won't be remembered */
    }
  }

  function initialLanguage() {
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    var candidates = [fromUrl, readSavedLanguage(), config.defaultLanguage, "en"];
    for (var i = 0; i < candidates.length; i++) {
      if (candidates[i] && translations[candidates[i]]) return candidates[i];
    }
    return "en";
  }

  function applyLanguage(lang) {
    currentLang = translations[lang] ? lang : "en";
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (node) {
      node.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length === 2) node.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });

    document.querySelectorAll("[data-config]").forEach(function (node) {
      var value = config[node.getAttribute("data-config")];
      if (value !== undefined) node.textContent = value;
    });

    document.title = t("meta.title");
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t("meta.description"));

    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-lang") === currentLang));
    });

    renderDynamic();
  }

  function initLanguageSwitch() {
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        var lang = button.getAttribute("data-lang");
        if (lang === currentLang) return;
        applyLanguage(lang);
        saveLanguage(lang);
      });
    });
  }

  /* ---------------- Navigation ---------------- */
  function initNavigation() {
    var header = document.querySelector("[data-header]");
    var toggle = document.querySelector("[data-nav-toggle]");
    var menu = document.querySelector("[data-nav-menu]");
    var desktop = window.matchMedia("(min-width: 860px)");

    function setOpen(open, returnFocus) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      header.classList.toggle("menu-open", open);
      if (open) {
        var first = menu.querySelector("a");
        if (first) first.focus();
      } else if (returnFocus) {
        toggle.focus();
      }
    }

    function isOpen() {
      return toggle.getAttribute("aria-expanded") === "true";
    }

    toggle.addEventListener("click", function () {
      setOpen(!isOpen(), false);
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a") && isOpen()) setOpen(false, false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) setOpen(false, true);
    });

    document.addEventListener("click", function (event) {
      if (isOpen() && !header.contains(event.target)) setOpen(false, false);
    });

    function onBreakpoint() {
      if (desktop.matches && isOpen()) setOpen(false, false);
    }
    if (desktop.addEventListener) desktop.addEventListener("change", onBreakpoint);

    // Solid header background once the page is scrolled.
    var ticking = false;
    function updateHeader() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateHeader);
      }
    }, { passive: true });
    updateHeader();
  }

  /* Highlight the menu link of the section currently in view. */
  function initScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    var links = Array.prototype.slice.call(document.querySelectorAll("[data-nav-link]"));
    var byId = {};
    links.forEach(function (link) { byId[link.getAttribute("href").slice(1)] = link; });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.remove("is-active");
          link.removeAttribute("aria-current");
        });
        var active = byId[entry.target.id];
        if (active) {
          active.classList.add("is-active");
          active.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    document.querySelectorAll("main section[id]").forEach(function (section) {
      observer.observe(section);
    });
  }

  /* Fade sections in as they scroll into view (skipped for reduced motion). */
  function initReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      nodes.forEach(function (node) { node.classList.add("is-visible", "is-settled"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          target.classList.add("is-visible");
          observer.unobserve(target);
          // After the entrance, stop card animations so a language switch
          // (which re-renders the cards) doesn't replay them.
          window.setTimeout(function () { target.classList.add("is-settled"); }, 1600);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    nodes.forEach(function (node) { observer.observe(node); });
  }

  /* ---------------- Start ---------------- */
  function init() {
    applyLanguage(initialLanguage());
    initLanguageSwitch();
    initNavigation();
    initScrollSpy();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
