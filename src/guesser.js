var Web3 = require('web3');
var Wrappers = require('./wrapper/index.js');

class Guesser {
    constructor(blockchainHost) {
        /**
         * There are two ways we can access a web3 provider:
         * 1. We pass in the address of an Eth node, e.g. https://localhost:8545
         * or and infura API conection
         * 2. Web3 has been injected into the browser window (e.g. via Metamask.)
         */
        if (blockchainHost) {
            // If a host is specified, instantiate web3 with it as the provider.
            const web3Provider = new Web3.providers.HttpProvider(blockchainHost);
            this.web3 = new Web3(web3Provider);
        } else if (typeof Web3 !== 'undefined') {
            this.web3 = new Web3(Web3.currentProvider);
        } else {
            // Otherwise throw...
            throw new Error('Pass in the address of your blockchain node.');
        }

        this.contracts = new Wrappers(this.web3);
    }

    async init() {
        await this.contracts.init();
    }
}

module.exports = Guesser;
