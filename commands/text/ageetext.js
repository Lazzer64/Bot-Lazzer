var sendMessage = require('../sendmessage.js');

module.exports = {
    regexp: [/agee+/i],
    action: function(bot, message) {
        sendMessage(bot, message.channel, "ageee");
    }
}
