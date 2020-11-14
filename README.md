# 4EE-FAA

This project creates a Discord bot to automate a "Gems of War" daily honour rota and other administrative tasks.

## Commands

| Command       | Alternative  | Description                                                                             |
|---------------|--------------|-----------------------------------------------------------------------------------------|
| !about        |              | Info on how to add new functionality to 4EE-FAH                                         |
| !guildwars    | !gw          | Explain Guild Wars scoring                                                              |
| !help         |              | List all available commands                                                             |
| !honour       | !honor       | Display today's honour recipient (Uses GMT timings to work out the current day)         |
| !honourshow   | !honorshow   | Add one or more guild member to the honour rota. Usage !honourshow John "Jane Doe"      |
| !honourhide   | !honorhide   | Remove one or more guild member to the honour rota. Usage !honourhide John \"Jane Doe\" |
| !honourweekly | !honorweekly | Displays the current week's honour recipients by day                                    |
| !members      |              | Lists the Guild members GoW account names                                               |
| !taskpoll     |              | Creates a taskpoll for Epic tasks                                                       |

Table created with [Tables Generator](https://www.tablesgenerator.com/markdown_tables)

## Credits

The basic structure of the bot was taken from [Mason Spring's 'Hosting a Discord.js bot for free using Heroku' guide on Medium](https://medium.com/@mason.spr/hosting-a-discord-js-bot-for-free-using-heroku-564c3da2d23f).

Further functionality was taken from:
* [2020 Discord Bot Tutorial: Get your bot up and running in under 5 minutes](https://codeburst.io/discord-bot-tutorial-2020-a8a2e37e347c)
* [Webhooks & IFTTT](https://www.reddit.com/r/discordapp/comments/82klp3/bot_that_regularly_announces_messages/)
* [JWT Tokens in Node.js](https://www.sohamkamani.com/blog/javascript/2019-03-29-node-jwt-authentication/)
* [Reactions in Discord.js](https://discordjs.guide/popular-topics/reactions.html#custom-emojis)