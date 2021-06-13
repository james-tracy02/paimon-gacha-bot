const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();
const TOKEN = process.env.TOKEN;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', message => {
    if (isCommand(message)) {
        return handleCommand(message);
    }
});

client.login(TOKEN);
