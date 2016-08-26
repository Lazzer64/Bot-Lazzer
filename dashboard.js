var fs = require('fs')
var dm = require('directory-modules');
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const RED   = '\033[01;31m';
const GREEN = '\033[01;32m';
const RESET = '\033[00m';

function getSubdirs(dir) {
    dirs = fs.readdirSync(dir);
    dirs = dirs.map(function(x){return dir+'/'+x});
    dirs = dirs.filter(function(x){return fs.lstatSync(x).isDirectory()});
    return dirs;
}

function getCommands(dirs) {
    commands = [];
    for (var i in dirs) {
        cmds = dm.get_modules_sync(__dirname+'/'+dirs[i])
        commands = commands.concat(cmds);
    }
    return commands;
}

function initSettings(commands, oldSettings) {
    settings = {};
    for (var i in commands) {
        var key = commands[i].key;
        if (oldSettings[key] != undefined){
            settings[key] = oldSettings[key];
        } else {
            settings[key] = {active: true};
        }
    }
    return settings;
}

function getSettings(commands) {
    var file = 'settings.json';
    try {
        var data = fs.readFileSync(file,'utf8');
        var settings = JSON.parse(data);
        settings = initSettings(commands,settings);
        console.log('Loading "settings.json"');
        return settings;
    } catch (e) {
        console.log('No settings file found creating "settings.json"');
        return initSettings(commands,{});
    }
}

function printSettings(settings) {
    for (var i in settings) {
        var color = RED;
        if (settings[i].active) color = GREEN;
        console.log(i,color+settings[i].active,RESET);
    }
}

function toggle(settings){
    printSettings(settings);
    rl.question('Toggle which command? (x to quit) ',function(select) {
        if (select === 'x') {
            rl.close();
            close(settings);
            return;
        }
        if (settings[select] != undefined){
            settings[select].active = !settings[select].active;
        } else {
            console.log(RED+"Invalid selection."+RESET);
        }
        toggle(settings);
    });
}

function close(settings) {
    fs.writeFileSync('settings.json',JSON.stringify(settings))
}

commands = getCommands(getSubdirs('commands'));
settings = getSettings(commands);
toggle(settings);
