(() => {
  const corpo = document.body;
  const cabecalho = document.querySelector(".cabecalho-site");
  const alternadorMenu = document.querySelector(".alternador-menu");
  const navegacao = document.querySelector(".links-navegacao");
  const fundoMenu = document.querySelector(".fundo-escuro-menu");
  const alternadorIdioma = document.querySelector(".alternador-idioma");
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CHAVE_IDIOMA = "pedrocha.dev:idioma";
  const IDIOMA_PADRAO = "pt";
  let idiomaAtual = IDIOMA_PADRAO;

  const traducoesPtEn = new Map([
    ["Sobre", "About"],
    ["Projetos", "Projects"],
    ["Formação", "Education"],
    ["Contato", "Contact"],
    ["Vamos conversar", "Let's talk"],
    ["Fortaleza, CE · disponível para trabalho", "Fortaleza, Brazil · available for work"],
    ["Olá, eu sou", "Hi, I'm"],
    ["Desenvolvedor Full-Stack em formação", "Aspiring Full-Stack Developer"],
    [
      "Estudante de Análise e Desenvolvimento de Sistemas construindo uma base full-stack. No front-end, desenvolvo interfaces com HTML, CSS e JavaScript; no back-end, estudo Node.js e APIs REST para conectar interfaces e regras de negócio.",
      "Systems Analysis and Development student building a full-stack foundation. On the front end, I create interfaces with HTML, CSS and JavaScript; on the back end, I study Node.js and REST APIs to connect interfaces and business logic."
    ],
    ["Conhecer minha stack", "Explore my stack"],
    ["Baixar currículo", "Download résumé"],
    ["Girar", "Flip"],
    ["Disponível p/ trabalho", "Available for work"],
    ["anos", "years old"],
    ["Agora", "Now"],
    ["Estudando e praticando", "Studying and practicing"],
    ["Idiomas", "Languages"],
    ["Português · Inglês", "Portuguese · English"],
    ["Construindo uma visão completa, do front-end ao back-end.", "Building a complete perspective, from front end to back end."],
    [
      "Sou Pedro Rocha, estudante de Análise e Desenvolvimento de Sistemas na Unifametro e desenvolvedor full-stack em formação. Gosto de compreender como interface, regras de negócio e dados se conectam em uma aplicação web.",
      "I'm Pedro Rocha, a Systems Analysis and Development student at Unifametro and an aspiring full-stack developer. I enjoy understanding how interfaces, business logic and data connect within a web application."
    ],
    [
      "Sou curioso, organizado e gosto de entender o motivo por trás de cada solução. Aprendo melhor colocando os conceitos em prática, analisando o que não funcionou e buscando maneiras mais simples e claras de escrever código.",
      "I'm curious, organized and driven to understand the reasoning behind each solution. I learn best by putting concepts into practice, reviewing what did not work and finding simpler, clearer ways to write code."
    ],
    [
      "Busco minha primeira oportunidade para aplicar essa base, desenvolver experiência ao lado de uma equipe e contribuir com responsabilidade enquanto continuo evoluindo como profissional.",
      "I'm looking for my first opportunity to apply this foundation, gain experience alongside a team and contribute responsibly while continuing to grow as a professional."
    ],
    ["Tecnologias que conectam front-end, back-end e dados.", "Technologies connecting front end, back end and data."],
    [
      "Minha base atual reúne as principais ferramentas que utilizo para desenvolver interfaces, APIs e persistência de dados.",
      "My current foundation brings together the main tools I use to build interfaces, APIs and data persistence."
    ],
    ["Dados", "Database"],
    ["Ferramentas", "Tools"],
    ["IA", "AI"],
    ["IA e Produtividade", "AI & Productivity"],
    ["Novos projetos estão a caminho.", "New projects are on the way."],
    [
      "Este espaço será atualizado conforme eu desenvolver e publicar novas soluções.",
      "This space will be updated as I build and publish new solutions."
    ],
    ["Em desenvolvimento", "In development"],
    ["Futuro projeto aqui.", "Future project coming soon."],
    [
      "Estou preparando uma nova aplicação web para apresentar neste espaço em breve.",
      "I'm preparing a new web application to feature here soon."
    ],
    ["Formação e estudos que sustentam minha evolução.", "Education and studies supporting my growth."],
    ["Graduação", "Degree"],
    ["Análise e Desenvolvimento de Sistemas", "Systems Analysis and Development"],
    ["ADS · Unifametro", "Systems Analysis and Development · Unifametro"],
    ["Estudos", "Studies"],
    ["Desenvolvimento web", "Web development"],
    [
      "HTML, CSS, JavaScript, Node.js, APIs REST, PostgreSQL e MongoDB",
      "HTML, CSS, JavaScript, Node.js, REST APIs, PostgreSQL and MongoDB"
    ],
    ["Objetivo", "Goal"],
    ["Primeira oportunidade como desenvolvedor", "First opportunity as a developer"],
    ["Estágio ou posição júnior em desenvolvimento full-stack", "Internship or junior full-stack development position"],
    ["Tem uma oportunidade ou uma boa ideia?", "Have an opportunity or a great idea?"],
    [
      "Busco minha primeira oportunidade como desenvolvedor full-stack. Quero aplicar meus conhecimentos em front-end e back-end, aprender com uma equipe e contribuir na construção de soluções úteis.",
      "I'm looking for my first opportunity as a full-stack developer. I want to apply my front-end and back-end knowledge, learn with a team and help build useful solutions."
    ],
    ["Enviar e-mail", "Send an email"],
    ["Falar pelo LinkedIn", "Message me on LinkedIn"],
    ["© 2026 Pedro Rocha · Fortaleza, CE", "© 2026 Pedro Rocha · Fortaleza, Brazil"],
    ["E-mail", "Email"]
  ]);

  const traducoesEnPt = new Map(
    [...traducoesPtEn].map(([portugues, ingles]) => [ingles, portugues])
  );

  const traduzirTextos = (traducoes) => {
    const cursor = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nos = [];
    while (cursor.nextNode()) nos.push(cursor.currentNode);

    nos.forEach((no) => {
      const texto = no.nodeValue.replace(/\s+/g, " ").trim();
      const traducao = traducoes.get(texto);
      if (!traducao) return;

      const inicio = no.nodeValue.match(/^\s*/)?.[0] || "";
      const fim = no.nodeValue.match(/\s*$/)?.[0] || "";
      no.nodeValue = `${inicio}${traducao}${fim}`;
    });
  };

  const atualizarMetadados = (idioma) => {
    const emIngles = idioma === "en";
    const titulo = emIngles
      ? "Pedro Rocha · Full-Stack Developer"
      : "Pedro Rocha · Desenvolvedor Full-Stack";
    const descricao = emIngles
      ? "Pedro Rocha's portfolio, Systems Analysis and Development student and aspiring full-stack developer."
      : "Portfólio de Pedro Rocha, estudante de ADS e desenvolvedor full-stack em formação.";
    const descricaoSocial = emIngles
      ? "Aspiring full-stack developer working with HTML, CSS, JavaScript, Node.js and REST APIs."
      : "Desenvolvedor full-stack em formação com HTML, CSS, JavaScript, Node.js e APIs REST.";

    document.title = titulo;
    document.querySelector('meta[name="description"]')?.setAttribute("content", descricao);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", titulo);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", descricaoSocial);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", titulo);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", descricaoSocial);
  };

  const atualizarAcessibilidadeIdioma = (idioma) => {
    const emIngles = idioma === "en";
    document.querySelector(".logo")?.setAttribute(
      "aria-label",
      emIngles ? "Back to the top" : "Voltar ao início"
    );
    navegacao?.setAttribute(
      "aria-label",
      emIngles ? "Main navigation" : "Navegação principal"
    );
    document.querySelector(".moldura-retrato")?.setAttribute(
      "aria-label",
      emIngles ? "Flip profile card" : "Girar cartão de apresentação"
    );
    document.querySelector(".indice-destaque")?.setAttribute(
      "aria-label",
      emIngles ? "Professional summary" : "Resumo profissional"
    );
    document.querySelector(".voltar-ao-topo")?.setAttribute(
      "aria-label",
      emIngles ? "Back to top" : "Voltar ao topo"
    );
    alternadorMenu?.setAttribute(
      "aria-label",
      corpo.classList.contains("menu-aberto")
        ? emIngles ? "Close menu" : "Fechar menu"
        : emIngles ? "Open menu" : "Abrir menu"
    );

    const rotuloAlternador = emIngles
      ? "Change website language to Portuguese"
      : "Mudar site para inglês";
    alternadorIdioma?.setAttribute("aria-label", rotuloAlternador);
    alternadorIdioma?.setAttribute("title", rotuloAlternador);
  };

  const aplicarIdioma = (idioma) => {
    const novoIdioma = idioma === "en" ? "en" : IDIOMA_PADRAO;
    if (novoIdioma !== idiomaAtual) {
      traduzirTextos(novoIdioma === "en" ? traducoesPtEn : traducoesEnPt);
    }

    idiomaAtual = novoIdioma;
    document.documentElement.lang = novoIdioma === "en" ? "en" : "pt-BR";
    alternadorIdioma?.querySelector(".idioma-pt")?.classList.toggle("ativo", novoIdioma === "pt");
    alternadorIdioma?.querySelector(".idioma-en")?.classList.toggle("ativo", novoIdioma === "en");
    atualizarMetadados(novoIdioma);
    atualizarAcessibilidadeIdioma(novoIdioma);
    try {
      window.localStorage.setItem(CHAVE_IDIOMA, novoIdioma);
    } catch {
      // O seletor continua funcional quando o armazenamento estiver bloqueado.
    }
  };

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
      elementoSemestre.textContent =
        idiomaAtual === "en" ? `Semester ${semestre}` : `${semestre}º semestre`;
    }
  };

  let idiomaSalvo = IDIOMA_PADRAO;
  try {
    idiomaSalvo = window.localStorage.getItem(CHAVE_IDIOMA) || IDIOMA_PADRAO;
  } catch {
    // Em páginas abertas diretamente, alguns navegadores bloqueiam o localStorage.
  }
  aplicarIdioma(idiomaSalvo === "en" ? "en" : IDIOMA_PADRAO);
  atualizarInformacoesAutomaticas();

  alternadorIdioma?.addEventListener("click", () => {
    aplicarIdioma(idiomaAtual === "pt" ? "en" : "pt");
    atualizarInformacoesAutomaticas();
  });

  const fecharMenu = () => {
    corpo.classList.remove("menu-aberto");
    alternadorMenu?.setAttribute("aria-expanded", "false");
    alternadorMenu?.setAttribute(
      "aria-label",
      idiomaAtual === "en" ? "Open menu" : "Abrir menu"
    );
  };

  alternadorMenu?.addEventListener("click", () => {
    const vaiAbrir = !corpo.classList.contains("menu-aberto");
    corpo.classList.toggle("menu-aberto", vaiAbrir);
    alternadorMenu.setAttribute("aria-expanded", String(vaiAbrir));
    alternadorMenu.setAttribute(
      "aria-label",
      vaiAbrir
        ? idiomaAtual === "en" ? "Close menu" : "Fechar menu"
        : idiomaAtual === "en" ? "Open menu" : "Abrir menu"
    );

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
