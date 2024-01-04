from telethon import TelegramClient, events
from datetime import datetime, timedelta

api_id = 28341004  # Ваш id
api_hash = 'efd719f13799cdbbd0a16f975252e510'  # Ваш hash
one_hour = timedelta(hours=1)

client = TelegramClient('user', api_id, api_hash,
                        device_model="iPhone 13 Pro Max",
                        system_version="14.8.1",
                        app_version="8.4",
                        lang_code="en",
                        system_lang_code="en-US"
                        ).start()

message_working_hours = "На связи Технократ!\nСкоро вам ответит наш сотрудник"
message_non_working_hours = "Технократ сейчас не работает.\nРежимы работы филиалов: Пн-Пт 09:00–20:00, " \
                            "Сб-Вс 11:00–18:00 "


@client.on(events.NewMessage())
async def handler(event):
    sender = await event.get_input_sender()
    if event.chat_id == sender.user_id:
        now = datetime.now()
        is_working_hours = (
                (now.weekday() < 5 and 9 - 4 <= now.hour < 20 - 4) or
                (now.weekday() >= 5 and 11 - 4 <= now.hour < 18 - 4)
        )

        if event.is_private:
            messages = []
            async for mes in (client.iter_messages(sender, limit=2)):
                messages.append(mes.date)
            if len(messages) > 1:
                if messages[0] - messages[1] >= one_hour:
                    if is_working_hours:
                        await client.send_message(sender, message_working_hours)
                    else:
                        await client.send_message(sender, message_non_working_hours)
            else:
                if is_working_hours:
                    await client.send_message(sender, message_working_hours)
                else:
                    await client.send_message(sender, message_non_working_hours)


client.run_until_disconnected()
