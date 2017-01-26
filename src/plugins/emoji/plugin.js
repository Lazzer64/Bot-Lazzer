module.exports.bigger = bigger = {
    name: 'bigger emojis',
    description: 'Sends an enlarged version of a guild emoji',
    usage: '[emoji]',
    regexp: /^\s?<:\w+:\d+>$/,
    action: function(message) {
        var emojiID = message.content.replace(/\D/g, '');
        if(emojiID) {
            var emoji = message.guild.emojis.get(emojiID)
            if(emoji) message.channel.sendFile(emoji.url,'',`Sent by <@${message.author.id}>`);
        }
        message.delete();
    }
}

module.exports.commands = [ bigger ];
