// Require the HardHat Runtime Environment.
const hre = require('hardhat');

/**
 * Returns the Ethere balance of a given address
 *
 * @param {string} address
 * @return {Promise<string>}
 */
async function getBalance(address) {
    const balanceBigInt = await hre.waffle.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
}

/**
 * Logs the Ether balances for a list of addresses.
 *
 * @param {string[]} addresses
 */
async function printBalances(addresses) {
    let idx = 0;
    for (const adr of addresses) {
        const adrBalance = await getBalance(adr);
        console.log(`Address #${idx} balance: ${adrBalance}`);
        idx++;
    }
}

/**
 * Logs the memos stored on-chain from coffee purchases.
 *
 * @param {string[]} memos
 */
async function printMemos(memos) {
    for (const memo of memos) {
        const timestamp = memo.timestamp;
        const tipper = memo.name;
        const tipperAddress = memo.from;
        const message = memo.message;

        console.log(
            `At ${timestamp}, ${tipper}(${tipperAddress}) said: "${message}".`
        );
    }
}

async function main() {
    // Get example accounts.
    const [owner, tipper1, tipper2, tipper3] = await hre.ethers.getSigners();

    // Deploy contract.
    const BuyMeACoffee = await hre.ethers.getContractFactory('BuyMeACoffee');
    const buy_me_a_coffee = await BuyMeACoffee.deploy();
    await buy_me_a_coffee.deployed();
    console.log(
        'BuyMeACoffee Smart Contract deployed to: ',
        buy_me_a_coffee.address
    );

    // Check balances before the coffee purchase.
    const addresses = [owner.address, tipper1.address, buy_me_a_coffee.address];
    console.log('Starting 🚀...');
    await printBalances(addresses);

    // Buy the owner a few coffees.
    const tip = {
        value: hre.ethers.utils.parseEther('1'),
    };
    await buy_me_a_coffee
        .connect(tipper1)
        .buyCoffee('Jacob', 'Good idea !', tip);
    await buy_me_a_coffee
        .connect(tipper2)
        .buyCoffee('Allan', 'What an amazing project !', tip);
    await buy_me_a_coffee
        .connect(tipper3)
        .buyCoffee('Dan', 'Keep up the good job.', tip);

    // Check balances after coffee purchase.
    console.log('\nCoffee bought ☕️ !');
    await printBalances(addresses);

    // Withdraw funds.
    await buy_me_a_coffee.connect(owner).withdraw();

    // Check balance after withdraw.
    console.log('\nWithdraw done 💸 !');
    await printBalances(addresses);

    // Read all the memos left for the owner.
    console.log('Memos Received 📝 :');
    const memos = await buy_me_a_coffee.getMemos();
    await printMemos(memos);
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
