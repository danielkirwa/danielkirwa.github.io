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