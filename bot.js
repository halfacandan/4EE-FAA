const helpers = require('./modules/helpers.js');
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
    var replyToPerson = true;
    var reactions = null;

    if (message.content === '!guildwars' || message.content === '!gw') {
        
        let channelOnGwDefence = await helpers.getChannelIdAsync(message.guild, "on_gw_defence");
        let channelOnGwOffence = await helpers.getChannelIdAsync(message.guild, "on_gw_offence");

        reply = "⚔️Guild Wars Scoring⚔️ \n\n" +
        `Monday is a good day to set up your defense teams and buy any Sentinels you want to use, they are effective both for attack and defense. The ${channelOnGwDefence} channel is a great place to discuss your teams or get some inspiration and help.\n\n` +
        "Using 24 different troops for defence will get you 500 extra points each day you play.\n\n" +
        `For your attack teams you can use any that you like, but you'll get extra points when you use troops with the colour of the day. There is a wealth of teams posted in the ${channelOnGwOffence} channel. Other things that will have a positive effect on your score are:\n` +
        "- How many troops you have on your team when the battle is over\n" +
        "- How many damage you did to the opponents troops (devour, lethal and true damage get lower points, AoE gets you more)\n" +
        "- How many turns it to win your match, taking a 4/5 match extra turn will count as a new turn\n\n" +    
        "That last bullet point can make devour, lethal and true damage troops still very useful. Also, the best score is when you win the match :sweat_smile: so if single colour is too tricky use your favourite team.\n\n" +
        "Doing your matches on the day will get us a better chance to win the match that day and get all of us extra seals.";
    }

    if (message.content === '!help') {       

        reply = "**!guildwars** (or **!gw**) - Explain Guild Wars scoring\n" +
                "**!honour** (or **!honor**) - Display today's honour recipient\n" +
                "**!honourweekly** (or **!honorweekly**) - Displays the current week's honour recipients by day\n" +
                "**!members** - Lists the Guild members GoW account names\n" +
                "**!taskpoll** - Creates a taskpoll for Epic tasks\n";
    }

    if (message.content === '!honour' || message.content === '!honor') {       

        let data = await gowApi.GetDailyGuildHonour(jwtToken);
        if(data == null) return;
        reply = data.message;
        replyToPerson = false;
        reactions = data.reactions;
    }

    if (message.content === '!honourweekly' || message.content === '!honorweekly') {

        let data = await gowApi.GetWeeklyGuildHonour(jwtToken);
        if(data == null) return;
        reply = data.message;
        replyToPerson = false;
    }

    if (message.content === '!members') {       

        let data = await gowApi.GetGuildMembers(jwtToken);
        if(data == null) return;
        reply = data.message;
    }

    if (message.content === '!taskpoll') {

        reply = "Poll for next week: Which Epic task should we try to finish first?";
        replyToPerson = false;

        reactions = Array(
            ":Mana_Blue_Water:",
            ":Mana_Brown_Earth:",
            ":Mana_Green_Nature:",
            ":Mana_Purple_Magic:",
            ":Mana_Red_Fire:",
            ":Mana_Yellow_Wind:");
    }

    // Post the reply
    if(reply != null){

        var replyMessage;
        if(replyToPerson){
            replyMessage = await message.reply(reply);
        } else {
            replyMessage = await message.channel.send(reply);
        }
        await helpers.reactAsync(bot, replyMessage, reactions);
    }
});

// Login to Discord as the Bot
bot.login(process.env.BOT_TOKEN); 