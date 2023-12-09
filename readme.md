# Сборка проекта

1. Установите необходимые пакеты
    ```
    npm install
    ```
2. Для разработки
    ```
    gulp
    ```
3. Для сборки
    ```
    gulp prod
    ```

## Настройка телеграм скрипта

[Файл с скриптом](script/main.py)

Сайт, где брать [id](https://my.telegram.org/auth).

1. API development tools
2. App api_id: ваш aip_id
3. App api_hash: ваш api_hash

Заменяем в коде на свои

```python
from telethon import TelegramClient, events
from datetime import timedelta

api_id = # Ваш id
api_hash = # Ваш hash
one_hour = timedelta(hours=1)

client = TelegramClient('user', api_id, api_hash,
                        device_model="iPhone 13 Pro Max",
                        system_version="14.8.1",
                        app_version="8.4",
                        lang_code="en",
                        system_lang_code="en-US"
                        ).start()
```

Для запуска <b>python main.py</b> в папке с скриптом

## Натройка отправки писем

Регистрируемся [здесь](https://www.emailjs.com/).
[Файл с скриптом](src/js/main.js)

1. Добавляем свой сервис (связываем со своей почтой "Connect account")
2. Настраиваем email templates
   ![alt text](readme_img/Настройка.png)
3. В вкладке Account берем API keys Public Key

```python
   Меняем тут
   emailjs.init('ваш Public Key')
```

4. Меняем здесь на ваши

```py
   const serviceID = 'Ваш serviceID';
   const templateID = 'Ваш templateID';
```