const { expect } = require('chai');
const Web3 = require('web3');
let Guesser = require('../../build/').default;

Guesser = Guesser.default;

describe('Proxy Registry testing', () => {
  let guesser;
  let web3;
  let accounts;

  before(async () => {
    const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(web3Provider);
    accounts = await web3.eth.getAccounts();

    guesser = new Guesser(web3);
    await guesser.init();
  });

  it('should tell if the kernel proxy is allowed by default', async () => {
    const betKernelProxyAddress = await guesser.contracts.ERC20BetKernelProxy.address();

    expect(
      await guesser.contracts.proxyRegistry.addressInProxies(betKernelProxyAddress),
    ).to.be.equal(true);
  });

  it('should allow to change the proxies allowance', async () => {
    const betKernelProxyAddress = await guesser.contracts.ERC20BetKernelProxy.address();
    await guesser.contracts.proxyRegistry.setKernelProxiesAllowance(
      betKernelProxyAddress,
      false,
      accounts[0],
    );

    expect(
      await guesser.contracts.proxyRegistry.addressInProxies(betKernelProxyAddress),
    ).to.be.equal(false);

    await guesser.contracts.proxyRegistry.setKernelProxiesAllowance(
      betKernelProxyAddress,
      true,
      accounts[0],
    );
    expect(
      await guesser.contracts.proxyRegistry.addressInProxies(betKernelProxyAddress),
    ).to.be.equal(true);
  });
});
