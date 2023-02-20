// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log(
//     `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_SECOND = 365 * 24 * 60 * 60;
  const unlock_time = currentTimestampInSeconds + ONE_YEAR_SECOND;

  console.log('curr', currentTimestampInSeconds);
  console.log('one', ONE_YEAR_SECOND);
  console.log('un', unlock_time);

  const lockedAmount = hre.ethers.utils.parseEther('1');

  console.log('lock', lockedAmount);

  const MyTest = await hre.ethers.getContractFactory('MyTest');
  const myTest = await MyTest.deploy(unlock_time, { value: lockedAmount });
  myTest.deployed();
  console.log(`Contract contain 1 ETH & address" ${myTest.address}`)
  console.log('myTest', myTest);

}

main().catch((err) => {
  console.log('ini Error', err);
  process.exitCode = 1;
})