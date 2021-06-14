const users = require('../service/user');

async function primos(message) {
    const user = await users.getUserByDiscordId(message.author.id);
    if (!user) {
        user = await users.makeNewUser(message.author.id);
    }
    return message.channel.send(`${message.author} you have **${user.primoGems}** primo gems.`);
}

module.exports = primos;
