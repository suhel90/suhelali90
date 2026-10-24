/* ==========================================================================
   Portfolio script — Suhel Ali
   Vanilla JavaScript, no libraries.

   HOW THIS FILE IS ORGANISED
   1. CONFIGURATION  <- the only part you normally need to edit
   2. Helpers and icons
   3. Rendering functions (build page content from the configuration)
   4. Feature functions (navigation, animations, clipboard, etc.)
   5. Start-up
   ========================================================================== */

"use strict";

/* ==========================================================================
   1. CONFIGURATION — edit the values in this section to update the website
   ========================================================================== */

/* ---- Personal information ---- */
const PERSONAL = {
  name: "Suhel Ali",
  headline: "Aspiring Bioinformatics Analyst",
  email: "alisuhel20821@gmail.com",
  intro:
    "Building a strong foundation in the fundamentals of biotechnology, with the goal of applying " +
    "programming to biological questions through bioinformatics.",
  // Each string becomes one paragraph in the About section.
  about: [
    "I am a B.Tech student at Lovely Professional University, with a keen interest in combining " +
      "programming and biotechnology to explore bioinformatics and computational biology.",
    "My current foundation is in the fundamentals of biotechnology and basic MS Office skills, " +
      "supported by hands-on practice through my Python and object-oriented programming projects. " +
      "I am looking to grow through internships, projects and learning opportunities " +
      "that bring these two fields together."
  ],
  // Small summary facts shown beside the About text.
  facts: [
    { label: "Currently", value: "B.Tech student, Lovely Professional University" },
    { label: "Career goal", value: "Bioinformatics Analyst" },
    { label: "Core strengths", value: "Biotechnology fundamentals, MS Office" }
  ]
};

/* ---- Social profile URLs ----
   Leave a value as "" (empty) and that link is hidden everywhere on the site.
   To show a link, paste the full address, e.g. "https://github.com/your-username". */
const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/suhel-ali-686b10443",
  github: "https://github.com/suhel90",
  hackerrank: ""   // e.g. "https://www.hackerrank.com/profile/your-username"
};

/* ---- Education (shown top to bottom, newest first) ----
   Only add facts you can prove. Optional fields: status, score. */
const EDUCATION = [
  {
    title: "Bachelor of Technology",
    institution: "Lovely Professional University (LPU)",
    period: "2026 – Present",
    status: "Currently pursuing"
  },
  {
    title: "Intermediate / Class XII",
    institution: "Anand Mission Intermediate College, Fazil Nagar, UP",
    period: "2021 – 2023",
    score: "64%"
  },
  {
    title: "Matriculation / Class X",
    institution: "St. Joseph's School, Fazil Nagar, UP",
    period: "2020 – 2021",
    score: "58%"
  }
];

/* ---- Skills (grouped by category) ----
   Each group: { category, icon, items: ["..."] }.
   Icons available: "code", "cube", "dna". */
const SKILLS = [
  { category: "Fundamentals", icon: "dna", items: ["Fundamentals of Biotechnology"] },
  { category: "Computer Skills", icon: "file", items: ["Basic knowledge of MS Office"] }
];

/* ---- Projects ----
   TO ADD A PROJECT: copy one block below, paste it after the last one, and edit it.
   - title:       project name
   - description: one or two sentences
   - points:      list of short key points
   - tags:        small labels (optional, can be [])
   - repo:        GitHub repository URL. Leave "" and no GitHub button is shown. */
const PROJECTS = [
  {
    title: "Simple Calculator Using Python and OOP",
    description:
      "A basic calculator application developed using Python and object-oriented programming concepts.",
    points: [
      "Demonstrates fundamental Python programming.",
      "Applies object-oriented design concepts.",
      "Performs basic arithmetic operations."
    ],
    tags: ["Python", "OOP"],
    repo: ""
  },
  {
    title: "Student Record Management System",
    description:
      "A Python-based application using object-oriented programming concepts to organize and manage student records.",
    points: [
      "Demonstrates classes and objects.",
      "Organizes student record operations.",
      "Focuses on basic data management and code structure."
    ],
    tags: ["Python", "OOP"],
    repo: ""
  }
];

