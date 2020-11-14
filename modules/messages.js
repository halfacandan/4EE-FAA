module.exports = {
    AboutThisBot: function(){
        return "This bot is maintained by @Plip. If you'd like to add some funtionality then drop @Plip a DM or submit your own code at https://github.com/halfacandan/4EE-FAA";
    },
    ExplainGuldWars: function(channelOnGwDefence, channelOnGwOffence){

        message =   "⚔️Guild Wars Scoring⚔️ \n\n" +
                    `Monday is a good day to set up your defense teams and buy any Sentinels you want to use, they are effective both for attack and defense. The ${channelOnGwDefence} channel is a great place to discuss your teams or get some inspiration and help.\n\n` +
                    "Using 24 different troops for defence will get you 500 extra points each day you play.\n\n" +
                    `For your attack teams you can use any that you like, but you'll get extra points when you use troops with the colour of the day. There is a wealth of teams posted in the ${channelOnGwOffence} channel. Other things that will have a positive effect on your score are:\n` +
                    "- How many troops you have on your team when the battle is over\n" +
                    "- How many damage you did to the opponents troops (devour, lethal and true damage get lower points, AoE gets you more)\n" +
                    "- How many turns it to win your match, taking a 4/5 match extra turn will count as a new turn\n\n" +    
                    "That last bullet point can make devour, lethal and true damage troops still very useful. Also, the best score is when you win the match :sweat_smile: so if single colour is too tricky use your favourite team.\n\n" +
                    "Doing your matches on the day will get us a better chance to win the match that day and get all of us extra seals.";

        return message;
    },
    ListBotCommands: function(){
        
        message =   "**!about** - Info on how to add new functionality to 4EE-FAH\n" +
                    "**!guildwars** (or **!gw**) - Explain Guild Wars scoring\n" +
                    "**!honour** (or **!honor**) - Display today's honour recipient\n" +
                    "**!honourshow** (or **!honorshow**) - Add one or more guild member to the honour rota. Usage !honourshow John \"Jane Doe\"\n" +
                    "**!honourhide** (or **!honorhide**) - Remove one or more guild member to the honour rota. Usage !honourhide John \"Jane Doe\"\n" +
                    "**!honourweekly** (or **!honorweekly**) - Displays the current week's honour recipients by day\n" +
                    "**!members** - Lists the Guild members GoW account names\n" +
                    "**!taskpoll** - Creates a taskpoll for Epic tasks\n";
        
        return message;
    },
    TaskPoll: function(){
        return "Poll for next week: Which Epic task should we try to finish first?";
    },
    TaskPollReactions: function(){
        return Array(
            ":Mana_Blue_Water:",
            ":Mana_Brown_Earth:",
            ":Mana_Green_Nature:",
            ":Mana_Purple_Magic:",
            ":Mana_Red_Fire:",
            ":Mana_Yellow_Wind:");;
    }
}