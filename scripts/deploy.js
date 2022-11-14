// We require the Hardhat Runtime Environment explicitly here.
const hre = require('hardhat');

async function main() {
    // We get the contract to deploy.
    const BuyMeACoffee = await hre.ethers.getContractFactory('BuyMeACoffee');
    const buy_me_a_coffee = await BuyMeACoffee.deploy();

    await buy_me_a_coffee.deployed();

    console.log('BuyMeACoffee deployed to:', buy_me_a_coffee.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
