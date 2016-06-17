var sendMessage = require('../sendmessage.js');

module.exports = {
    regexp: [/^((hi)|(hello))\s+.*bot.*lazzer/i],
    action: function(bot, message) {
        sendMessage(bot, message.channel, "Hello "+message.author.username+"!");
    }
}
