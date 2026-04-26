const botaoHamburguer = document.getElementById('botaoHamburguer');
const menuNavegacao = document.getElementById('menuNavegacao');
const linksNavegacao = document.querySelectorAll('.link-navegacao');

botaoHamburguer.addEventListener('click', () => {
  botaoHamburguer.classList.toggle('ativo');
  menuNavegacao.classList.toggle('ativo');
});

linksNavegacao.forEach(link => {
  link.addEventListener('click', (e) => {
    botaoHamburguer.classList.remove('ativo');
    menuNavegacao.classList.remove('ativo');

    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    botaoHamburguer.classList.remove('ativo');
    menuNavegacao.classList.remove('ativo');
  }
});

function highlightActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      linksNavegacao.forEach(link => link.classList.remove('ativo'));

      const activeLink = document.querySelector(`.link-navegacao[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('ativo');
      }
    }
  });
}

window.addEventListener('scroll', highlightActiveLink);
