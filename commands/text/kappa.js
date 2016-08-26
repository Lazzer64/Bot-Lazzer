module.exports = {
    key: 'kappa face',
    regexp: [/!kappa$/i],
    action: function(bot, message) {
        bot.sendFile(message.channel, "./resources/img/kappaFace.png");
    }
}
