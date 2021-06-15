const { LootPoolBuilder, LootGroupBuilder } = require("../../banner");
const characters = require('./characters.json');
const weapons = require('./weapons.json');

const fourStarCharacters = new LootGroupBuilder()
    .setName('characters')
    .setProbabilty(0.5)
    .addItems(characters)
    .build();

const fourStarWeapons = new LootGroupBuilder()
    .setName('weapons')
    .setProbabilty(0.5)
    .addItems(weapons)
    .build();

const fourStarPool = new LootPoolBuilder()
    .setName('★★★★★')
    .setProbabilty(0.051)
    .setHardPity(10)
    .addLootGroup(fourStarWeapons)
    .addLootGroup(fourStarCharacters)
    .build();

module.exports = fourStarPool;
    