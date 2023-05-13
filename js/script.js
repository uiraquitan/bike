const links = document.querySelectorAll(".header-menu a");

function ativarLink(link) {

    const url = window.location.href;
    const href = link.href;

    if (url.includes(href)) {
        link.classList.add("ativo");
    }
}

links.forEach(ativarLink);

// ATIVAR ITENS DO ORÇAMENTO

const parametros = new URLSearchParams(location.search);
function ativarProduto(parametro) {
    const elemento = document.getElementById(parametro);
    if (elemento) {
        elemento.checked = true;
    }
}

parametros.forEach(ativarProduto);

//PERGUNTAS
const perguntas = document.querySelectorAll(".perguntas button");

function clickPerguntas(event) {

    const pergunta = event.currentTarget;
    const controls = pergunta.getAttribute("aria-controls");
    const resposta = document.getElementById(controls);

    resposta.classList.toggle("ativa");
    const ativa = resposta.classList.contains("ativa");
    pergunta.setAttribute("aria-expanded", ativa);

    console.log(resposta);
}

function eventosPerguntas(perguntas) {
    perguntas.addEventListener("click", clickPerguntas);
}

perguntas.forEach(eventosPerguntas);


// BICICLETAS


const galeria = document.querySelectorAll(".bicicleta-imagens img");
const galeriaImagens = document.querySelector(".bicicleta-imagens");

function trocarImagem(event) {
    const src = event.currentTarget;
    const media = matchMedia("(min-width: 937px)").matches;

    if (media) {

        galeriaImagens.prepend(src);
    }
}

function eventoGaleria(img) {
    img.addEventListener("click", trocarImagem);
}

galeria.forEach(eventoGaleria);

if (window.SimpleAnime) {

    new SimpleAnime();
}


// FORMULÁRIOS

const formulario = document.querySelector("form");

function formularioEnviado(resposta) {
    if (resposta.ok) {
        formulario.innerHTML = "<p style='grid-column: 1 / -1; '>Formulário enviado com sucesso!</p>";
    } else {
        formulario.innerHTML = "<p style='grid-column: 1 / -1; '>Erro ao Enviar formulário</p>";
    }
}

function enviarFormulario(event) {
    event.preventDefault();
    const botao = document.querySelector("form button");
    botao.disabled = true;
    botao.innerText = "enviando...";

    const dados = new FormData(formulario);

    fetch("./enviar.php", {
        method: "POST",
        body: dados
    }).then(formularioEnviado);
}

formulario.addEventListener("submit", enviarFormulario);