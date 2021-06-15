class Banner {
    constructor(name, displayName, endDate, price, lootTable) {
        this.name = name;
        this.displayName = displayName;
        this.endDate = endDate;
        this.price = price;
        this.lootTable = lootTable;
    }

    wish(user) {
        const p = Math.random();
        let cumulativeProbability = 0;
        let pool = this.lootTable.find(pool => {
            cumulativeProbability += pool.getProbability(user);
            return p <= cumulativeProbability;
        });
        if(!pool) {
            pool = this.lootTable.find(pool => pool.isDefault);
        }
        const item = pool.select(user);
        return item;
    }
}

class BannerBuilder {
    constructor() {
        this.lootTable = [];
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setDisplayName(displayName) {
        this.displayName = displayName;
        return this;
    }

    setEndDate(endDate) {
        this.endDate = endDate;
        return this;
    }

    setPrice(price) {
        this.price = price;
        return this;
    }

    addLootPool(lootPool) {
        this.lootTable.push(lootPool);
        return this;
    }

    build() {
        return new Banner(
            this.name,
            this.displayName,
            this.endDate,
            this.price,
            this.lootTable,
        );
    }
}

class LootPool {
    constructor(
        name,
        isDefault,
        probability,
        softPity,
        hardPity,
        lootGroups
    ) {
        this.name = name;
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

    setName(name) {
        this.name = name;
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
            this.name,
            this.isDefault,
            this.probability,
            this.softPity,
            this.hardPity,
            this.lootGroups,
        );
    }
}

class LootGroup {
    constructor(name, isDefault, probability, pity, items) {
        this.name = name;
        this.isDefault = isDefault;
        this.probability = probability;
        this.pity = pity;
        this.items = items;
    }

    getProbability(user) {
        return this.probability || 0;
    }

    select(user) {
        const p = Math.floor(Math.random() * this.items.length);
        return this.items[p];
    }
}

class LootGroupBuilder {
    constructor() {
        this.items = [];
    }

    setName(name) {
        this.name = name;
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

    setPity(pity) {
        this.pity = pity;
        return this;
    }

    addItem(item) {
        this.items.push(item);
        return this;
    }

    addItems(items) {
        this.items = items;
        return this;
    }

    build() {
        return new LootGroup(
            this.name,
            this.isDefault,
            this.probability,
            this.pity,
            this.items,
        )
    }
}

module.exports = {
    Banner,
    BannerBuilder,
    LootPool,
    LootPoolBuilder,
    LootGroup,
    LootGroupBuilder,
}