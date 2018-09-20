const chai = require('chai');
const Web3 = require('web3');
const contracts = require('guesser-contracts');
const contract = require('truffle-contract');
const Guesser = require('../../../src/index');

const { expect } = chai;

describe('Owner Based Oracle Proxy', () => {
  let guesser;
  let web3;
  let accounts;
  let betHash;

  before(async () => {
    const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(web3Provider);
    accounts = await web3.eth.getAccounts();

    guesser = new Guesser(web3);
    await guesser.init();

    // Creating a bet
    const betKernelProxyAddress = await guesser.contracts.ERC20BetKernelProxy.address();
    const betPaymentsProxyAddress = await guesser.contracts.ERC20BetPaymentProxy.address();

    const dummyToken = contract(contracts.DummyToken);
    dummyToken.setProvider(web3.eth.currentProvider.host);
    const dummyTokenInstance = await dummyToken.new(
      'DummyToken',
      'DMT',
      10,
      10,
      { from: accounts[0] },
    );


    const betOracleProxyAddress = await guesser.contracts.ownerBasedOracle.address();
    const betTermsProxyAddress = await guesser.contracts.ownerBasedTermsProxy.address();
    // Here we should ask for the hash of the terms
    const betTermsHash = await guesser.contracts.ownerBasedTermsProxy.getTermsHash();
    await guesser.contracts.ownerBasedTermsProxy.setTermsHash(
      betTermsHash,
      accounts[0],
    );

    const title = web3.utils.asciiToHex('Hello world');

    betHash = await guesser.contracts.betRegistry.createBet(
      betKernelProxyAddress,
      betPaymentsProxyAddress,
      dummyTokenInstance.address,
      betOracleProxyAddress,
      betTermsProxyAddress,
      betTermsHash,
      title,
      accounts[0],
    );
  });

  it('should be the same address as the proxy registry registry', async () => {
    const proxyAddress = await guesser.contracts.ownerBasedOracle.address();

    expect(
      await guesser.contracts.proxyRegistry.addressInProxies(proxyAddress),
    ).to.be.equal(true);
  });

  it('should tell that the outcome is not ready', async () => {
    const outcomeReady = await guesser.contracts.ownerBasedOracle.outcomeReady(
        betHash,
        accounts[0],
    );
    expect(
      outcomeReady,
    ).to.be.equal(false);
  });

  it('should tell that the outcome is ready', async () => {
    await guesser.contracts.ownerBasedOracle.setOutcomeReady(
      betHash,
      true,
      accounts[0],
    );
    expect(
      await guesser.contracts.ownerBasedOracle.outcomeReady(
        betHash,
      ),
    ).to.be.equal(true);
  });

  it('shoud tell the outcome of the oracle', async () => {
    await guesser.contracts.ownerBasedOracle.setOutcome(
      betHash,
      1,
      accounts[0],
    );

    const outcome = await guesser.contracts.ownerBasedOracle.getOutcome(
        betHash,
    );
    expect(
      outcome.toNumber(),
    ).to.be.equal(1);
  });
});
