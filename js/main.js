(() => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");
  const backdrop = document.querySelector(".menu-backdrop");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const closeMenu = () => {
    body.classList.remove("menu-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Abrir menu");
  };

  toggle?.addEventListener("click", () => {
    const willOpen = !body.classList.contains("menu-open");
    body.classList.toggle("menu-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
    toggle.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");

    if (willOpen) {
      const firstLink = navigation?.querySelector("a");
      window.setTimeout(() => firstLink?.focus(), reduceMotion ? 0 : 320);
    }
  });

  backdrop?.addEventListener("click", closeMenu);
  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("menu-open")) {
      closeMenu();
      toggle?.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });

  const progressBar = document.querySelector(".scroll-progress span");
  const backToTopButton = document.querySelector(".back-to-top");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 16);

    if (progressBar) {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    backToTopButton?.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealTargets = document.querySelectorAll(
    ".overline, .hero-kicker, .hero h1, .hero-role, .hero-description, .hero-actions, " +
    ".portrait, .hero-index, .section-title, .section-intro, " +
    ".about-copy, .stack-row, .project, .education-list article, .contact-inner"
  );

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealTargets.forEach((element) => element.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -48px",
    }
  );

  revealTargets.forEach((element) => observer.observe(element));

  // Link ativo no menu conforme a seção visível
  const sections = document.querySelectorAll("main section[id]");
  const spyLinks = document.querySelectorAll(".nav-links a[href^='#']");

  if (sections.length && spyLinks.length) {
    const setActiveLink = (id) => {
      spyLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    };

    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => spyObserver.observe(section));
  }

  // Voltar ao topo
  const backToTop = document.querySelector(".back-to-top");
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  // Fade-in das imagens principais ao carregar
  document.querySelectorAll(".portrait img, .project-visual img").forEach((img) => {
    if (img.complete) {
      img.classList.add("is-loaded");
    } else {
      img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
    }
  });

  // Brilho seguindo o cursor no hero (só em dispositivos com mouse)
  const hero = document.querySelector(".hero");
  if (hero && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--x", `${x}%`);
      hero.style.setProperty("--y", `${y}%`);
      hero.classList.add("glow-active");
    });
    hero.addEventListener("pointerleave", () => hero.classList.remove("glow-active"));
  }
  // Botão de copiar (WhatsApp/e-mail) com feedback visual
  document.querySelectorAll(".copy-btn").forEach((button) => {
    const label = button.querySelector(".copy-btn-label");
    const textToCopy = button.dataset.copy;
    const defaultLabel = button.dataset.label || label?.textContent || "Copiar";
    const copiedLabel = button.dataset.copiedLabel || "Copiado!";
    let resetTimer;

    button.addEventListener("click", async () => {
      if (!textToCopy) return;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const helper = document.createElement("textarea");
          helper.value = textToCopy;
          helper.style.position = "fixed";
          helper.style.opacity = "0";
          document.body.appendChild(helper);
          helper.select();
          document.execCommand("copy");
          helper.remove();
        }

        button.classList.add("is-copied");
        if (label) label.textContent = copiedLabel;

        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
          button.classList.remove("is-copied");
          if (label) label.textContent = defaultLabel;
        }, 1800);
      } catch (error) {
      }
    });
  });
})();