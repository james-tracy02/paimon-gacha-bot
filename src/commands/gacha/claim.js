const { Command } = require('discord.js-commando');
const config = require("../../../config.json");
const users = require('../../database/user');
const time = require('../../utils/time');

const diamondEmoji = ':diamond_shape_with_a_dot_inside:';

function getRandomPrimos() {
    return Math.floor(Math.random() * (config.maxPrimos - config.minPrimos) + config.minPrimos);
}

module.exports = class ClaimCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'claim',
            group: 'gacha',
            memberName: 'claim',
            description: 'Claims your daily primogems (refreshes every 24 hours).',
        });
    }

    async run(message) {
        let user = await users.getUserByDiscordId(message.author.id);

        const now = new Date();
        const timeUntilNextClaim = new Date(user.nextClaim) - now;
        if (timeUntilNextClaim > 0) {
            const timeInfo = time.getTimeInfo(timeUntilNextClaim);
            return message.say(`Sorry ${message.author}, your next claim is not available yet!\n\nNext claim available in **${timeInfo}**.`);
        }
        const count = getRandomPrimos();
        user.primoGems += count;
        user.nextClaim = time.addHours(now, config.claimHours);
        await user.save();

        return message.say(`${diamondEmoji} Yay! ${message.author} just claimed **${count}** primogems! ${diamondEmoji}`);
    }
};
