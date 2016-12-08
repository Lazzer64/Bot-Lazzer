const Discord = require('discord.js');
const fs      = require('fs');
const config  = require('../config.json');
const permissions = '3148800';

var COMMANDS = {};
function requireCommands(commands, path) {
    for (var i in commands) {
        if(commands[i] === 'enabled'){
            var cmd = `${path}/${i}.js`;
            COMMANDS[cmd] = require(cmd);
        }
        else if(commands[i] === '*') {
            var files = fs.readdirSync(`${path}/${i}`);
            for (var j in files) {
                var cmd = `${path}/${i}/${files[j]}`;
                COMMANDS[cmd] = require(cmd);
            }
        }
        else if(commands[i] != 'disabled') {
            requireCommands(commands[i], `${path}/${i}`)
        }
    }
}
requireCommands(config.plugins, `${__dirname}/plugins`);
global.config = config;
global.commands = COMMANDS;

const bot = new Discord.Client();
bot.on('ready', () => {
    console.log('Use the following url to add the bot to your server:');
    console.log(`https://discordapp.com/oauth2/authorize?client_id=${config.clientID}&scope=bot&permissions=${permissions}`);
    bot.user.setGame('Lazzer Simulator 2016');
});

bot.on('message', (message) => {
    var content = message.content;
    var author  = message.author;
    if(content.startsWith(config.prefix)) {

        content = content.substring(config.prefix.length);
        message.content = content;
        console.log(`${author.username}#${author.discriminator}: ${content}`);

        getCommand(content).action(message);
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
