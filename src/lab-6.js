document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementsByClassName('item-gallery__preloader');
    const itemsList = document.getElementsByClassName('item-gallery__list');
    const errorAlert = document.getElementsByClassName('item-gallery__error-wrapper');

    // Вместо fetch(url).then(response => ...) использую async/await
    async function fetchData() {
        preloader[0].style = "display: block"
        itemsList[0].style = "display: none"

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/photos");
            if (!response.ok) {
                throw new Error(`Ошибка при запросе фото товара: ${response.status}`);
            }

            const items = await response.json();
            const randomizedData = Math.random() < 0.5 ? { min: 1, max: 12 } : { min: 13, max: 24 };
            const filteredItems = items.filter(photo => photo.id >= randomizedData.min && photo.id <= randomizedData.max);

            renderItems(filteredItems);
        } catch (error) {
            console.error(error);
            errorAlert.textContent = '⚠ Что-то пошло не так';
        } finally {
            preloader[0].style = "display: none"
        }
    }

    function renderItems(data) {
        data.forEach(photo => {
            const li = document.createElement('li')
            const div = document.createElement('div');
            div.className = "item-gallery__item"

            const img = document.createElement('img')
            img.className = "item-gallery__item-image"
            img.src = photo.url;

            const textWrapper = document.createElement('div')
            textWrapper.className = "item-gallery_item_text-wrapper"
            textWrapper.innerHTML = `<a href=\"/item/${photo.id}\"> <p>${photo.title}</p></a>\\`

            div.appendChild(img)
            div.appendChild(textWrapper)
            li.appendChild(div)

            itemsList[0].appendChild(li);
        });
        itemsList[0].style = "display: flex"
    }

    fetchData().catch(error => {
        console.log(`Ошибка при загрузке страницы: ${error.error}`)
    })
});
