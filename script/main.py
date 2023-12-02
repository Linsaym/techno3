from telethon import TelegramClient, events
from datetime import timedelta
# api_id and api_hash from https://my.telegram.org/apps
api_id = 29634954
api_hash = 'a5882f3c71bf38d306afb534cc3706f7'
one_hour = timedelta(hours=1)

client = TelegramClient('user', api_id, api_hash,
                        device_model="iPhone 13 Pro Max",
                        system_version="14.8.1",
                        app_version="8.4",
                        lang_code="en",
                        system_lang_code="en-US"
                        ).start()

message = "На связи Технократ!\nСкоро вам ответит наш сотрудник"


@client.on(events.NewMessage())
async def handler(event):
    sender = await event.get_input_sender()
    if event.is_private:
        messages = []
        async for mes in (client.iter_messages(sender, limit=2)):
            messages.append(mes.date)
        if len(messages) > 1:
            if messages[0] - messages[1] >= one_hour:
                await client.send_message(sender, message)
        else:
            await client.send_message(sender, message)


client.run_until_disconnected()
