const cards = document.querySelectorAll('.service-card');

function toggleCardVisibility() {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 0;

    if (isVisible) {
      card.classList.add('visible');
    } else {
      card.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', toggleCardVisibility);
window.addEventListener('load', toggleCardVisibility);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const card = entry.target;
    if (entry.isIntersecting) {
      card.classList.add('visible');
      const elements = card.querySelectorAll('.animate');
      elements.forEach((el, i) => {
        el.style.animationDelay = `${0.3 + i * 0.2}s`;
        el.classList.add('fade-in');
      });
    } else {
      card.classList.remove('visible');
      const elements = card.querySelectorAll('.animate');
      elements.forEach(el => {
        el.classList.remove('fade-in');
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.service-card').forEach(card => observer.observe(card));