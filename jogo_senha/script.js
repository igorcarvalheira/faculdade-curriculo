document.addEventListener("DOMContentLoaded", () => {
    const numeroSecreto = gerarNumeroSecreto();
    const inputPalpite = document.getElementById("inputPalpite");
    const botaoEnviarPalpite = document.getElementById("enviarPalpite");
    const botaoMostrarSecreto = document.getElementById("mostrarSenha");
    const listaTentativas = document.getElementById("listaTentativas");

    console.log("Número Secreto:", numeroSecreto.join(""));

    botaoMostrarSecreto.addEventListener("click", () => {
        alert("Número Secreto: " + numeroSecreto.join(""));
    });

    botaoEnviarPalpite.addEventListener("click", () => {
        const palpite = inputPalpite.value;

        if (!palpiteValido(palpite)) {
            alert("Digite um número de 4 dígitos únicos.");
            return;
        }

        const resultado = verificarPalpite(palpite, numeroSecreto);
        exibirTentativa(palpite, resultado);
        if (resultado.corretos === 4) {
            alert("Parabéns! Você acertou o número!");
        }
        inputPalpite.value = "";
    });

    function gerarNumeroSecreto() {
        let digitos = [];
        while (digitos.length < 4) {
            let num = Math.floor(Math.random() * 10);
            if (!digitos.includes(num)) {
                digitos.push(num);
            }
        }
        return digitos;
    }

    function palpiteValido(palpite) {
        return /^\d{4}$/.test(palpite) && new Set(palpite).size === 4;
    }

    function verificarPalpite(palpite, senha) {
        let corretos = 0, errados = 0;
        let arrayPalpite = palpite.split("").map(Number);

        arrayPalpite.forEach((digito, indice) => {
            if (digito === senha[indice]) {
                corretos++;
            } else if (senha.includes(digito)) {
                errados++;
            }
        });

        return { corretos, errados };
    }

    function exibirTentativa(palpite, resultado) {
        const itemLista = document.createElement("li");
        const textoCorretos = resultado.corretos === 1 ? "Correto" : "Corretos";
        const textoErrados = resultado.errados === 1 ? "Errado" : "Errados";
    
        itemLista.textContent = `${palpite} → ${resultado.corretos} ${textoCorretos}, ${resultado.errados} ${textoErrados}`;

        if (resultado.corretos === 4) {
            itemLista.style.color = "green";
            itemLista.style.fontWeight = "bold";
        }

        listaTentativas.prepend(itemLista);
    }
});