# #!/bin/bash
GUESSER_JS_REPO=`pwd`

bash $GUESSER_JS_REPO/scripts/migrate_guesser_contracts.sh &

ganache-cli --networkId 70 --accounts 20 --mnemonic 'arm impose enemy alpha bird attend hunt host town sleep charge catalog'
