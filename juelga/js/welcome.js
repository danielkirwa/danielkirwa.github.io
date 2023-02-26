// animate typing effect
const texts = ['Welcome to Juelga  ','We let you know  '];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
(function typing() {
  // body...
  if(count === texts.length){
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  document.querySelector('.welcometyping').textContent = letter;
  if(letter.length === currentText.length){
    count++;
    index = 0;
  }
  setTimeout(typing , 400);

}());





// get current year

let currentyear = document.getElementById('currentyear');
let year = new Date();
currentyear.innerHTML = year.getFullYear();

// get user course
const links = document.querySelectorAll('.call-apply');
links.forEach(link => {
  link.addEventListener('click', (event) => {
    //event.preventDefault(); // prevent the link from navigating to another page
    const value = event.target.getAttribute('data-value');
    localStorage.setItem('applyfor', value);
    console.log(value);
  });
});


