var Wrappers = require('./wrapper/index.js');

class Guesser {
    constructor(Web3) {
        this.web3 = Web3;
        this.contracts = new Wrappers(this.web3);
    }

    async init() {
        await this.contracts.init();
    }
}

module.exports = Guesser;
