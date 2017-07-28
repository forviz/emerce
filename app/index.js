const bodyParser = require('body-parser');
const express = require('express');
// const session = require('express-session');
const dotenv = require('dotenv');
// const path = require('path');
const mongoose = require('mongoose');
const chalk = require('chalk');
const expressValidator = require('express-validator');
const oauthController = require('./controllers/oauthController');
const merchantController = require('./controllers/merchantController');

dotenv.config();

const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, {
  useMongoClient: true,
});
mongoose.connection.on('error', (error) => {
  console.log(error);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

const apiPrefix = '/v1';

// const rountNotMethodAllow = (req, res) => {
//   const err = res.responseWithError(405);
//   res.status(err.status).send(err);
// };

app.get(`${apiPrefix}/`, (req, res) => {
  res.send({ message: 'Welcome to EMERCE' });
});

app.post('/oauth/access_token', oauthController.createToken);
app.post('/merchant', merchantController.createMerchant);

// ************************** Set Url 404 ************************** //
app.use((req, res) => {
  const err = res.responseWithError(404);
  res.status(err.status).send(err);
});
// ************************** End Set Url 404 ************************** //


app.listen(app.get('port'), () => {
  console.log('EMERCE api server started');
});

module.exports = app;
