var sendMessage = require('../sendmessage.js');
var eightball = require('../../resources/eightball.js');

module.exports = {
    key: 'eightball',
    regexp: [/^!((8)|(eight))ball$/i, /^bot.*lazzer.*\?$/i],
    action: function(bot, message) {

        var aborts = [ 'or', 'who', 'where', 'when', 'why', 'how', 'what' ]

            for (var x in aborts) {
                if(message.content.match(new RegExp('\s'+aborts[x])+'\s')){
                    sendMessage("I can only answer yes or no questions", message.channel);
                    return;
                }
            }

        var text = eightball.responses[Math.floor(Math.random()*eightball.responses.length)];
        sendMessage(bot, message.channel, text);
    }
}
