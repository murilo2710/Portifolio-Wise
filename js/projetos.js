const slides = document.querySelectorAll('.mockups-wrapper');
const dotsContainer = document.getElementById('carrosselDots');
let atual = 0;
let autoplayId = null;

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

function iniciarAutoplay() {
    if (autoplayId) return;
    autoplayId = setInterval(() => irPara(atual + 1), 7000);
}

function pausarAutoplay() {
    if (!autoplayId) return;
    clearInterval(autoplayId);
    autoplayId = null;
}

iniciarAutoplay();

document.getElementById('projetoAnterior')?.addEventListener('click', () => irPara(atual - 1));
document.getElementById('projetoProximo')?.addEventListener('click', () => irPara(atual + 1));

const projetos = [
    {
        nome: 'Projeto 01',
        desc: 'Descricao deste projeto sera atualizada em breve.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        desktop: 'img/desktop-projeto01.png',
        link: '#'
    },
    {
        nome: 'Projeto 02',
        desc: 'Descricao deste projeto sera atualizada em breve.',
        tags: ['Angular', 'TypeScript', 'SCSS'],
        desktop: 'img/estudo-projeto02.png',
        link: '#'
    },
    {
        nome: 'Planner Estudantil em Java',
        desc: 'Aplicacao desktop desenvolvida em Java e JavaFX para organizacao academica, com CRUD completo de alunos, disciplinas e tarefas. O sistema inclui validacoes de entrada, associacao de tarefas por disciplina e mensagens de sucesso/erro para apoiar a rotina de estudos.',
        tags: ['Java', 'JavaFX', 'POO', 'Collections', 'LocalDate'],
        desktop: 'img/planner-projeto03.png',
        link: '#'
    }
];

const overlay = document.getElementById('modalProjeto');
const btnFechar = document.getElementById('modalFechar');
const modalDesktop = document.getElementById('modalDesktop');
const modalTags = document.getElementById('modalTags');
const modalNome = document.getElementById('modalNome');
const modalDesc = document.getElementById('modalDesc');
const modalLink = document.getElementById('modalLink');

function abrirModal(index) {
    const p = projetos[index];
    if (!p || !overlay) return;

    modalDesktop.src = p.desktop;
    modalDesktop.alt = `Desktop - ${p.nome}`;
    modalNome.textContent = p.nome;
    modalDesc.textContent = p.desc;
    modalLink.href = p.link;
    modalTags.innerHTML = p.tags.map((tag) => `<span class="modal-tag">${tag}</span>`).join('');

    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('ativo');
    document.body.style.overflow = 'hidden';
    pausarAutoplay();
}

function fecharModal() {
    if (!overlay) return;
    overlay.classList.remove('ativo');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    iniciarAutoplay();
}

slides.forEach((wrapper) => {
    wrapper.querySelector('.projetos-abrir-modal')?.addEventListener('click', () => {
        abrirModal(Number(wrapper.dataset.index));
    });
});

btnFechar?.addEventListener('click', fecharModal);

overlay?.addEventListener('click', (event) => {
    if (event.target === overlay) fecharModal();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay?.classList.contains('ativo')) {
        fecharModal();
    }
});
