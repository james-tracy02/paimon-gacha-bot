class LootGroup {
    constructor(name, isDefault, probability, pity, items, type) {
        this.name = name;
        this.isDefault = isDefault;
        this.probability = probability;
        this.pity = pity;
        this.items = items;
        this.type = type;
    }

    getProbability(user) {
        return this.probability || 0;
    }

    select(user) {
        const p = Math.floor(Math.random() * this.items.length);
        return { 
            name: this.items[p],
            type: this.type,
        };
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

    setType(type) {
        this.type = type;
        return this;
    }

    build() {
        return new LootGroup(
            this.name,
            this.isDefault,
            this.probability,
            this.pity,
            this.items,
            this.type,
        )
    }
}

module.exports = {
    LootGroup,
    LootGroupBuilder,
};