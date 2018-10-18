class CreateBasicMutual {
  constructor() {
    this.contracts = null;
  }
  async init(contracts) {
    this.contracts = contracts;
  }

  async createBasicMutual(paymentToken, timeTerms, title, sender) {
    return await this.contracts.betKernel.createBet(
      this.contracts.ERC20BetKernelProxy.address(),
      this.contracts.ERC20BetPaymentProxy.address(),
      paymentToken,
      this.contracts.ownerBasedOracle.address(),
      this.contracts.timeBasedTermsProxy.address(),
      timeTerms,
      title,
      sender
    );
  }
}
module.exports = CreateBasicMutual;
