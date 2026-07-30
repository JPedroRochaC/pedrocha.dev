(() => {
  const corpo = document.body;
  const cabecalho = document.querySelector(".cabecalho-site");
  const alternadorMenu = document.querySelector(".alternador-menu");
  const navegacao = document.querySelector(".links-navegacao");
  const fundoMenu = document.querySelector(".fundo-escuro-menu");
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    return;
  }

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

  // Fade-in das imagens principais ao carregar
  document.querySelectorAll(".retrato img, .visual-projeto img").forEach((imagem) => {
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

  // Botão de copiar (WhatsApp/e-mail) com feedback visual
  document.querySelectorAll(".botao-copiar").forEach((botao) => {
    const rotulo = botao.querySelector(".rotulo-botao-copiar");
    const textoParaCopiar = botao.dataset.copy;
    const rotuloPadrao = botao.dataset.label || rotulo?.textContent || "Copiar";
    const rotuloCopiado = botao.dataset.copiedLabel || "Copiado!";
    let temporizadorReset;

    botao.addEventListener("click", async () => {
      if (!textoParaCopiar) return;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(textoParaCopiar);
        } else {
          const auxiliar = document.createElement("textarea");
          auxiliar.value = textoParaCopiar;
          auxiliar.style.position = "fixed";
          auxiliar.style.opacity = "0";
          document.body.appendChild(auxiliar);
          auxiliar.select();
          document.execCommand("copy");
          auxiliar.remove();
        }

        botao.classList.add("copiado");
        if (rotulo) rotulo.textContent = rotuloCopiado;

        window.clearTimeout(temporizadorReset);
        temporizadorReset = window.setTimeout(() => {
          botao.classList.remove("copiado");
          if (rotulo) rotulo.textContent = rotuloPadrao;
        }, 1800);
      } catch (erro) {
      }
    });
  });
})();