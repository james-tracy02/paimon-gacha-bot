const config = require("../../config.json");
const users = require('../service/user');

const diamondEmoji = ':diamond_shape_with_a_dot_inside:';

async function claim(message) {
    let user = await users.getUserByDiscordId(message.author.id);
    if (!user) {
        user = await users.makeNewUser(message.author.id);
    }
    const now = new Date();
    const timeUntilNextClaim = new Date(user.nextClaim) - now;
    if (timeUntilNextClaim > 0) {
        const minutesUntilNextClaim = Math.ceil(timeUntilNextClaim / (1000 *60));
        const hoursUntilNextClaim = Math.floor(minutesUntilNextClaim / 60);
        const timeInfo = hoursUntilNextClaim > 0 ? hoursUntilNextClaim + " hours" : minutesUntilNextClaim + " minutes";
        return message.channel.send(`Sorry ${message.author}, your next claim is not available yet!\n\nNext claim available in **${timeInfo}**.`);
    }
    const count = getRandomPrimos();
    user.primoGems += count;
    user.nextClaim = now.setDate(now.getDate() + 1);
    user.save();
    
    message.channel.send(`${diamondEmoji} Yay! ${message.author} just claimed ${count} primogems! ${diamondEmoji}`);
}

function getRandomPrimos() {
    return Math.floor(Math.random() * (config.maxPrimos - config.minPrimos) + config.minPrimos);
}

module.exports = claim;
