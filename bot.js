const botCommandPrefix = "!"
const botHelpCommand = "help";
const botAboutCommand = "about";
//const lineBreak = "\n\uFEFF";

const discord = require('discord.js');
const jwt = require('./modules/jwt.js');
const helpers = require('./modules/helpers.js');
const messages = require('./modules/messages.js');

const bot = new discord.Client({ intents: [
    discord.GatewayIntentBits.MessageContent,
    discord.GatewayIntentBits.DirectMessages,
    discord.GatewayIntentBits.DirectMessageReactions,
    discord.GatewayIntentBits.DirectMessageTyping,    
    discord.GatewayIntentBits.Guilds,
    discord.GatewayIntentBits.GuildEmojisAndStickers,
    discord.GatewayIntentBits.GuildMessages,    
    discord.GatewayIntentBits.GuildMessageReactions,
    discord.GatewayIntentBits.GuildMessageTyping
] });

// Required to intercept the slash commands
const rest = new discord.REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

// Define global variables
var botName;
var jwtPayload;
var jwtToken;

// Connect to the GoW API
const gowApi = require('./modules/gowApi.js');

// Target a particular channel
//const targetChannelId = "774654841120620576";

// Define Bot Behaviours
bot.on('ready', async () => {

    botName = bot.user.username;

    // Get the security token
    jwtPayload = {
        user: botName
    };
    jwtToken = jwt.GenerateToken(jwtPayload);

    const commands = [
        new discord.SlashCommandBuilder()
            .setName('about')
            .setDescription('View 4EE-FAH\'s source code')
            .toJSON(),
        new discord.SlashCommandBuilder()
            .setName('guildwars')
            .setDescription('Find out how Guild Wars scoring works')
            .toJSON(),
        new discord.SlashCommandBuilder()
            .setName('honour')
            .setDescription('Get a list of today\'s honour recipients')
            .toJSON(),
        new discord.SlashCommandBuilder()
            .setName('honourweekly')
            .setDescription('Get a list of this week\'s honour recipients')
            .toJSON(),
        new discord.SlashCommandBuilder()
            .setName('honourrota')
            .setDescription('View the current 18 day honour cycle')
            .toJSON(),
        new discord.SlashCommandBuilder()
            .setName('honourtrade')
            .setDescription('Find out how to boost your honour rank quickly')
            .toJSON(),
        new discord.SlashCommandBuilder()
            .setName('honourrank')
            .setDescription('Lists the Guild members\' Honour ranks')
            .toJSON(),
        new discord.SlashCommandBuilder()
            .setName('members')
            .setDescription('Lists the Guild members\' GoW account names')
            .toJSON(),
        new discord.SlashCommandBuilder()
            .setName('taskpoll')
            .setDescription('Creates a taskpoll to vote for Epic tasks')
            .toJSON()
    ];

    // Configure the slash commands
    const data = await rest.put(
        discord.Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.SERVER_ID),
        { body: commands },
    );

    bot.user.setPresence({
        activities: [{ name: `/honour`, type: discord.ActivityType.Listening }],
        status: 'online',
    });

    console.log(`${botName} is online`);
});

