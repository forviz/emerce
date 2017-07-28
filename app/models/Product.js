const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  type: String,
  name: String,
  description: String,
  slug: String,
  status: String,
  price: [{
    amount: Number,
    currency: {
      type: String,
      default: 'THB',
    },
    includes_tax: Boolean
  }],
  commodity_type: String,


});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
