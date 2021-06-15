const { Command } = require('discord.js-commando');
const users = require('../../database/user');

module.exports = class PrimosCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'primos',
            aliases: ['primogems'],
            group: 'gacha',
            memberName: 'primos',
            description: 'Shows your current number of primogems!',
        });
    }

    async run(message) {
        let user = await users.getUserByDiscordId(message.author.id);
        return message.say(`${message.author} you have **${user.primoGems}** primogems.`);
    }
};
