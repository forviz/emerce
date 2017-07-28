const _ = require('lodash');
const Cart = require("../Models/Cart");

const getCartByRefId = async (req, res) => {
  const ref = req.params.ref;
  const result = await Cart.findOne({ ref: ref });
  return res.json({ cart: result });
};
const createOrUpdateCartByRefId = async (req, res) => {
  const ref = req.params.ref;
  const items = req.body.items;
  try {
    const cart = await Cart.findOne({ ref: ref });
    cart.items = _.reduce(items, (acc, item, index) => {
      return _.concat(acc, {
        id: item.id,
        quantity: item.quantity,
      });
    }, cart.items)
    // cart.items = [];
    const updatedCart = await cart.save();
    return res.json({
      cart: updatedCart
    });
  } catch (error) {
    const cart = new Cart({
      ref,
      merchantId: "-"
    });
    const createdCart = await cart.save();
    return res.json({
      cart: createdCart
    });
  }
};
const updateCartItemByRefIdAndProductId = async (req, res) => {
  const ref = req.params.ref;
  const productId = req.params.productId;
  const itemToUpdate = req.body.item;
  const cart = await Cart.findOne({ ref: ref });
  const itemIndex = _.findIndex(cart.items, (item) => {
    return item.id === productId
  })
  cart.items[itemIndex] = _.assign(cart.items[itemIndex], itemToUpdate);
  const updatedCart = await cart.save();
  return res.json({
    cart: updatedCart
  });
};
const deleteCartByRefId = async (req, res) => {
  const ref = req.params.ref;
  console.log('ref', ref)
  const cart = await Cart.findOneAndRemove({ ref: ref });
  return res.json({
    cart,
  });
};
const getCartItemsByRefId = async (req, res) => {
  const ref = req.params.ref;
  const cart = await Cart.findOne({ ref: ref });
  return res.json({
    items: cart.items
  });
};
module.exports = {
  getCartByRefId,
  createOrUpdateCartByRefId,
  updateCartItemByRefIdAndProductId,
  deleteCartByRefId,
  getCartItemsByRefId
};
