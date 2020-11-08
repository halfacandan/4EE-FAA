module.exports = {
    getEmojiCodeAsync: async function (bot, emojiShortcode){
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
    getChannelIdAsync: async function (guild, channelName){
        
        if(guild == null || channelName == null) return null;
        
        return await guild.channels.cache.find(channel => channel.name === channelName).toString();
    },
    reactAsync: async function (bot, message, reactions){

        if(bot == null || message == null) return;

        if(typeof(reactions) !== "undefined" && reactions != null){
            
            if(typeof(reactions) === "string"){
                reactions = Array(reactions);
            }

            for(var i=0; i < reactions.length; i++){
                let emojiCode = await this.getEmojiCodeAsync(bot, reactions[i]);
                if(emojiCode != null){
                    await message.react(emojiCode);
                }
            }
        }
    }
}