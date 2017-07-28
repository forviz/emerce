const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const mercharntSchema = new Schema({
  name: String,
  client_id: String,
  client_secret: String,
});

const Merchant = mongoose.model('Merchant', mercharntSchema);

module.exports = Merchant;
