const config = require('../config.json');
const claim = require('./command/claim.js');
const primos = require('./command/primos');

const commands = {
    claim,
    primos,
}

function isCommand(message) {
    return message.content.startsWith(config.prefix);
}

function handleCommand(message) {
    const tokens = message.content.substring(config.prefix.length + 1).split(" ");
    const command = tokens[0];
    const args = tokens.slice(1);
    if (!command) {
        return errNoCommand(message);
    }
    const commandFunc = commands[command];
    if (!commandFunc) {
        return errUnrecognizedCommand(message, command);
    }
    return commandFunc(message, ...args);
}


function errNoCommand(message) {
    message.channel.send("No command specified.");
}

function errUnrecognizedCommand(message, command) {
    message.channel.send(`Unrecognized command \`${command}\`. Type \`!p help\` for a list of commands.`);
}

module.exports = {
    isCommand,
    handleCommand,
};
