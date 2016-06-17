module.exports = {
    regexp: [/!kappa$/i],
    action: function(bot, message) {
        bot.sendFile(message.channel, "./resources/img/kappaFace.png");
    }
}
