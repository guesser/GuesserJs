// require("./utils/network.js");
// require("./guesser.js");
require('./bet_registry.js');
require('./proxy_registry.js');
require('./registry_setter.js');

// Proxies
require('./bet_kernel_proxies/ERC20_bet_kernel_proxy.js');
require('./bet_kernel_proxies/ERC721_bet_kernel_proxy.js');
require('./bet_payments_proxies/ERC20_bet_payment_proxy.js');
require('./bet_payments_proxies/ERC721_bet_payment_proxy.js');
require('./bet_oracle_proxies/bet_owner_based_oracle.js');
require('./bet_oracle_proxies/owner_based_oracle.js');
require('./bet_terms_proxies/owner_based_terms_proxy.js');
