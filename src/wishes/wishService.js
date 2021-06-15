const banners = require('./banners');

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

    const drops = [];
    for(let i = 0; i < quantity; i++) {
        drops.push(banner.wish(user));
    }
    
    return { drops };
}

module.exports = {
    makeWishes
};
