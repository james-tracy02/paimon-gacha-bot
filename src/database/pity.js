const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Pity = sequelize.define('pity', {
    discordId: DataTypes.TEXT,
    bannerName: DataTypes.TEXT,
    poolName: DataTypes.TEXT,
    groupName: DataTypes.TEXT,
    count: DataTypes.INTEGER,
});

Pity.removeAttribute('id');
sequelize.sync();

async function getPityListByDiscordId(discordId) {
    let pityList = await Pity.findAll({ where: { discordId }});
    return pityList;
}

async function createPity(discordId, bannerName, poolName, groupName, count) {
    return Pity.create({ discordId, bannerName, poolName, groupName, count });
}

module.exports = {
    getPityListByDiscordId,
    createPity,
};
