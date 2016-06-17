var playSound = require('../playsound.js');

module.exports = {
    regexp: [/^!agee+$/i],
    action: function(bot, message) {
        playSound(bot, message, 'resources/sounds/agee.m4a');
    }
}
