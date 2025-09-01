// Scroll effect
const cards = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

cards.forEach(card => observer.observe(card));

// Popup logic
function openForm(serviceName) {
  document.getElementById('popup-form').classList.remove('hidden');
  document.getElementById('form-title').textContent = `Inquire: ${serviceName}`;
}

function closeForm() {
  document.getElementById('popup-form').classList.add('hidden');
}