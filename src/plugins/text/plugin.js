module.exports.ping = ping = {
    name: 'ping',
    description: 'Replies Pong',
    usage: 'ping',
    regexp: /^ping$/,
    action: function(message) {
        message.channel.sendMessage('pong :ping_pong:');
    }
}

module.exports.echo = echo = {
    name: 'echo',
    description: 'Echo the message of the user',
    usage: 'echo [message]',
    regexp: /^echo\s+\S+/,
    action: function(message) {
        var response = message.content.substring(this.name.length+1);
        message.channel.sendMessage(response);
    }
}

module.exports.commands = [ echo, ping ];
