let posicoesMinas= [];
let fimDeJogo = false;
let totalMinas = 0;
let nivelAtual = 'facil';

// Esconder todas as opções e outros jogos
function esconderTodasSecoes() {
    const secoes = [
        'Dificuldades',
        'campoMinado',
        'campoMinadoMedio',
        'campoMinadoDificil',
        'memoriaDificuldades',
        'jogoMemoria',
        'jogoVelha'
    ];
    secoes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('oculto');
    });
}

//


function abrirDificuldades() {
    esconderTodasSecoes();
    document.getElementById("Dificuldades").classList.remove("oculto");
}

function gerarMinas(total, tamanhoTabuleiro) {
    const minas = new Set();
    while(minas.size < total) {
        minas.add(Math.floor(Math.random() * tamanhoTabuleiro));
    }
    return Array.from(minas);
}

function voltarParaDificuldades() {
    esconderTodasSecoes();                      // Esconde tudo (incluindo os jogos)
    document.getElementById("Dificuldades").classList.remove("oculto"); // Mostra a tela de escolha
}

//Dificuldade Facil
function abrirCampoMinado() {
    esconderTodasSecoes();
    document.getElementById("campoMinado").classList.remove("oculto");
    nivelAtual = 'facil';
    reiniciarJogoFacil();
}

function reiniciarJogoFacil()
{
    fimDeJogo = false;

    document.getElementById("mensagem").innerHTML = "Clique em uma célula.";
    
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = "";

    totalMinas = 1;
    posicoesMinas = gerarMinas(totalMinas, 9);

    for(let i = 0; i < 9; i++)
    {
        const botao =
            document.createElement("button");

        botao.classList.add("celula");

        botao.innerHTML = "?";

        botao.addEventListener(
            "click",
            function()
            {
                jogarFacil(i, botao);
            }
        );

        tabuleiro.appendChild(botao);
    }
}

function jogarFacil(posicao, botao)
{
    if(fimDeJogo)
    {
        return;
    }

    if(posicoesMinas.includes(posicao)) {
        botao.innerHTML = "💣";
        botao.classList.add("mina");
        document.getElementById("mensagem").innerHTML = "💥 Game Over!";
        fimDeJogo = true;
        revelarMinasFacil();
    }
    else
    {
        botao.innerHTML = "S";
        botao.classList.add("segura");
        botao.disabled = true;
        verificarVitoriaFacil();
    }


}

function verificarVitoriaFacil() {
    const celulas = document.querySelectorAll("#tabuleiro .celula");
    let celulasSeguras = 0;
    const totalSeguras = 9 - totalMinas; // 9 - 1 = 8
    for(let i = 0; i < celulas.length; i++) {
        if(!posicoesMinas.includes(i) && celulas[i].disabled) {
            celulasSeguras++;
        }
    }
    if(celulasSeguras === totalSeguras) {
        document.getElementById("mensagem").innerHTML = "Parabéns! Você venceu!";
        fimDeJogo = true;
    }
}

function revelarMinasFacil() {
    const celulas = document.querySelectorAll("#tabuleiro .celula");
    for(let posicao of posicoesMinas) {
        celulas[posicao].innerHTML = "💣";
        celulas[posicao].classList.add("mina");
    }
}

//dificuldades - Média

function abrirCampoMinadoMedio() {
    esconderTodasSecoes();
    document.getElementById("campoMinadoMedio").classList.remove("oculto");
    nivelAtual = 'medio';
    reiniciarJogoMedio();
}

function reiniciarJogoMedio() {
    fimDeJogo = false;
    document.getElementById("mensagemM").innerHTML = "Clique em uma célula.";
    
    const tabuleiroM = document.getElementById("tabuleiroM");
    tabuleiroM.innerHTML = "";
    
    totalMinas = 4;
    posicoesMinas = gerarMinas(totalMinas, 16);

    for(let i = 0; i < 16; i++) {
        const botao = document.createElement("button");
        botao.classList.add("celula");
        botao.innerHTML = "?";
        botao.dataset.posicao = i;
        
        botao.addEventListener("click", function() {
            jogarMedio(i, botao);
        });
        
        tabuleiroM.appendChild(botao);
    }
}

function jogarMedio(posicao, botao) {
    if(fimDeJogo) return;
    
    if(posicoesMinas.includes(posicao)) {
        botao.innerHTML = "💣";
        botao.classList.add("mina");
        document.getElementById("mensagemM").innerHTML = "💥 Game Over!";
        fimDeJogo = true;
        revelarMinasMedio();
    } else {
        botao.innerHTML = "S";
        botao.classList.add("segura");
        botao.disabled = true;
        verificarVitoriaMedio();
    }
}

function revelarMinasMedio() {
    const celulas = document.querySelectorAll("#tabuleiroM .celula");
    for(let posicao of posicoesMinas) {
        celulas[posicao].innerHTML = "💣";
        celulas[posicao].classList.add("mina");
    }
}

