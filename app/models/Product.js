const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: Schema.Types.ObjectId,
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
  weight: {
    unit: {
      type: String,
      default: 'kg',
    },
    value: Number
  }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