/* ---- Achievements (extracurricular) ----
   Sorted automatically by year (latest first); an item with no year is listed first.
   - year:   number (optional)
   - badge:  short label shown on the card when there is no year
   - title:  event name (without the year)
   - result: what you achieved */
const ACHIEVEMENTS = [
  {
    badge: "Paper",
    title: "Review Paper on Pheochromocytoma",
    result: "Wrote a review paper on pheochromocytoma, focused on identifying the tumor."
  },
  {
    year: 2021,
    title: "Local Tournament",
    result: "Led my team as captain and won the tournament."
  }
];

/* ---- Resume and academic documents ---- */
const RESUME_FILE = "assets/documents/resume.pdf";

const ACADEMIC_DOCUMENTS = [
  {
    title: "Class XII Marksheet",
    file: "assets/documents/class-12-marksheet.pdf",
    downloadName: "Class-12-Marksheet-Suhel-Ali.pdf"
  },
  {
    title: "Class X Marksheet",
    file: "assets/documents/class-10-marksheet.pdf",
    downloadName: "Class-10-Marksheet-Suhel-Ali.pdf"
  }
];

/* ==========================================================================
   2. HELPERS AND ICONS
   ========================================================================== */

/** Small inline SVG icons (stroke style, inherit text color). */
const ICONS = {
  code: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cube: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  dna: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M7 3c0 6 10 6 10 12s-10 6-10 6M17 3c0 6-10 6-10 12M9 7h6M9 17h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  file: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5M9 13h6M9 17h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  award: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="12" cy="9" r="5.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 9v10M5 5.2v.1M10 19V9m0 4c0-2.2 1.5-4 3.8-4S18 10.6 18 13v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  github: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  hackerrank: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 2.5l8 4.5v10l-8 4.5-8-4.5V7l8-4.5zM9.5 8v8M14.5 8v8M9.5 12h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

const SOCIAL_LABELS = { linkedin: "LinkedIn", github: "GitHub", hackerrank: "HackerRank" };

/**
 * Create an element in one call.
 * @param {string} tag - HTML tag name
 * @param {Object} [props] - className, text, html (trusted icons only), and any attribute
 * @param {Array<Node>} [children]
 */
function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (value === undefined || value === null || value === false) return;
    if (key === "className") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key === "html") node.innerHTML = value; // only used with the static ICONS above
    else node.setAttribute(key, value === true ? "" : value);
  });
  children.forEach((child) => node.appendChild(child));
  return node;
}

/** Shorthand for document.getElementById */
const byId = (id) => document.getElementById(id);

/** True only for real web addresses, so empty or broken values never become links. */
function isValidUrl(value) {
  return typeof value === "string" && /^https?:\/\/\S+$/i.test(value.trim());
}

/** True when the user prefers reduced motion. */
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ==========================================================================
   3. RENDERING — builds page content from the configuration above
   ========================================================================== */

/** Fill text elements marked with data-bind="..." */
function renderPersonalInfo() {
  const values = { name: PERSONAL.name, headline: PERSONAL.headline, intro: PERSONAL.intro };
  document.querySelectorAll("[data-bind]").forEach((node) => {
    const key = node.dataset.bind;
    if (values[key]) node.textContent = values[key];
  });

  const email = byId("contact-email");
  email.href = "mailto:" + PERSONAL.email;
  email.textContent = PERSONAL.email;
}

/** Social links: only real URLs are shown; empty ones are skipped. */
function renderSocialLinks() {
  ["hero-social", "contact-social"].forEach((listId) => {
    const list = byId(listId);
    Object.keys(SOCIAL_LABELS).forEach((key) => {
      const url = SOCIAL_LINKS[key];
      if (!isValidUrl(url)) return; // hide anything that is not a real URL
      const link = el("a", {
        className: "social-link",
        href: url.trim(),
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": SOCIAL_LABELS[key] + " profile (opens in a new tab)"
      });
      link.innerHTML = ICONS[key];
      link.appendChild(el("span", { text: SOCIAL_LABELS[key] }));
      list.appendChild(el("li", {}, [link]));
    });
  });
}

