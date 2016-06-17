var playSound = require('../playsound.js');

module.exports = {
    regexp: [/^!neverlucky$/i,/^!nl$/i],
    action: function(bot, message) {
        playSound(bot, message, 'resources/sounds/neverlucky.m4a');
    }
}
