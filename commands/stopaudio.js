module.exports = function stopSound(bot, channel) {
    if(channel == undefined) return;
    for (var x in bot.voiceConnections) {
        if(bot.voiceConnections[x] == undefined) return;

        if(channel.id == bot.voiceConnections[x]['id']){
            bot.voiceConnections[x].stopPlaying();
        }
    }
}
