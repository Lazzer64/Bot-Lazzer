var Discord = require('discord.js');
var fs = require('fs');
var dm = require('directory-modules');
var config = require('./config.js');

var TOKEN = config.token;
var clientID = config.clientID;
var permissions = "3148800"; 

var bot = new Discord.Client(); 
var commands = []
.concat(dm.get_modules_sync(__dirname+'/commands/voice'))
.concat(dm.get_modules_sync(__dirname+'/commands/text'))
;

bot.on('ready', function() {

    console.log("Bot Lazzer, Bot Lazzer...");
    console.log("Use the following url to add Bot-Lazzer to your server:");
    console.log("https://discordapp.com/oauth2/authorize?client_id="+clientID+"&scope=bot&permissions="+permissions);

    bot.setPlayingGame("Lazzer Simulator 2016");
});

bot.on('message', function(message) {
    if(message.author == bot.user) return;
    var cmd = getCommand(message);
    if(cmd != undefined){
        if(canExecute(cmd)){
            console.log(message.author.username + "(" + message.author.id + "): \"" + message.content + "\"");
            cmd.action(bot, message);
        }
    }
});

function canExecute(command) {
    try {
        var data = fs.readFileSync('settings.json','utf8');
        var settings = JSON.parse(data)
        return settings[command.key].active;
    } catch (e) {
        console.log("Missing settings.json");
    }
}

function getCommand(message) {
    for (var cmd in commands) {
        var text = message.content;
        for (var x in commands[cmd].regexp) {
            if(text.match(commands[cmd].regexp[x])){
                return commands[cmd];
            }
        }
    }
}

bot.loginWithToken(TOKEN);
