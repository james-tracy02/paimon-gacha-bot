class LootPool {
    constructor(
        stars,
        isDefault,
        probability,
        softPity,
        hardPity,
        lootGroups
    ) {
        this.stars = stars;
        this.isDefault = isDefault;
        this.probability = probability;
        this.softPity = softPity;
        this.hardPity = hardPity;
        this.lootGroups = lootGroups;
    }

    select(user) {
        const p = Math.random();
        let cumulativeProbability = 0;
        let group = this.lootGroups.find(group => {
            cumulativeProbability += group.getProbability(user);
            return p <= cumulativeProbability;
        });
        if(!group) {
            group = this.lootGroups.find(group => group.isDefault);
        }
        const item = group.select(user);
        item.stars = this.stars;
        return item;
    }

    getProbability(user) {
        return this.probability || 0;
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
        );
    }
}

module.exports = {
    LootPool,
    LootPoolBuilder,
};
