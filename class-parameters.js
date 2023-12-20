class Town(index) {
    index = index;
    varNames = [];
    progressVars = [];
    totalActionList = [];

    unlocked() {
        return townsUnlocked.includes(this.index);
    }

    expFromLevel(level) {
        return level * (level + 1) * 50;
    }

    getLevel(varName) {
        if (varName === "Survey") varName = varName + "Z" + this.index;
        return Math.floor((Math.sqrt(8 * this[`exp${varName}`] / 100 + 1) - 1) / 2);
    }

    restart() {
        for (let i = 0; i < this.varNames.length; i++) {
            const varName = this.varNames[i];
            this[`goodTemp${varName}`] = this[`good${varName}`];
            this[`lootFrom${varName}`] = 0;
            view.requestUpdate("updateRegular",{name: varName, index: this.index});
        }
    }

    // [snip]

    constructor {
        for (const action of totalActionList) {
            if (this.index === action.townNum) {
                this.totalActionList.push(action);
                if (action.type === "limited") this.createVars(action.varName);
                if (action.type === "progress") this.createProgressVars(action.varName);
                if (action.type === "multipart") this.createMultipartVars(action.varName);
            }
        }
    }
};
