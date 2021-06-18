const { LootPoolBuilder } = require('../../lootPool');
const { LootGroupBuilder } = require('../../lootGroup');
const weapons = require('./weapons.json');

const threeStarWeapons = new LootGroupBuilder()
    .setName('weapons')
    .setType('weapon')
    .setDefault()
    .addItems(weapons)
    .build();

const threeStarPool = new LootPoolBuilder()
    .setStars(3)
    .setDefault()
    .addLootGroup(threeStarWeapons)
    .build();

module.exports = threeStarPool;
    