module.exports = {
    name: 'Ping',
    description: 'Replies Pong',
    usage: '',
    regexp: 'ping',
    action: function(message) {
        message.channel.sendMessage('Pong');
    }
}
