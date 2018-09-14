const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

class ERC20BetKernelProxy {
    constructor (web3) {
        this.web3 = web3;
        this.ERC20BetKernelProxy = contract(contracts.ERC20BetKernelProxy);
        this.ERC20BetKernelProxy.setProvider(this.web3.eth.currentProvider.host);
        this.instance = null; 
    }

    async init() {
        try {
            this.instance = await this.ERC20BetKernelProxy.deployed();
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
}

module.exports = ERC20BetKernelProxy;
