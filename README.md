# 4EE-FAA

This project creates a Discord bot to automate a "Gems of War" daily honour rota and other administrative tasks.

## Commands

| Command          | Alternative  | Description                                                                               |
|------------------|--------------|-------------------------------------------------------------------------------------------|
| !about           |              | Info on how to add new functionality to 4EE-FAH                                           |
| !guildwars       | !gw          | Explain Guild Wars scoring                                                                |
| !help            |              | List all available commands                                                               |
| !honour          | !honor       | Display today's honour recipient (Uses GMT timings to work out the current day)           |
| !honouradd       | !honoradd    | Add one or more guild member to the honour rota. Usage !honouradd John "Jane Doe"         |
| !honourremove    | !honorremove | Remove one or more guild member to the honour rota. Usage !honourremove John \"Jane Doe\" |
| !honourrota      | !honorrota   | Displays the current, 18 day honour rota                                                  |
| !honourweekly    | !honorweekly | Displays the current week's honour recipients by day                                      |
| !members         |              | Lists the Guild members GoW account names                                                 |
| !patchnotelatest |              | Gets the latest patch note                                                                |
| !patchnotes      |              | Gets the latest Major patch note and notes for any subsequent Minor patches               |
| !taskpoll        |              | Creates a taskpoll for Epic tasks                                                         |

Table created with [Tables Generator](https://www.tablesgenerator.com/markdown_tables)

## Honour Rota

The honour rota is calculated dynamically based on the calendar date, who is currently in the guild and who is part of the honour rota.

The calculation uses the following logic:
* The honour rota splits the year up into 18 day chunks with a free honour day every 6th day (days 6, 12 and 18)
* The other 15 days of the 18 day cycle are used to pick two guild members to receive honour each day
* The guild members are chosen in a set order, based upon how long they have been a member of the guild so that each person will get the same number of honour days as everyone else
* When a guild member has reached their maximum honour, they can be excluded from the rota and "Free Honour" will appear instead of their name in the honour rota
* The final 5 or 6 days of a calander year (which don't fit in the 18 day cycle) are all set as free honour days

## Credits

The basic structure of the bot was taken from [Mason Spring's 'Hosting a Discord.js bot for free using Heroku' guide on Medium](https://medium.com/@mason.spr/hosting-a-discord-js-bot-for-free-using-heroku-564c3da2d23f).

Further functionality was taken from:
* [2020 Discord Bot Tutorial: Get your bot up and running in under 5 minutes](https://codeburst.io/discord-bot-tutorial-2020-a8a2e37e347c)
* [Webhooks & IFTTT](https://www.reddit.com/r/discordapp/comments/82klp3/bot_that_regularly_announces_messages/)
* [JWT Tokens in Node.js](https://www.sohamkamani.com/blog/javascript/2019-03-29-node-jwt-authentication/)
* [Reactions in Discord.js](https://discordjs.guide/popular-topics/reactions.html#custom-emojis)