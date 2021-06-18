const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Pity = sequelize.define('pity', {
    discordId: DataTypes.TEXT,
    banner: DataTypes.TEXT,
    stars: DataTypes.INTEGER,
    gaurantee: DataTypes.BOOLEAN,
    count: DataTypes.INTEGER,
});

sequelize.sync();

async function getPityList(discordId, banner) {
    let pityList = await Pity.findAll({ where: { discordId, banner: banner.name }});
    banner.lootTable.forEach(pool => {
        let pity = pityList.find(pity => pity.stars === pool.stars);
        if (!pity) {
            pity = buildPity( discordId, banner.name, pool.stars);
            pityList.push(pity);
        }
    });

    return pityList;
}

function buildPity(discordId, banner, stars) {
    return Pity.build({ discordId, banner, stars, gaurantee: false, count: 0 });
}

async function savePityList(pityList) {
    for(let i = 0; i < pityList.length; i++) {
        console.log(`Stars: ${pityList[i].stars}, Count: ${pityList[i].count}`);
        await pityList[i].save();
    }
}

module.exports = {
    getPityList,
    buildPity,
    savePityList,
};
