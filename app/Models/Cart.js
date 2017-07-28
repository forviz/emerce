var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
  ref: String,
  merchantId: String,
  items: [{}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export default mongoose.model('Cart', cartSchema );