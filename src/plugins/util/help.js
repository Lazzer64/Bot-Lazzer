module.exports = {
    name: 'help',
    description: 'Displays this help message',
    usage: 'help [command]',
    regexp: 'help',
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
