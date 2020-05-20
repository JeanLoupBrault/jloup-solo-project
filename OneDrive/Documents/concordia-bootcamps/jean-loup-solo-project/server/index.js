"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const companyData = require("./data/companies.json");
// const productData = require("./data/items.json");
const sellerData = require("./data/farmerBasket.json");
const _ = require("lodash");
const { simulateProblems, getCountryList, getSellerList, getAvailableProductList } = require("./helpers.js");
// require('dotenv').config();
const PORT = 4000;
const { MongoClient } = require('mongodb');
const { createUser, getUser } = require('./handlers');
// const { createAdmin, getAdmin } = require('./handlersAdm');
const assert = require('assert');

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

  // .get("/products/detail/:productId", (req, res) => {
  //   const { productId } = req.params;
  //   const product = productData.find(
  //     (product) => product.id === parseInt(productId)
  //   );
  //   if (product) {
  //     return simulateProblems(res, { product });
  //   } else {
  //     return simulateProblems(res, { message: "Product not found." });
  //   }
  // })

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

  // .post("/order", (req, res) => {
  //   const { order_summary } = req.body;
  //   if (!order_summary.length) {
  //     return res.status(400).send({ message: "Failure" });
  //   }
  //   const isOrderSuccessful = _.flatten(order_summary).map((item) => {
  //     if (!item.item_id || !item.quantity) {
  //       return false;
  //     }
  //     return productData
  //       .filter((product) => product.id === item.item_id)
  //       .map((orderItem) => {
  //         if (orderItem.numInStock - item.quantity >= 0) {
  //           orderItem.numInStock -= item.quantity;
  //           return true;
  //         } else if (orderItem.numInStock - item.quantity <= 0) {
  //           return false;
  //         }
  //       });
  //   });
  //   if (_.flatten(isOrderSuccessful).includes(false)) {
  //     return res.status(400).send({ message: "Failure" });
  //   } else {
  //     return res.status(200).send({ message: "Successful Purchase!" });
  //   }
  // })

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
        db.collection('farmers').find().toArray((err, result) => {
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
        db.collection('farmerbasket').find().toArray((err, result) => {
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

  //---Gets unique regions (Farm Hook Market) list in an Array from MongoDB---//

  .get("/regions", async (req, res) => {
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })
    let uniqueRegions = null;
    const sendRegions = async () => {
      console.log("***In sendRegions...")
      try {
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        db.collection('farmerbasket').find().toArray((err, result) => {
          if (!!result) {
            uniqueRegions = []
            result.map((regions) => {
              ;
              if (uniqueRegions.indexOf(regions.regions) === -1) {
                uniqueRegions.push(regions.regions);
              }
            })
          }
          res.status(200).send({ data: uniqueRegions });
          client.close();
          console.log('disconnected!');
        });
      }
      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await sendRegions();
  })

  //----Gets all data from farmerBasket in an Array from MongoDB----//

  .get("/products", async (req, res) => {
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let allProducts = null; //= getSellerList();
    const sendAllProducts = async () => {
      console.log("***In sendAllProducts...")
      try {
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        db.collection('farmerbasket').find().toArray((err, result) => {
          if (result) {

            res.status(200).send({ data: result });
            client.close();
            console.log('disconnected!');
          }
        });
      }
      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await sendAllProducts();
  })

  //----Gets one productId (vegetable) from farmerBasket from MongoDB----//

  .get("/products/detail/:productId", async (req, res) => {
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let { productId } = req.params;
    const sendProduct = async () => {
      console.log("***In sendProducts...")
      try {
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');

        const data = await db.collection('farmerbasket').findOne({ _id: parseInt(productId) })
        console.log('data', data)
        res.status(200).send(data)
      }
      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await sendProduct();
  })

  //----Gets one sellerId (farmer) from farmers from MongoDB----//

  .get("/sellers/detail/:sellerId", async (req, res) => {
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let { sellerId } = req.params;
    const sendSeller = async () => {
      console.log("***In sendSeller...")
      try {
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        const data = await db.collection('farmers').findOne({ _id: parseInt(sellerId) })
        console.log('data', data)
        res.status(200).send(data)
      }

      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await sendSeller();
  })

  //Order-Form retreive all in MongoDB

  .get("/order", async (req, res) => {

    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let order = null;
    const sendOrder = async () => {
      console.log("***In sendOrder...")
      try {
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        const data = await db.collection('order').find().toArray()
        console.log('sendOrder data', data)
        res.status(200).send(data);
        client.close();
        console.log('disconnected!');
      }

      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await sendOrder();
  })

  //Order-Form Validation add in MongoDB

  .post("/order", async (req, res) => {

    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let order = null;
    const postOrder = async () => {
      console.log("***In postOrder...")
      try {
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        let data = await db.collection('order').insertOne(req.body);
        // assert.equal(1, data.insertedCount);
        console.log('postOrder data', data)
        // res.status(201).json({ status: 201, data: req.body });
        // const data = await db.collection('order').findOne({ _id: parseInt(order) })

        res.status(200).send({ success: true });
        client.close();
        console.log('disconnected!');
      }

      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await postOrder();
  })

  //Order-Form Validation modify product quantity in MongoDB

  .put("/products", async (req, res) => {

    const order = Object.values(req.body.order);
    console.log('req.body typeof: ', typeof order)

    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const db = client.db('jloupsoloproject');

      const functionWithPromise = async item => { //a function that returns a promise
        const myPromise =
          (new Promise(() => db.collection('farmerbasket').updateOne({ "_id": parseInt(item.item_id) }, { $set: { "numInStock": item.newQuantity } }))
            .catch((err) => { console.log(err) }))
        return myPromise;
      }

      const waitTillComplete = async () => {
        return Promise.all(order.map(async (item) => {
          return functionWithPromise(item)
        }));
      };

      waitTillComplete().then((data) => {
        client.close();
        res.status(200).json({ status: 200, order, data });
      })

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
  })

  //Update Price -Form Validation modify a selected product price in MongoDB

  .put("/productId/updatePrice", async (req, res) => {
    const id = req.body._id;
    console.log('id', id)
    const newPrice = Object.values(req.body.newPrice);
    console.log('req.body typeof: ', typeof newPrice)
    console.log('newPrice', newPrice)
    const newPriceJoin = newPrice.join('');
    console.log('newPriceJoin', newPriceJoin)
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const db = client.db('jloupsoloproject');

      const data = await db.collection('farmerbasket').updateOne(
        { "_id": parseInt(id) }, { $set: { "price": newPriceJoin } })

      client.close();
      res.status(200).json({ status: 200, data });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
  })

  //Update Qty -Form Validation modify a selected product quantity in MongoDB

  .put("/productId/updateQty", async (req, res) => {
    const id = req.body._id;
    console.log('id', id)
    const newQty = Object.values(req.body.newQty);
    console.log('req.body typeof: ', typeof newQty)
    console.log('newQty', newQty)
    const newQtyJoin = newQty.join('');
    console.log('newQtyJoin', newQtyJoin)
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const db = client.db('jloupsoloproject');

      const data = await db.collection('farmerbasket').updateOne(
        { "_id": parseInt(id) }, { $set: { "numInStock": newQtyJoin } })

      client.close();
      res.status(200).json({ status: 200, data });

    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
  })

  //vacation-Form Validation add in MongoDB

  .post("/vacation", async (req, res) => {
    console.log('req.body', req.body)
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let vacationMgmt = null;
    const postVacation = async () => {
      console.log("***In postVacation...")

      try {
        console.log('req.body', req.body)
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        let data = await db.collection('vacation').insertOne(req.body);

        // assert.equal(1, data.insertedCount);
        console.log('postVacation data', data)
        // res.status(201).json({ status: 201, data: req.body });
        // const data = await db.collection('order').findOne({ _id: parseInt(order) })

        res.status(200).send(data);
        client.close();
        console.log('disconnected!');
      }

      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await postVacation();
  })


  //Vacation-Form retreive all in MongoDB

  .get("/vacation/:name", async (req, res) => {

    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let uniqueCustomerName = null;
    const sendVacation = async () => {
      console.log("***In sendVacation...")
      try {
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        const data = await db.collection('vacation').find().toArray()
        console.log('sendVacation data', data)

        res.status(200).send(data);
        client.close();
        console.log('disconnected!');
      }

      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await sendVacation();
  })

  //Vacation-Form retreive all from one customer by name in MongoDB

  .post("/adminView", async (req, res) => {
    console.log('req.body', req.body)
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let vacationMgmt = null;
    const postVacAdmin = async () => {
      console.log("***In postVacation...")

      try {
        console.log('req.body', req.body)
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        let data = await db.collection('vacation').find({ name: req.body.name }).toArray()
        console.log('data', data)
        res.status(200).send(data)
      }

      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await postVacAdmin();
  })

  //Update Price-Form retreive all in MongoDB

  .get("/updatePrice", async (req, res) => {

    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let uniqueCustomerName = null;
    const sendPrice = async () => {
      console.log("***In sendPrice...")
      try {
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        const data = await db.collection('farmerbasket').find().toArray()
        console.log('sendPrice data', data)

        res.status(200).send(data);
        client.close();
        console.log('disconnected!');
      }

      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await sendPrice();
  })

  //Update Price-Form retreive all from one product by id in MongoDB

  .post("/product/updatePrice", async (req, res) => {
    console.log('req.body', req.body)
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let priceMgmt = null;
    const postPriceUpdate = async () => {
      console.log("***In postPriceUpdate...")

      try {
        console.log('req.body', req.body)
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        let data = await db.collection('farmerbasket').findOne({ _id: parseInt(req.body._id) })
        console.log('data', data)
        res.status(200).send(data)
      }

      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await postPriceUpdate();
  })

  //Update Qty-Form retreive all in MongoDB

  .get("/updateQty", async (req, res) => {

    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let uniqueCustomerName = null;
    const sendQty = async () => {
      console.log("***In sendQty...")
      try {
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        const data = await db.collection('farmerbasket').find().toArray()
        console.log('sendQty data', data)

        res.status(200).send(data);
        client.close();
        console.log('disconnected!');
      }

      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await sendQty();
  })

  //Update Price-Form retreive all from one product by id in MongoDB

  .post("/product/updateQty", async (req, res) => {
    console.log('req.body', req.body)
    const client = new MongoClient('mongodb://localhost:27017', {
      useUnifiedTopology: true,
    })

    let priceMgmt = null;
    const postQtyUpdate = async () => {
      console.log("***In postQtyUpdate...")

      try {
        console.log('req.body', req.body)
        await client.connect();
        console.log('connected!');
        const db = await client.db('jloupsoloproject');
        let data = await db.collection('farmerbasket').findOne({ _id: parseInt(req.body._id) })
        console.log('data', data)
        res.status(200).send(data)
      }

      catch (err) {
        console.log(err.stack);
        res.status(400).send({ err });
      }
    }
    await postQtyUpdate();
  })

  //---Gets users for authentication with Firebase---//

  .get('/users', getUser)
  .post('/users', createUser)
  // .get('/admins', getAdmin)
  // .post('/admins', createAdmin)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));