function renderAbout() {
  const text = byId("about-text");
  PERSONAL.about.forEach((paragraph) => text.appendChild(el("p", { text: paragraph })));

  const facts = byId("about-facts");
  PERSONAL.facts.forEach((fact) => {
    facts.appendChild(
      el("li", {}, [
        el("span", { className: "fact__label", text: fact.label }),
        el("span", { className: "fact__value", text: fact.value })
      ])
    );
  });
}

function renderEducation() {
  const list = byId("education-list");
  EDUCATION.forEach((item) => {
    const top = el("div", { className: "timeline__top" }, [
      el("h3", { className: "timeline__title", text: item.title })
    ]);
    if (item.period) top.appendChild(el("span", { className: "tag", text: item.period }));

    const children = [top, el("p", { className: "timeline__org", text: item.institution })];
    if (item.status) children.push(el("p", { className: "card__meta", text: item.status }));
    if (item.score) {
      children.push(
        el("p", { className: "timeline__score" }, [
          document.createTextNode("Percentage: "),
          el("span", { text: item.score })
        ])
      );
    }
    list.appendChild(el("li", { className: "timeline__item reveal" }, children));
  });
}

function renderSkills() {
  const grid = byId("skills-grid");
  SKILLS.forEach((group) => {
    const chips = group.items.map((skill) => {
      const chip = el("li", { className: "skill-chip" });
      chip.innerHTML = ICONS[group.icon] || ICONS.code;
      chip.appendChild(el("span", { text: skill }));
      return chip;
    });
    grid.appendChild(
      el("div", { className: "skill-group reveal" }, [
        el("h3", { className: "skill-group__title", text: group.category }),
        el("ul", { className: "skill-list" }, chips)
      ])
    );
  });
}

function renderProjects() {
  const grid = byId("projects-grid");
  PROJECTS.forEach((project) => {
    const badge = el("div", { className: "icon-badge", html: ICONS.code });
    const children = [badge, el("h3", { className: "card__title", text: project.title })];

    if (project.tags && project.tags.length) {
      const tags = el(
        "p",
        { className: "card__meta" },
        project.tags.map((tag) => el("span", { className: "tag", text: tag }))
      );
      tags.childNodes.forEach((node, index) => {
        if (index > 0) node.style.marginLeft = "0.4rem";
      });
      children.push(tags);
    }

    children.push(el("p", { text: project.description }));
    children.push(
      el("ul", { className: "card__list" }, project.points.map((point) => el("li", { text: point })))
    );

    // GitHub button appears only when a real repository URL is provided.
    if (isValidUrl(project.repo)) {
      children.push(
        el("div", { className: "card__actions" }, [
          el("a", {
            className: "btn btn--outline btn--small",
            href: project.repo.trim(),
            target: "_blank",
            rel: "noopener noreferrer",
            text: "View on GitHub"
          })
        ])
      );
    }
    grid.appendChild(el("article", { className: "reveal" }, children));
  });
}

function renderAchievements() {
  const list = byId("achievements-list");
  [...ACHIEVEMENTS]
    .sort((a, b) => (b.year ?? Infinity) - (a.year ?? Infinity)) // no-year items first, then latest year first
    .forEach((item) => {
      const title = item.year ? item.title + " (" + item.year + ")" : item.title;
      list.appendChild(
        el("li", { className: "achievement reveal" }, [
          el("div", { className: "achievement__year", text: item.year ? String(item.year) : item.badge || "" }),
          el("div", {}, [
            el("h3", { className: "achievement__title", text: title }),
            el("p", { className: "achievement__result", text: item.result })
          ])
        ])
      );
    });
}

