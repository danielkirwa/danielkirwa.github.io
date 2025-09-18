document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        el.classList.add('visible');

        if (el.classList.contains('from-left')) {
          el.classList.add('slide-left');
        }
        if (el.classList.contains('from-right')) {
          el.classList.add('slide-right');
        }
        if (el.classList.contains('from-up')) {
          el.classList.add('slide-up');
        }
      } else {
        el.classList.remove('visible', 'slide-left', 'slide-right', 'slide-up');
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));
});