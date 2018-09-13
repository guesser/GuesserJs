var BetRegistry = require("./contract_wrappers/bet_registry_wrapper.js");

class Wrappers {
    constructor(web3) {
        this.web3 = web3;
        this.betRegistry = new BetRegistry(web3);
    }

    async init() {
        await this.betRegistry.init();
    }
}

module.exports = Wrappers;
