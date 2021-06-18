const banners = require('./banners');
const pities = require('../database/pity');

async function makeWishes(user, quantity, bannerName) {
    const banner = banners[bannerName];
    const price = banner.price * quantity;

    if (user.primoGems < price) {
        return {
            error: {
                requiredGems: price,
            }
        };
    }
    user.primoGems -= price;
    await user.save();
    
    const pityList = await pities.getPityList(user.discordId, banner);
    const drops = [];
    for(let i = 0; i < quantity; i++) {
        drops.push(banner.wish(pityList));
    }
    await pities.savePityList(pityList);
    return { drops };
}

module.exports = {
    makeWishes
};
