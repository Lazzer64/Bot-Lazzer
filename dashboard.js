var fs = require('fs')
var dm = require('directory-modules');
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const RED   = '\033[01;31m';
const GREEN = '\033[01;32m';
const BLUE  = '\033[01;34m';
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
            settings[key] = {
                active: true,
                permission: []
            };
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
        var setting = settings[i];
        var color = RED;
        if (setting.active) color = GREEN;
        console.log(i,color+setting.active,BLUE,setting.permission,RESET);
    }
}

function toggleCommand(settings){
    clearScreen()
    printSettings(settings);
    rl.question('Toggle which command? (x to return) ',function(select) {
        if (select === 'x') {
            menu(settings);
            return;
        }
        if (settings[select] != undefined){
            settings[select].active = !settings[select].active;
            write(settings);
        } else {
            console.log(RED+"Invalid selection."+RESET);
        }
        toggleCommand(settings);
    });
}

function editPermissions(settings){
    clearScreen()
    printSettings(settings);
    rl.question('Set permissions of which command? (x to return) ',function(select) {
        if (select === 'x') {
            menu(settings);
            return;
        }
        if (settings[select] != undefined){
            settings[select].permission;
            rl.question('Permissions: ',function(input) {
                permissions = input.split(' ');
                if (permissions[0] === '') permissions = [];
                settings[select].permission = permissions;
                write(settings);
                editPermissions(settings);
            });
        } else {
            console.log(RED+"Invalid selection."+RESET);
            editPermissions(settings);
        }
    });
}

function clearScreen() {
    process.stdout.write('\u001B[2J\u001B[0;0f');
}

function write(settings) {
    fs.writeFileSync('settings.json',JSON.stringify(settings))
}

function menu(settings) {
    clearScreen()
    console.log('toggle');
    console.log('permission');
    rl.question('Open what? (x to quit) ',function(select) {
        switch (select) {
            case 'toggle':
                toggleCommand(settings);
                break;
            case 'permission':
                editPermissions(settings);
                break;
            case 'x':
                rl.close();
                return;
            default:
                menu(settings);
        }
    });
}

commands = getCommands(getSubdirs('commands'));
settings = getSettings(commands);
menu(settings);
