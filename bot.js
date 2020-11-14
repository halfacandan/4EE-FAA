const helpers = require('./modules/helpers.js');
const messages = require('./modules/messages.js');
const discord = require('discord.js');
const bot = new discord.Client();

// Get the security token
const user = '4EE-FAA';
const jwt = require('./modules/jwt.js');
const jwtPayload = {
    user: user
};
let jwtToken = jwt.GenerateToken(jwtPayload);

// Connect to the GoW API
const gowApi = require('./modules/gowApi.js');

// Target a particular channel
const targetChannelId = "774654841120620576";

// Define Bot Behaviours
bot.on('ready', () => {
    console.log(`${user} is online`);
});

bot.on('message', async message => {

    // Limit the bot commands to a particular channel
    //if(message.channel != targetChannelId) return;

    // Define the reply
    var reply = null;
    var data = null;
    var replyToPerson = true;
    var reactions = null;

    let parsedMessage = helpers.ParseMessage(message);
    var discordUser = "@TestUser";

    switch (parsedMessage.Command) {
        case '!about':
            reply = messages.AboutThisBot();
            break;

        case '!guildwars':
        case '!gw': 
            let channelOnGwDefence = await helpers.getChannelIdAsync(message.guild, "on_gw_defence");
            let channelOnGwOffence = await helpers.getChannelIdAsync(message.guild, "on_gw_offence");

            reply = messages.ExplainGuldWars(channelOnGwDefence, channelOnGwOffence);
            break;

        case '!help':
            reply = messages.ListBotCommands();
            break;

        case'!honour':
        case'!honor':
            data = await gowApi.GetDailyGuildHonour(jwtToken);
            if(data == null) return;

            reply = data.message;
            reactions = data.reactions;
            replyToPerson = false;
            break;

        case '!honourshow':
        case'!honorshow':
            data = await gowApi.IncludeGuildMembersInHonourRota(parsedMessage.Arguments, discordUser, jwtToken);
            if(data == null) return;
            reply = data.message;
            break;

        case '!honourhide':
        case'!honorhide':
            data = await gowApi.ExcludeGuildMembersFromHonourRota(parsedMessage.Arguments, discordUser, jwtToken);
            if(data == null) return;
            reply = data.message;
            break;

        case '!honourweekly':
        case '!honorweekly':
            data = await gowApi.GetWeeklyGuildHonour(jwtToken);
            if(data == null) return;
            reply = data.message;
            replyToPerson = false;
            break;

        case '!members':
            data = await gowApi.GetGuildMembers(jwtToken);
            if(data == null) return;
            reply = data.message;
            break;

        case '!taskpoll':
            reply = messages.TaskPoll;
            reactions = messages.TaskPollReactions;
            replyToPerson = false;
            break;
    }

    // Post the reply
    if(reply != null){
        var replyMessage;
        if(replyToPerson){
            replyMessage = await message.reply("\n".reply);
        } else {
            replyMessage = await message.channel.send(reply);
        }
        await helpers.reactAsync(bot, replyMessage, reactions);
    }
});

// Login to Discord as the Bot
bot.login(process.env.BOT_TOKEN); 