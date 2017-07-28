// ======================================================
// Import Cotrollers
// ======================================================
import cartController from './Controllers/cartController'

const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const chalk = require('chalk');

dotenv.config();

const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, {
  useMongoClient: true,
});
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const apiPrefix = '/v1';

// const rountNotMethodAllow = (req, res) => {
//   const err = Response.responseWithError(405);
//   res.status(err.status).send(err);
// };

app.get(`${apiPrefix}/`, (req, res) => {
  res.send({ message: 'Welcome to EMERCE' });
});

// ======================================================
// Carts API
// ======================================================

// create cart or add items to cart by referenceId
app.post(`${apiPrefix}/carts/:ref/items`, (req, res) => {
  return cartController.createOrUpdateCartByRefId(req, res)
});
// get cart by referenceId
app.get(`${apiPrefix}/carts/:ref`, (req, res) => {
  return cartController.getCartByRefId(req, res)
});

// // delete cart by referenceId
app.delete(`${apiPrefix}/carts/:ref`, (req, res) => {
  return cartController.deleteCartByRefId(req, res);
});

// // get cart items by referenceId
app.get(`${apiPrefix}/carts/:ref/items`, (req, res) => {
  return cartController.getCartItemsByRefId(req, res);
});

// // update cart item by referenceId & productId
app.put(`${apiPrefix}/carts/:ref/items/:productId`, (req, res) => {
  return cartController.updateCartItemByRefIdAndProductId(req, res);
});

// ======================================================
// Carts Add-on
// ======================================================
// get all carts
// app.get(`${apiPrefix}/carts`, (req, res) => {
//   res.json({"foo": "bar"});
// });
// // get cart by merchantId
// app.get(`${apiPrefix}/carts/${merchantId}`, (req, res) => {
//   res.json({"merchantId": merchantId});
// });


// ************************** Set Url 404 ************************** //
// app.use((req, res) => {
//   const err = res.responseWithError(404);
//   res.status(err.status).send(err);
// });
// ************************** End Set Url 404 ************************** //

app.listen(app.get('port'), () => {
  console.log('EMERCE api server started on port', process.env.PORT || 3000);
});

module.exports = app;
