const { Command } = require('discord.js-commando');
const users = require('../../database/user');
const wishService = require('../../wishes/wishService');

function makeStars(n) {
    let stars = '';
    for(let i = 0; i < n; i++) {
        stars += '★';
    }
    return stars;
}

function itemToString(item) {
    let s = `${makeStars(item.stars)} ${item.name}`;
    if (item.stars === 4) {
        s = `**${s}**`;
    }
    if (item.stars === 5) {
        s = `**__${s}__**`;
    }
    return s;
}

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
                    oneOf: ['standard'],
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
        drops.sort((a, b) => {
            if(a.stars === b.stars) {
                return (a.type === 'weapon' ? 1 : -1);
            }
            return b.stars - a.stars;
        });

        const dropsString = drops.map(itemToString).join('\n');
        console.log(dropsString);
        return message.say(`${message.author}\n${dropsString}`);
    }
};
