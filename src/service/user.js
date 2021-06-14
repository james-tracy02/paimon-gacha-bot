const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define('user', {
    discordId: DataTypes.TEXT,
    primoGems: DataTypes.INTEGER,
    nextClaim: DataTypes.DATE,
});
User.removeAttribute('id');
sequelize.sync();

async function getUserByDiscordId(discordId) {
    return User.findOne({ where: { discordId }});
}

async function makeNewUser(discordId) {
    return User.create({ discordId, primoGems: 0, nextClaim: new Date() });
}

module.exports = {
    getUserByDiscordId,
    makeNewUser,
};
