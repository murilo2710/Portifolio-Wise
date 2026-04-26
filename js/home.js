const textos = ["Desenvolvedor Junior", "Engenheiro de Software"];

let textoAtual = 0;
let letraAtual = 0;
let apagando = false;

function atualizarTexto() {
    const alvo = document.getElementById("texto");
    if (!alvo) return;

    const completo = textos[textoAtual];

    if (apagando) {
        letraAtual -= 1;
    } else {
        letraAtual += 1;
    }

    alvo.textContent = completo.slice(0, letraAtual);

    let atraso = apagando ? 50 : 90;

    if (!apagando && letraAtual === completo.length) {
        atraso = 1400;
        apagando = true;
    } else if (apagando && letraAtual === 0) {
        apagando = false;
        textoAtual = (textoAtual + 1) % textos.length;
        atraso = 300;
    }

    setTimeout(atualizarTexto, atraso);
}

document.addEventListener("DOMContentLoaded", atualizarTexto);
