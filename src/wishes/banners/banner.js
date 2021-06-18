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

module.exports = {
    Banner,
    BannerBuilder,
};
