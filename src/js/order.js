// Задаем параметры виджета при загрузке
window.liveskladOptions = {
// Ключ апи, индивидуально сгенерированный для вас
    api_key: "2wBrTwq5Vwz7eQDu5Vxy",
// Название, отображаемое в заголовке виджета. По умолчанию: "Мои заказы"
    title: "Мои заказы",
// Название, отображаемое в поле ввода текста. По умолчанию: "Номер телефона или заказа"
    placeholder: "Номер телефона или заказа",
// Название, отображаемое в поле проверки пользователя. По умолчанию: "Фамилия"
    name_placeholder: "Фамилия",
// Текст на кнопке. По умолчанию: "Открыть заказы"
    button_text: "Открыть заказы",
// Ширина окна. По умолчанию: "300px"
    width: "300px",
// Высота окна. По умолчанию: "230px"
    height: "230px",
// Цвет фона кнопки. Если его задать, эффект при наведении РАБОТАТЬ НЕ БУДЕТ!
    color: "#4F76E6",
// Колонки в таблице заказов. По умолчанию: ["number", "device", "brand", "status", "price"],
// что соответствует:
// № Заказа | Тип устр. | Устройство | Статус | Цена
    columns: ["number", "device", "brand", "status", "price"],
// Скрывать уже выданные заказы? По умолчанию: Скрывать (true)
    hide_given: false,
// Указанная в виджете валюта
    currency: "руб"
};
(function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = ('https:' == document.location.protocol ? 'https://' : 'http://')
        + 'my.livesklad.com/static/widget.js';
    document.getElementsByTagName('head')[0].appendChild(script);
})();

function addStylesToFrame() {
    var cssLink = document.createElement("link");
    cssLink.href = "./css/main.css";
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    document.getElementById('widget_iframe').addEventListener("load", function () {
        console.log(this.document)
        // document.getElementById('widget_iframe').document.getElementsByTagName('head')[0].appendChild(cssLink);
    });
}

const config = {
    childList: true,
};

let target = document.getElementsByClassName("order-form")[0];
let observer = new MutationObserver(addStylesToFrame);
observer.observe(target, config);
