(() => {
  const corpo = document.body;
  const cabecalho = document.querySelector(".cabecalho-site");
  const alternadorMenu = document.querySelector(".alternador-menu");
  const navegacao = document.querySelector(".links-navegacao");
  const fundoMenu = document.querySelector(".fundo-escuro-menu");
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const atualizarInformacoesAutomaticas = () => {
    const hoje = new Date();
    const aniversarioNesteAno = new Date(hoje.getFullYear(), 5, 6);
    const idade =
      hoje.getFullYear() - 2007 - (hoje < aniversarioNesteAno ? 1 : 0);
    const elementoIdade = document.querySelector("#idade-atual");
    if (elementoIdade) elementoIdade.textContent = String(idade);

    const inicioCurso = new Date(2026, 0, 1);
    const mesesDeCurso =
      (hoje.getFullYear() - inicioCurso.getFullYear()) * 12 +
      hoje.getMonth() -
      inicioCurso.getMonth();
    const semestre = Math.max(1, Math.floor(mesesDeCurso / 6) + 1);
    const elementoSemestre = document.querySelector("#semestre-atual");
    if (elementoSemestre) {
      elementoSemestre.textContent = `${semestre}º semestre`;
    }
  };

  atualizarInformacoesAutomaticas();

  const fecharMenu = () => {
    corpo.classList.remove("menu-aberto");
    alternadorMenu?.setAttribute("aria-expanded", "false");
    alternadorMenu?.setAttribute("aria-label", "Abrir menu");
  };

  alternadorMenu?.addEventListener("click", () => {
    const vaiAbrir = !corpo.classList.contains("menu-aberto");
    corpo.classList.toggle("menu-aberto", vaiAbrir);
    alternadorMenu.setAttribute("aria-expanded", String(vaiAbrir));
    alternadorMenu.setAttribute("aria-label", vaiAbrir ? "Fechar menu" : "Abrir menu");

    if (vaiAbrir) {
      const primeiroLink = navegacao?.querySelector("a");
      window.setTimeout(() => primeiroLink?.focus(), reduzirMovimento ? 0 : 320);
    }
  });

  fundoMenu?.addEventListener("click", fecharMenu);
  navegacao?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && corpo.classList.contains("menu-aberto")) {
      fecharMenu();
      alternadorMenu?.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) fecharMenu();
  });

  const barraProgresso = document.querySelector(".progresso-rolagem span");
  const botaoVoltarAoTopo = document.querySelector(".voltar-ao-topo");

  const atualizarCabecalho = () => {
    cabecalho?.classList.toggle("rolado", window.scrollY > 16);

    if (barraProgresso) {
      const alturaRolavel =
        document.documentElement.scrollHeight - window.innerHeight;
      const progresso = alturaRolavel > 0 ? (window.scrollY / alturaRolavel) * 100 : 0;
      barraProgresso.style.width = `${Math.min(100, Math.max(0, progresso))}%`;
    }

    botaoVoltarAoTopo?.classList.toggle("visivel", window.scrollY > window.innerHeight * 0.8);
  };

  atualizarCabecalho();
  window.addEventListener("scroll", atualizarCabecalho, { passive: true });

  const alvosRevelacao = document.querySelectorAll(
    ".linha-topo, .subtitulo-destaque, .destaque h1, .cargo-destaque, .descricao-destaque, .acoes-destaque, " +
    ".retrato, .indice-destaque, .titulo-secao, .introducao-secao, " +
    ".texto-sobre, .linha-tecnologias, .projeto, .lista-formacao article, .conteudo-contato"
  );

  if (reduzirMovimento || !("IntersectionObserver" in window)) {
    alvosRevelacao.forEach((elemento) => elemento.classList.add("visivel"));
  } else {
    alvosRevelacao.forEach((elemento) => elemento.classList.add("revelar"));

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -48px",
      }
    );

    alvosRevelacao.forEach((elemento) => observador.observe(elemento));
  }

  // Link ativo no menu conforme a seção visível
  const secoes = document.querySelectorAll("main section[id]");
  const linksEspiao = document.querySelectorAll(".links-navegacao a[href^='#']");

  if (secoes.length && linksEspiao.length) {
    const definirLinkAtivo = (id) => {
      linksEspiao.forEach((link) => {
        link.classList.toggle("ativo", link.getAttribute("href") === `#${id}`);
      });
    };

    const observadorEspiao = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) definirLinkAtivo(entrada.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    secoes.forEach((secao) => observadorEspiao.observe(secao));
  }

  // Voltar ao topo
  const voltarAoTopo = document.querySelector(".voltar-ao-topo");
  voltarAoTopo?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduzirMovimento ? "auto" : "smooth" });
  });

  // Rolagem suave para todos os links internos (ancoragem)
  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (id === "#inicio") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: reduzirMovimento ? "auto" : "smooth" });
        return;
      }
      if (id.startsWith("#")) {
        const alvo = document.querySelector(id);
        if (alvo) {
          event.preventDefault();
          const cabecalhoAltura = cabecalho?.offsetHeight || 72;
          const topo = alvo.getBoundingClientRect().top + window.scrollY - cabecalhoAltura;
          window.scrollTo({
            top: topo,
            behavior: reduzirMovimento ? "auto" : "smooth"
          });
        }
      }
    });
  });

  // Fade-in das imagens principais ao carregar
  document.querySelectorAll(".retrato img").forEach((imagem) => {
    if (imagem.complete) {
      imagem.classList.add("carregado");
    } else {
      imagem.addEventListener("load", () => imagem.classList.add("carregado"), { once: true });
    }
  });

  // Brilho seguindo o cursor no hero (só em dispositivos com mouse)
  const destaque = document.querySelector(".destaque");
  if (destaque && window.matchMedia("(pointer: fine)").matches) {
    destaque.addEventListener("pointermove", (event) => {
      const retangulo = destaque.getBoundingClientRect();
      const x = ((event.clientX - retangulo.left) / retangulo.width) * 100;
      const y = ((event.clientY - retangulo.top) / retangulo.height) * 100;
      destaque.style.setProperty("--x", `${x}%`);
      destaque.style.setProperty("--y", `${y}%`);
      destaque.classList.add("brilho-ativo");
    });
    destaque.addEventListener("pointerleave", () => destaque.classList.remove("brilho-ativo"));
  }

  // Alternar a face do cartão de retrato ao clicar (mobile & desktop)
  const molduraRetrato = document.querySelector(".moldura-retrato");
  const girarCartaoRetrato = () => {
    const estaVirado = molduraRetrato.classList.toggle("virado");
    molduraRetrato.setAttribute("aria-pressed", String(estaVirado));
  };

  molduraRetrato?.addEventListener("click", girarCartaoRetrato);
  molduraRetrato?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    girarCartaoRetrato();
  });
})();
