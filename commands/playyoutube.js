var http = require('http');
var playSound = require('./playsound.js');
var sendMessage = require('./sendmessage.js');

module.exports = function playYoutube(bot, message){
   
    var vidID = ''; 
    var seek = 0;
    // Deletes the initial ! command
    var temp = message.content.substring(message.content.search(" ")+1); 
    // Check to see if full link
    if(temp.match("youtube")) temp = temp.substring(temp.search('=')+1); 
    if(temp.search(":") != -1) {
        seek = temp.substring(temp.search(":")+1);
        temp = temp.substring(0,temp.search(":"));
    }
    vidID = temp;

    var options = {
        host: 'keepvid.com',
        path: '/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D'+vidID
    }

    http.request(options, function(resp){
        var str = "";
        resp.on('data', function(chunk){ str+=chunk; });
        resp.on('end', function(chunk){ 

            // Parses through keepvid http response to find m4a link
            var start = str.search("Audio Only\\).m4a");

            var x = str.substring(start);
            var x = x.substring(x.search("http"));

            var end = x.search("class=\"l\"");
            x = x.substring(0,end-1);

            playSound(bot, message, x, seek, 0.5);
        });

    }).end();
}
