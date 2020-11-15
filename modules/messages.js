module.exports = {
    AboutThisBot: async function(){

        message =   "This bot and the associated API are maintained by @Plip. If you'd like to add some funtionality then drop him a DM. You can also:\n" +
                    "  - Submit your own code at https://github.com/halfacandan/4EE-FAA.\n" +
                    `  - View the API Documentation at ${process.env.API_ENDPOINT_BASE}swagger/\n\n` +
                    "🌟 Honour Rota 🌟 \n\n" +
                    "The honour rota is calculated dynamically based on the calendar date, who is currently in the guild and who is part of the honour rota. " +
                    "The calculation uses the following logic:\n" +
                    "  - The honour rota splits the year up into 18 day chunks with a free honour day every 6th day (days 6, 12 and 18)\n" +
                    "  - The other 15 days of the 18 day cycle are used to pick two guild members to receive honour each day\n" +
                    "  - The guild members are chosen in a set order, based upon how long they have been a member of the guild so that each person will get the same number of honour days as everyone else\n" +
                    "  - When a guild member has reached their maximum honour, they can be excluded from the rota and \"Free Honour\" will appear instead of their name in the honour rota\n" +
                    "  - The final 5 or 6 days of a calander year (which don't fit in the 18 day cycle) are all set as free honour days";

        return message;
    },
    ExplainGuldWars: function(channelOnGwDefence, channelOnGwOffence){

        message =   "⚔️ Guild Wars Scoring ⚔️ \n\n" +
                    `Monday is a good day to set up your defense teams and buy any Sentinels you want to use, they are effective both for attack and defense. The ${channelOnGwDefence} channel is a great place to discuss your teams or get some inspiration and help.\n\n` +
                    "Using 24 different troops for defence will get you 500 extra points each day you play.\n\n" +
                    `For your attack teams you can use any that you like, but you'll get extra points when you use troops with the colour of the day. There is a wealth of teams posted in the ${channelOnGwOffence} channel. Other things that will have a positive effect on your score are:\n` +
                    "  - How many troops you have on your team when the battle is over\n" +
                    "  - How many damage you did to the opponents troops (devour, lethal and true damage get lower points, AoE gets you more)\n" +
                    "  - How many turns it to win your match, taking a 4/5 match extra turn will count as a new turn\n\n" +    
                    "That last bullet point can make devour, lethal and true damage troops still very useful. Also, the best score is when you win the match :sweat_smile: so if single colour is too tricky use your favourite team.\n\n" +
                    "Doing your matches on the day will get us a better chance to win the match that day and get all of us extra seals.";

        return message;
    },
    ListBotCommands: async function(){

        message =   "**!about** - Info on how to add new functionality to 4EE-FAH\n" +
                    "**!guildwars** (or **!gw**) - Explain Guild Wars scoring\n" +
                    "**!honour** (or **!honor**) - Display today's honour recipient\n" +
                    "**!honouradd** (or **!honoradd**) - Add one or more guild member to the honour rota. Usage !honouradd John \"Jane Doe\"\n" +
                    "**!honourremove** (or **!honorremove**) - Remove one or more guild member to the honour rota. Usage !honourremove John \"Jane Doe\"\n" +
                    "**!honourrota** (or **!honorrota**) - Displays the current, 18 day honour rota\n" +     
                    "**!honourweekly** (or **!honorweekly**) - Displays the current week's honour recipients by day\n" +
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
    }
}