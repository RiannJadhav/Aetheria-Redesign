/* ============================================================
   HOUSE OF AETHERIA — shared interactions
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initEntranceCurtain();
  initNavTheme();
  initMobileDrawer();
  initRevealOnScroll();
  initCollectionExperience();
  initParallax();
  initBagPlaceholder();
});

/* ---------- Entrance: brief curtain so the first frame feels considered ---------- */
function initEntranceCurtain() {
  const curtain = document.querySelector(".entrance-curtain");
  if (!curtain) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    document.body.classList.add("curtain-lifted");
    return;
  }

  requestAnimationFrame(() => document.body.classList.add("curtain-ready"));

  const lift = () => document.body.classList.add("curtain-lifted");
  // lift once the first hero image is decoded, or after a short cap either way —
  // whichever comes first, so a slow image never traps the visitor behind the curtain
  const heroImg = document.querySelector('.product-stage[data-product] .stage-media img');
  const capTimer = setTimeout(lift, 1400);
  if (heroImg && heroImg.complete) {
    clearTimeout(capTimer);
    setTimeout(lift, 500);
  } else if (heroImg) {
    heroImg.addEventListener("load", () => {
      clearTimeout(capTimer);
      setTimeout(lift, 350);
    }, { once: true });
  }
}

/* ---------- Nav: solid on scroll + light/dark theme per section ---------- */
function initNavTheme() {
  const nav = document.querySelector(".site-nav");
  if (!nav) return;

  const scrollHost = document.querySelector(".collection-experience") || window;
  const getScrollTop = () =>
    scrollHost === window ? window.scrollY : scrollHost.scrollTop;

  const onScroll = () => {
    nav.classList.toggle("scrolled", getScrollTop() > 40);
  };
  scrollHost.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // sections can opt into a light nav via [data-nav-theme="light"]
  const themedSections = document.querySelectorAll("[data-nav-theme]");
  if (themedSections.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.dataset.navTheme;
            nav.classList.toggle("theme-light", theme === "light");
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", root: scrollHost === window ? null : scrollHost }
    );
    themedSections.forEach((s) => io.observe(s));
  }
}

/* ---------- Mobile drawer ---------- */
function initMobileDrawer() {
  const burger = document.querySelector(".nav-burger");
  const drawer = document.querySelector(".mobile-drawer");
  if (!burger || !drawer) return;
  burger.addEventListener("click", () => {
    drawer.classList.toggle("open");
  });
  drawer.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => drawer.classList.remove("open"))
  );
}

/* ---------- Reveal-on-scroll for below-fold sections ---------- */
function initRevealOnScroll() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  targets.forEach((t) => io.observe(t));
}

/* ---------- Landing page: full-viewport product journey ---------- */
function initCollectionExperience() {
  const stage = document.querySelector(".collection-experience");
  if (!stage) return;

  const panels = Array.from(stage.querySelectorAll(".product-stage"));
  const indexButtons = Array.from(document.querySelectorAll(".stage-nav-index button"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = panels.indexOf(entry.target);
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          panels.forEach((p) => p.classList.remove("is-active"));
          entry.target.classList.add("is-active");
          indexButtons.forEach((b) => b.classList.remove("active"));
          if (indexButtons[idx]) indexButtons[idx].classList.add("active");
        }
      });
    },
    { root: stage, threshold: [0, 0.6, 1] }
  );
  panels.forEach((p) => io.observe(p));

  indexButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      panels[i].scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // keyboard arrows move through the journey when it's in view
  document.addEventListener("keydown", (e) => {
    const rect = stage.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
    if (!inView) return;
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    e.preventDefault();
    const current = panels.findIndex((p) => p.classList.contains("is-active"));
    let next = current;
    if (e.key === "ArrowDown") next = Math.min(current + 1, panels.length - 1);
    if (e.key === "ArrowUp") next = Math.max(current - 1, 0);
    panels[next].scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* ---------- Parallax: image drifts slower than the scroll, for depth ---------- */
function initParallax() {
  const stage = document.querySelector(".collection-experience");
  if (!stage) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const panels = Array.from(stage.querySelectorAll(".product-stage"));
  const PARALLAX_STRENGTH = 0.14; // fraction of scroll delta the image drifts by
  let ticking = false;

  const apply = () => {
    ticking = false;
    const viewportMid = stage.scrollTop + stage.clientHeight / 2;

    panels.forEach((panel) => {
      const img = panel.querySelector(".stage-media img");
      if (!img) return;
      const panelMid = panel.offsetTop + panel.offsetHeight / 2;
      const offset = (viewportMid - panelMid) * PARALLAX_STRENGTH;
      // clamp so the oversized image (112% height) never shows a gap at the edge
      const clamped = Math.max(-40, Math.min(40, offset));
      img.style.setProperty("--parallax-y", `${clamped}px`);
      panel.classList.add("parallax-live");
    });
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(apply);
      ticking = true;
    }
  };

  stage.addEventListener("scroll", onScroll, { passive: true });
  apply();
}

/* ---------- Cart placeholder: visual bag count, no real checkout yet ---------- */
function initBagPlaceholder() {
  const KEY = "aetheria_bag_count";
  const countEls = document.querySelectorAll("[data-bag-count]");

  const read = () => parseInt(sessionStorage.getItem(KEY) || "0", 10);
  const write = (n) => {
    sessionStorage.setItem(KEY, String(n));
    countEls.forEach((el) => (el.textContent = n));
  };
  write(read());

  document.querySelectorAll("[data-add-to-bag]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const qtyEl = document.querySelector("[data-qty-value]");
      const qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
      write(read() + qty);

      const original = btn.textContent;
      btn.textContent = "Added to Bag";
      btn.classList.add("confirmed");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("confirmed");
      }, 1600);
    });
  });
}

/* ---------- Product page: gallery + accordion + qty stepper ---------- */
function initProductPageWidgets() {
  const heroImg = document.querySelector("[data-hero-img]");
  document.querySelectorAll("[data-thumb]").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      document.querySelectorAll("[data-thumb]").forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
      if (heroImg) heroImg.src = thumb.dataset.thumb;
    });
  });

  document.querySelectorAll(".acc-item").forEach((item) => {
    const head = item.querySelector(".acc-head");
    head.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".acc-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });

  const qtyValue = document.querySelector("[data-qty-value]");
  if (qtyValue) {
    document.querySelector("[data-qty-minus]").addEventListener("click", () => {
      qtyValue.textContent = Math.max(1, parseInt(qtyValue.textContent, 10) - 1);
    });
    document.querySelector("[data-qty-plus]").addEventListener("click", () => {
      qtyValue.textContent = Math.min(9, parseInt(qtyValue.textContent, 10) + 1);
    });
  }
}
