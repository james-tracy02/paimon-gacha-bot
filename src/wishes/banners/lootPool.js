class LootPool {
    constructor(
        stars,
        isDefault,
        probability,
        softPity,
        hardPity,
        lootGroups,
        softPityProbability
    ) {
        this.stars = stars;
        this.isDefault = isDefault;
        this.probability = probability;
        this.softPity = softPity;
        this.hardPity = hardPity;
        this.lootGroups = lootGroups;
        this.softPityProbability = softPityProbability;
    }

    select(pity) {
        this.resetPity(pity);

        const p = Math.random();
        let cumulativeProbability = 0;
        let group;
        for (let i = 0; i < this.lootGroups.length; i++) {
            group = this.lootGroups[i];
            cumulativeProbability += group.getProbability(pity);
            if (p <= cumulativeProbability) {
                break;
            }
        }
        const item = group.select(pity);
        item.stars = this.stars;
        return item;
    }

    getProbability(pity) {
        if (pity.count >= this.hardPity) {
            return 1;
        }
        if (pity.count >= this.softPity) {
            return this.softPityProbability;
        }
        return this.probability || 1;
    }

    getPity(pityList) {
        return pityList.find(pity => pity.stars === this.stars);
    }

    resetPity(pity) {
        pity.count = 0;
    }
}

class LootPoolBuilder {
    constructor() {
        this.lootGroups = [];
    }

    setStars(stars) {
        this.stars = stars;
        return this;
    }

    setDefault() {
        this.isDefault = true;
        return this;
    }

    setProbabilty(probability) {
        this.probability = probability;
        return this;
    }

    setSoftPity(softPity) {
        this.softPity = softPity;
        return this;
    }

    setSoftPityProbability(softPityProbability) {
        this.softPityProbability = softPityProbability;
        return this;
    }

    setHardPity(hardPity) {
        this.hardPity = hardPity;
        return this;
    }

    addLootGroup(lootGroup) {
        this.lootGroups.push(lootGroup);
        return this;
    }

    build() {
        return new LootPool(
            this.stars,
            this.isDefault,
            this.probability,
            this.softPity,
            this.hardPity,
            this.lootGroups,
            this.softPityProbability,
        );
    }
}

module.exports = {
    LootPool,
    LootPoolBuilder,
};
