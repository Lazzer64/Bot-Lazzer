var sendMessage = require('../sendmessage.js');

module.exports = {
    regexp: [/^!help$/i],
    action: function(bot, message) {
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
        sendMessage(bot, message.author, text);
    }
}