bot.on('interactionCreate', async interaction => {
    var discordUser = interaction.username;

    // Define the reply
    var data = null;
    var replies = Array();
    var reactions = null;
    var replyToPerson = true;
    var reactToMessageNumber = null;

    if(interaction.commandName == null) return;

    switch (interaction.commandName) {
        case `${botAboutCommand}`:
            if(interaction.channel != null) interaction.channel.sendTyping();

            replies.push(await messages.AboutThisBot());
            break;
    
        case 'guildwars':
            if(interaction.channel != null) interaction.channel.sendTyping();

            let channelOnGwDefence = await helpers.GetChannelIdAsync(interaction.guild, "on_gw_defence");
            let channelOnGwOffence = await helpers.GetChannelIdAsync(interaction.guild, "on_gw_offence");        

            replies.push(...await messages.ExplainGuldWars(channelOnGwDefence, channelOnGwOffence));
            break;

        case 'honour':
            if(interaction.channel != null) interaction.channel.sendTyping();
        
            data = await gowApi.GetDailyGuildHonour(jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies.push(data.message);
            reactions = data.reactions;
            replyToPerson = false;

            if(data.message.includes("Free Honour")) {
                replies.push(await messages.ExplainHonourTrading());
                var honourRanking = await gowApi.GetGuildMembersHonour(jwtToken, true);
                if(honourRanking != null) {
                    replies.push(honourRanking.message);
                }
                var reactToMessageNumber = 0;
            }

            break;

        case 'honouradd':
            if(interaction.channel != null) interaction.channel.sendTyping();
        
            data = await gowApi.IncludeGuildMembersInHonourRota(parsedMessage.Arguments, discordUser, jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies.push(data.message);
            break;

        case 'honourremove':
            if(interaction.channel != null) interaction.channel.sendTyping();
        
            data = await gowApi.ExcludeGuildMembersFromHonourRota(parsedMessage.Arguments, discordUser, jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies.push(data.message);
            break;

        case 'honourrota':
            if(interaction.channel != null) interaction.channel.sendTyping();

            data = await gowApi.GetGuildHonourRota(jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies = replies.concat(data.messages);
            replyToPerson = false;
            
            break;

        case 'honourtrade':
            replies.push(await messages.ExplainHonourTrading());
            replyToPerson = false;

            break;

        case 'honourweekly':
            if(interaction.channel != null) interaction.channel.sendTyping();
            
            data = await gowApi.GetWeeklyGuildHonour(jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies.push(data.message);
            replyToPerson = false;
            break;
            
        case 'honourrank':
            if(interaction.channel != null) interaction.channel.sendTyping();
            
            data = await gowApi.GetGuildMembersHonour(jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies.push(data.message);
            break;

        case 'members':
            if(interaction.channel != null) interaction.channel.sendTyping();
            
            data = await gowApi.GetGuildMembers(jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies.push(data.message);
            break;

        case 'taskpoll':
            if(interaction.channel != null) interaction.channel.sendTyping();
            
            replies.push(await messages.TaskPoll());
            reactions = await messages.TaskPollReactions();
            replyToPerson = false;
            break;
    }

    await messages.SendReplies(discord, bot, interaction, replies, reactions, replyToPerson, reactToMessageNumber, true);
});

bot.on('messageCreate', async message => {

    // Limit the bot commands to a particular channel
    //if(message.channel != targetChannelId) return;

    var discordUser = message.author.username;

    // Don't reply to messages generated by any bot
    if (message.author.bot) return;
    
    // Don't reply to messages generated by this bot
    if (discordUser === botName) return;

    // Parse the message
    let parsedMessage = await helpers.ParseMessage(message, botCommandPrefix);

    // Define the reply
    var data = null;
    var replies = Array();
    var reactions = null;
    var replyToPerson = true;
    var reactToMessageNumber = null;

    if(parsedMessage.Command == null) return;

    switch (parsedMessage.Command) {
        case `${botCommandPrefix}${botAboutCommand}`:
            if(message.channel != null) message.channel.sendTyping();

            replies.push(await messages.AboutThisBot());
            break;
    
        case `${botCommandPrefix}guildwars`:
        case `${botCommandPrefix}gw`:
            if(message.channel != null) message.channel.sendTyping();

            let channelOnGwDefence = await helpers.GetChannelIdAsync(message.guild, "on_gw_defence");
            let channelOnGwOffence = await helpers.GetChannelIdAsync(message.guild, "on_gw_offence");        

            replies.push(...await messages.ExplainGuldWars(channelOnGwDefence, channelOnGwOffence));
            break;

        case `${botCommandPrefix}${botHelpCommand}`:
            if(message.channel != null) message.channel.sendTyping();
            
            botCommands = await messages.ListBotCommands(botAboutCommand, botCommandPrefix);
            //hawxCommands = await gowApi.AboutHawxCommands(botCommandPrefix);

            var helpCommands = botCommands;//.concat(hawxCommands);
            //console.log(helpCommands);
            let helpMessage = helpCommands.sort().join("");
            replies.push(helpMessage);
            break;

        case `${botCommandPrefix}honour`:
        case `${botCommandPrefix}honor`:
            if(message.channel != null) message.channel.sendTyping();
        
            data = await gowApi.GetDailyGuildHonour(jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies.push(data.message);
            reactions = data.reactions;
            replyToPerson = false;

            if(data.message.includes("Free Honour")) {
                replies.push(await messages.ExplainHonourTrading());
                var reactToMessageNumber = 0;
            }

            break;

        case `${botCommandPrefix}honouradd`:
        case `${botCommandPrefix}honoradd`:
            if(message.channel != null) message.channel.sendTyping();
        
            data = await gowApi.IncludeGuildMembersInHonourRota(parsedMessage.Arguments, discordUser, jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies.push(data.message);
            break;

        case `${botCommandPrefix}honourremove`:
        case `${botCommandPrefix}honorremove`:
            if(message.channel != null) message.channel.sendTyping();
        
            data = await gowApi.ExcludeGuildMembersFromHonourRota(parsedMessage.Arguments, discordUser, jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies.push(data.message);
            break;

        case `${botCommandPrefix}honourrota`:
        case `${botCommandPrefix}honorrota`:
            if(message.channel != null) message.channel.sendTyping();

            data = await gowApi.GetGuildHonourRota(jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies = replies.concat(data.messages);
            replyToPerson = false;
            break;

        case `${botCommandPrefix}honourweekly`:
        case `${botCommandPrefix}honorweekly`:
            if(message.channel != null) message.channel.sendTyping();
            
            data = await gowApi.GetWeeklyGuildHonour(jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies.push(data.message);
            replyToPerson = false;
            break;

        case `${botCommandPrefix}members`:
            if(message.channel != null) message.channel.sendTyping();
            
            data = await gowApi.GetGuildMembers(jwtToken);
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies.push(data.message);
            break;

        case `${botCommandPrefix}patchnotes`:

            // Disabled
            return;

            if(message.channel != null) message.channel.sendTyping();
            
            data = await gowApi.GetLatestPatchNote();
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies = replies.concat(data.messages);
            replyToPerson = false;
            break;

        case `${botCommandPrefix}patchnotesmajor`:

            // Disabled
            return;

            if(message.channel != null) message.channel.sendTyping();
            
            data = await gowApi.GetLatestMajorPatchNote();
            if(data == null) {
                replies.push(messages.BotError());
                break;
            }

            replies = replies.concat(data.messages);
            replyToPerson = false;
            break;

        case `${botCommandPrefix}taskpoll`:
            if(message.channel != null) message.channel.sendTyping();
            
            replies.push(await messages.TaskPoll());
            reactions = await messages.TaskPollReactions();
            replyToPerson = false;
            break;
        
        default:
            /*
            hawxCommands = await gowApi.ListHawxCommands(botCommandPrefix);
            for(var i=0; i < hawxCommands.commands.length; i++){

                let hawxCommand = hawxCommands.commands[i];

                // Try to match a command
                if(hawxCommand.command == parsedMessage.Command){
                    if(message.channel != null) message.channel.sendTyping();

                    // Check for help argument
                    if(parsedMessage.Arguments.length > 0 && parsedMessage.Arguments[0].toLowerCase() =="help") {
                        replies.push(hawxCommand.help);                     
                    } else {
                        // If no arguments are specified then just show the latest data
                        if(parsedMessage.Arguments.length == 0) parsedMessage.Arguments = Array("latest");
                        // Strip out any non-alphanumeric characters
                        let hawxApiParams = parsedMessage.Arguments.map(function(argument){
                            return argument.replace(/[^a-zA-Z0-9]/g,"");  
                        });

                        let hawxApiUrl = hawxCommand.links.href + "/" + hawxApiParams.join("/");
                        const maxItemCount = 3;

                        let data = await gowApi.GetHawxCommandItems(hawxApiUrl, botCommandPrefix, maxItemCount);
                        
                        // Check whether or not a message was returned
                        if(data == null || data.messages.length < 1){
                            var notFoundResponse = hawxCommand.help;
                            notFoundResponse.content = 
                                "Sorry, we can't find anything that matches your query. " +
                                `Here's some help on how to use the **${parsedMessage.Command}** command.${lineBreak}`
                            console.log(notFoundResponse);
                            replies.push(notFoundResponse); 
                        } else {
                            replies = replies.concat(data.messages);
                        }

                        replyToPerson = false;
                    }
                }
            }
            */

            //if(replies.length < 1){
            //    replies.push(messages.BotError());
            //}
            
            break;
    }

    await messages.SendReplies(discord, bot, message, replies, reactions, replyToPerson, reactToMessageNumber);
});

// Login to Discord as the Bot
bot.login(process.env.BOT_TOKEN); 