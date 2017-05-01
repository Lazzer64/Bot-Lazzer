# Bot-Lazzer 2.0
A Discord bot written in Node.js using [discord.js](https://github.com/hydrabolt/discord.js/) designed to be easy to use,  extendible, and configurable.
## Setup and Execution
* Install [Node.js and npm](https://nodejs.org/en/download/)
* Clone the git repository `git clone https://github.com/Lazzer64/bot-lazzer.git && cd bot-lazzer`
* Install packages `npm install`
* Fill out config.json.example with the bot token and clientID
* Rename config.json.example to config.json
* Run Bot-Lazzer with `npm start`
* Add Bot-Lazzer to your channel using the link provided in the shell 

### Docker
* Coming Soon

## Configuration
Bot information found at: https://discordapp.com/developers/applications/me
```JavaScript
{
  "clientID": "11223355555" // Client/Application ID found under App Details,
  "token": "12Ab3C39dj18dh8" // Token found under App Bot User,
  "prefix": "!", // Symbol for commands to be prefixed by e.g. !help or /help
  "playing": "Lazzer Simulator 2017", // Game to display bot as playing (can be omitted)
  "plugins": [ "util", "text", "emoji" ] // List of enabled plugins found in src/plugins
}
```
