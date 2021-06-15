const { BannerBuilder } = require('../banner');
const fiveStar = require('./fiveStar');
const fourStar = require('./fourStar');
const threeStar = require('./threeStar');

module.exports = new BannerBuilder()
    .setName('standard')
    .setDisplayName('Standard Wish')
    .setPrice(0)
    .addLootPool(fiveStar)
    .addLootPool(fourStar)
    .addLootPool(threeStar)
    .build();