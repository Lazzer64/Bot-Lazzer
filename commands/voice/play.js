var playYoutube = require('../playyoutube.js');

module.exports = {
    regexp: [/^!play \S*$/i],
    action: function(bot, message) {
         playYoutube(bot, message);
    }
}