function renderAcademicDocuments() {
  const grid = byId("documents-grid");
  ACADEMIC_DOCUMENTS.forEach((doc) => {
    grid.appendChild(
      el("article", { className: "reveal" }, [
        el("div", { className: "doc__row" }, [
          el("div", { className: "icon-badge", html: ICONS.file }),
          el("div", {}, [
            el("h4", { className: "doc__title", text: doc.title }),
            el("p", { className: "doc__note", text: "PDF document" })
          ])
        ]),
        el("div", { className: "card__actions" }, [
          el("a", {
            className: "btn btn--secondary btn--small",
            href: doc.file,
            target: "_blank",
            rel: "noopener",
            "data-doc-link": true,
            "data-doc-label": doc.title,
            text: "View"
          }),
          el("a", {
            className: "btn btn--outline btn--small",
            href: doc.file,
            download: doc.downloadName,
            "data-doc-link": true,
            "data-doc-label": doc.title,
            text: "Download"
          })
        ]),
        el("p", { className: "cert__note", "data-missing-note": doc.file })
      ])
    );
  });
}

/* ==========================================================================
   4. FEATURES
   ========================================================================== */

/* ---- Missing-document handling ----
   On a web server (http/https) we ask whether each PDF exists and disable the
   button when it does not. Browsers block this check when the page is opened
   straight from disk (file://), so there the links are left enabled and the
   browser shows its own "file not found" page if a PDF has not been added yet. */
const fileExistsCache = new Map();

function fileExists(path) {
  if (!/^https?:$/.test(window.location.protocol)) return Promise.resolve(null); // cannot tell
  if (!fileExistsCache.has(path)) {
    const request = fetch(path, { method: "HEAD", cache: "no-store" })
      .then((response) => response.ok)
      .catch(() => null);
    fileExistsCache.set(path, request);
  }
  return fileExistsCache.get(path);
}

function disableDocumentLink(link) {
  link.dataset.href = link.getAttribute("href");
  link.removeAttribute("href");
  link.removeAttribute("download");
  link.removeAttribute("target");
  link.setAttribute("role", "link");
  link.setAttribute("aria-disabled", "true");
  link.classList.add("is-disabled");
}

async function checkDocumentAvailability() {
  const links = document.querySelectorAll("[data-doc-link]");
  await Promise.all(
    Array.from(links).map(async (link) => {
      const path = link.getAttribute("href");
      const exists = await fileExists(path);
      if (exists === false) disableDocumentLink(link);
    })
  );

  // Friendly notes under cards whose file is missing
  for (const note of document.querySelectorAll("[data-missing-note]")) {
    const exists = await fileExists(note.dataset.missingNote);
    if (exists === false) note.textContent = "This document has not been added yet.";
  }

  // Resume-specific message
  const resumeExists = await fileExists(RESUME_FILE);
  if (resumeExists === false) {
    byId("resume-status").textContent =
      "My resume PDF is not available here yet. Please contact me by email and I will share it.";
  }
}

/* ---- Mobile navigation ---- */
function initMobileNav() {
  const toggle = byId("nav-toggle");
  const menu = byId("nav-menu");

  function setOpen(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));

  // Close after choosing a link
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));

  // Close with Escape and return focus to the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset when the window grows back to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) setOpen(false);
  });
}

/* ---- Highlight the nav link of the section currently in view ---- */
function initActiveNavHighlight() {
  const links = Array.from(document.querySelectorAll(".nav__link"));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function activate(id) {
    links.forEach((link) => {
      const active = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activate(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" } // a thin band around the middle of the screen
  );
  sections.forEach((section) => observer.observe(section));
}

/* ---- Smooth scrolling ----
   CSS handles smooth scrolling (and turns it off for reduced motion).
   This small addition moves keyboard focus to the target so screen readers follow along. */
function initSmoothScrollFocus() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
}

/* ---- Scroll-triggered entrance animations ---- */
function initRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const item = entry.target;
        item.classList.add("is-visible");
        obs.unobserve(item);
        // After the entrance finishes, switch to the quick hover transition and drop the stagger delay.
        setTimeout(() => {
          item.style.transitionDelay = "";
          item.classList.add("is-done");
        }, 1500);
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((item, index) => {
    item.style.transitionDelay = (index % 3) * 130 + "ms"; // light stagger
    observer.observe(item);
  });
}

/* ---- Header shadow and back-to-top button ---- */
function initScrollUi() {
  const header = byId("site-header");
  const toTop = byId("to-top");
  let ticking = false;

  function update() {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    header.style.setProperty("--progress", maxScroll > 0 ? (window.scrollY / maxScroll).toFixed(3) : 0); // top progress bar
    toTop.hidden = window.scrollY < 600;
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    const home = byId("home");
    home.setAttribute("tabindex", "-1");
    home.focus({ preventScroll: true });
  });
}

