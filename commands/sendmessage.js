module.exports = function(bot, channel, text) {
    bot.sendMessage(channel, "```"+text+"```");
};
