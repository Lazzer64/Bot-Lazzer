var DiscordClient = require('discord.io');
var config = require('./config.js');
var TOKEN = config.token;
var clientID = config.clientID;
var permissions = "3148800"; 

console.log("Bot Lazzer, Bot Lazzer...");
console.log("Use the following url to add Bot-Lazzer to your server:");
console.log("https://discordapp.com/oauth2/authorize?client_id="+clientID+"&scope=bot&permissions="+permissions);

function Command(message, action) {
        this.regexp = new RegExp(message,'i');
        this.matches = function(text) { 
            return (text.match(this.regexp)); 
        };

        if(action == undefined){
            this.action = function(username, userID, channelID, message, rawEvent){ console.log(message); };
        } else { 
            this.action = action; 
        }
} 

function sendMessage(text, ID){
    bot.sendMessage({
        to: ID,
        message: '```'+text+'```'
    });
}

var commands = [

    // Commands in this array will be checked whenever a message is sent
    // Messages matching multiple regular expressions will execute only the command found earliest in the array

    new Command('^!help$', function(username, userID, channelID, message, rawEvent){
        var text = 
        "Help:\n" + 
        "\t- !kappa: Puts a kappa face in the chat.\n" +
        "\t- !rng [min] to [max]: Generates a random number between the min and max.\n";

    sendMessage(text, userID);
    }),

    new Command('((hi)|(hello)).*bot.*lazzer', function(username, userID, channelID, message, rawEvent){
        sendMessage("Hello "+username+"!", channelID);
    }),

    new Command('agee+', function(username, userID, channelID, message, rawEvent){
        sendMessage("ageee", channelID);
    }),

    new Command('^!kappa$', function(username, userID, channelID, message, rawEvent){
        bot.uploadFile({
            to: channelID,
            file: "img/kappaFace.png",
            filename: "kappa.png",
            message: ""
        });
    }),

    new Command('^!rng\\s*\\d+\\s*(-|(to))\\s*\\d+$', function(username, userID, channelID, message, rawEvent){
        var fixed = message.replace(/ /g, '');
        fixed = fixed.replace('to', '-');
        fixed = fixed.substring(4);

        min = fixed.substring(0, fixed.indexOf('-'));
        max = fixed.substring(fixed.indexOf('-')+1);
        if(min >= max) return;

        var roll = Math.random() * (max - min);
        var result = Math.round(roll) + + min;

        var text = 'Random number from '+min+' to '+max+': \n--> '+result+' <--';
        sendMessage(text, channelID);
    })
]

var bot = new DiscordClient({
    autorun: true,
    token: TOKEN,
});

bot.on('ready', function() {
    bot.connect();
    bot.setPresence({
        type: 0, // 0 = game, 1 = stream
        url: "",
        game: "Lazzer Simulator 2016"
    });
});

bot.on('message', function(username, userID, channelID, message, rawEvent) {
    if(userID == bot.id) return;
    for (var cmd in commands) {
        if(commands[cmd].matches(message)) {
            commands[cmd].action(username, userID, channelID, message, rawEvent);
            return;
        }
    }
    
});
