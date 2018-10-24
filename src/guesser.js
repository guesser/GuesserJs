import Wrappers from './wrapper/index';
import Helper from './helper/index';

export default class Guesser {
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
