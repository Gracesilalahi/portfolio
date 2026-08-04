document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      const expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(expanded));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  /* ---------- Scroll-spy: highlight active nav link ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal-on-scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const reveal = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => reveal.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Shared image lightbox (certificates + project screenshots) ---------- */
  const lightbox = document.getElementById("certLightbox");
  const lightboxImg = document.getElementById("certLightboxImg");
  const lightboxTitle = document.getElementById("certLightboxTitle");
  const lightboxMeta = document.getElementById("certLightboxMeta");
  let lastFocused = null;

  function openLightbox({ full, title, meta, trigger }) {
    lightboxImg.src = full;
    lightboxImg.alt = title || "";
    lightboxTitle.textContent = title || "";
    lightboxMeta.textContent = meta || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lastFocused = trigger || null;
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  if (lightbox) {
    /* Certificate exhibits (Prestasi section) */
    document.querySelectorAll(".cert-exhibit").forEach((btn) => {
      btn.addEventListener("click", () =>
        openLightbox({
          full: btn.getAttribute("data-full"),
          title: btn.getAttribute("data-title"),
          meta: btn.getAttribute("data-meta"),
          trigger: btn,
        })
      );
    });

    /* Project screenshots (Proyek section) — only ones with a real photo */
    document.querySelectorAll(".project-media").forEach((media) => {
      const img = media.querySelector("img");
      if (!img) return; // skip decorative SVG illustrations (no real screenshot)

      media.classList.add("zoomable");
      media.setAttribute("role", "button");
      media.setAttribute("tabindex", "0");
      media.setAttribute("aria-label", `Perbesar tangkapan layar: ${img.alt}`);

      const card = media.closest(".project-card");
      const title = card?.querySelector(".project-top h3")?.textContent?.trim() || img.alt;
      const date = card?.querySelector(".project-date")?.textContent?.trim() || "";

      const hint = document.createElement("span");
      hint.className = "cert-zoom media-zoom-hint";
      hint.textContent = "⤢ Perbesar";
      hint.setAttribute("aria-hidden", "true");
      media.appendChild(hint);

      const trigger = () =>
        openLightbox({ full: img.currentSrc || img.src, title, meta: date, trigger: media });

      media.addEventListener("click", trigger);
      media.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          trigger();
        }
      });
    });

    lightbox.querySelectorAll("[data-close]").forEach((el) =>
      el.addEventListener("click", closeLightbox)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }
});
