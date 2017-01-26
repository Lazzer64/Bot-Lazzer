module.exports.help = help = {
    name: 'help',
    description: 'Displays this help message',
    usage: 'help [command]',
    regexp: /^help(\s\S*)?$/,
    action: function(message) {
        var commands = global.commands;
        var option = message.content.substring('help '.length);
        if(option) {
            for (var i in commands) {
                if(commands[i].name === option) {
                    message.author.sendMessage(getHelp(commands[i]));
                    return;
                }
            }
            message.author.sendMessage(`Unknown command: ${option}`);
        }
        else {
            var response = '';
            for (var i in commands) {
                response += getHelp(commands[i])
            }
            message.author.sendMessage(response);
        }
    }
}

function getHelp(command) {
    help = `**${command.name}**`;
    help += '```';
    help += `Usage:${global.config.prefix}${command.usage}\n`;
    help += `${command.description}\n`;
    help += '```\n';
    return help;
}


module.exports.list = list = {
    name: 'list',
    description: 'Lists currently enabled commands',
    usage: 'list',
    regexp: /^((list)|(commands))$/,
    action: function(message) {
        var commands = global.commands;
        var response = 'Available commands:\n```';
        for (var i in commands) {
            response += ` - ${global.config.prefix}${commands[i].name}\n`;
        }
        response += '```';
        message.author.sendMessage(response);
    }
}

module.exports.commands = [ list, help ]