/* ---- Copy email to clipboard ---- */
function showFeedback(node, message, type) {
  node.textContent = message;
  node.classList.remove("is-success", "is-error");
  if (type) node.classList.add("is-" + type);
}

/** Older-browser fallback when the Clipboard API is unavailable (e.g. some file:// setups). */
function copyWithFallback(text) {
  const area = el("textarea", { readonly: true, "aria-hidden": "true" });
  area.value = text;
  area.style.cssText = "position:fixed;top:-1000px;opacity:0;";
  document.body.appendChild(area);
  area.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }
  document.body.removeChild(area);
  return copied;
}

function initCopyEmail() {
  const button = byId("copy-email");
  const feedback = byId("copy-feedback");
  let timer;

  button.addEventListener("click", async () => {
    let copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(PERSONAL.email);
        copied = true;
      } catch (error) {
        copied = false;
      }
    }
    if (!copied) copied = copyWithFallback(PERSONAL.email);

    if (copied) showFeedback(feedback, "Email address copied to clipboard.", "success");
    else showFeedback(feedback, "Could not copy automatically. Please copy it manually: " + PERSONAL.email, "error");

    clearTimeout(timer);
    timer = setTimeout(() => showFeedback(feedback, ""), 6000);
  });
}

/* ---- Contact form ----
   A static site has no server to receive messages, so the form never claims to send anything.
   It validates the fields and opens the visitor's own email app with a prepared draft. */
function initContactForm() {
  const form = byId("contact-form");
  const feedback = byId("form-feedback");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const subject = form.elements.subject.value.trim();
    const message = form.elements.message.value.trim();

    // Mark empty required fields
    let firstInvalid = null;
    [form.elements.name, form.elements.message].forEach((field) => {
      const empty = field.value.trim() === "";
      field.closest(".form__field").classList.toggle("has-error", empty);
      field.setAttribute("aria-invalid", String(empty));
      if (empty && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      showFeedback(feedback, "Please fill in your name and a message first.", "error");
      firstInvalid.focus();
      return;
    }

    const mailSubject = subject || "Message from " + name;
    const body = message + "\n\n— " + name;
    window.location.href =
      "mailto:" + PERSONAL.email +
      "?subject=" + encodeURIComponent(mailSubject) +
      "&body=" + encodeURIComponent(body);

    // Honest wording: nothing has been sent yet.
    showFeedback(
      feedback,
      "Your email app should now open with a draft. Nothing has been sent until you press Send there. " +
        "If nothing opened, please copy my email address above.",
      "success"
    );
  });
}