function verificarVitoriaMedio() {
    const celulas = document.querySelectorAll("#tabuleiroM .celula");
    let celulasSeguras = 0;
    const totalSeguras = 16 - totalMinas; // 16 - 4 = 12
    
    for(let i = 0; i < celulas.length; i++) {
        if(!posicoesMinas.includes(i) && celulas[i].disabled) {
            celulasSeguras++;
        }
    }
    
    if(celulasSeguras === totalSeguras) {
        document.getElementById("mensagemM").innerHTML = "Parabéns! Você venceu!";
        fimDeJogo = true;
    }
}

//Dificuldades - Difícil

function abrirCampoMinadoDificil() {
    esconderTodasSecoes();
    document.getElementById("campoMinadoDificil").classList.remove("oculto");
    nivelAtual = 'dificil';
    reiniciarJogoDificil();
}

function reiniciarJogoDificil() {
    fimDeJogo = false;
    document.getElementById("mensagemD").innerHTML = "Clique em uma célula.";
    
    const tabuleiroD = document.getElementById("tabuleiroD");
    tabuleiroD.innerHTML = "";
    
    totalMinas = 9; 
    posicoesMinas = gerarMinas(totalMinas, 25);
    
    for(let i = 0; i < 25; i++) {
        const botao = document.createElement("button");
        botao.classList.add("celula");
        botao.innerHTML = "?";
        botao.dataset.posicao = i;
        
        botao.addEventListener("click", function() {
            jogarDificil(i, botao);
        });
        
        tabuleiroD.appendChild(botao);
    }
}

function jogarDificil(posicao, botao) {
    if(fimDeJogo) return;
    
    if(posicoesMinas.includes(posicao)) {
        botao.innerHTML = "💣";
        botao.classList.add("mina");
        document.getElementById("mensagemD").innerHTML = "💥 Game Over!";
        fimDeJogo = true;
        revelarMinasDificil();
    } else {
        botao.innerHTML = "S";
        botao.classList.add("segura");
        botao.disabled = true;
        verificarVitoriaDificil();
    }
}

function revelarMinasDificil() {
    const celulas = document.querySelectorAll("#tabuleiroD .celula");
    for(let posicao of posicoesMinas) {
        celulas[posicao].innerHTML = "💣";
        celulas[posicao].classList.add("mina");
    }
}

function verificarVitoriaDificil() {
    const celulas = document.querySelectorAll("#tabuleiroD .celula");
    let celulasSeguras = 0;
    const totalSeguras = 25 - totalMinas; // 25 - 8 = 17
    
    for(let i = 0; i < celulas.length; i++) {
        if(!posicoesMinas.includes(i) && celulas[i].disabled) {
            celulasSeguras++;
        }
    }
    
    if(celulasSeguras === totalSeguras) {
        document.getElementById("mensagemD").innerHTML = "Parabéns! Você venceu!";
        fimDeJogo = true;
    }
}

//Jogo da memória

let memoria = {
    cartas: [],
    paresEncontrados: 0,
    totalPares: 0,
    jogadas: 0,
    cartasViradas: [],
    bloqueado: false,
    nivel: 'facil'
};

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'];

function abrirMemoriaDificuldades() {
    esconderTodasSecoes();
    document.getElementById("memoriaDificuldades").classList.remove("oculto");
}

function iniciarMemoria(nivel) {
    esconderTodasSecoes();  
    memoria.nivel = nivel;
    let pares;
    let colunas;
    switch(nivel) {
        case 'facil':
            pares = 4;
            colunas = 4;
            break;
        case 'medio':
            pares = 6;
            colunas = 4;
            break;
        case 'dificil':
            pares = 8;
            colunas = 4;
            break;
        default:
            pares = 4;
            colunas = 4;
    }
    memoria.totalPares = pares;
    memoria.paresEncontrados = 0;
    memoria.jogadas = 0;
    memoria.cartasViradas = [];
    memoria.bloqueado = false;

    const emojisSelecionados = emojis.slice(0, pares);

    let baralho = [...emojisSelecionados, ...emojisSelecionados];
    baralho = embaralhar(baralho);

    document.getElementById("memoriaTitulo").textContent = 
        `Jogo da Memória - ${nivel.charAt(0).toUpperCase() + nivel.slice(1)} (${pares} pares)`;
    document.getElementById("memoriaContador").textContent = '0';
    document.getElementById("memoriaMensagem").textContent = 'Clique em uma carta para virar.';

    const tabuleiro = document.getElementById("memoriaTabuleiro");
    tabuleiro.innerHTML = '';

    const totalCartas = baralho.length;
    let linhas = Math.ceil(totalCartas / colunas);
    tabuleiro.style.gridTemplateColumns = `repeat(${colunas}, 1fr)`;

    memoria.cartas = [];
    baralho.forEach((emoji, index) => {
        const carta = document.createElement('div');
        carta.className = 'carta';
        carta.dataset.index = index;
        carta.dataset.emoji = emoji;
        carta.textContent = '?';
        carta.addEventListener('click', () => virarCarta(index));
        tabuleiro.appendChild(carta);
        memoria.cartas.push({
            elemento: carta,
            emoji: emoji,
            virada: false,
            combinada: false
        });
    });

    document.getElementById("memoriaDificuldades").classList.add("oculto");
    document.getElementById("jogoMemoria").classList.remove("oculto");
}

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function virarCarta(index) {
    if (memoria.bloqueado) return;
    const carta = memoria.cartas[index];
    if (carta.virada || carta.combinada) return;

    carta.virada = true;
    carta.elemento.classList.add('virada');
    carta.elemento.textContent = carta.emoji;

    memoria.cartasViradas.push(index);

    if (memoria.cartasViradas.length === 2) {
        memoria.jogadas++;
        document.getElementById("memoriaContador").textContent = memoria.jogadas;

        const idx1 = memoria.cartasViradas[0];
        const idx2 = memoria.cartasViradas[1];
        const carta1 = memoria.cartas[idx1];
        const carta2 = memoria.cartas[idx2];

        if (carta1.emoji === carta2.emoji) {

            carta1.combinada = true;
            carta2.combinada = true;
            carta1.elemento.classList.add('combinada');
            carta2.elemento.classList.add('combinada');
            memoria.paresEncontrados++;
            memoria.cartasViradas = [];


            if (memoria.paresEncontrados === memoria.totalPares) {
                document.getElementById("memoriaMensagem").textContent = '🎉 Parabéns! Você venceu em ' + memoria.jogadas + ' jogadas!';
                memoria.bloqueado = true;
            }
        } else {
            memoria.bloqueado = true;
            setTimeout(() => {
                carta1.virada = false;
                carta2.virada = false;
                carta1.elemento.classList.remove('virada');
                carta2.elemento.classList.remove('virada');
                carta1.elemento.textContent = '?';
                carta2.elemento.textContent = '?';
                memoria.cartasViradas = [];
                memoria.bloqueado = false;
            }, 1000);
        }
    }
}

