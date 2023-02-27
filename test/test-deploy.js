const { ethers } = require("hardhat");
const { assert } = require("chai");

describe("SimpleStorage", function () {
    let simpleStorageFactory;
    let simpleStorage;

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with number 0", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";

        assert.equal(currentValue.toString(), expectedValue);
    });

    it("Should update when store is called", async function () {
        const expectedValue = "9";
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.retrieve();

        assert.equal(currentValue.toString(), expectedValue);
    });

    it("Should work correctly with the people struct and array", async function () {
        const expectedPersonName = "John";
        const expectedFavoriteNumber = "33";
        const transactionResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedFavoriteNumber
        );
        await transactionResponse.wait(1);
        const { favoriteNumber, name } = await simpleStorage.people(0);

        assert.equal(name, expectedPersonName);
        assert.equal(favoriteNumber, expectedFavoriteNumber);
    });
});
