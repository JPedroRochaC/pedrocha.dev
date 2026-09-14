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
    ["Desenvolvedor Back-End em formação", "Aspiring Back-End Developer"],
    [
      "Desenvolvedor Back-End em formação, com foco em Java e Spring Boot. Estudante de Análise e Desenvolvimento de Sistemas, construindo APIs REST e trabalhando modelagem de dados com SQL.",
      "Aspiring Back-End Developer focused on Java and Spring Boot. Systems Analysis and Development student building REST APIs and working with SQL data modeling."
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
    ["Construindo bases sólidas para aplicações back-end.", "Building solid foundations for back-end applications."],
    [
      "Sou Pedro Rocha, estudante de Análise e Desenvolvimento de Sistemas na Unifametro e desenvolvedor back-end em formação. Gosto de entender como regras de negócio, persistência de dados e arquitetura de APIs se conectam em uma aplicação.",
      "I'm Pedro Rocha, a Systems Analysis and Development student at Unifametro and an aspiring back-end developer. I enjoy understanding how business rules, data persistence and API architecture connect within an application."
    ],
    [
      "Sou curioso, organizado e gosto de entender o motivo por trás de cada solução. Aprendo melhor colocando os conceitos em prática, analisando o que não funcionou e buscando maneiras mais simples e claras de escrever código.",
      "I'm curious, organized and driven to understand the reasoning behind each solution. I learn best by putting concepts into practice, reviewing what did not work and finding simpler, clearer ways to write code."
    ],
    [
      "Busco minha primeira oportunidade em back-end para aplicar essa base, desenvolver experiência ao lado de uma equipe e contribuir com responsabilidade enquanto continuo evoluindo como profissional.",
      "I'm looking for my first back-end opportunity to apply this foundation, gain experience alongside a team and contribute responsibly while continuing to grow as a professional."
    ],
    ["Tecnologias que sustentam APIs e dados.", "Technologies supporting APIs and data."],
    [
      "Minha base atual é focada em desenvolvimento back-end, APIs REST e modelagem de dados, com front-end como apoio.",
      "My current foundation focuses on back-end development, REST APIs and data modeling, with front end as supporting knowledge."
    ],
    ["Dados", "Database"],
    ["Foco atual", "Current focus"],
    ["Ferramentas", "Tools"],
    ["IA", "AI"],
    ["IA e Produtividade", "AI & Productivity"],
    ["Projetos back-end em construção.", "Back-end projects in progress."],
    [
      "Estou desenvolvendo projetos com Spring Boot e PostgreSQL para demonstrar APIs REST, regras de negócio e persistência de dados.",
      "I'm building Spring Boot and PostgreSQL projects to demonstrate REST APIs, business rules and data persistence."
    ],
    ["Em construção", "In progress"],
    ["Em breve, projetos completos de back-end estarão disponíveis aqui.", "Complete back-end projects will be available here soon."],
    ["Acompanhar no GitHub", "Follow on GitHub"],
    ["Formação e estudos que sustentam minha evolução.", "Education and studies supporting my growth."],
    ["Graduação", "Degree"],
    ["Análise e Desenvolvimento de Sistemas", "Systems Analysis and Development"],
    ["ADS · Unifametro", "Systems Analysis and Development · Unifametro"],
    ["Estudos", "Studies"],
    ["Desenvolvimento back-end", "Back-end development"],
    [
      "Java, Spring Boot, SQL, APIs REST, Orientação a Objetos",
      "Java, Spring Boot, SQL, REST APIs, Object-Oriented Programming"
    ],
    ["Objetivo", "Goal"],
    ["Primeira oportunidade como desenvolvedor", "First opportunity as a developer"],
    ["Estágio ou posição júnior em desenvolvimento back-end", "Back-end development internship or junior position"],
    ["Tem uma oportunidade ou uma boa ideia?", "Have an opportunity or a great idea?"],
    [
      "Busco minha primeira oportunidade como desenvolvedor back-end. Quero aplicar meus conhecimentos em Java, Spring Boot e SQL, aprender com uma equipe e contribuir na construção de soluções úteis.",
      "I'm looking for my first opportunity as a back-end developer. I want to apply my knowledge of Java, Spring Boot and SQL, learn with a team and help build useful solutions."
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
      ? "Pedro Rocha · Java Back-End Developer"
      : "Pedro Rocha · Desenvolvedor Back-End Java";
    const descricao = emIngles
      ? "Pedro Rocha's portfolio, Systems Analysis and Development student and aspiring Java back-end developer."
      : "Portfólio de Pedro Rocha, estudante de ADS e desenvolvedor back-end em formação com foco em Java, Spring Boot e SQL.";
    const descricaoSocial = emIngles
      ? "Aspiring back-end developer working with Java, Spring Boot, SQL and REST APIs."
      : "Desenvolvedor back-end em formação com foco em Java, Spring Boot, SQL e APIs REST.";

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
