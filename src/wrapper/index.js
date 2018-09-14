// Core Contracts
var BetRegistry = require("./contract_wrappers/bet_registry_wrapper.js");

// Proxy Contracts
var ERC20BetKernelProxy = require("./contract_wrappers/bet_kernel_proxies/ERC20_bet_kernel_proxy.js");
var ERC721BetKernelProxy = require("./contract_wrappers/bet_kernel_proxies/ERC721_bet_kernel_proxy.js");
class Wrappers {
    constructor(web3) {
        this.web3 = web3;
        // Core Contracts
        this.betRegistry = new BetRegistry(web3);

        // Proxy Contracts
        this.ERC20BetKernelProxy = new ERC20BetKernelProxy(web3);
        this.ERC721BetKernelProxy = new ERC721BetKernelProxy(web3);
    }

    async init() {
        // Core Contracts
        await this.betRegistry.init();

        // Proxy Contracts
        await this.ERC20BetKernelProxy.init();
        await this.ERC721BetKernelProxy.init();
    }
}

module.exports = Wrappers;
