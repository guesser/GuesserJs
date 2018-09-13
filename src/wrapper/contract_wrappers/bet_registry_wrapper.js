var contracts = require('guesser-contracts');
const contract = require('truffle-contract');
// var provider = new Web3.providers.HttpProvider("http://localhost:8545");

class BetRegistry {
    constructor (web3) {
        this.web3 = web3;
        this.betRegistry = contract(contracts.BetRegistry);
        this.betRegistry.setProvider(this.web3.eth.currentProvider.host);
        this.instance = null; 
    }

    async init() {
        try {
            this.instance = await this.betRegistry.deployed();
            return;
        } catch (err) {
            throw err;
        }
    }

    async network() {
        console.log(await this.instance.address);
        return await this.web3.eth.net.getNetworkType();
    }
}

module.exports = BetRegistry;
