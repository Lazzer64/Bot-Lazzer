var playSound = require('../playsound.js');
var fs = require('fs');

var commands = JSON.parse(fs.readFileSync('custom.json').toString())

// concatenation of all user defined regexp
var regx = []
var keys = Object.keys(commands)
for(var key in keys){
    regx.push(new RegExp('^!'+keys[key]+'$','i'));
}

module.exports = {
    regexp: regx,
    action: function(bot, message) {
        // Strip the prefix character (!)
        cmd = message.content.substring(1).toLowerCase();
        sound = commands[cmd]
        var file = 'resources/sounds/'+sound;
        playSound(bot, message, file);
    }
}
