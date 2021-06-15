const { LootPoolBuilder, LootGroupBuilder } = require("../../banner");
const weapons = require('./weapons.json');

const threeStarWeapons = new LootGroupBuilder()
    .setName('weapons')
    .setDefault()
    .addItems(weapons)
    .build();

const threeStarPool = new LootPoolBuilder()
    .setName('★★★')
    .setDefault()
    .addLootGroup(threeStarWeapons)
    .build();

module.exports = threeStarPool;
    