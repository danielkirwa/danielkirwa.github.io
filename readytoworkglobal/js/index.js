const hero = document.getElementById('hero');
const images = [
  'url("assets/bg1.png")',
  'url("assets/bg2.png")',
  'url("assets/bg3.png")',
  'url("assets/bg4.jpg")',
  'url("assets/bg5.jpg")'
];

let index = 0;
function rotateHeroBackground() {
  hero.style.backgroundImage = images[index];
  index = (index + 1) % images.length;
}
rotateHeroBackground(); // Initial load
setInterval(rotateHeroBackground, 5000); // Rotate every 5 seconds

document.querySelector('.action-btn').addEventListener('click', () => {
  alert('Welcome to GlobalBridge Solutions! Let’s get you started.');
});



const observer1 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.text-content, .image-content').forEach(el => {
  observer1.observe(el);
});


const track = document.getElementById('track');
    const slides = document.querySelectorAll('.slide');
    let indexslider = 0;

    function slideNext() {
      indexslider++;
      if (indexslider >= slides.length) {
        indexslider = 0;
      }
      const offset = -(indexslider * (slides[0].offsetWidth + 20)); // 20 = margin
      track.style.transform = `translateX(${offset}px)`;
    }

    setInterval(slideNext, 2000);


    const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.slide-left, .slide-right').forEach(el => {
  observer.observe(el);
});



// why us js
const points = document.querySelectorAll('.point');

function toggleVisibility() {
  points.forEach(point => {
    const rect = point.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 50 && rect.bottom > 0;

    if (isVisible) {
      setTimeout(() => {
        point.classList.add('visible');
      }, parseFloat(point.dataset.delay) * 1000);
    } else {
      point.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', toggleVisibility);
window.addEventListener('load', toggleVisibility);


// testimonial js 

const cards = document.querySelectorAll('.testimonial-card');

function toggleCardVisibility() {
  cards.forEach(card => {
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

window.addEventListener('scroll', toggleCardVisibility);
window.addEventListener('load', toggleCardVisibility);


// job cards
const jobCards = document.querySelectorAll('.job-card');

function toggleJobVisibility() {
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

window.addEventListener('scroll', toggleJobVisibility);
window.addEventListener('load', toggleJobVisibility);