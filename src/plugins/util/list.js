module.exports = {
    name: 'list',
    description: 'Lists currently enabled commands',
    usage: 'list',
    regexp: 'list|commands',
    action: function(message) {
        var commands = global.commands;
        var response = 'Available commands:\n```';
        for (var i in commands) {
            response += ` - ${commands[i].name}\n`;
        }
        response += '```';
        message.author.sendMessage(response);
    }
}
