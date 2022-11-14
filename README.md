# BuyMeACoffee solidity contract

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Install dependencies with `npm install`.

Set up by creating a `.env` file, and filling out these variables:

```
GOERLI_URL="your Alchemy RPC URL"
GOERLI_API_KEY="your Alchemy API key"
PRIVATE_KEY="your wallet private key"
```

## !!! Be very careful with exporting your private key !!!

You can get your Private Key from MetaMask [like this](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
If you have any questions or concerns about this, please find someone you trust to sanity check you!

## !!! Be very careful with exporting your private key !!!

Deploy your contract with:

```
npx hardhat run scripts/deploy.js
```

Run an example buy coffee flow locally with:

```
npx hardhat run scripts/buy-coffee.js
```
