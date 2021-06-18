const { LootPoolBuilder } = require('../../lootPool');
const { LootGroupBuilder } = require('../../lootGroup');
const characters = require('./characters.json');
const weapons = require('./weapons.json');

const fiveStarCharacters = new LootGroupBuilder()
    .setName('characters')
    .setType('character')
    .setProbabilty(0.5)
    .addItems(characters)
    .build();

const fiveStarWeapons = new LootGroupBuilder()
    .setName('weapons')
    .setType('weapon')
    .setProbabilty(0.5)
    .addItems(weapons)
    .build();

const fiveStarPool = new LootPoolBuilder()
    .setStars(5)
    .setProbabilty(0.006)
    .setSoftPity(75)
    .setSoftPityProbability(0.333)
    .setHardPity(90)
    .addLootGroup(fiveStarWeapons)
    .addLootGroup(fiveStarCharacters)
    .build();

module.exports = fiveStarPool;
    