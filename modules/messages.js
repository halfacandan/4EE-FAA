const LineBreak = "\n\uFEFF";

module.exports = {
    BotError: function(){
        return "**\\*Blip\\*** *\\*Blip\\** ***\\*Blip\\**** End of Cheese Error";
    },
    AboutThisBot: async function(){

        const BotAuthorDiscordId = '342266718334353408';

        let embeddedMessage = {
            "embed": {
                "title": ":robot:  4EE-FAA Bot",
                "description": `4EE-FAA was created by <@!${BotAuthorDiscordId}>. Message him with your ideas for the bot.${LineBreak}`,
                "fields": [             
                    {
                        "name": ":star:  How the honour rota works",
                        "value": " * Two guild members receive honour each day unless it is a free honour day \n" +
                                " * Recipients are chosen in a set order, based upon when they joined the guild\n" +
                                " * The rota is a 18-day cycle with a free honour day on days 6, 12 and 18\n" +
                                " * \"Free Honour\" is displayed if the person has reached maximum honour\n" +
                                ` * The final 5 or 6 days of the year are always free honour days${LineBreak}`,
                    },
                    {
                        "name": ":nerd:  Geek Stuff",
                        "value": " * [View the 4EE-FAA bot's node.js code](https://github.com/halfacandan/4EE-FAA)\n" +
                                ` * [View Plip's GoW API Swagger Docs](${process.env.API_ENDPOINT_BASE}swagger/)`
                    }
                ]
            }
        };

        return embeddedMessage;
    },
    ExplainGuldWars: async function(channelOnGwDefence, channelOnGwOffence){

        let embeddedMessage = {
            "embed": {
                "title": ":crossed_swords:  Guild Wars Scoring",
                "description": `There are various other things you can do to increase your Guild Wars scores.${LineBreak}`,
                "fields": [
                    {
                        "name": ":calendar:  Tasks for Monday",
                        "value": " 1) Purchase Sentinels\n" +
                                " ** Sentinels grant stat bonuses to your defenders and daily teams\n" +
                                " ** Focus on Magic bonuses if you can't afford all the stats\n" +
                                " 2) Set up Defence Teams\n" +
                                ` ** See **Defensive Scoring** below${LineBreak}`
                    },
                    {
                        "name": ":shield:  Defensive Scoring",
                        "value": " 1) Troop Diversity\n" +
                                " ** Use 24 different defenders to get 500 extra points per day\n" +
                                ` ** The ${channelOnGwDefence} channel can help you find strong teams${LineBreak}`                            
                    },
                    {
                        "name": ":muscle:  Offensive Scoring",
                        "value": " 1) Winning\n" +
                                " ** Beating your opponent gives you the most points :sweat_smile:\n" + 
                                ` ** The ${channelOnGwOffence} channel shows everyone else's teams\n` +
                                " 2) Troop Colour\n" +
                                " ** Each day of Guild Wars represents a different colour of mana\n" +
                                " ** Pick troops which can use the daily mana colour for bonus points\n" +
                                " 3) Troop Survival\n" +
                                " ** You score points for each troop which survives the fight\n" +
                                " 4) Damage Dealt\n" +
                                " ** Deal as much damage to the opponent's troops as possible\n" +
                                " ** Kills from Devour, lethal & true damage lower your score\n" +
                                " ** Kills from Single-target & scatter/splash damage give more points\n" +
                                " 5) Number of Turns\n" +
                                " ** The fewer turns you take to win, the higher your score\n" +
                                " ** A 4/5 match extra turn will lower you score\n" +
                                " ** Devour, lethal and true damage troops can speed up fights"
                    }
                ]
            }
        };

        let anonymousGuardiansInviteLink = "https://discord.gg/49FxcSeEKW";
        let additionalHelpMessage = `You can also check out the GWS Offence channels and the #defense-ss-only channels on the Anonymous Guardians Server for some team suggestions: ${anonymousGuardiansInviteLink}`

        return [
            embeddedMessage,
            additionalHelpMessage
        ];
    },
    ExplainHonourTrading: async function(){
        let message = {
            "embed": {
                "title": ":left_right_arrow:  Honour Trading",
                "description": `It's possible to trade your spare honour with players outside the guild for an additional boost to your account.${LineBreak}`,
                "fields": [             
                    {
                        "name":  ":star:  How to Trade Honour",
                        "value": " * Open up Gems of War and join global channel **989**\n" +
                                 " * Send a message in the format **Hx4** (shown in the image below)\n" +
                                 " * The number is the honour that you wish to distribute\n" +
                                 " * Click on the users above you & give them a **Helpful** honour\n" +
                                 ` * Don't give to users with gold strips at the top of their portraits${LineBreak}`
                    }
                ],
                "image": {
                    "url": 'http://www.s171553821.websitehome.co.uk/gow/images/honour.jpg'
                }
            }
        };

        return message;
    },
    ListBotCommands: async function(botAboutCommand = "about", botCommandPrefix = "!"){

        let commands =   [
            `**${botCommandPrefix}${botAboutCommand}** - Info on how to add new functionality to 4EE-FAH\n`,
            `**${botCommandPrefix}gw** - Explain Guild Wars scoring\n`,
            `**${botCommandPrefix}honour** - Display today's honour recipient\n`,
            `**${botCommandPrefix}honouradd** - Add one or more guild member to the honour rota. Usage ${botCommandPrefix}honouradd John \"Jane Doe\"\n`,
            `**${botCommandPrefix}honourremove** - Remove one or more guild member to the honour rota. Usage ${botCommandPrefix}honourremove John \"Jane Doe\"\n`,
            `**${botCommandPrefix}honourrota** - Displays the current, 18 day honour rota\n`,
            `**${botCommandPrefix}honourweekly** - Displays the current week's honour recipients by day\n`,
            `**${botCommandPrefix}members** - Lists the Guild members' GoW account names\n`,
            //`**${botCommandPrefix}patchnotes** - Gets the latest patch note\n`,
            //`**${botCommandPrefix}patchnotesmajor** - Gets the latest Major patch note and notes for any subsequent Minor patches\n`,
            `**${botCommandPrefix}taskpoll** - Creates a taskpoll for Epic tasks\n`];

        return commands;
    },
    TaskPoll: async function(){
        return "<@&304714829032325120> Poll for next week: Which Epic task should we try to finish first?";
    },
    TaskPollReactions: async function(){
        return Array(
            ":Mana_Blue_Water:",
            ":Mana_Brown_Earth:",
            ":Mana_Green_Nature:",
            ":Mana_Purple_Magic:",
            ":Mana_Red_Fire:",
            ":Mana_Yellow_Wind:");
    },
    FixBulletPoints: function(text){

        const bulletOne = "\uFEFF\u2001\u2022 ";
        const bulletTwo = "\uFEFF\u2001\u2001\u2043 ";

        // Unordered lists
        text = text.replace(/ \* /g, bulletOne).replace(/ \*\* /g, bulletTwo);
        // Ordered lists
        text = text.replace(/ ([0-9]+(?:\.|\)) )/g, "\uFEFF\u2001$1").replace(/ ([0-9]+\.[0-9]+(?:\.|\)) )/g, "\uFEFF\u2001\u2001$1");

        // Fix any incorrectly-escaped \uFEFF stringification issues
        text = text.replace("\\uFEFF", "\uFEFF");

        return text;
    },
    ParseEmbeddedMessage: async function(discord, embeddedMessage){

        var attachment = null;

        if(typeof embeddedMessage.embed.type === "undefined" || embeddedMessage.embed.type == null){
            embeddedMessage.embed.type = "rich";
        }

        if(typeof embeddedMessage.embed.description !== "undefined" && embeddedMessage.embed.description != null){
            embeddedMessage.embed.description = this.FixBulletPoints(embeddedMessage.embed.description);
        }

        if(typeof embeddedMessage.embed.fields !== "undefined" && embeddedMessage.embed.fields != null){
            for(var i = 0; i < embeddedMessage.embed.fields.length; i++){
                if(typeof embeddedMessage.embed.fields[i].value !== "undefined") {
                    let fixedFieldValue = this.FixBulletPoints(embeddedMessage.embed.fields[i].value);
                    embeddedMessage.embed.fields[i].value = fixedFieldValue;
                }
            }
        }

        if((typeof embeddedMessage.embed.image === "undefined" || embeddedMessage.embed.image == null) 
                && typeof embeddedMessage.embed.table !== "undefined" && embeddedMessage.embed.table != null){

            // The "text-to-image" npm package causes random crashes on Raspberry Pi 4 so use "text2png"
            const text2png = require('text2png');            
            let imageStream = text2png(embeddedMessage.embed.table, {
                font: '16px Courier',
                color: 'white',
                bgColor: '#2f3136', // Discord Dark Gray
                lineSpacing: 0,
                padding: 0,
                output: 'buffer'
            });

            if(typeof embeddedMessage.embed.title !== "undefined" && embeddedMessage.embed.title != null){
                imageName = embeddedMessage.embed.title.trim().toLowerCase().replace(/\s/g, "_").replace(/[^a-zA-Z0-9]/ig, "");
            } else {
                imageName = Math.random().toString(36).replace(/[^a-z]+/ig, '').substr(0,5);
            }

            attachment = new discord.AttachmentBuilder(imageStream, { name: `${imageName}.png`});
            if(attachment != null){
                embeddedMessage.embed.image = {
                    "url": `attachment://${imageName}.png`
                }
            }
        }

        if(attachment == null){
            return embeddedMessage;
        } else {
            let message = { 
                "embeds": [embeddedMessage.embed], 
                "files": [attachment]
            };
            return message;
        }
    },
    ReactToMesageAsync: async function (bot, message, reactions){

        if(bot == null || message == null || reactions == null) return;

        if(typeof(reactions) === "string"){
            reactions = Array(reactions);
        }

        var msg = message;
        if(message.constructor.name != "InteractionResponse"){
            msg = await message.channel.messages.fetch(message.id);
        }

        for(var i=0; i < reactions.length; i++){
            let emojiCode = await this.GetEmojiCodeAsync(bot, reactions[i]);
            if(emojiCode != null){
                await msg.react(emojiCode);
            }
        }
    },    
    GetEmojiCodeAsync: async function (bot, emojiShortcode){
        // https://discordjs.guide/popular-topics/reactions.html#custom-emojis

        if(emojiShortcode.match(/:[^:]+:$/g) != null && bot != null){
            var emoji = await bot.emojis.cache.find(emoji => emoji.name == emojiShortcode.replace(/:|:$/g,''));
            if(typeof(emoji) !== "undefined") {
                // This is a custom emoji
                return emoji.id;
            } else {
                // This is an invalid custom emoji
                return null;
            }
        } else {
            // This is a unicode emoji
            return emojiShortcode;
        }
    },
    SendReplies: async function(discord, bot, userMessage, replies, reactions = null, replyToPerson = false, reactToMessageNumber = null, isInteraction = false){

        if(replies != null){

            var message;
            var finalReplyMessage;
            var reacted = false;
            var messages = [];

            for(var i=0; i < replies.length; i++){
                if(!isInteraction && (replyToPerson || userMessage == null || typeof userMessage.channel === "undefined" || userMessage.channel == null)){
                    if(typeof replies[i] === "string") {
                        message = "\n" + replies[i];
                        messages.push(await userMessage.reply(replies[i], { split: true }));
                    } else {
                        message = await this.ParseEmbeddedMessage(discord, replies[i]);
                        messages.push(await userMessage.reply({ embeds: [message.embed] }));
                    }                    
                } else {
                    if(typeof replies[i] === "string") {
                        if(isInteraction){
                            if(i == 0){
                                await userMessage.reply(replies[i], { split: true });
                            } else {
                                await userMessage.followUp(replies[i], { split: true });
                            }                            
                            messages.push(await userMessage.fetchReply());
                        } else {
                            messages.push(await userMessage.channel.send(replies[i], { split: true }));
                        }
                    } else {
                        var messageFormatted;
                        if(typeof replies[i].embed === "undefined"){
                            messageFormatted = { 
                                "content": replies[i].content, 
                                "embeds": [{
                                    "image": {
                                        "url": replies[i].file
                                    }
                                }]
                            };
                        } else {
                            message = await this.ParseEmbeddedMessage(discord, replies[i]);
                            if(message.files != null){
                                messageFormatted = message;
                            } else {
                                messageFormatted = { 
                                    embeds: [message.embed] 
                                };
                            }  
                        }
                        if(isInteraction){
                            if(i == 0){
                                await userMessage.reply(messageFormatted);
                            } else {
                                await userMessage.followUp(messageFormatted);
                            }
                            messages.push(await userMessage.fetchReply());
                        } else {
                            messages.push(await userMessage.channel.send(messageFormatted));
                        }
                    }                
                }
                
                finalReplyMessage = messages[i];

                if(reactToMessageNumber == i){                    
                    let replyMessage = Array.isArray(finalReplyMessage) ? finalReplyMessage[0] : finalReplyMessage;
                    await this.ReactToMesageAsync(bot, replyMessage, reactions);
                    reacted = true;
                }
            }
            if(reactions != null && reacted != true){
                let replyMessage = Array.isArray(finalReplyMessage) ? finalReplyMessage[0] : finalReplyMessage;
                await this.ReactToMesageAsync(bot, replyMessage, reactions);
            }
        }
    }
}