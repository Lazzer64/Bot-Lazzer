const Discord = require('discord.js');
const config  = require('../config.json');
const permissions = '3148800';

var COMMANDS = {};
function requireCommands() {
    for (var i in config.plugins) {
        console.log(`Loading ${config.plugins[i]}...`);
        var plugin = require(`${__dirname}/plugins/${config.plugins[i]}/plugin.js`);
        for (var j in plugin.commands) {
            COMMANDS[`${config.plugins[i]}.${plugin.commands[j].name}`] = plugin.commands[j];
        }
    }
}
requireCommands();
global.config = config;
global.commands = COMMANDS;

const bot = new Discord.Client();
bot.on('ready', () => {
    console.log('Use the following url to add the bot to your server:');
    console.log(`https://discordapp.com/oauth2/authorize?client_id=${config.clientID}&scope=bot&permissions=${permissions}`);
    bot.user.setGame(config.playing);
});

bot.on('message', (message) => {
    var content = message.content;
    var author  = message.author;
    if(content.startsWith(config.prefix)) {

        content = content.substring(config.prefix.length);
        message.content = content;
        console.log(`${author.username}#${author.discriminator}: ${content}`);

        try {
            getCommand(content).action(message);
        } catch (err) {
            console.error(err);
        }
    }
});

function getCommand(text) {
    for (var i in COMMANDS) {
        if(text.match(COMMANDS[i].regexp)) {
            return COMMANDS[i];
        }
    }
    return {
        action: function(x) { console.log(`Invalid Command: ${text}`) }
    }
}

bot.login(config.token);
