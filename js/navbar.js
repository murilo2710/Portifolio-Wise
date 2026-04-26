const botaoHamburguer = document.getElementById("botaoHamburguer");
const menuNavegacao = document.getElementById("menuNavegacao");
const linksNavegacao = document.querySelectorAll(".link-navegacao");

function abrirFecharMenu() {
    if (!botaoHamburguer || !menuNavegacao) {
        return;
    }

    const estaAberto = menuNavegacao.classList.toggle("aberto");
    botaoHamburguer.classList.toggle("ativo", estaAberto);
    botaoHamburguer.setAttribute("aria-expanded", String(estaAberto));
}

function fecharMenuMobile() {
    if (!botaoHamburguer || !menuNavegacao) {
        return;
    }

    menuNavegacao.classList.remove("aberto");
    botaoHamburguer.classList.remove("ativo");
    botaoHamburguer.setAttribute("aria-expanded", "false");
}

if (botaoHamburguer) {
    botaoHamburguer.addEventListener("click", abrirFecharMenu);
}

linksNavegacao.forEach((link) => {
    link.addEventListener("click", () => {
        linksNavegacao.forEach((item) => item.classList.remove("ativo"));
        link.classList.add("ativo");
        fecharMenuMobile();
    });
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        fecharMenuMobile();
    }
});
