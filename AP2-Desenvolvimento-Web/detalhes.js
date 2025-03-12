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

console.log("Altura:", achaCookie("altura"));

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

    const body = document.body;
    body.innerHTML = "";

    const container = document.createElement("div");
    container.id = "container-jogador";
    body.appendChild(container);


    const detalhesJogadorDiv = document.createElement("div");
    detalhesJogadorDiv.id = "detalhes-jogador";
    detalhesJogadorDiv.classList.add("detalhes-container");

    const nome = document.createElement("h1");
    nome.innerHTML = dados.nome;
    nome.classList.add("nome-jogador");
    detalhesJogadorDiv.appendChild(nome);

    const imagem = document.createElement("img");
    imagem.alt = "Imagem do atleta";
    imagem.src = dados.imagem;
    imagem.classList.add("imagem-jogador");
    detalhesJogadorDiv.appendChild(imagem);

    const nJogos = document.createElement("p");
    const jogosIcon = document.createElement("span");
    jogosIcon.innerHTML = "⚽";
    jogosIcon.classList.add("icone1");
    nJogos.innerHTML = `${jogosIcon.outerHTML} Número de jogos: ${dados.n_jogos}`;
    nJogos.classList.add("jogos-jogador");
    detalhesJogadorDiv.appendChild(nJogos);

    const elenco = document.createElement("p");
    const elencoIcon = document.createElement("span");
    elencoIcon.innerHTML = dados.elenco.toLowerCase() === "masculino" ? "👨" : "👩";
    elencoIcon.classList.add("icone");
    elenco.innerHTML = `${elencoIcon.outerHTML} Elenco: ${dados.elenco}`;
    elenco.classList.add("elenco-jogador");
    detalhesJogadorDiv.appendChild(elenco);

    const noTimeDesde = document.createElement("p");
    const timeDesdeIcon = document.createElement("span");
    timeDesdeIcon.innerHTML = "⏳";
    timeDesdeIcon.classList.add("icone");
    noTimeDesde.innerHTML = `${timeDesdeIcon.outerHTML} No time desde: ${dados.no_botafogo_desde}`;
    noTimeDesde.classList.add("time-jogador");
    detalhesJogadorDiv.appendChild(noTimeDesde);

    const posicao = document.createElement("p");
    const posicaoIcon = document.createElement("span");
    posicaoIcon.innerHTML = dados.posicao.toLowerCase() === "goleiro" ? "🥅" : "🧑";
    posicao.innerHTML = `${posicaoIcon.outerHTML} Posição: ${dados.posicao}`;
    posicao.classList.add("posicao-jogador");
    detalhesJogadorDiv.appendChild(posicao);

    const altura = document.createElement("p");
    const alturaIcon = document.createElement("span");
    alturaIcon.innerHTML = "📏";
    alturaIcon.classList.add("icone");
    altura.innerHTML = `${alturaIcon.outerHTML} Altura: ${dados.altura}`;
    altura.classList.add("altura-jogador");
    detalhesJogadorDiv.appendChild(altura);

    const naturalidade = document.createElement("p");
    naturalidade.innerText = `Naturalidade: ${dados.naturalidade}`;
    naturalidade.classList.add("naturalidade-jogador");
    detalhesJogadorDiv.appendChild(naturalidade);

    const nascimento = document.createElement("p");
    const nascimentoIcon = document.createElement("span");
    nascimentoIcon.innerHTML = "📅";
    nascimentoIcon.classList.add("icone");
    nascimento.innerHTML = `${nascimentoIcon.outerHTML} Nascimento: ${dados.nascimento}`;
    nascimento.classList.add("nascimento-jogador");
    detalhesJogadorDiv.appendChild(nascimento);

    const detalhes = document.createElement("p");
    detalhes.innerHTML = dados.detalhes;
    detalhes.classList.add("detalhes-jogador");
    detalhesJogadorDiv.appendChild(detalhes);

    const botao = document.createElement("button");
    botao.innerText = "Voltar";
    botao.classList.add("botao-voltar");
    botao.onclick = () => (window.location = "index.html");
    detalhesJogadorDiv.appendChild(botao);

   
    container.appendChild(detalhesJogadorDiv);
};

if (localStorage.getItem("logado") === "sim") {
    pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then((r) => montaPagina(r));
} else {
    document.body.innerHTML = "<h1>Você precisa estar logado para ter acesso.</h1>";
}