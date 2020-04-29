"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const companyData = require("./data/companies.json");
const productData = require("./data/items.json");
const _ = require("lodash");
const { simulateProblems, getCountryList } = require("./helpers.js");
const PORT = 4000;
const { MongoClient } = require('mongodb');
// const assert = require('assert');
// const fs = require('file-system');

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))



  // REST endpoints

  //---Gets unique country list in an Array---//

  .get("/countries", async (req, res) => {
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })
    let uniqueCountries = null; //= getCountryList();
    const sendCountries = async () => {
      console.log("***In sendCountries...")
      try {
        await client.connect();
        console.log('connected!');
        const db = await client.db('dragonRiders');
        db.collection('companies').find().toArray((err, result) => {
          if (!!result) {
            uniqueCountries = []
            result.map((company) => {
              ;
              if (uniqueCountries.indexOf(company.country) === -1) {
                uniqueCountries.push(company.country);
              }
            })
          }
          res.status(200).send({ data: uniqueCountries });
          client.close();
          console.log('disconnected!');
        });
      }
      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await sendCountries();
  })


  //----Gets the Products by each country----//

  .get("/products/:country", async (req, res) => {
    const { country } = req.params;
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    });
    // console.log('country', country)
    try {
      await client.connect();
      const db = client.db('dragonRiders');

      const companies = await db.collection('companies')
        .find({ country: country }).toArray();
      // console.log('commpanies', companies)
      //[{id1,...},{id2...}]
      //[id1,id2]     
      const companiesFound = companies.map(company => {
        return company._id
      })
      console.log('companiesFound', companiesFound)
      //{ $in: [<value1>, <value2>, ... <valueN> ] }
      const productsByCountry = await db.collection('items')
        .find({ companyId: { $in: companiesFound } }).toArray();
      // console.log('productsByCountry', productsByCountry)
      // [{},{}]
      const productsByCountryObject = {};
      productsByCountry.map((product) => {
        productsByCountryObject[product._id] = product
      })
      // console.log("***final object: ", productsByCountryObject)
      // const objProdByCountry = {}
      // const result = productsByCountry.forEach(product => {
      //   product = Object.values(_id)
      // })
      res.send({ productsByCountryObject })
    }

    catch (err) {
      console.log(err.stack);
      res.status(400).send({ err });
    }

  })

  .get("/products/detail/:productId", async (req, res) => {
    const { productId } = req.params;
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    });
    try {

      await client.connect();
      const db = client.db('dragonRiders');

      db.collection('items')
        .findOne({ _id: parseInt(productId) }, (err, result) => {
          result
            ? res.status(200).json({ status: 200, productId, data: result })
            : res.status(404).json({ status: 404, productId, data: 'Not Found' });
          client.close();
        });
    }
    catch (err) {
      console.log(err.stack);
      res.status(400).send({ err });
    }
  })

  //---A countries Featured Products, Sorted By Lowest Price---//

  .get("/countries/:country/featuredproducts", async (req, res) => {
    const { country } = req.params;
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    });
    // console.log('country', country)
    try {
      await client.connect();
      const db = client.db('dragonRiders');

      const companies = await db.collection('companies')
        .find({ country: country }).toArray();
      // console.log('commpanies', companies)

      const companiesFound = companies.map(company => {
        return company._id
      })
      console.log('companiesFound', companiesFound)

      const productsByCountry = await db.collection('items')
        .find({ companyId: { $in: companiesFound } }).toArray();
      // console.log('productsByCountry', productsByCountry)

      const productsByCountryObject = [];

      productsByCountry.map((product, index) => {
        // console.log('product', product)
        const prodPrice = parseFloat(product.price.slice(1));
        if (prodPrice < 20) {

          productsByCountryObject.push(product)
        }
      })

      res.send(productsByCountryObject)
    }

    catch (err) {
      console.log(err.stack);
      res.status(400).send({ err });
    }

  })

  //Order-Form Validation

  .post("/order", async (req, res) => {

    const { order_summary } = req.body;
    const client = new MongoClient("mongodb://localhost:27017", {
      useUnifiedTopology: true,
    });
    if (!order_summary.length) {
      return res.status(400).json({ message: "Bad Request" });
    }
    try {
      await client.connect();
      console.log("connected--handleOrder");
      const db = client.db("dragonRiders");
      const productById = order_summary.map((product) => {
        return product.item_id;
      });
      const products = await db
        .collection("items")
        .find({ _id: { $in: productById } })
        .toArray();
      let areAllProductsAvailable = false;
      await products.forEach((product, i) => {
        if (product.numInStock >= order_summary[i].quantity) {
          areAllProductsAvailable = true;
        } else {
          areAllProductsAvailable = false;
        }
      });
      console.log(areAllProductsAvailable);
      if (areAllProductsAvailable) {
        await order_summary.forEach(async (product) => {
          await db
            .collection("items")
            .updateOne(
              { _id: product.item_id },
              { $inc: { numInStock: -product.quantity } }
            );
        });
        client.close();
        return res.status(200).json({ message: "Successful Purchase!" });
      } else {
        client.close();
        return res.status(400).json({ message: "Failure" });
      }
    } catch (err) {
      console.log(err);
    }
    client.close();
    console.log("closed");
  })

  //---Gets Categories, Organized by Country---//

  .get("/categories/:country", async (req, res) => {
    const { country } = req.params;
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const db = client.db('dragonRiders');

      const companies = await db.collection('companies')
        .find({ country: country }).toArray();
      // console.log('commpanies', companies)

      const companiesFound = companies.map(company => {
        return company._id
      })
      console.log('companiesFound', companiesFound)

      const productsByCountry = await db.collection('items')
        .find({ companyId: { $in: companiesFound } }).toArray();
      // console.log('productsByCountry', productsByCountry)

      const productsByCountryObject = {};
      productsByCountry.map((product) => {
        productsByCountryObject[product._id] = product
      })
      // console.log("***final object: ", productsByCountryObject)

      res.send({ productsByCountryObject })

      // Search unique categories in collection items with companyId
      let uniqueCategories = null;
      const categoriesByCountry = await db.collection('items')
        .find({ category: { $in: companiesFound } }).toArray();
      console.log('categoriesByCountry', categoriesByCountry)

      const categoriesByCountryObject = [];
      if (uniqueCategories.indexOf(category.category) === -1) {
        categoriesByCountry.map((category, index) => {

          categoriesByCountryObject.push(category)

        })

        res.send(categoriesByCountryObject)
      }
    }

    catch (err) {
      console.log(err.stack);
      res.status(400).send({ err });
    }

  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));