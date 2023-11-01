from telethon import TelegramClient, events

# api_id and api_hash from https://my.telegram.org/apps
api_id = 29634954
api_hash = 'a5882f3c71bf38d306afb534cc3706f7'

client = TelegramClient('user', api_id, api_hash,
                        device_model="iPhone 13 Pro Max",
                        system_version="14.8.1",
                        app_version="8.4",
                        lang_code="en",
                        system_lang_code="en-US"
                        ).start()

message = "Hello! Thank you for contacting me 👍\nI'll be back soon and reply to your message."


@client.on(events.NewMessage())
async def handler(event):
    sender = await event.get_input_sender()
    print(sender)
    await client.send_message(sender, message)


client.run_until_disconnected()
