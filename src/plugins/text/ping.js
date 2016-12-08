module.exports = {
    name: 'ping',
    description: 'Replies Pong',
    usage: 'ping',
    regexp: 'ping',
    action: function(message) {
        message.channel.sendMessage('Pong');
    }
}
