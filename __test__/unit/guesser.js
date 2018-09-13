var chai = require('chai');
var expect = chai.expect;
var Guesser = require('../../src/index');

describe('Guesser testing', () => {

    it('should get the proper web3 network', async () => {
        var guesser = new Guesser("http://localhost:8545");
        await guesser.init();
        expect(
            await guesser.contracts.betRegistry.network()
        ).to.be.equal("private");
    });
});
