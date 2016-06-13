#Bot-Lazzer
##Setup

* Install [Node.js and npm](https://nodejs.org/en/download/) and add it to your path
* Install [FFmpeg](https://ffmpeg.org/download.html) and add it to your path
* Clone the git repository `git clone https://github.com/Lazzer64/Bot-Lazzer.git && cd Bot-Lazzer`
* Install packages `npm install`
* Fill out \_config.js with the bot token and clientID
* Rename \_config.js to config.js
* Run Bot-Lazzer with `npm start`
* Add Bot-Lazzer to your channel using the link provided in the shell 

###Docker
* Clone the git repository `git clone https://github.com/Lazzer64/Bot-Lazzer.git && cd Bot-Lazzer`
* Fill out \_config.js with the bot token and clientID
* Rename \_config.js to config.js
* Build the docker image `docker build -t botlazzer .`
* Run Bot-Lazzer with docker `docker run -it botlazzer`
* Add Bot-Lazzer to your channel using the link provided in the shell 
