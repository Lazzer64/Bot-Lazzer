var sendMessage = require('../sendmessage.js');
var cookie = require('../../resources/fortunecookie.js');

module.exports = {
    regexp: [/^!fortune$/i],
    action: function(bot, message) {
        var text = cookie.fortunes[Math.floor(Math.random()*cookie.fortunes.length)];
        sendMessage(bot, message.channel, text);
    }
}
