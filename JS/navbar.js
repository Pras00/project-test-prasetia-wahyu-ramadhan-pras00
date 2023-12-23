// Navbar
const navbar = document.getElementById('navbar');
let prevScrollPos = window.scrollY;

window.onscroll = function() {
  const currentScrollPos = window.scrollY;
  
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = '0';
    navbar.style.backgroundColor = 'rgba(237, 99, 7, 0.9)';
  } else {
    navbar.style.top = `-${navbar.offsetHeight}px`;
    navbar.style.backgroundColor = 'transparent';
  }

  prevScrollPos = currentScrollPos;
};


document.addEventListener("scroll", function() {
  const scrollPosition = window.scrollY;
  const parallaxElement = document.getElementById("parallax");
  parallaxElement.style.backgroundPosition = `50% ${scrollPosition * 0.2}px`;
});