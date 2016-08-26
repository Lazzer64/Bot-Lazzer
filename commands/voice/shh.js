var stopAudio = require('../stopaudio.js');

module.exports = {
    key: 'shh',
    regexp: [/^!shh+$/i],
    action: function(bot, message) {
        stopAudio(bot, message.author.voiceChannel);
    }
}
