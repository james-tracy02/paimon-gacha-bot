const { Command } = require('discord.js-commando');
const pities = require('../../database/pity');
const banners = require('../../wishes/banners');

function printPities(pityList, isRateUp) {
    let results = [];
    pityList.sort((a, b) => b.stars - a.stars);
    pityList.forEach(pity => {
        if ([5, 4].includes(pity.stars)) {
            results.push(`${pity.stars}-Star: **${pity.count}** ${pity.guarantee && isRateUp ? '(Next is Guaranteed Rate-Up)' : ''}`);
        }
    });

    return results.join('\n');
}

module.exports = class PrimosCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pity',
            aliases: ['mypity'],
            group: 'gacha',
            memberName: 'pity',
            description: 'Shows your current pity on the given banner.',
            args: [
                {
                    key: 'banner',
                    prompt: 'Which banner would you like see pity info on (standard, character, or weapon)?',
                    type: 'string',
                    oneOf: ['standard'],
                },
            ]
        });
    }

    async run(message, { banner }) {
        const bannerObj = banners[banner];
        const pityList = await pities.getPityList(message.author.id, bannerObj);
        return message.say(`${message.author} your pity for the ${bannerObj.displayName} Banner is:\n` +
            `${printPities(pityList, banner.isRateUp)}`);
    }
};
