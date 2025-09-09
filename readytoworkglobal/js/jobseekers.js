const jobCards = document.querySelectorAll('.job-card');

function toggleVisibility() {
  jobCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 0;

    if (isVisible) {
      setTimeout(() => {
        card.classList.add('visible');
      }, parseFloat(card.dataset.delay) * 1000);
    } else {
      card.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', toggleVisibility);
window.addEventListener('load', toggleVisibility);

function openForm() {
  document.getElementById('popupForm').style.display = 'flex';
}

function closeForm() {
  document.getElementById('popupForm').style.display = 'none';
}

// our process
const steps = document.querySelectorAll('.timeline-step');

function toggleStepVisibility() {
  steps.forEach(step => {
    const rect = step.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 0;

    if (isVisible) {
      setTimeout(() => {
        step.classList.add('visible');
      }, parseFloat(step.dataset.delay) * 1000);
    } else {
      step.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', toggleStepVisibility);
window.addEventListener('load', toggleStepVisibility);


// nav 
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('active');
}