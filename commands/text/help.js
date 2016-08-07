var sendMessage = require('../sendmessage.js');
var fs = require('fs')
var customs = JSON.parse(fs.readFileSync('custom.json').toString())

function customCommandsText(commands) {
    var keys = Object.keys(commands);
    text = "Custom Commands:";
    for(var key in keys){
        text += "\n  -!"+keys[key];
    }
    return text;
}

module.exports = {
    regexp: [/^!help$/i],
    action: function(bot, message) {
        var text =
        "Commands:\n" + 
        "  -!eightball: Answeres a yes or no questions you give bot lazzer\n" +
        "  -!fortune: Gives you a fortune cookie style fortune\n" +
        "  -!kappa: Puts a kappa face in the chat\n" +
        "  -!play [youtube link]:[start second]: Plays the audio for the given youtube video\n" +
        "  -!rng [min] to [max]: Generates a random number between the min and max\n" +
        "  -!shh: Stop the audio bot lazzer is playing\n" +
        customCommandsText(customs);
        sendMessage(bot, message.author, text);
    }
}
