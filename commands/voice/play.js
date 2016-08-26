var playYoutube = require('../playyoutube.js');

module.exports = {
    key: 'play',
    regexp: [/^!play \S*$/i],
    action: function(bot, message) {
         playYoutube(bot, message);
    }
}
