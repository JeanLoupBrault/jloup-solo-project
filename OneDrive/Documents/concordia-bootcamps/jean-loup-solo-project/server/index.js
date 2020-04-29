"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const companyData = require("./data/companies.json");
const productData = require("./data/items.json");
const sellerData = require("./data/farmerBasket.json");
const _ = require("lodash");
const { simulateProblems, getCountryList, getSellerList, getAvailableProductList } = require("./helpers.js");
// require('dotenv').config();
const PORT = 4000;
const { MongoClient } = require('mongodb');
const { createUser, getUser } = require('./handlers');


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

  //---Gets Country List in an Array---//

  .get("/countries", (req, res) => {
    const uniqueCountries = getCountryList();
    res.status(200).send({ countries: uniqueCountries });
  })

  //DO NOT USE THIS ENDPOINT.... YET. Could be used for a company page...

  .get("/companies/:country", (req, res) => {
    const { country } = req.params;

    const companiesByCountry = companyData.filter((company) => {
      return (
        company.country.replace(" ", "").toLowerCase() === country.toLowerCase()
      );
    });
    return simulateProblems(res, { companies: companiesByCountry });
  })

  //----Gets the Products by each country----//
  .get("/products/:country", (req, res) => {
    const { country } = req.params;
    const countryList = getCountryList().map((country) => {
      return country.toLowerCase();
    });

    if (countryList.includes(country.toLowerCase())) {
      const companiesIdByCountry = companyData
        .map((company) => {
          if (
            company.country.replace(" ", "").toLowerCase() ===
            country.replace(" ", "").toLowerCase()
          ) {
            return company.id;
          }
        })
        .filter((id) => id !== undefined);
      const productsByCountry = companiesIdByCountry.map((id) => {
        return productData.filter((product) => {
          return product.companyId === id;
        });
      });
      return simulateProblems(res, { products: _.flatten(productsByCountry) });
    } else {
      res.status(404).send({
        error: `We either don't sell in that country or we couldn't find what you're looking for.`,
      });
    }
  })

  .get("/products/detail/:productId", (req, res) => {
    const { productId } = req.params;
    const product = productData.find(
      (product) => product.id === parseInt(productId)
    );
    if (product) {
      return simulateProblems(res, { product });
    } else {
      return simulateProblems(res, { message: "Product not found." });
    }
  })

  //---A countries Featured Products, Sorted By Lowest Price---//

  .get("/countries/:country/featuredproducts", (req, res) => {
    const { country } = req.params;
    const companiesIdByCountry = companyData
      .map((company) => {
        if (
          company.country.replace(" ", "").toLowerCase() ===
          country.toLowerCase()
        ) {
          return company.id;
        }
      })
      .filter((id) => id !== undefined);
    const productsByCountry = companiesIdByCountry.map((id) => {
      return productData.filter((product) => {
        return product.companyId === id;
      });
    });
    const lowestPrices = _.flatten(productsByCountry).filter((product) => {
      if (product.numInStock > 0) {
        let newPrice = product.price.slice(1);
        return parseFloat(newPrice) < 20;
      }
    });
    return simulateProblems(res, { features: lowestPrices });
  })

  //Order-Form Validation

  .post("/order", (req, res) => {
    const { order_summary } = req.body;
    if (!order_summary.length) {
      return res.status(400).send({ message: "Failure" });
    }
    const isOrderSuccessful = _.flatten(order_summary).map((item) => {
      if (!item.item_id || !item.quantity) {
        return false;
      }
      return productData
        .filter((product) => product.id === item.item_id)
        .map((orderItem) => {
          if (orderItem.numInStock - item.quantity >= 0) {
            orderItem.numInStock -= item.quantity;
            return true;
          } else if (orderItem.numInStock - item.quantity <= 0) {
            return false;
          }
        });
    });
    if (_.flatten(isOrderSuccessful).includes(false)) {
      return res.status(400).send({ message: "Failure" });
    } else {
      return res.status(200).send({ message: "Successful Purchase!" });
    }
  })

  //---Gets Categories, Organized by Country---//

  .get("/categories/:country", (req, res) => {
    const { country } = req.params;
    const companiesIdByCountry = companyData
      .map((company) => {
        if (
          company.country.replace(" ", "").toLowerCase() ===
          country.toLowerCase()
        ) {
          return company.id;
        }
      })
      .filter((id) => id !== undefined);
    const productsByCountry = companiesIdByCountry.map((id) => {
      return productData.filter((product) => {
        return product.companyId === id;
      });
    });
    const productsByCategories = _.flatten(productsByCountry).map((product) => {
      return product.category;
    });
    return simulateProblems(res, {
      categories: Array.from(new Set(productsByCategories)),
    });
  })

  //---Gets Sellers (farmers) List in an Array---//

  // .get("/sellers", (req, res) => {
  //   const uniqueSellers = getSellerList();
  //   res.status(200).send({ sellers: uniqueSellers });
  // })

  // //---Gets available vegetables list in an Array---//

  // .get("/available", (req, res) => {
  //   const availableProducts = getAvailableProductList();
  //   res.status(200).send({ available: availableProducts });
  // })

  //---Gets unique sellers (farmers) list in an Array from MongoDB---//

  .get("/sellers", async (req, res) => {
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })
    let uniqueSellers = null; //= getSellerList();
    const sendSellers = async () => {
      console.log("***In sendSellers...")
      try {
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        db.collection('farmerbaskettest').find().toArray((err, result) => {
          if (!!result) {
            uniqueSellers = []
            result.map((seller) => {
              ;
              if (uniqueSellers.indexOf(seller.sellerName) === -1) {
                uniqueSellers.push(seller.sellerName);
              }
            })
          }
          res.status(200).send({ data: uniqueSellers });
          client.close();
          console.log('disconnected!');
        });
      }
      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await sendSellers();
  })

  //---Gets available vegetables list in an Array from MongoDB---//

  .get("/available", async (req, res) => {
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let availableProducts = null; //= getSellerList();
    const sendAvProducts = async () => {
      console.log("***In sendAvProducts...")
      try {
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        db.collection('farmerbaskettest').find().toArray((err, result) => {
          if (!!result) {
            availableProducts = []
            result.map((avProduct) => {
              ;
              if (availableProducts.indexOf(avProduct.name) === -1) {
                availableProducts.push(avProduct.name);
              }
            })
          }
          res.status(200).send({ data: availableProducts });
          client.close();
          console.log('disconnected!');
        });
      }
      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await sendAvProducts();
  })

  //---Gets users for authentication with Firebase---//

  .get('/users', getUser)
  .post('/users', createUser)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
