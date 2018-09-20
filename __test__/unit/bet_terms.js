const { expect } = require('chai');
const Web3 = require('web3');
const contracts = require('guesser-contracts');
const contract = require('truffle-contract');
const Guesser = require('../../src/index');

describe('Bet Terms testing', () => {
  let guesser;
  let web3;
  let accounts;
  let termsHash;

  before(async () => {
    const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(web3Provider);
    accounts = await web3.eth.getAccounts();

    guesser = new Guesser(web3);
    await guesser.init();

    termsHash = await guesser.contracts.ownerBasedTermsProxy.getTermsHash();

    await guesser.contracts.ownerBasedTermsProxy.setTermsHash(
      termsHash,
      accounts[0],
    );

    await guesser.contracts.ownerBasedTermsProxy.setBetRegistry(
      guesser.contracts.betRegistry.address(),
      accounts[0],
    );
  });

  it("should be in the participation period", async () => {
    expect(
      await guesser.contracts.betTerms.participationPeriod(
        guesser.contracts.ownerBasedTermsProxy.address(),
        termsHash,
      ),
    ).to.be.equal(true);
  });

  it("should let the owner change to any state", async () => {
    await guesser.contracts.betTerms.changePeriod(
      guesser.contracts.ownerBasedTermsProxy.address(),
      termsHash,
      1,
      accounts[0],
    );

    expect(
      await guesser.contracts.betTerms.participationPeriod(
        guesser.contracts.ownerBasedTermsProxy.address(),
        termsHash,
      ),
    ).to.be.equal(false);

    expect(
      await guesser.contracts.betTerms.waitingPeriod(
        guesser.contracts.ownerBasedTermsProxy.address(),
        termsHash,
      ),
    ).to.be.equal(true);

    await guesser.contracts.betTerms.changePeriod(
      guesser.contracts.ownerBasedTermsProxy.address(),
      termsHash,
      2,
      accounts[0],
    );
    expect(
      await guesser.contracts.betTerms.waitingPeriod(
        guesser.contracts.ownerBasedTermsProxy.address(),
        termsHash,
      ),
    ).to.be.equal(false);
    expect(
      await guesser.contracts.betTerms.retrievingPeriod(
        guesser.contracts.ownerBasedTermsProxy.address(),
        termsHash,
      ),
    ).to.be.equal(true);

    await guesser.contracts.betTerms.changePeriod(
      guesser.contracts.ownerBasedTermsProxy.address(),
      termsHash,
      3,
      accounts[0],
    );
    expect(
      await guesser.contracts.betTerms.retrievingPeriod(
        guesser.contracts.ownerBasedTermsProxy.address(),
        termsHash,
      ),
    ).to.be.equal(false);
    expect(
      await guesser.contracts.betTerms.finishedPeriod(
        guesser.contracts.ownerBasedTermsProxy.address(),
        termsHash,
      ),
    ).to.be.equal(true);
  });
});
