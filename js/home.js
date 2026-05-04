const CONFIG = {
    textos: ["Desenvolvedor Júnior", "Engenheiro de Software"],
    velocidades: {
        digitacao: 100,
        deletacao: 50,
        pausa: 2000,
        transicao: 500
    },
    inicioDelay: 3500
};

let estado = {
    textoAtual: 0,
    caracterAtual: 0,
    deletando: false,
    scrollIndicatorHidden: false,
    isAnimating: false
};

const TypewriterAnimation = {
    iniciar() {
        setTimeout(this.digitarTexto.bind(this), CONFIG.inicioDelay);
    },

    digitarTexto() {
        const elemento = document.getElementById("texto");
        const textoCompleto = CONFIG.textos[estado.textoAtual];

        this.atualizarTexto(elemento, textoCompleto);
        const velocidade = this.calcularVelocidade(textoCompleto);

        setTimeout(this.digitarTexto.bind(this), velocidade);
    },

    atualizarTexto(elemento, textoCompleto) {
        if (estado.deletando) {
            elemento.textContent = textoCompleto.substring(0, estado.caracterAtual - 1);
            estado.caracterAtual--;
        } else {
            elemento.textContent = textoCompleto.substring(0, estado.caracterAtual + 1);
            estado.caracterAtual++;
        }
    },

    calcularVelocidade(textoCompleto) {
        let velocidade = CONFIG.velocidades.digitacao;

        if (estado.deletando) {
            velocidade = CONFIG.velocidades.deletacao;
        }

        if (!estado.deletando && estado.caracterAtual === textoCompleto.length) {
            velocidade = CONFIG.velocidades.pausa;
            estado.deletando = true;
        } else if (estado.deletando && estado.caracterAtual === 0) {
            estado.deletando = false;
            estado.textoAtual = (estado.textoAtual + 1) % CONFIG.textos.length;
            velocidade = CONFIG.velocidades.transicao;
        }

        return velocidade;
    }
};

const ScrollIndicator = {
    inicializar() {
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        this.adicionarEventoClique();
    },

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function(...args) {
            const currentTime = Date.now();

            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            }
        };
    },

    handleScroll() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator || estado.isAnimating) return;

        const scrolledDown = window.scrollY > 50;

        if (scrolledDown && !estado.scrollIndicatorHidden) {
            this.esconderIndicador(scrollIndicator);
        } else if (!scrolledDown && estado.scrollIndicatorHidden) {
            this.mostrarIndicador(scrollIndicator);
        }
    },

    esconderIndicador(elemento) {
        if (estado.isAnimating) return;

        estado.scrollIndicatorHidden = true;
        estado.isAnimating = true;

        elemento.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.6, 1)';
        elemento.style.transform = 'translateX(-50%) translateY(30px) scale(0.7) rotate(180deg)';
        elemento.style.opacity = '0';
        elemento.style.filter = 'blur(10px)';

        const scrollText = elemento.querySelector('.scroll-text');
        const scrollContainer = elemento.querySelector('.scroll-container');
        const scrollDot = elemento.querySelector('.scroll-dot');

        if (scrollText) {
            scrollText.style.transition = 'all 0.4s ease-out';
            scrollText.style.transform = 'translateY(-20px)';
            scrollText.style.opacity = '0';
        }

        if (scrollContainer) {
            scrollContainer.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            scrollContainer.style.transform = 'scale(0.3) rotate(360deg)';
            scrollContainer.style.borderColor = 'transparent';
        }

        if (scrollDot) {
            scrollDot.style.transition = 'all 0.5s ease-in-out';
            scrollDot.style.transform = 'translateX(-50%) translateY(60px) scale(0)';
        }

        setTimeout(() => {
            elemento.style.visibility = 'hidden';
            elemento.style.pointerEvents = 'none';
            estado.isAnimating = false;
        }, 500);
    },

    mostrarIndicador(elemento) {
        if (estado.isAnimating) return;

        estado.scrollIndicatorHidden = false;
        estado.isAnimating = true;

        elemento.style.visibility = 'visible';
        elemento.style.pointerEvents = 'auto';

        elemento.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        elemento.style.transform = 'translateX(-50%) translateY(0) scale(1) rotate(0deg)';
        elemento.style.opacity = '1';
        elemento.style.filter = 'blur(0px)';

        const scrollText = elemento.querySelector('.scroll-text');
        const scrollContainer = elemento.querySelector('.scroll-container');
        const scrollDot = elemento.querySelector('.scroll-dot');

        if (scrollText) {
            setTimeout(() => {
                scrollText.style.transform = 'translateY(0)';
                scrollText.style.opacity = '1';
            }, 200);
        }

        if (scrollContainer) {
            setTimeout(() => {
                scrollContainer.style.transform = 'scale(1) rotate(0deg)';
                scrollContainer.style.borderColor = 'rgba(0, 123, 255, 0.6)';
            }, 100);
        }

        if (scrollDot) {
            setTimeout(() => {
                scrollDot.style.transform = 'translateX(-50%) translateY(0) scale(1)';
            }, 300);
        }

        setTimeout(() => {
            estado.isAnimating = false;
        }, 600);
    },

    adicionarEventoClique() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', this.scrollSuave.bind(this));
        }
    },

    scrollSuave() {
        const targetScroll = window.innerHeight;

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });

        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0) scale(0.9)';

            setTimeout(() => {
                scrollIndicator.style.transform = 'translateX(-50%) translateY(0) scale(1)';
            }, 150);
        }
    }
};

