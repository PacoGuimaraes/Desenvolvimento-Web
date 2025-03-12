const url = "https://botafogo-atletas.mange.li/2024-1/";

const container = document.getElementById("container");
const jogadoresSection = document.getElementById("jogadores");
const loginForm = document.getElementById("login-form");
const botaoLogout = document.getElementById("logout");
const loginHeader = document.getElementById("header-login");
const loginPage = document.getElementById("login-page");
const login = document.getElementById("login");
const inputPesquisa = document.getElementById("pesquisar");

let jogadoresMasculino = [];
let jogadoresFeminino = [];
let jogadoresExibidos = [];

const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `detalhes.html?id=${id}`;

    document.cookie = `id=${id}`;
    document.cookie = `altura=${e.currentTarget.dataset.altura}`;

    localStorage.setItem("id", id);
    localStorage.setItem("dados", JSON.stringify(e.currentTarget.dataset));

    sessionStorage.setItem("id", id);
    sessionStorage.setItem("dados", JSON.stringify(e.currentTarget.dataset));

    window.location = url;
};

const pega_json = async (caminho) => {
    try {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    } catch (err) {
        console.error("Erro ao buscar os dados:", err);
        alert("Erro ao carregar os jogadores.");
        return [];
    }
};

const montaCard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const saibaMais = document.createElement("button");

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);

    saibaMais.innerHTML = "Saiba Mais";
    cartao.appendChild(saibaMais);

    cartao.onclick = manipulaClick;

    cartao.dataset.id = atleta.id;
    cartao.dataset.nJogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;

    return cartao;
};

const exibeJogadores = (jogadores) => {
    container.innerHTML = ""; 
    jogadores.forEach((atleta) => {
        container.appendChild(montaCard(atleta));
    });
};

const filtraJogadores = () => {
    const pesquisa = inputPesquisa.value.toLowerCase();
    const jogadoresFiltrados = jogadoresExibidos.filter((atleta) =>
        atleta.nome.toLowerCase().includes(pesquisa)
    );
    exibeJogadores(jogadoresFiltrados);
};

const verificaLogin = () => {
    const logado = localStorage.getItem("logado");

    if (logado === "sim") {
        loginForm.style.display = "none";
        jogadoresSection.style.display = "block";
        botaoLogout.style.display = "block";
        loginHeader.style.display = "block";
        loginPage.style.display = "none";
        login.style.display = "none";

        
        Promise.all([pega_json(`${url}masculino`), pega_json(`${url}feminino`)]).then(
            ([masculino, feminino]) => {
                jogadoresMasculino = masculino;
                jogadoresFeminino = feminino;
                jogadoresExibidos = []; 
            }
        );
    } else {
        loginForm.style.display = "block";
        jogadoresSection.style.display = "none";
        botaoLogout.style.display = "none";
        loginHeader.style.display = "none";
    }
};

const manipulaBotao = async () => {
    const texto = document.getElementById("senha").value;

    
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer)); 
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); 

    console.log("Hash gerado:", hashHex);

    
    const senhaCorretaHash = "d4ae7f6a84252fe679c0266aef3e6fc4d3d2e3f8aea2eb147ee332b98f9f17d9"; 

    if (hashHex === senhaCorretaHash) {
        localStorage.setItem("logado", "sim");
        verificaLogin();
    } else {
        alert("Senha Incorreta!");
    }
};

document.getElementById("botao").onclick = manipulaBotao;

document.getElementById("logout").onclick = () => {
    localStorage.removeItem("logado");
    window.location.reload();
};

document.addEventListener("DOMContentLoaded", verificaLogin);

document.getElementById("masculino-btn").onclick = () => {
    jogadoresExibidos = jogadoresMasculino;
    exibeJogadores(jogadoresExibidos);
};

document.getElementById("feminino-btn").onclick = () => {
    jogadoresExibidos = jogadoresFeminino;
    exibeJogadores(jogadoresExibidos);
};

document.getElementById("todos-btn").onclick = () => {
    jogadoresExibidos = jogadoresMasculino.concat(jogadoresFeminino);
    exibeJogadores(jogadoresExibidos);
};

inputPesquisa.addEventListener("input", filtraJogadores);