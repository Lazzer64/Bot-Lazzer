var http = require('http');
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
    var cmd = getCommand(message);
    if(cmd != undefined){
        console.log(message.author.username + "(" + message.author.id + "): \"" + message.content + "\"");
        cmd.action(message);
    }
});

function getCommand(message) {
    for (var cmd in commands) {
        if(commands[cmd].matches(message)) {
            return commands[cmd];
        }
    }
}

function playYoutube(message){
   
    var vidID = ''; 
    var seek = 0;
    // Deletes the initial ! command
    var temp = message.content.substring(message.content.search(" ")+1); 
    // Check to see if full link
    if(temp.match("youtube")) temp = temp.substring(temp.search('=')+1); 
    if(temp.search(":") != -1) {
        seek = temp.substring(temp.search(":")+1);
        temp = temp.substring(0,temp.search(":"));
    }
    vidID = temp;

    var options = {
        host: 'keepvid.com',
        path: '/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D'+vidID
    }

    http.request(options, function(resp){
        var str = "";
        resp.on('data', function(chunk){ str+=chunk; });
        resp.on('end', function(chunk){ 

            // Parses through keepvid http response to find m4a link
            var start = str.search("Audio Only\\).m4a");

            var x = str.substring(start);
            var x = x.substring(x.search("http"));

            var end = x.search("class=\"l\"");
            x = x.substring(0,end-1);

            playSound(message, x, seek, 0.5);
        });

    }).end();
}

function sendMessage(text, channel){
    bot.sendMessage(channel, "```"+text+"```");
}

function playSound(message, file, seek, volume) {
    if(message.author.voiceChannel == undefined) return;

    var options = {
        seek: seek, // in seconds
        volume: volume // 0.5 = half volume 2.0 = double volume
    }


    bot.joinVoiceChannel(message.author.voiceChannel, function(error, connection){

        if(connection.playing) {
            sendMessage("I can only play one sound at a time", message.channel);    
            return;
        }

        connection.playFile(file, options, function(error, intent){ 
            intent.on("end", function(){
                connection.destroy();
            }); 
        });

    });
}

function stopSound(channel) {
    if(channel == undefined) return;
    for (var x in bot.voiceConnections) {
        if(bot.voiceConnections[x] == undefined) return;

        if(channel.id == bot.voiceConnections[x]['id']){
            bot.voiceConnections[x].stopPlaying();
        }
    }
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


    new Command(['^!play \\S*$'], function(message){
        playYoutube(message);
    }),

    new Command(['^!shh+$'], function(message){
        stopSound(message.author.voiceChannel);
    }),

    new Command(['^!juicy$'], function(message){
        playSound(message, soundDir+'juicy.m4a');
    }),

    new Command(['^!age+$'], function(message){
        playSound(message, soundDir+'agee.m4a');
    }),

    new Command(['^!neverlucky$','^!nl$'], function(message){
        playSound(message, soundDir+'neverlucky.m4a');
    }),

    new Command(['^!kappa$'], function(message){
        bot.sendFile(message.channel, "img/kappaFace.png");
    }),

    new Command(['^!fortune$'], function(message){
        var text = cookie.fortunes[Math.floor(Math.random()*cookie.fortunes.length)];
        sendMessage(text, message.channel);
    }),

    new Command(['^!((8)|(eight))ball$', '^bot.*lazzer.*\\?$'], function(message){

        var aborts = [
            "or",
            "who",
            "where",
            "when",
            "why",
            "how",
            "what",
        ]

        for (var x in aborts) {
            if(message.content.match(new RegExp(aborts[x]))){
                sendMessage("I can only answer yes or no questions", message.channel);
                return;
            }
        }
        
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
        "\t- !kappa: Puts a kappa face in the chat\n" +
        "\t- !neverlucky: Expresses your frustration with RNGesus\n" +
        "\t- !play [youtube link]:[start second]: Plays the audio for the given youtube video\n" +
        "\t- !rng [min] to [max]: Generates a random number between the min and max\n" +
        "\t- !shh: Stop the audio bot lazzer is playing\n" +
        "";

        sendMessage(text, message.author);
    }),

    new Command(['((hi)|(hello)).*bot.*lazzer'], function(message){
        sendMessage("Hello "+message.author.username+"!", message.channel);
    }),

    new Command(['agee+'], function(message){
        sendMessage("ageee", message.channel);
    })

]

