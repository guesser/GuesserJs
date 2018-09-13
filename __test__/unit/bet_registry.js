var chai = require('chai');
var expect = chai.expect;
var Guesser = require('../../src/index');
var Web3 = require('web3');

describe('Bet Registry testing', () => {
    var guesser;
    var web3;
    var accounts;

    before(async () => {
        const web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
        web3 = new Web3(web3Provider);
        accounts = await web3.eth.getAccounts();
        
        guesser = new Guesser(web3);
        await guesser.init();
    })

    it('should set the proper bet kernel', async () => {
        console.log(accounts[0]);
        let betKernelAddress = await guesser.contracts.betRegistry.betKernel();

        await guesser.contracts.betRegistry.setBetKernel(accounts[0], accounts[0]);
        expect(
            await guesser.contracts.betRegistry.betKernel()
        ).to.be.equal(accounts[0]);

        await guesser.contracts.betRegistry.setBetKernel(betKernelAddress, accounts[0]);
    });
});
