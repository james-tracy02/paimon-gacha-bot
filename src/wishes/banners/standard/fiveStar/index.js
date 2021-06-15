const { LootPoolBuilder, LootGroupBuilder } = require("../../banner");
const characters = require('./characters.json');
const weapons = require('./weapons.json');

const fiveStarCharacters = new LootGroupBuilder()
    .setName('characters')
    .setProbabilty(0.5)
    .addItems(characters)
    .build();

const fiveStarWeapons = new LootGroupBuilder()
    .setName('weapons')
    .setProbabilty(0.5)
    .addItems(weapons)
    .build();

const fiveStarPool = new LootPoolBuilder()
    .setName('★★★★★')
    .setProbabilty(0.006)
    .setSoftPity(75)
    .setHardPity(90)
    .addLootGroup(fiveStarWeapons)
    .addLootGroup(fiveStarCharacters)
    .build();

module.exports = fiveStarPool;
    