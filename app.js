let listadeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag ,texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rete: 1.2});
}

function exibirMenssagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Adivinhe o número secreto entre 1 e 10");
}

exibirMenssagemInicial();

function verificarChute(){
    let chute = document.querySelector("input").value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "acertou");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `você descobriu o numero sercreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute('disabled');
    }else{
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "tente um número menor");
        }else{
            exibirTextoNaTela("p", "tente um número maior");
        }
        tentativas++;
        limparCampo();
    }
};

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listadeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listadeNumerosSorteados = [];
    }

    if (listadeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }else{
        listadeNumerosSorteados.push(numeroEscolhido);
        console.log(listadeNumerosSorteados);
        
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input").value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMenssagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}