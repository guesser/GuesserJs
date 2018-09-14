const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

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
        } catch (err) {
            throw err;
        }
    }

    async network() {
        return await this.web3.eth.net.getNetworkType();
    }

    async address() {
        return await this.instance.address;
    }

    /******************
     * RegistryStorage
     *****************/

    // Getters
    async betKernel() {
        return await this.instance.betKernel.call();
    }
    async betPayments() {
        return await this.instance.betPayments.call();
    }
    async betOracle() {
        return await this.instance.betOracle.call();
    }
    async betTerms() {
        return await this.instance.betTerms.call();
    }
    async proxyRegistry() {
        return await this.instance.proxyRegistry.call();
    }

    // Setters
    async setBetKernel(address, sender) {
        try {
            await this.instance.setBetKernel(
                address,
                {from: sender}
            );
        } catch (err) {
            throw err;
        }
    }
    async setBetPayments(address, sender) {
        try {
            await this.instance.setBetPayments(
                address,
                {from: sender}
            );
        } catch (err) {
            throw err;
        }
    }
    async setBetOracle(address, sender) {
        try {
            await this.instance.setBetOracle(
                address,
                {from: sender}
            );
        } catch (err) {
            throw err;
        }
    }
    async setBetTerms(address, sender) {
        try {
            await this.instance.setBetTerms(
                address,
                {from: sender}
            );
        } catch (err) {
            throw err;
        }
    }
    /******************
     * Bet Registry
     *****************/

    // Getters

}

module.exports = BetRegistry;
