const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

const Schema = mongoose.Schema;

const mercharntSchema = new Schema({
  name: String,
  client_id: { type: String, default: uuidv1(), required: true },
  client_secret: { type: String, default: uuidv1(), required: true },
});

const Merchant = mongoose.model('Merchant', mercharntSchema);

module.exports = Merchant;
