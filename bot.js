const jwt = require('./modules/jwt.js');
const helpers = require('./modules/helpers.js');
const messages = require('./modules/messages.js');
const discord = require('discord.js');
const bot = new discord.Client();

// Define global variables
var botName;
var jwtPayload;
var jwtToken;

// Connect to the GoW API
const gowApi = require('./modules/gowApi.js');

// Target a particular channel
const targetChannelId = "774654841120620576";

// Define Bot Behaviours
bot.on('ready', () => {

    botName = bot.user.username;

    // Get the security token
    jwtPayload = {
        user: botName
    };
    jwtToken = jwt.GenerateToken(jwtPayload);

    console.log(`${botName} is online`);
});

bot.on('message', async message => {

    // Limit the bot commands to a particular channel
    //if(message.channel != targetChannelId) return;

    var discordUser = message.author.username;

    // Don't reply to messages generated by any bot
    //if (message.author.bot) return;
    
    // Don't reply to messages generated by this bot
    if (discordUser === botName) return;

    // Parse the message
    let parsedMessage = await helpers.ParseMessage(message);

    // Define the reply
    var data = null;
    var reply = null;
    var reactions = null;
    var replyToPerson = true;

    switch (parsedMessage.Command) {
        case '!about':
            reply = await messages.AboutThisBot();
            break;

        case '!guildwars':
        case '!gw': 
            let channelOnGwDefence = await helpers.getChannelIdAsync(message.guild, "on_gw_defence");
            let channelOnGwOffence = await helpers.getChannelIdAsync(message.guild, "on_gw_offence");

            reply = await messages.ExplainGuldWars(channelOnGwDefence, channelOnGwOffence);
            break;

        case '!help':
            reply = await messages.ListBotCommands();
            break;

        case'!honour':
        case'!honor':
            data = await gowApi.GetDailyGuildHonour(jwtToken);
            if(data == null) return;

            reply = data.message;
            reactions = data.reactions;
            replyToPerson = false;
            break;

        case '!honouradd':
        case'!honoradd':
            data = await gowApi.IncludeGuildMembersInHonourRota(parsedMessage.Arguments, discordUser, jwtToken);
            if(data == null) return;
            reply = data.message;
            break;

        case '!honourremove':
        case'!honorremove':
            data = await gowApi.ExcludeGuildMembersFromHonourRota(parsedMessage.Arguments, discordUser, jwtToken);
            if(data == null) return;
            reply = data.message;
            break;

        case '!honourrota':
        case '!honorrota':
            data = await gowApi.GetGuildHonourRota(jwtToken);
            if(data == null) return;
            reply = data.message;
            replyToPerson = false;
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

        case '!patchnotes':
            data = await gowApi.GetLatestPatchNote(jwtToken);
            if(data == null) return;
            reply = data.messages;
            replyToPerson = false;
            break;

        case '!patchnotesmajor':
            data = await gowApi.GetLatestMajorPatchNote(jwtToken);
            if(data == null) return;
            reply = data.messages;
            replyToPerson = false;
            break;

        case '!taskpoll':
            reply = await messages.TaskPoll();
            reactions = await messages.TaskPollReactions();
            replyToPerson = false;
            break;
    }

    // Post the reply
    if(reply != null){
        var replyMessage;
        if(replyToPerson || message.channel == null){
            replyMessage = await message.reply("\n" + reply);
        } else {
            replies = Array.isArray(reply) ? reply : [reply];
            replies.forEach(item => 
                replyMessage = await message.channel.send(reply, { split: true })
            );
        }
        await helpers.reactAsync(bot, replyMessage, reactions);
    }
});

// Login to Discord as the Bot
bot.login(process.env.BOT_TOKEN); 