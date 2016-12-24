const fs = require('fs');
const sound_dir = `${__dirname}/sounds`
const dir = fs.readdirSync(`${__dirname}/sounds`);

var description = 'Plays a sound in the user\'s current voice channel';
var regexp = '^(';
var sounds = {};

// Load sound files from sound_dir
console.log('Loading sounds...');
for (var i in dir) {
    console.log(dir[i]);
    regexp += commandName(dir[i]);
    if (i < dir.length-1) regexp += '|';
}
regexp += ')$'
description += `\nsounds: ${commandName(dir)}`;

// return command name and map command name to sound file
function commandName(f) {
    if(Array.isArray(f)) return f.map(commandName);
    var name = f.substring(0,f.indexOf('\.'));
    sounds[name] = f;
    return name;
}

module.exports = {
    name: 'sound',
    description: description,
    usage: '[sound]',
    regexp: regexp,
    action: function(message) {
        if(message.channel.type === 'dm') return;
        var voiceChannel = message.member.voiceChannel;
        var sound = sounds[message.content];
        var channel_string = `${voiceChannel.guild} ${voiceChannel.name}${voiceChannel}`;

        if(voiceChannel) {

            if(voiceChannel.connection != undefined) {
                console.log(`A sound is already playing in ${channel_string}`);
                return;
            }

            voiceChannel.join().then( connection => {
                var sound_file = `${sound_dir}/${sound}`;
                var dispatcher = connection.playFile(sound_file);

                console.log(`Connected to voice channel: ${channel_string}`);
                console.log(`Playing ${sound_file}`);

                dispatcher.on('end', () => {
                    console.log('Done playing');
                    connection.disconnect();
                    voiceChannel.leave();
                });

            }).catch(console.error);
        }
    }
}
