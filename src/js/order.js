import axios from "axios";

// Задаем параметры виджета при загрузке
window.liveskladOptions = {
// Ключ апи, индивидуально сгенерированный для вас
    api_key: "2wBrTwq5Vwz7eQDu5Vxy", // Название, отображаемое в заголовке виджета. По умолчанию: "Мои заказы"
    title: "Мои заказы", // Название, отображаемое в поле ввода текста. По умолчанию: "Номер телефона или заказа"
    placeholder: "Номер телефона или заказа", // Название, отображаемое в поле проверки пользователя. По умолчанию: "Фамилия"
    name_placeholder: "Фамилия", // Текст на кнопке. По умолчанию: "Открыть заказы"
    button_text: "Открыть заказы", // Ширина окна. По умолчанию: "300px"
    width: "300px", // Высота окна. По умолчанию: "230px"
    height: "230px", // Цвет фона кнопки. Если его задать, эффект при наведении РАБОТАТЬ НЕ БУДЕТ!
    color: "#4F76E6", // Колонки в таблице заказов. По умолчанию: ["number", "device", "brand", "status", "price"],
// что соответствует:
// № Заказа | Тип устр. | Устройство | Статус | Цена
    columns: ["number", "device", "brand", "status", "price"], // Скрывать уже выданные заказы? По умолчанию: Скрывать (true)
    hide_given: false, // Указанная в виджете валюта
    currency: "руб"
};
(function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'my.livesklad.com/static/widget.js';
    document.getElementsByTagName('head')[0].appendChild(script);
})();

let resData = [];
let table = false;
let lastSize = document.documentElement.clientWidth;
window.addEventListener("resize", () => {
    if (table) {
        if ((lastSize < 576 && document.documentElement.clientWidth >= 576) || (lastSize > 576 && document.documentElement.clientWidth <= 576)) {
            createTable(resData)
        }
    }
    lastSize = document.documentElement.clientWidth;
});
createForm()

function submitForm() {
    // Получаем значения полей формы
    const searchValue = encodeURIComponent(document.getElementById('search').value);
    const fioValue = encodeURIComponent(document.getElementById('fio').value);

    const queryParams = `widgetKey=${"2wBrTwq5Vwz7eQDu5Vxy"}&search=${searchValue}&fio=${fioValue}`;

    // Формируем URL для отправки GET-запроса
    const url = 'https://api.livesklad.com/orders?' + queryParams;

    // Используем Axios для отправки GET-запроса
    axios.get(url)
        .then(response => {
            // Обработка успешного ответа сервера (если необходимо)
            console.log(response.data);

            // Удаляем элементы формы
            const orderForm = document.querySelector('.order-form');
            orderForm.innerHTML = '';
            resData = response.data
            createTable(resData);

        })
        .catch(error => {
            // Обработка ошибки (если необходимо)
            console.error(error);
        });
}

function createForm() {
    const parent = document.querySelector('.order-form');
    parent.innerHTML = `
        <p class="order-form__title">Мои заказы</p>
        <input type="text" name="search" id="search" class="order-form__input" placeholder="Номер телефона или заказа">
        <input type="text" name="fio" id="fio" class="order-form__input" placeholder="Фамилия Имя Отчество">
        <button type="submit" class="order-form__btn">Открыть заказы</button>
    `
    const subBtn = document.querySelector('.order-form__btn');
    subBtn.addEventListener('click', () => submitForm());
}

function createTable(data) {
    table = true;
    const parent = document.querySelector('.order-form');
    if (document.documentElement.clientWidth > 576) {
        parent.innerHTML = `
    <button class="order__back-btn">←Назад</button>
        <table class="order__table">
          <thead class="order__thead">
          <tr class="order__tr">
            <th class="order__th">№ Заказа</th>
            <th class="order__th">Тип устройства</th>
            <th class="order__th">Устройство</th>
            <th class="order__th">Статус</th>
            <th class="order__th">Цена, руб</th>
          </tr>
          </thead>
          <tbody class="order__tbody">
          ${data.map(item => `
                    <tr class="order__tr">
                        <td class="order__td">${item.number}</td>
                        <td class="order__td">${item.typeDevice}</td>
                        <td class="order__td">${item.brand}</td>
                        <td class="order__td">${item.status.name}</td>
                        <td class="order__td">${item.summ}</td>
                    </tr>
                `).join('')}
          </tbody>
        </table>
    `
    } else {
        parent.innerHTML = `
        <button class="order__back-btn">←Назад</button>
        <table class="order__table">
        <tbody class="order__tbody">
        ${data.map(item => `
                    <tr class="order__tr">
                        <td class="order__th">№ Заказа</td>
                        <td class="order__td">${item.number}</td>
                    </tr>
                    <tr class="order__tr">
                        <td class="order__th">Тип устройства</td>
                        <td class="order__td">${item.typeDevice}</td>
                    </tr>
                    <tr class="order__tr">
                        <td class="order__th">Устройство</td>
                        <td class="order__td">${item.brand}</td>
                    </tr>
                    <tr class="order__tr">
                        <td class="order__th">Статус</td>
                        <td class="order__td">${item.status.name}</td>
                    </tr>
                    <tr class="order__tr">
                        <td class="order__th">Цена, руб</td>
                        <td class="order__td">${item.summ}</td>
                    </tr>
                `).join('')}
        </tbody>
        </table>
        `
    }
    const backBtn = document.querySelector('.order__back-btn');
    backBtn.addEventListener('click', () => {
        table = false;
        createForm();
    });
}
