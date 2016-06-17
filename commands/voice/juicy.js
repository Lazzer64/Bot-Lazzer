var playSound = require('../playsound.js');

module.exports = {
    regexp: [/^!juicy$/i],
    action: function(bot, message) {
        playSound(bot, message, 'resources/sounds/juicy.m4a');
    }
}
