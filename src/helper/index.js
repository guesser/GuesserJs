const CreateBasicMutual = require('./helper_functions/create_basic_mutual.js');

class Helpers {
  constructor() {
    this.createBasicMutual = new CreateBasicMutual();
  }

  async init(contracts) {
    this.createBasicMutual.init(contracts);
  }

  async createBasicMutualBet(paymentToken, timeTerms, title, sender) {
    return this.createBasicMutual.createBasicMutual(
      paymentToken,
      timeTerms,
      title,
      sender,
    );
  }
}
module.exports = Helpers;