const adicionarEstilosPersonalizados = () => {
    const style = document.createElement('style');
    style.textContent = `
        .scroll-indicator {
            will-change: transform, opacity, filter;
        }

        .scroll-indicator.animating * {
            will-change: transform, opacity, border-color;
        }

        .scroll-indicator:active {
            transform: translateX(-50%) translateY(0) scale(0.95) !important;
        }

        .scroll-indicator:hover {
            animation-play-state: paused;
        }

        .scroll-indicator:hover .scroll-container {
            transform: scale(1.1);
            border-color: #007bff !important;
            box-shadow: 0 0 20px rgba(0, 123, 255, 0.4);
        }

        .scroll-indicator:hover .scroll-dot {
            transform: translateX(-50%) translateY(15px) scale(1.2) !important;
            box-shadow: 0 0 20px rgba(0, 123, 255, 0.8);
        }
    `;
    document.head.appendChild(style);
};

const SobreAnimation = {
    inicializar() {
        const titulo = document.querySelector('.sobre-titulo-topo');
        const cards = document.querySelectorAll('.info-card');
        const texto = document.querySelector('.sobre-texto');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                if (entry.target === titulo) {
                    titulo.classList.add('visivel');
                }

                if (entry.target === texto) {
                    texto.classList.add('visivel');
                }

                if (entry.target.classList.contains('sobre-cards')) {
                    cards.forEach((card, i) => {
                        setTimeout(() => card.classList.add('visivel'), i * 120);
                    });
                }

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        if (titulo) observer.observe(titulo);
        if (texto) observer.observe(texto);

        const cardsWrapper = document.querySelector('.sobre-cards');
        if (cardsWrapper) observer.observe(cardsWrapper);
    }
};


const CompetenciasAnimation = {
    inicializar() {
        const titulo = document.querySelector('.competencias-titulo-topo');
        const grid1 = document.querySelector('.competencias-pagina[data-pag="1"] .competencias-grid');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                if (entry.target === titulo) {
                    titulo.classList.add('visivel');
                }

                if (entry.target === grid1) {
                    const cards = grid1.querySelectorAll('.comp-card');
                    cards.forEach((card, i) => {
                        setTimeout(() => {
                            card.classList.add('visivel');
                            const barra = card.querySelector('.comp-barra');
                            if (barra) barra.style.width = barra.dataset.nivel + '%';
                        }, i * 80);
                    });
                }

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.1 });

        if (titulo) observer.observe(titulo);
        if (grid1) observer.observe(grid1);
    }
};

