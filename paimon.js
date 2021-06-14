const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();
const TOKEN = process.env.TOKEN;

const commands = require('./src/commands');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', message => {
    if (commands.isCommand(message)) {
        return commands.handleCommand(message);
    }
});

client.login(TOKEN);
