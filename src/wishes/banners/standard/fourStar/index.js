const { LootPoolBuilder } = require('../../lootPool');
const { LootGroupBuilder } = require('../../lootGroup');
const characters = require('./characters.json');
const weapons = require('./weapons.json');

const fourStarCharacters = new LootGroupBuilder()
    .setName('characters')
    .setType('character')
    .setProbabilty(0.5)
    .addItems(characters)
    .build();

const fourStarWeapons = new LootGroupBuilder()
    .setName('weapons')
    .setType('weapon')
    .setProbabilty(0.5)
    .addItems(weapons)
    .build();

const fourStarPool = new LootPoolBuilder()
    .setStars(4)
    .setProbabilty(0.051)
    .setSoftPity(8)
    .setSoftPityProbability(0.333)
    .setHardPity(10)
    .addLootGroup(fourStarWeapons)
    .addLootGroup(fourStarCharacters)
    .build();

module.exports = fourStarPool;
    