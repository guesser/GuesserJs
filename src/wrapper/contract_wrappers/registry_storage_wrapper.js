const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

class RegistryStorage {
    constructor (web3) {
        this.web3 = web3;
        this.registryStorage = contract(contracts.RegistryStorage);
        this.registryStorage.setProvider(this.web3.eth.currentProvider.host);
        this.instance = null; 
    }

    async init() {
        try {
            this.instance = await this.registryStorage.deployed();
            return;
        } catch (err) {
            throw err;
        }
    }

    async network() {
        console.log(await this.instance.address);
        return await this.web3.eth.net.getNetworkType();
    }

    /**
     * RegistryStorage
     */
    async betKernel() {
        return await this.instance.betKernel.call();
    }
}

module.exports = BetRegistry;
