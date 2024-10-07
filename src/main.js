// Getting sliders elements from html document
const slider = document.querySelector('.slider-container__slider');
const prevButton = document.querySelector('.slider-container__slider__prev-btn');
const nextButton = document.querySelector('.slider-container__slider__next-btn');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;

// Processing buttons on events (event listeners)
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Show next slide
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Show previous slide
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Update slider
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });

  setTimeout(showNextSlide, 3000); // Change image every 3 seconds
}

// Initialize slider
updateSlider();