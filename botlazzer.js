var Discord = require('discord.js');
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
    if(message.author === bot.user) return;
    var cmd = getCommand(message);
    if(cmd === undefined) return;

    messageInfo = (message.author.username+"("+message.author.id+"): \""+message.content+"\"");

    if(canExectue(message.author, message.server, cmd)){
        cmd.action(bot, message);
        console.log(messageInfo);
    }
    else {
        console.log('[DENIED]',messageInfo);
        bot.sendMessage(message.channel,'```You do not have permission to do that```');
    } 
});

function canExectue(user, server, cmd) {
    if(timedOut(user)) return false;
    if(!hasPermission(user,server,cmd)) return false;
    return true;
}

var timeout = [];
function timedOut(user) {
    return timeout.indexOf(user.id) != -1;
}

function hasPermission(user, server, cmd) {
    if(cmd.permission === undefined) return true;

    roles = server.rolesOfUser(user);
    for (var i in roles) {
        if(cmd.permission.indexOf(roles[i].name) != -1){
            return true;
        }
    }
    return false;
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
