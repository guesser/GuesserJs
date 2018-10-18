const Wrappers = require('./wrapper/index.js');
const Helper = require('./helper/index.js');

class Guesser {
  constructor(Web3) {
    this.web3 = Web3;
    this.contracts = new Wrappers(this.web3);
    this.helper = new Helper();
  }

  async init() {
    await this.contracts.init();
    await this.helper.init(this.contracts);
  }
}

module.exports = Guesser;
