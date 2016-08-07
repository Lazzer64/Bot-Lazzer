var sendMessage = require('../sendmessage.js');

module.exports = {
    regexp: [/^!help$/i],
    action: function(bot, message) {
        var text =
        "Help:\n" + 
        "  -!agee: Brings bot lazzer into your channel for a cheerful \"agee\"\n" + 
        "  -!eightball: Answeres a yes or no questions you give bot lazzer\n" +
        "  -!fortune: Gives you a fortune cookie style fortune\n" +
        "  -!kappa: Puts a kappa face in the chat\n" +
        "  -!neverlucky: Expresses your frustration with RNGesus\n" +
        "  -!play [youtube link]:[start second]: Plays the audio for the given youtube video\n" +
        "  -!rng [min] to [max]: Generates a random number between the min and max\n" +
        "  -!shh: Stop the audio bot lazzer is playing\n" +
        "Fork me on github! https://github.com/Lazzer64/Bot-Lazzer\n" +
        "";
        sendMessage(bot, message.author, text);
    }
}
