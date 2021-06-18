class LootGroup {
    constructor(name, isDefault, probability, pity, items, type, isGuarantee) {
        this.name = name;
        this.isDefault = isDefault;
        this.probability = probability;
        this.pity = pity;
        this.items = items;
        this.type = type;
        this.isGuarantee = isGuarantee;
    }

    getProbability(pity) {
        if (pity.guarantee && this.isGuarantee) {
            return 1;
        }
        return this.probability || 1;
    }

    select(pity) {
        this.resetPity(pity);

        const p = Math.floor(Math.random() * this.items.length);
        return { 
            name: this.items[p],
            type: this.type,
        };
    }

    resetPity(pity) {
        pity.guarantee = !this.isGuarantee;
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

    setGuarantee() {
        this.isGuarantee = true;
    }

    build() {
        return new LootGroup(
            this.name,
            this.isDefault,
            this.probability,
            this.pity,
            this.items,
            this.type,
            this.isGuarantee,
        )
    }
}

module.exports = {
    LootGroup,
    LootGroupBuilder,
};