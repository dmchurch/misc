function Town(index) {
    this.index = index;
    this.varNames = [];
    this.progressVars = [];
    this.totalActionList = [];

    this.unlocked = function() {
        return townsUnlocked.includes(this.index);
    }

    this.expFromLevel = function(level) {
        return level * (level + 1) * 50;
    }

    this.getLevel = function(varName) {
        if (varName === "Survey") varName = varName + "Z" + this.index;
        return Math.floor((Math.sqrt(8 * this[`exp${varName}`] / 100 + 1) - 1) / 2);
    }

    this.restart = function() {
        for (let i = 0; i < this.varNames.length; i++) {
            const varName = this.varNames[i];
            this[`goodTemp${varName}`] = this[`good${varName}`];
            this[`lootFrom${varName}`] = 0;
            view.requestUpdate("updateRegular",{name: varName, index: this.index});
        }
    }

    // [snip]

    for (const action of totalActionList) {
        if (this.index === action.townNum) {
            this.totalActionList.push(action);
            if (action.type === "limited") this.createVars(action.varName);
            if (action.type === "progress") this.createProgressVars(action.varName);
            if (action.type === "multipart") this.createMultipartVars(action.varName);
        }
    }
};
