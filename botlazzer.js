var Discord = require('discord.js');
var config = require('./config.js');
var cookie = require('./fortunecookie.js');
var eightball = require('./eightball.js');
var TOKEN = config.token;
var clientID = config.clientID;
var permissions = "3148800"; 
var soundDir = "sounds/";

console.log("Bot Lazzer, Bot Lazzer...");

var bot = new Discord.Client(); 
bot.loginWithToken(TOKEN);

bot.on('ready', function() {

    console.log("Use the following url to add Bot-Lazzer to your server:");
    console.log("https://discordapp.com/oauth2/authorize?client_id="+clientID+"&scope=bot&permissions="+permissions);

    bot.setPlayingGame("Lazzer Simulator 2016");
});

bot.on('message', function(message) {
    if(message.author == bot.user) return;
    for (var cmd in commands) {
        if(commands[cmd].matches(message)) {
            commands[cmd].action(message);
            return;
        }
    }

});

function sendMessage(text, channel){
    bot.sendMessage(channel, "```"+text+"```");
}

function playSound(channel, file, seek, volume) {
    if(channel == undefined) return;

    var options = {
        seek: seek, // in seconds
        volume: volume // 0.5 = half volume 2.0 = double volume
    }


    bot.joinVoiceChannel(channel, function() {
        bot.joinVoiceChannel(channel, function(error, connection){

            if(connection.playing) return;

            connection.playFile(soundDir+file, options, function(error, intent){ 
                intent.on("end", function(){
                    connection.destroy();
                }); 
            });

        });
    });
}

function Command(message, action) {
    this.regexp = message;
    this.matches = function(text) { 
        for (var msg in this.regexp) {
            if(text.content.match(new RegExp(this.regexp[msg]))) return true;
        }
        return false;
    };

    if(action == undefined){
        this.action = function(text){ console.log(text); };
    } else { 
        this.action = action; 
    }
} 


var commands = [

// Commands in this array will be checked whenever a message is sent
// Messages matching multiple regular expressions will execute only the command found earliest in the array

    new Command(['^!juicy$'], function(message){
        playSound(message.author.voiceChannel, 'juicy.m4a');
    }),

    new Command(['^!age+$'], function(message){
        playSound(message.author.voiceChannel, 'agee.m4a');
    }),

    new Command(['^!neverlucky$','^!nl$'], function(message){
        playSound(message.author.voiceChannel, 'neverlucky.m4a');
    }),

    new Command(['^!kappa$'], function(message){
        bot.sendFile(message.channel, "img/kappaFace.png");
    }),

    new Command(['^!fortune$'], function(message){
        var text = cookie.fortunes[Math.floor(Math.random()*cookie.fortunes.length)];
        sendMessage(text, message.channel);
    }),

    new Command(['^!((8)|(eight))ball$', '^bot.*lazzer.*?$'], function(message){
        var text = eightball.responses[Math.floor(Math.random()*eightball.responses.length)];
        sendMessage(text, message.channel);
    }),

    new Command(['^!rng\\s*\\d+\\s*(-|(to))\\s*\\d+$'], function(message){
        var fixed = message.content.replace(/ /g, '');
        fixed = fixed.replace('to', '-');
        fixed = fixed.substring(4);

        min = fixed.substring(0, fixed.indexOf('-'));
        max = fixed.substring(fixed.indexOf('-')+1);
        if(min >= max) return;

        var roll = Math.random() * (max - min);
        var result = Math.round(roll) + + min;

        var text = 'Random number from '+min+' to '+max+': \n--> '+result+' <--';
        sendMessage(text, message.channel);
    }),

    new Command(['^!help$'], function(message){
        var text = 
        "Help:\n" + 
        "\t- !agee: Brings bot lazzer into your channel for a cheerful \"agee\"\n" + 
        "\t- !eightball: Answeres a yes or no questions you give bot lazzer\n" +
        "\t- !fortune: Gives you a fortune cookie style fortune\n" +
        "\t- !kappa: Puts a kappa face in the chat.\n" +
        "\t- !neverlucky: Expresses your frustration with RNGesus.\n" +
        "\t- !rng [min] to [max]: Generates a random number between the min and max.\n" +
        "";

        sendMessage(text, message.author);
    })

    new Command(['((hi)|(hello)).*bot.*lazzer'], function(message){
        sendMessage("Hello "+message.author.username+"!", message.channel);
    }),

    new Command(['agee+'], function(message){
        sendMessage("ageee", message.channel);
    }),

]

