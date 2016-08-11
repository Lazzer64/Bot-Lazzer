var playYoutube = require('../playyoutube.js');

module.exports = {
    regexp: [/^!play \S*$/i],
    permission: ['youtube'],
    action: function(bot, message) {
         playYoutube(bot, message);
    }
}