function reiniciarMemoria() {

    iniciarMemoria(memoria.nivel);
}

function voltarMenuMemoria() {
    esconderTodasSecoes();     
    document.getElementById("memoriaDificuldades").classList.remove("oculto");
}

// ========== JOGO DA VELHA ==========
let velha = {
    tabuleiro: Array(9).fill(null), // null, 'X' ou 'O'
    jogadorAtual: 'X', // 'X' começa
    jogoAtivo: true,
    vencedor: null // null, 'X', 'O' ou 'empate'
};

function abrirJogoVelha() {
    esconderTodasSecoes(); 
    document.getElementById("jogoVelha").classList.remove("oculto");
    reiniciarVelha();
}

function reiniciarVelha() {
    velha.tabuleiro = Array(9).fill(null);
    velha.jogadorAtual = 'X';
    velha.jogoAtivo = true;
    velha.vencedor = null;
    document.getElementById("velhaMensagem").textContent = '';
    document.getElementById("velhaVez").textContent = 'X';
    document.getElementById("velhaStatus").style.display = 'block';
    renderizarVelha();
}

function renderizarVelha() {
    const tabuleiroEl = document.getElementById("velhaTabuleiro");
    tabuleiroEl.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const celula = document.createElement('div');
        celula.className = 'celula-velha';
        if (velha.tabuleiro[i] !== null) {
            celula.classList.add('preenchida');
            celula.textContent = velha.tabuleiro[i];
        } else {
            celula.textContent = '';
        }
        celula.dataset.index = i;
        celula.addEventListener('click', () => fazerJogadaVelha(i));
        tabuleiroEl.appendChild(celula);
    }
}

function fazerJogadaVelha(index) {
    if (!velha.jogoAtivo) return;
    if (velha.tabuleiro[index] !== null) return; // já preenchida

    // Marcar a jogada
    velha.tabuleiro[index] = velha.jogadorAtual;
    renderizarVelha();

    // Verificar vitória ou empate
    const vencedor = verificarVencedorVelha();
    if (vencedor) {
        velha.jogoAtivo = false;
        velha.vencedor = vencedor;
        if (vencedor === 'empate') {
            document.getElementById("velhaMensagem").textContent = 'Empate! Ninguém venceu.';
        } else {
            document.getElementById("velhaMensagem").textContent = `🎉 Jogador ${vencedor} venceu!`;
        }
        document.getElementById("velhaStatus").style.display = 'none';
        return;
    }

    // Alternar jogador
    velha.jogadorAtual = (velha.jogadorAtual === 'X') ? 'O' : 'X';
    document.getElementById("velhaVez").textContent = velha.jogadorAtual;
}

function verificarVencedorVelha() {
    const t = velha.tabuleiro;
    const linhas = [
        [0,1,2], [3,4,5], [6,7,8], // linhas
        [0,3,6], [1,4,7], [2,5,8], // colunas
        [0,4,8], [2,4,6] // diagonais
    ];

    for (let linha of linhas) {
        const [a,b,c] = linha;
        if (t[a] && t[a] === t[b] && t[a] === t[c]) {
            return t[a]; // 'X' ou 'O'
        }
    }

    // Verificar empate (todas as células preenchidas)
    if (t.every(cel => cel !== null)) {
        return 'empate';
    }

    return null; // jogo continua
}

function voltarMenuVelha() {
    esconderTodasSecoes();    
    reiniciarVelha();
}
