const formHTML = `
    <p>Чтобы не пропустить самые выгодные акции и спецпредложения, подписывайтесь на нашу новостную рассылку</p>
    <form class="subscribe-form">
        <label for="subscribe-form__input">Email:</label>
        <input class="subscribe-form__input" type="email" required />
        <button class="subscribe-form_btn" type="submit">Отправить</button>
    </form>`;

const myModalWindow = new jBox('Modal', {
    width: 500,
    height: 230,
    title: 'Рассылка',
    content: formHTML,
    animation: 'zoomIn',
    closeButton: 'title'
});

setTimeout(function () {
    let savedEmail = sessionStorage.getItem('savedEmail') ?? false;
    if (!savedEmail) myModalWindow.open();
}, 5000);

document.addEventListener('submit', (event) => {
    console.log(event.target)
    const form = event.target;
    if (form.className === 'subscribe-form') {
        event.preventDefault();
        const emailInput = form.querySelector('.subscribe-form__input');
        sessionStorage.setItem('savedEmail', JSON.stringify(emailInput.value))
        console.log(form.value)
        myModalWindow.setContent(`
            <p>Спасибо за подписку на нашу новостную рассылку!<p>
        `);

        setTimeout(() => {
            myModalWindow.close();
        }, 2000);
    }
});