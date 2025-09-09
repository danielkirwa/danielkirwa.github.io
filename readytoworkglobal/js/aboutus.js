const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    if (entry.isIntersecting) {
      if (el.classList.contains('slide-left')) {
        el.classList.add('slide-in-left');
      } else if (el.classList.contains('slide-right')) {
        el.classList.add('slide-in-right');
      }
    } else {
      el.classList.remove('slide-in-left', 'slide-in-right');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));


// counter
const counters = document.querySelectorAll('.counter');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute('data-target');
      const duration = 2000;
      const start = 0;
      const step = Math.ceil(target / (duration / 16));

      let current = start;
      const updateCount = () => {
        current += step;
        if (current >= target) {
          el.textContent = target.toLocaleString();
        } else {
          el.textContent = current.toLocaleString();
          requestAnimationFrame(updateCount);
        }
      };

      updateCount();
      countObserver.unobserve(el); // Run once per scroll
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => countObserver.observe(counter));