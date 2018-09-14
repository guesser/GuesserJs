var chai = require('chai');
var expect = chai.expect;
var Guesser = require('../../../src/index');
var Web3 = require('web3');

describe('ERC721 Bet Kernel Proxy testing', () => {
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

    it('should be the same address as the proxy registry registry', async () => {
        console.log(
            await guesser.contracts.ERC721BetKernelProxy.address()
        );
    });
});
