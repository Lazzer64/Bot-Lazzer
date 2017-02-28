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

module.exports.roll = roll = {
    name: 'roll',
    description: 'Rolls x dice with y faces',
    usage: 'roll [x]d[y]',
    regexp: /roll \d+d\d+$/,
    action: function(message) {
        var request = /(\d+)d(\d+)$/.exec(message.content);
        var x = parseInt(request[1]), y = parseInt(request[2]);
        var min = x, max = y*x
        var result = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log();
        message.channel.sendMessage(`<@${message.author.id}> ${x}d${y} ▸ \`${result}\``);
        
    }
}

module.exports.commands = [ echo, ping, roll ];
