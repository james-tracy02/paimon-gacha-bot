class Banner {
    constructor(name, displayName, endDate, price, lootTable) {
        this.name = name;
        this.displayName = displayName;
        this.endDate = endDate;
        this.price = price;
        this.lootTable = lootTable;
        this.lootTable.sort((a, b) => b.stars - a.stars);
    }

    wish(pityList) {
        this.incrementPity(pityList);
        // this.printPities(pityList);

        const p = Math.random();
        let cumulativeProbability = 0;
        let pool, pity;
        for (let i = 0; i < this.lootTable.length; i++) {
            pool = this.lootTable[i];
            pity = pool.getPity(pityList);
            cumulativeProbability += pool.getProbability(pity);
            if (p <= cumulativeProbability) {
                break;
            }
        }
        const item = pool.select(pity);
        return item;
    }

    incrementPity(pityList) {
        pityList.forEach(pity => pity.count += 1);
    }

    printPities(pityList) {
        pityList.forEach((pity) => {
            console.log(`Stars: ${pity.stars}, Count: ${pity.count}`);
        });
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
