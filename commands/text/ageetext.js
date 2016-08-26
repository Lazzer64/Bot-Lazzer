var sendMessage = require('../sendmessage.js');

module.exports = {
    key: 'agee text',
    regexp: [/agee+/i],
    action: function(bot, message) {
        sendMessage(bot, message.channel, "ageee");
    }
}