/* ---- Hero background: slowly rotating DNA double helices ---- */
function initHeroCanvas() {
  const canvas = byId("hero-canvas");
  const hero = byId("home");
  const ctx = canvas.getContext && canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let helices = [];
  let running = false;
  let heroVisible = true;
  let time = 0;

  // Strand and rung colours (light sky blues that sit well on the blue hero)
  const STRAND_A = "186, 230, 253";
  const STRAND_B = "255, 255, 255";
  const RUNG = "224, 242, 254";

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const small = width < 700;
    const length = Math.hypot(width, height) * 1.1;
    const layout = small
      ? [{ x: 0.1, y: 0.5, angle: 0.2, amp: 26, speed: 0.9, alpha: 0.7 },
         { x: 0.92, y: 0.5, angle: -0.2, amp: 22, speed: -0.7, alpha: 0.55 }]
      : [{ x: 0.06, y: 0.5, angle: 0.18, amp: 42, speed: 0.9, alpha: 0.75 },
         { x: 0.36, y: 0.55, angle: -0.22, amp: 30, speed: -0.6, alpha: 0.28 },
         { x: 0.62, y: 0.45, angle: 0.25, amp: 34, speed: 0.7, alpha: 0.3 },
         { x: 0.95, y: 0.5, angle: -0.15, amp: 44, speed: -0.9, alpha: 0.75 }];
    helices = layout.map((h, i) => ({ ...h, cx: h.x * width, cy: h.y * height, length, offset: i * 1.7 }));
    draw();
  }

  function drawHelix(h) {
    const spacing = 14;            // distance between base pairs along the helix
    const turn = 0.2;              // phase advance per base pair
    const count = Math.ceil(h.length / spacing);
    ctx.save();
    ctx.translate(h.cx, h.cy);
    ctx.rotate(Math.PI / 2 + h.angle); // lay the helix along the screen height

    let prev = null;
    for (let i = 0; i < count; i++) {
      const y = i * spacing - h.length / 2;
      const phase = i * turn + time * h.speed + h.offset;
      const x1 = Math.sin(phase) * h.amp;
      const z1 = Math.cos(phase);      // depth: +1 is nearest the viewer
      const x2 = -x1;
      const z2 = -z1;

      // base-pair rung
      ctx.strokeStyle = "rgba(" + RUNG + "," + ((0.1 + 0.16 * Math.abs(z1)) * h.alpha).toFixed(3) + ")";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();

      // backbone segments joining to the previous base pair
      if (prev) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(" + STRAND_A + "," + ((0.25 + 0.3 * (z1 + 1) / 2) * h.alpha).toFixed(3) + ")";
        ctx.beginPath(); ctx.moveTo(prev.x1, prev.y); ctx.lineTo(x1, y); ctx.stroke();
        ctx.strokeStyle = "rgba(" + STRAND_B + "," + ((0.25 + 0.3 * (z2 + 1) / 2) * h.alpha).toFixed(3) + ")";
        ctx.beginPath(); ctx.moveTo(prev.x2, prev.y); ctx.lineTo(x2, y); ctx.stroke();
      }

      // nucleotides: far one first, near one on top
      const nodes = z1 < z2
        ? [[x1, z1, STRAND_A], [x2, z2, STRAND_B]]
        : [[x2, z2, STRAND_B], [x1, z1, STRAND_A]];
      nodes.forEach(([x, z, color]) => {
        const depth = (z + 1) / 2;
        ctx.fillStyle = "rgba(" + color + "," + ((0.35 + 0.55 * depth) * h.alpha).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(x, y, 2 + 2.6 * depth, 0, Math.PI * 2);
        ctx.fill();
      });
      prev = { x1, x2, y };
    }
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    helices.forEach(drawHelix);
  }

  let last = 0;
  function step(now) {
    if (!running) return;
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    time += dt;
    draw();
    window.requestAnimationFrame(step);
  }

  function start() {
    if (running || prefersReducedMotion() || !heroVisible || document.hidden) return;
    running = true;
    last = 0;
    window.requestAnimationFrame(step);
  }
  function stop() {
    running = false;
  }

  resize();
  window.addEventListener("resize", resize);

  // Reduced motion: keep a static picture and never animate.
  if (prefersReducedMotion()) return;

  // Save battery: pause when the hero is off-screen or the tab is hidden.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
      heroVisible ? start() : stop();
    }).observe(hero);
  }
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  start();
}

/* ==========================================================================
   5. START-UP
   ========================================================================== */

function init() {
  document.documentElement.classList.add("js"); // enables the entrance animations in CSS

  renderPersonalInfo();
  renderSocialLinks();
  renderAbout();
  renderEducation();
  renderSkills();
  renderProjects();
  renderAchievements();
  renderAcademicDocuments();

  byId("footer-year").textContent = String(new Date().getFullYear());

  initMobileNav();
  initActiveNavHighlight();
  initSmoothScrollFocus();
  initRevealOnScroll();
  initScrollUi();
  initCopyEmail();
  initContactForm();
  initHeroCanvas();
  checkDocumentAvailability();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
