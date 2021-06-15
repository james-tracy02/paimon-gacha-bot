const { Command } = require('discord.js-commando');
const users = require('../../database/user');
const wishService = require('../../wishes/wishService');

module.exports = class WishCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'wish',
            group: 'gacha',
            memberName: 'wish',
            description: 'Make a wish on the specifed banner.',
            args: [
                {
                    key: 'amount',
                    prompt: 'How many wishes would you like to make (1 or 10)?',
                    type: 'integer',
                    oneOf: [1, 10],
                },
                {
                    key: 'banner',
                    prompt: 'Which banner would you like to wish on (standard, character, or weapon)?',
                    type: 'string',
                    oneOf: ['standard', 'character', 'weapon'],
                },
            ]
        });
    }

    async run(message, { amount, banner }) {
        let user = await users.getUserByDiscordId(message.author.id);
        const { drops, error } = await wishService.makeWishes(user, amount, banner);
        if (error) {
            return message.say(`Sorry ${message.author}, you do not have enough primogems to make that wish.\n\n` + 
                `Required balance: **${error.requiredGems}**. Current balance: **${user.primoGems}**.`);
        }
        const list = drops.join(`\n`);
        return message.say(`${message.author}\n\n\`${list}\``);
    }
};
