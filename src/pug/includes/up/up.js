// Get the element
let topBtn = document.querySelector('._up');

// On Click, Scroll to the page's top, replace 'smooth' with 'auto' if you don't want smooth scrolling
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// On scroll, Show/Hide the btn with animation
window.onscroll = () => window.scrollY > 500 ? topBtn.style.opacity = 1 : topBtn.style.opacity = 0
