'use strict';

const { MongoClient } = require('mongodb');
const assert = require('assert');
const fs = require('file-system');


const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
});

// // Get companies in MongoDB dragonRiders collection companies

// const allCompanies = JSON.parse(fs.readFileSync('data/fixedCompanies.json'));
// // console.log('allCompanies', allCompanies);
// const getCompanies = async () => {
//     try {
//         await client.connect();
//         console.log('connected!');

//         const db = client.db('dragonRiders');


//         let result = await db.collection('companies').insertMany(allCompanies);

//         assert.equal(allCompanies.length, result.insertedCount);
//         console.log('success');


//     }
//     catch (err) {
//         console.log(err.stack);
//     }
//     // close the connection to the database server
//     client.close();
//     console.log('disconnected!');

// };

// // Get items in MongoDB dragonRiders collection items

// const allItems = JSON.parse(fs.readFileSync('data/fixedItems.json'));
// // console.log('allItems', allItems);
// const getItems = async () => {
//     try {
//         await client.connect();
//         console.log('connected!');

//         const db = client.db('dragonRiders');


//         let result = await db.collection('items').insertMany(allItems);


//         console.log('success');


//     }
//     catch (err) {


//         console.log(err.stack);
//     }
//     // close the connection to the database server
//     client.close();
//     console.log('disconnected!');

// };

// Get farmerBasket in MongoDB jloupsoloproject collection farmerbasket

const allFarmerBasket = JSON.parse(fs.readFileSync('./data/farmerBasket.json'));
console.log('allFarmerBasket', allFarmerBasket);
const getFarmerBasket = async () => {

    try {
        await client.connect();
        console.log('connected!');

        const db = client.db('jloupsoloproject');
        let result = await db.collection('farmerbasket').insertMany(allFarmerBasket);

        //   assert.equal(allFarmerBasket.length, result.insertedCount);
        console.log('success');
    }
    catch (err) {
        console.log(err.stack);
    }
    // close the connection to the database server
    client.close();
    console.log('disconnected!');

};

// getFarmerBasket();

// Get farmers in MongoDB jloupsoloproject collection farmers

const allFarmers = JSON.parse(fs.readFileSync('./data/farmers.json'));
console.log('allFarmers', allFarmers);
const getFarmers = async () => {

    try {
        await client.connect();
        console.log('connected!');

        const db = client.db('jloupsoloproject');
        let result = await db.collection('farmers').insertMany(allFarmers);

        //   assert.equal(allFarmerBasket.length, result.insertedCount);
        console.log('success');
    }
    catch (err) {
        console.log(err.stack);
    }
    // close the connection to the database server
    client.close();
    console.log('disconnected!');

};

// getFarmers();

// Get regions in MongoDB jloupsoloproject collection regions

const allRegions = JSON.parse(fs.readFileSync('./data/regions.json'));
console.log('allRegions', allRegions);
const getRegions = async () => {

    try {
        await client.connect();
        console.log('connected!');

        const db = client.db('jloupsoloproject');
        let result = await db.collection('regions').insertMany(allRegions);

        //   assert.equal(allFarmerBasket.length, result.insertedCount);
        console.log('success');
    }
    catch (err) {
        console.log(err.stack);
    }
    // close the connection to the database server
    client.close();
    console.log('disconnected!');

};

// getRegions();

// Get customer order(s) of vegetable basket in MongoDB jloupsoloproject collection order

const allOrders = JSON.parse(fs.readFileSync('./data/order.json'));
console.log('allOrders', allOrders);
const getOrders = async () => {

    try {
        await client.connect();
        console.log('connected!');

        const db = client.db('jloupsoloproject');
        let result = await db.collection('order').insertMany(allOrders);

        //   assert.equal(allFarmerBasket.length, result.insertedCount);
        console.log('success');
    }
    catch (err) {
        console.log(err.stack);
    }
    // close the connection to the database server
    client.close();
    console.log('disconnected!');

};

// getOrders();

// Get customer Vacation order(s) of vegetable basket in MongoDB jloupsoloproject collection vacation

const allVacations = JSON.parse(fs.readFileSync('./data/vacation.json'));
console.log('allVacations', allVacations);
const getVacations = async () => {

    try {
        await client.connect();
        console.log('connected!');

        const db = client.db('jloupsoloproject');
        let result = await db.collection('vacation').insertMany(allVacations);

        //   assert.equal(allFarmerBasket.length, result.insertedCount);
        console.log('success');
    }
    catch (err) {
        console.log(err.stack);
    }
    // close the connection to the database server
    client.close();
    console.log('disconnected!');

};

getVacations();



