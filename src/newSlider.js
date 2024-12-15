const swiper = new Swiper('.swiper', {
    // Направление движения
    direction: 'horizontal',
    // Сколько слайдов показывается
    slidesPerView: 1,
    // Цикл
    loop: true,
    // Скорость
    speed: 2000,
    // Настройка навигации
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // Настройка автопроигрывания слайдов и настройка времени просмотра слайда
    autoplay:{
        delay: 3000,
        disableOnInteraction: false,
    },
    // Возможность переключать слайды с помощью клавиатуры
    keyboard: true,
});

swiper.update();