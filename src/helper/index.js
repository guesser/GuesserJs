import CreateBasicMutual from './helper_functions/create_basic_mutual';

export default class Helpers {
  constructor() {
    this.contracts = null;
    this.createBasicMutual = new CreateBasicMutual();
  }

  async init(contracts) {
    this.contract = contracts;
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
