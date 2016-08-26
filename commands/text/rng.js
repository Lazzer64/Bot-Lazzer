var sendMessage = require('../sendmessage.js');

module.exports = {
    key: 'rng',
    regexp: [/^!rng\s*\d+\s*(-|(to))\s*\d+$/i],
    action: function(bot, message) {
        var fixed = message.content.replace(/ /g, '');
        fixed = fixed.replace('to', '-');
        fixed = fixed.substring(4);

        min = fixed.substring(0, fixed.indexOf('-'));
        max = fixed.substring(fixed.indexOf('-')+1);
        if(min >= max) return;

        var roll = Math.random() * (max - min);
        var result = Math.round(roll) + + min;
        var text = 'Random number from '+min+' to '+max+': \n--> '+result+' <--';

        sendMessage(bot, message.channel, text);
    }
}
