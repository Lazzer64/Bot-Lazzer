module.exports = {
    name: 'echo',
    description: 'Echo the message of the user',
    usage: 'echo [message]',
    regexp: 'echo .\+',
    action: function(message) {
        var response = message.content.substring(this.name.length+1);
        message.channel.sendMessage(response);
    }
}
