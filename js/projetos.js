const slides = document.querySelectorAll('.mockups-wrapper');
const dotsContainer = document.getElementById('carrosselDots');
let atual = 0;

slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carrossel-dot');
    dot.setAttribute('aria-label', `Projeto ${i + 1}`);
    dot.addEventListener('click', () => irPara(i));
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.carrossel-dot');

function animarSlide(slide) {
    const desktop = slide.querySelector('.mockup-desktop');
    const celular = slide.querySelector('.mockup-celular');
    desktop.classList.remove('visivel');
    celular.classList.remove('visivel');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            desktop.classList.add('visivel');
            celular.classList.add('visivel');
        });
    });
}

function irPara(index) {
    slides[atual].classList.remove('ativo');
    dots[atual].classList.remove('ativo');
    atual = (index + slides.length) % slides.length;
    slides[atual].classList.add('ativo');
    dots[atual].classList.add('ativo');
    animarSlide(slides[atual]);
}

irPara(0);

setInterval(() => irPara(atual + 1), 7000);

document.getElementById('projetoAnterior')?.addEventListener('click', () => irPara(atual - 1));
document.getElementById('projetoProximo')?.addEventListener('click', () => irPara(atual + 1));
