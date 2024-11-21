document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const pega_json = async (caminho) => {
        try {
            const resposta = await fetch(caminho);
            const dados = await resposta.json();
            return dados;
        } catch (err) {
            console.error("Erro ao buscar os dados:", err);
            alert("Erro ao carregar os detalhes do jogador.");
            return null;
        }
    };

    const achaCookie = (chave) => {
        const lista = document.cookie.split("; ");
        const par = lista.find((ele) => ele.startsWith(`${chave}=`));
        return par ? par.split("=")[1] : null;
    };

    const dadosSessionStorage = sessionStorage.getItem("dados");
    const obj = dadosSessionStorage ? JSON.parse(dadosSessionStorage) : null;

    if (obj) {
        console.log("Número de Jogos:", obj.nJogos);
    } else {
        console.warn("Dados do jogador não encontrados no sessionStorage.");
    }

    const montaPagina = (dados) => {
        if (!dados) {
            document.body.innerHTML = "<h1>Erro ao carregar os detalhes do jogador.</h1>";
            return;
        }

        // Limpa o conteúdo da página
        document.body.innerHTML = "";

        // Cria o contêiner principal
        const container = document.createElement("div");
        container.classList.add("detalhes-container");

        // Título
        const nome = document.createElement("h1");
        nome.innerHTML = dados.nome;
        nome.classList.add("nome-jogador");
        container.appendChild(nome);

        // Imagem do jogador
        const imagem = document.createElement("img");
        imagem.alt = "Imagem do atleta";
        imagem.src = dados.imagem;
        imagem.classList.add("imagem-jogador");
        container.appendChild(imagem);

        // Informações do jogador
        const infoContainer = document.createElement("div");
        infoContainer.classList.add("informacoes-jogador");

        const nJogos = document.createElement("p");
        const jogosIcon = document.createElement("span");
        jogosIcon.innerHTML = "⚽";
        jogosIcon.classList.add("icone");
        nJogos.innerHTML = `${jogosIcon.outerHTML} Jogos: ${dados.n_jogos}`;
        nJogos.classList.add("jogos-jogador");
        infoContainer.appendChild(nJogos);

        const elenco = document.createElement("p");
        const elencoIcon = document.createElement("span");
        elencoIcon.innerHTML = dados.elenco.toLowerCase() === "masculino" ? "👨" : "👩";
        elencoIcon.classList.add("icone");
        elenco.innerHTML = `${elencoIcon.outerHTML} Elenco: ${dados.elenco}`;
        elenco.classList.add("elenco-jogador");
        infoContainer.appendChild(elenco);

        const noTimeDesde = document.createElement("p");
        const timeDesdeIcon = document.createElement("span");
        timeDesdeIcon.innerHTML = "⏳";
        timeDesdeIcon.classList.add("icone");
        noTimeDesde.innerHTML = `${timeDesdeIcon.outerHTML} No time desde: ${dados.no_botafogo_desde}`;
        noTimeDesde.classList.add("time-jogador");
        infoContainer.appendChild(noTimeDesde);

        const posicao = document.createElement("p");
        const posicaoIcon = document.createElement("span");
        posicaoIcon.innerHTML = dados.posicao.toLowerCase() === "goleiro" ? "🧤" : "🧑";
        posicao.classList.add("posicao-jogador");
        posicao.innerHTML = `${posicaoIcon.outerHTML} Posição: ${dados.posicao}`;
        infoContainer.appendChild(posicao);

        const altura = document.createElement("p");
        const alturaIcon = document.createElement("span");
        alturaIcon.innerHTML = "📏";
        alturaIcon.classList.add("icone");
        altura.innerHTML = `${alturaIcon.outerHTML} Altura: ${dados.altura}`;
        infoContainer.appendChild(altura);

        const nascimento = document.createElement("p");
        const nascimentoIcon = document.createElement("span");
        nascimentoIcon.innerHTML = "📅";
        nascimentoIcon.classList.add("icone");
        nascimento.innerHTML = `${nascimentoIcon.outerHTML} Nascimento: ${dados.nascimento}`;
        infoContainer.appendChild(nascimento);

        const naturalidade = document.createElement("p");
        naturalidade.innerText = `Naturalidade: ${dados.naturalidade}`;
        infoContainer.appendChild(naturalidade);

        container.appendChild(infoContainer);

        // Detalhes adicionais
        const detalhes = document.createElement("p");
        detalhes.innerHTML = dados.detalhes;
        detalhes.classList.add("detalhes-jogador");
        container.appendChild(detalhes);

        // Botão de voltar
        const botaoVoltar = document.createElement("button");
        botaoVoltar.innerText = "Voltar";
        botaoVoltar.classList.add("botao-voltar");
        botaoVoltar.onclick = () => {
            window.history.back();
        };
        container.appendChild(botaoVoltar);

        // Adiciona o conteúdo na página
        document.body.appendChild(container);
    };

    if (localStorage.getItem("logado") === "sim") {
        pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then((r) => montaPagina(r));
    } else {
        document.body.innerHTML = "<h1>Você precisa estar logado para acessar.</h1>";
    }

    
});
