var DiscordClient = require('discord.io');
var config = require('./config.js');
var TOKEN = config.token;
var clientID = config.clientID;
var permissions = "3148800"; 
var soundDir = "sounds/";

console.log("Bot Lazzer, Bot Lazzer...");
console.log("Use the following url to add Bot-Lazzer to your server:");
console.log("https://discordapp.com/oauth2/authorize?client_id="+clientID+"&scope=bot&permissions="+permissions);

function Command(message, action) {
        this.regexp = message;
        this.matches = function(text) { 
            for (var msg in this.regexp) {
                if(text.match(new RegExp(this.regexp[msg]))) return true;
            }
            return false;
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

    new Command(['((hi)|(hello)).*bot.*lazzer'], function(username, userID, channelID, message, rawEvent){
        sendMessage("Hello "+username+"!", channelID);
    }),

    new Command(['^!shh+$'], function(username, userID, channelID, message, rawEvent){
        var voiceChannel = getVoiceChannel(username, userID, channelID, message, rawEvent)
        stopAudio(voiceChannel);
    }),

    new Command(['^!age+$'], function(username, userID, channelID, message, rawEvent){
        var voiceChannel = getVoiceChannel(username, userID, channelID, message, rawEvent)
        playSound(voiceChannel, soundDir+'agee.m4a');
    }),

    new Command(['^!neverlucky$','^!nl$'], function(username, userID, channelID, message, rawEvent){
        var voiceChannel = getVoiceChannel(username, userID, channelID, message, rawEvent)
        playSound(voiceChannel, soundDir+'neverlucky.m4a');
    }),

    new Command(['agee+'], function(username, userID, channelID, message, rawEvent){
        sendMessage("ageee", channelID);
    }),

    new Command(['^!kappa$'], function(username, userID, channelID, message, rawEvent){
        bot.uploadFile({
            to: channelID,
            file: "img/kappaFace.png",
            filename: "kappa.png",
            message: ""
        });
    }),

    new Command(['^!rng\\s*\\d+\\s*(-|(to))\\s*\\d+$'], function(username, userID, channelID, message, rawEvent){
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
    }),

    new Command(['^!help$'], function(username, userID, channelID, message, rawEvent){
        var text = 
        "Help:\n" + 
        "\t- !agee: Brings bot lazzer into your channel for a cheerful \"agee\"\n" + 
        "\t- !kappa: Puts a kappa face in the chat.\n" +
        "\t- !neverlucky: Expresses your frustration with RNGesus.\n" +
        "\t- !rng [min] to [max]: Generates a random number between the min and max.\n" +
        "";

    sendMessage(text, userID);
    })
]

function stopAudio(voiceChannelID) {
    bot.getAudioContext(voiceChannelID, function(stream){
        stream.stopAudioFile();
        bot.leaveVoiceChannel(voiceChannelID);
    });   
}

function playSound(voiceChannelID, file) {
    bot.joinVoiceChannel(voiceChannelID, function() {
        bot.getAudioContext(voiceChannelID, function(stream){
            stream.stopAudioFile();
            stream.playAudioFile(file);
            stream.once('fileEnd', function() {
                bot.leaveVoiceChannel(voiceChannelID);
            });
        });   
    });
}

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

function getVoiceChannel(username, userID, channelID, message, rawEvent) {

    var serverID = bot.serverFromChannel(channelID);

    var server = bot.servers[serverID].channels;
    for(var channel in server) {

        if(server[channel].type == 'voice') {

            var members = server[channel].members;
            for (var member in members) {

                if(members[member].user_id == userID) return channel;
            }
        }
    }
}

bot.on('message', function(username, userID, channelID, message, rawEvent) {
    if(userID == bot.id) return;
    for (var cmd in commands) {
        if(commands[cmd].matches(message)) {
            commands[cmd].action(username, userID, channelID, message, rawEvent);
            return;
        }
    }
    
});
