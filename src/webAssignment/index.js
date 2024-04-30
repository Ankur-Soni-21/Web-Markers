const slides = document.querySelectorAll('.slides img');
let slideIndex = 0;

startSlider();

function startSlider() {
    slides[slideIndex].classList.add("displaySlide")
}

function showSlide(index) {
    if (index > slides.length - 1) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    slides.forEach(slide => slide.classList.remove("displaySlide"));
    slides[slideIndex].classList.add("displaySlide");
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}