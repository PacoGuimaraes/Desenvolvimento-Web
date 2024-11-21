const url = "https://botafogo-atletas.mange.li/2024-1/";

const container = document.getElementById("container");
const jogadoresSection = document.getElementById("jogadores");
const loginForm = document.getElementById("login-form");
const botaoLogout = document.getElementById("logout");
const loginHeader = document.getElementById("header-login");
const loginPage = document.getElementById("login-page");
const login = document.getElementById("login");

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

    saibaMais.innerHTML = "Saiba Mais";
    cartao.appendChild(saibaMais);

    cartao.onclick = manipulaClick;

    cartao.dataset.id = atleta.id;
    cartao.dataset.nJogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;

    return cartao;
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

        pega_json(`${url}masculino`).then((r) => {
            r.forEach((ele) => container.appendChild(montaCard(ele)));
        });
    } else {
        loginForm.style.display = "block";
        jogadoresSection.style.display = "none";
        botaoLogout.style.display = "none";
        loginHeader.style.display = "none";
    }
};

const manipulaBotao = () => {
    const texto = document.getElementById("senha").value;

    if (hex_md5(texto) === "841775103f2d2eb0e244728e8efa7905") {
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

