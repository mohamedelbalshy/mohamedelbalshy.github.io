/* ==========================================================================
   Mohamed Elbalshy — Personal Portfolio
   Vanilla JS interactions
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     1. Footer year
  ------------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     2. Mobile navigation toggle
  ------------------------------------------------------------------ */
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  function closeNav() {
    navToggle.classList.remove("is-open");
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu when a link is tapped.
    navLinks.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeNav();
    });
  }

  /* ------------------------------------------------------------------
     3. Sticky header + back-to-top visibility
  ------------------------------------------------------------------ */
  const header = document.getElementById("site-header");
  const backToTop = document.getElementById("back-to-top");

  function onScroll() {
    const scrolled = window.scrollY > 40;
    header.classList.toggle("is-scrolled", scrolled);
    backToTop.classList.toggle("is-visible", window.scrollY > 600);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ------------------------------------------------------------------
     4. Active nav link (scroll spy)
  ------------------------------------------------------------------ */
  const sections = document.querySelectorAll("section[id]");
  const navLinkEls = document.querySelectorAll(".nav__link[href^='#']");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinkEls.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  /* ------------------------------------------------------------------
     5. Scroll reveal animations
  ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll(
    ".section__title, .about__text, .about__stats, .skills__group, .timeline__item, .project, .contact__lead, .contact__actions"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal", "is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

  /* ------------------------------------------------------------------
     6. Hero typewriter effect
  ------------------------------------------------------------------ */
  const phrases = [
    "scalable backend systems.",
    "clean, well-tested APIs.",
    "full-stack web apps.",
    "products that ship.",
  ];

  const typewriterEl = document.getElementById("typewriter");
  if (typewriterEl) {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const current = phrases[phraseIndex];
      charIndex = deleting ? charIndex - 1 : charIndex + 1;
      typewriterEl.textContent = current.slice(0, charIndex);

      let delay = deleting ? 40 : 75;

      if (!deleting && charIndex === current.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
      }

      setTimeout(type, delay);
    }

    type();
  }

  /* ------------------------------------------------------------------
     7. Reviews gallery lightbox
  ------------------------------------------------------------------ */
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const thumbs = Array.from(document.querySelectorAll(".review-thumb"));

  if (gallery && lightbox && thumbs.length) {
    let index = 0;

    // Mark missing images so placeholders show instead of broken icons.
    thumbs.forEach((thumb) => {
      const img = thumb.querySelector("img");
      if (!img) return;
      img.addEventListener("error", () => thumb.classList.add("is-missing"));
      if (img.complete && img.naturalWidth === 0) thumb.classList.add("is-missing");
    });

    function openLightbox(i) {
      index = (i + thumbs.length) % thumbs.length;
      const img = thumbs[index].querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCounter.textContent = `${index + 1} / ${thumbs.length}`;
      lightbox.hidden = false;
      requestAnimationFrame(() => lightbox.classList.add("is-open"));
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(() => {
        lightbox.hidden = true;
      }, 250);
    }

    function step(delta) {
      openLightbox(index + delta);
    }

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener("click", () => {
        if (thumb.classList.contains("is-missing")) return;
        openLightbox(i);
      });
    });

    document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
    document.getElementById("lightbox-prev").addEventListener("click", (e) => {
      e.stopPropagation();
      step(-1);
    });
    document.getElementById("lightbox-next").addEventListener("click", (e) => {
      e.stopPropagation();
      step(1);
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }
})();
