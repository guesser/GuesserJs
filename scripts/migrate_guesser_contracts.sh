#!/bin/bash
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NO_COLOR='\033[0m'

mkdir -p logs

GUESSER_JS_REPO=`pwd`
LOGS=$GUESSER_JS_REPO/logs/guesser_contract_migration.txt

GUESSER_SMART_CONTRACTS=$GUESSER_JS_REPO/node_modules/guesser-contracts

cd $GUESSER_SMART_CONTRACTS

sleep 3

echo -e "${CYAN}Installing Guesser contract deployment dependencies...${NO_COLOR}"
npm install >> $LOGS 2>&1
echo -e "\n"

echo -e "${CYAN}Running Guesser smart contract migrations...${NO_COLOR}"
npm run migrate >> $LOGS 2>&1
echo -e "\n"

echo -e "${GREEN}Dependency contract migrations complete, test chain is ready for use!${NO_COLOR}"
