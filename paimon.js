require('dotenv').config();

const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
    commandPrefix: '!p',
    owner: '265902301443653644',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['gacha', 'Gacha Related Commands'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'src', 'commands'));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('error', console.error);

client.login(process.env.TOKEN);
