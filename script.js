// Lista com pelo menos 10 palavras (Requisito mínimo)
const palavras = [
    "javascript",
    "html",
    "css",
    "internet",
    "navegador",
    "programacao",
    "computador",
    "algoritmo",
    "variavel",
    "funcao"
];

// Variáveis de estado do jogo
let palavraSecreta;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let jogoAtivo = true;

// Elementos do DOM
const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

// Inicia ou reinicia o jogo
function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);
    palavraSecreta = palavras[indice];
    
    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];
    jogoAtivo = true;

    // Reseta a interface
    mensagem.textContent = "Bem-vindo ao jogo! Digite uma letra.";
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "";
    inputLetra.value = "";
    inputLetra.disabled = false;
    botaoTentar.disabled = false;
    inputLetra.focus();

    atualizarPalavra();
}

// Atualiza os traços e letras descobertas na tela
function atualizarPalavra() {
    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }

    elementoPalavra.textContent = exibicao.trim();
}

// Verifica se todas as letras foram descobertas
function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }
    return true;
}

// Processa a tentativa do jogador
function verificarLetra() {
    if (!jogoAtivo) return;

    const letra = inputLetra.value.toLowerCase().trim();
    inputLetra.value = "";
    inputLetra.focus();

    // Validação de campo vazio ou caractere inválido
    if (letra === "" || !/^[a-z]$/.test(letra)) {
        mensagem.textContent = "Digite apenas uma letra válida (A-Z).";
        return;
    }

    // Bloqueio de letras repetidas
    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Letra já utilizada. Tente outra!";
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        mensagem.textContent = "Você acertou!";
    } else {
        tentativas--;
        mensagem.textContent = "Você errou!";
    }

    atualizarPalavra();
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ").toUpperCase();

    // Verifica fim de jogo
    if (venceu()) {
        mensagem.textContent = "Parabéns! Você venceu!";
        finalizarJogo();
    } else if (tentativas === 0) {
        mensagem.textContent = "Você perdeu! A palavra era: " + palavraSecreta.toUpperCase();
        finalizarJogo();
    }
}

// Bloqueia entradas após o fim da partida
function finalizarJogo() {
    jogoAtivo = false;
    inputLetra.disabled = true;
    botaoTentar.disabled = true;
}

// Eventos
botaoTentar.addEventListener("click", verificarLetra);
botaoReiniciar.addEventListener("click", iniciarJogo);

// Desafio extra: enviar letra ao pressionar Enter
inputLetra.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        verificarLetra();
    }
});

// Começa a primeira partida ao carregar a página
iniciarJogo();