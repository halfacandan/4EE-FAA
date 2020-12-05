const LineBreak = "\n\uFEFF";

module.exports = {
    AboutThisBot: async function(discord){

        const BotAuthorDiscordId = '342266718334353408';

        let embeddedMessage = {
            "embed": {
                "title": ":robot:  4EE-FAA Bot",
                "description": `4EE-FAA was created by <@!${BotAuthorDiscordId}>. Message him to get your ideas added to the bot.${LineBreak}`,
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
                        "value": " * [View the 4EE-FAA bot's node.js code on GitHub](https://github.com/halfacandan/4EE-FAA)\n" +
                                ` * [View Plip's GoW API Swagger Documentation](${process.env.API_ENDPOINT_BASE}swagger/)`
                    }
                ]
            }
        };

        return await this.ParseEmbeddedMessage(discord, embeddedMessage);
    },
    ExplainGuldWars: async function(discord, channelOnGwDefence, channelOnGwOffence){

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

        return await this.ParseEmbeddedMessage(discord, embeddedMessage);
    },
    ListBotCommands: async function(){

        message =   "**!about** - Info on how to add new functionality to 4EE-FAH\n" +
                    "**!campaign** - Show Hawx's latest campaign task list\n" +
                    "**!gw** - Explain Guild Wars scoring\n" +
                    "**!honour** - Display today's honour recipient\n" +
                    "**!honouradd** - Add one or more guild member to the honour rota. Usage !honouradd John \"Jane Doe\"\n" +
                    "**!honourremove** - Remove one or more guild member to the honour rota. Usage !honourremove John \"Jane Doe\"\n" +
                    "**!honourrota** - Displays the current, 18 day honour rota\n" +     
                    "**!honourweekly** - Displays the current week's honour recipients by day\n" +
                    "**!members** - Lists the Guild members GoW account names\n" +
                    "**!patchnotes** - Gets the latest patch note\n" +
                    "**!patchnotesmajor** - Gets the latest Major patch note and notes for any subsequent Minor patches\n" +
                    "**!taskpoll** - Creates a taskpoll for Epic tasks\n";
        
        return message;
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

        return text;
    },
    ParseEmbeddedMessage: async function(discord, embeddedMessage){

        var attachments = null;

        if(embeddedMessage.embed.type == null){
            embeddedMessage.embed.type = "rich";
        }

        if(embeddedMessage.embed.description != null){
            embeddedMessage.embed.description = this.FixBulletPoints(embeddedMessage.embed.description);
        }
        
        if(embeddedMessage.embed.fields != null){
            for(var i = 0; i < embeddedMessage.embed.fields.length; i++){
                if(typeof embeddedMessage.embed.fields[i].value !== "undefined") {
                    let fixedFieldValue = this.FixBulletPoints(embeddedMessage.embed.fields[i].value);
                    embeddedMessage.embed.fields[i].value = fixedFieldValue;
                }
            }
        }
        
        if(embeddedMessage.embed.image == null && embeddedMessage.embed.table != null){
            
            const textToImage = require('text-to-image');
            const PxPerChar = 10;
            const MarginPx = 5;
            let maxCharsPerRow = Math.max(...(embeddedMessage.embed.table.split("\n").map(el => el.length))) + 2;
                
            let image = await textToImage.generate(embeddedMessage.embed.table, {
                "fontFamily": "Courier",
                "fontSize": 16, // 16 = Approx 10px width per character
                "lineHeight": 16,
                "textColor": "#98b1b8", // Discord Light Gray
                "bgColor": "#2f3136", // Discord Dark Gray
                "maxWidth": maxCharsPerRow * PxPerChar + (2 * MarginPx),
                "margin": MarginPx
            });
        
            const imageStream = new Buffer.from(image.split(",")[1], 'base64');

            var imageName;
            if(embeddedMessage.embed.title != null){
                imageName = embeddedMessage.embed.title.trim().toLowerCase().replace(/\s/g, "_").replace(/[^a-zA-Z0-9]/ig, "");
            } else {
                imageName = Math.random().toString(36).replace(/[^a-z]+/ig, '').substr(0,5);
            }
            attachments = Array(new discord.MessageAttachment(imageStream, `${imageName}.png`));            
            embeddedMessage.embed.image = {
                "url": `attachment://${imageName}.png`
            };
        }

        if(attachments == null){
            return embeddedMessage;
        } else {
            return { 
                embed: embeddedMessage.embed, 
                files: attachments
            };
        }
    },
    ReactToMesageAsync: async function (bot, message, reactions){

        if(bot == null || message == null || reactions == null) return;

        if(typeof(reactions) === "string"){
            reactions = Array(reactions);
        }

        for(var i=0; i < reactions.length; i++){
            let emojiCode = await this.GetEmojiCodeAsync(bot, reactions[i]);
            if(emojiCode != null){
                var msg = await message.channel.messages.fetch(message.id);
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
    SendReplies: async function(bot, userMessage, replies, reactions = null, replyToPerson = false){
        
        if(replies != null){
            
            var finalReplyMessage;

            for(var i=0; i < replies.length; i++){
                if(replyToPerson || userMessage.channel == null){
                    if(typeof replies[i] === "string") replies[i] = "\n" + replies[i];
                    finalReplyMessage = await userMessage.reply(replies[i]);
                } else {
                    if(typeof replies[i] === "string") {
                        finalReplyMessage = await userMessage.channel.send(replies[i], { split: true });
                    } else {
                        finalReplyMessage = await userMessage.channel.send(replies[i]);
                    }                
                }
            }

            if(reactions != null){
                replyMessage = Array.isArray(finalReplyMessage) ? finalReplyMessage[0] : finalReplyMessage;
                await this.ReactToMesageAsync(bot, replyMessage, reactions);
            }
        }

        if(userMessage.channel != null) userMessage.channel.stopTyping();
    }
}