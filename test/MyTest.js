const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs');
const { expect } = require('chai');
const { ethers } = require('hardhat');

// console.log('expe', expect);
// console.log('ethers', ethers);

describe("My Test", function () {
    async function runEveryTime() {
        const ONE_YEAR_IN_SECOND = 365 * 24 * 60 * 60;
        const ONE_GWEI = 1_000_000_000;
        const lockAmount = ONE_GWEI;
        const unlock_time = (await time.latest() + ONE_YEAR_IN_SECOND)

        // console.log(ONE_YEAR_IN_SECOND, ONE_GWEI)
        // console.log(unlock_time)

        //GET ACCOUNTS
        const [owner, otherAccount] = await ethers.getSigners();
        const MyTest = await ethers.getContractFactory("MyTest");
        const myTest = await MyTest.deploy(unlock_time, { value: lockAmount });
        // (await myTest).deployed

        return { myTest, unlock_time, lockAmount, owner, otherAccount }
    }


    describe("Deployment", function () {
        //CHECKING UNLOCKED TIME
        it("Should check unlocked time", async function () {
            const { myTest, unlock_time } = await loadFixture(runEveryTime);
            // console.log(myTest);
            // console.log(unlock_time);
            const ab = expect(await myTest.unlockedTime()).to.equal(unlock_time);
            // console.log(ab);
        })
        it("Should check Owner", async function () {
            const { myTest, owner } = await loadFixture(runEveryTime);
            expect(await myTest.owner()).to.equal(owner.address);
            // console.log(ab);
        });

        //CHECKING THE BALANCE
        it("Should receive and store the funds to MyTest", async function () {
            const { myTest, lockAmount } = await loadFixture(runEveryTime);
            const contractBalance = await ethers.provider.getBalance(myTest.address);
            // console.log(contractBalance.toNumber());
            // expect((contractBalance).to.equal(lockAmount))
            expect(await ethers.provider.getBalance(myTest.address)).to.equal(lockAmount);
        })

        //CONDITION CHECK
        it("Should fail if the unlocked is not in the future", async function () {
            const latestTime = await time.latest();
            // console.log(latestTime);
            const MyTest = await ethers.getContractFactory("MyTest");
            await expect(MyTest.deploy(latestTime, { value: 1 })).to.be.revertedWith(
                "Hanya bisa di unlock setelah batas waktu tiba")

        })
    })

    describe("Withdrawal", function () {
        describe("Validators", function () {
            //CHECK TIME FOR WITHDRAW
            it("Should revert with the right if called to soon", async () => {
                const { myTest } = await loadFixture(runEveryTime);
                await expect(myTest.withdraw()).to.be.revertedWith("Tunggu sampai Waktu Selesai")
            })
            it("Should revert the message for right owner", async () => {
                const { myTest, unlock_time, otherAccount } = await loadFixture(runEveryTime);
                await time.increaseTo(unlock_time);
                await expect(myTest.connect(otherAccount).withdraw()).to.be.revertedWith('Kamu Bukan Pemilik')
            })
            it("Should revert the message for owner", async () => {
                const { myTest, unlock_time } = await loadFixture(runEveryTime);
                await time.increaseTo(unlock_time);
                await expect(myTest.withdraw()).not.to.be.reverted
            })
        })

    })
    // CHECK FOR EVENTS
    describe('EVENTS', () => {
        it("Should emit the event on withdrawals", async function () {
            const { myTest, unlock_time, lockAmount } = await loadFixture(runEveryTime);
            await time.increase(unlock_time);
            await expect(myTest.withdraw()).to.emit(myTest, "Widthrawalq").withArgs(lockAmount, anyValue);
        })
    })
    // CHECK TRANSFER
    describe('TRANSFER', () => {
        it("Should Transfer fund Own", async function () {
            const { myTest, unlock_time, lockAmount, owner } = await loadFixture(runEveryTime);
            await time.increase(unlock_time);
            await expect(myTest.withdraw()).to.changeEtherBalances([owner, myTest], [lockAmount, -lockAmount])
        })
    })

    runEveryTime();
})