const PaginacaoCompetencias = {
    pagAtual: 1,
    total: 2,

    inicializar() {
        document.querySelectorAll('.pag-dot').forEach(dot => {
            dot.addEventListener('click', () => this.irPara(Number(dot.dataset.pag)));
        });
        document.getElementById('pagAnterior')?.addEventListener('click', () => {
            this.irPara(this.pagAtual === 1 ? this.total : this.pagAtual - 1);
        });
        document.getElementById('pagProxima')?.addEventListener('click', () => {
            this.irPara(this.pagAtual === this.total ? 1 : this.pagAtual + 1);
        });
    },

    irPara(pag) {
        this.pagAtual = pag;

        document.querySelectorAll('.pag-dot').forEach(d => d.classList.remove('ativo'));
        document.querySelector(`.pag-dot[data-pag="${pag}"]`).classList.add('ativo');

        document.querySelectorAll('.competencias-pagina').forEach(p => p.classList.remove('ativa'));
        const pagAtiva = document.querySelector(`.competencias-pagina[data-pag="${pag}"]`);
        pagAtiva.classList.add('ativa');

        pagAtiva.querySelectorAll('.comp-card').forEach((card, i) => {
            card.classList.remove('visivel');
            card.querySelector('.comp-barra').style.width = '0%';
            setTimeout(() => {
                card.classList.add('visivel');
                const barra = card.querySelector('.comp-barra');
                if (barra) barra.style.width = barra.dataset.nivel + '%';
            }, i * 80);
        });
    }
};

const ExperienciaAnimation = {
    inicializar() {
        const items = document.querySelectorAll('.exp-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visivel');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        items.forEach(item => observer.observe(item));
    }
};

const OrbitaAnimation = {
    inicializar() {
        const orbita = document.querySelector('.orbita');
        const b1 = document.getElementById('bolinha1');
        const b2 = document.getElementById('bolinha2');
        if (!orbita || !b1 || !b2) return;

        let radius = orbita.clientWidth / 2;
        let center = orbita.clientWidth / 2;
        const THRESHOLD = 0.12;
        let cooldown = 0;

        let a1 = 0;
        let a2 = Math.PI;
        let v1 = 0.016;
        let v2 = -0.013;

        function atualizarGeometria() {
            const size = orbita.clientWidth;
            center = size / 2;
            radius = size / 2;
        }

        function posicionar(ball, angle) {
            ball.style.left = (center + radius * Math.sin(angle)) + 'px';
            ball.style.top = (center - radius * Math.cos(angle)) + 'px';
        }

        function angularDist(a, b) {
            let d = Math.abs(a - b) % (2 * Math.PI);
            return d > Math.PI ? 2 * Math.PI - d : d;
        }

        function tick() {
            a1 += v1;
            a2 += v2;
            posicionar(b1, a1);
            posicionar(b2, a2);

            if (cooldown > 0) {
                cooldown--;
            } else if (angularDist(a1, a2) < THRESHOLD) {
                v1 = -v1;
                v2 = -v2;
                cooldown = 30;
            }

            requestAnimationFrame(tick);
        }

        atualizarGeometria();
        window.addEventListener('resize', atualizarGeometria);
        tick();
    }
};

const ContatoForm = {
    inicializar() {
        const form = document.querySelector('.contato-form');
        if (!form) return;

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const botao = form.querySelector('button[type="submit"]');
            const textoOriginal = botao ? botao.innerHTML : '';

            try {
                if (botao) {
                    botao.disabled = true;
                    botao.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Enviando...";
                }

                const resposta = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        Accept: 'application/json'
                    }
                });

                if (!resposta.ok) throw new Error('Falha no envio');

                form.reset();
                if (botao) botao.innerHTML = "<i class='bx bx-check'></i> Mensagem enviada";

                setTimeout(() => {
                    if (botao) {
                        botao.innerHTML = textoOriginal;
                        botao.disabled = false;
                    }
                }, 2200);
            } catch (erro) {
                console.error('Erro ao enviar formulario:', erro);

                if (botao) {
                    botao.innerHTML = "<i class='bx bx-error-circle'></i> Tente novamente";
                    botao.disabled = false;
                }

                setTimeout(() => {
                    if (botao) botao.innerHTML = textoOriginal;
                }, 2200);
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    TypewriterAnimation.iniciar();
    ScrollIndicator.inicializar();
    adicionarEstilosPersonalizados();
    SobreAnimation.inicializar();
    CompetenciasAnimation.inicializar();
    ExperienciaAnimation.inicializar();
    OrbitaAnimation.inicializar();
    PaginacaoCompetencias.inicializar();
    ContatoForm.inicializar();
});
