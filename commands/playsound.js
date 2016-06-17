var sendMessage = require('./sendmessage.js');

module.exports = function playSound(bot, message, file, seek, volume) {
    if(message.author.voiceChannel == undefined) return;

    var options = {
        seek: seek, // in seconds
        volume: volume // 0.5 = half volume 2.0 = double volume
    }


    bot.joinVoiceChannel(message.author.voiceChannel, function(error, connection){

        if(connection.playing) {
            sendMessage(bot, message.channel, "I can only play one sound at a time");
            return;
        }

        connection.playFile(file, options, function(error, intent){ 
            intent.on("end", function(){
                connection.destroy();
            }); 
        });

    });
}
