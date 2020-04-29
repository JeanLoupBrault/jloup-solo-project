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

// Get farmerBasket in MongoDB jloupsoloproject collection farmbaskettest

const allFarmerBasket = JSON.parse(fs.readFileSync('./data/farmerBasket.json'));
console.log('allFarmerBasket', allFarmerBasket);
const getFarmerBasket = async () => {

    try {
        await client.connect();
        console.log('connected!');

        const db = client.db('jloupsoloproject');
        let result = await db.collection('farmerbaskettest').insertMany(allFarmerBasket);

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

// getItems(); getCompanies(); 
getFarmerBasket();
