import _ from 'lodash';
import Cart from '../Models/Cart';
import { toEndUser } from '../utils';

const getCartByRefId = async (req, res) => {
  const ref = req.params.ref;
  const result = await Cart.findOne({ ref: ref });
  return res.json(toEndUser({ cart: result }));
};

const saveModel = (model) => {
  return model.save();
}

const createCart = async (ref, merchantId, items) => {
  const cart = new Cart({
    ref,
    merchantId,
    items,
  });
  const createdCart = await cart.save();
  return createdCart;
}

const updateCart = async (cart, items) => {
  cart.items = _.reduce(items, (acc, item, index) => {
    return _.concat(acc, {
      id: item.id,
      quantity: item.quantity,
    });
  }, cart.items)
  const updatedCart = await cart.save();
  return updatedCart;
}

const createOrUpdateCartByRefId = async (req, res) => {
  const ref = req.params.ref;
  const items = req.body.items;
  const merchantId = '-';
  // console.log('=========================')
  // console.log('createOrUpdateCartByRefId', ref, items)
  // console.log('=========================')
  const cart = await Cart.findOne({ ref: ref });
  if (cart === null) {
    // ======================================================
    // Cannot find ref in DB
    // ======================================================
    const createdCart = await createCart(ref, merchantId, items)
    // console.log('=========================')
    // console.log('createdCart', createdCart)
    // console.log('=========================')
    res.json(toEndUser(createdCart))
  } else {
    const updatedCart = await updateCart(cart, items)
    // console.log('=========================')
    // console.log('updatedCart', updatedCart)
    // console.log('=========================')
    res.json(toEndUser(updatedCart))
  }
};
const updateCartItemByRefIdAndProductId = async (req, res) => {
  const ref = req.params.ref;
  const productId = req.params.productId;
  const itemToUpdate = req.body.item;
  const cart = await Cart.findOne({ ref: ref });
  cart.items = _.map(cart.items, (item) => {
    if (item.id === productId) return _.assign(item, itemToUpdate);
    return item;
  });
  const updatedCart = await cart.save();
  return res.json(toEndUser({ cart: updatedCart }));
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
  return res.json(toEndUser({ items: cart.items }));
};
module.exports = {
  getCartByRefId,
  createOrUpdateCartByRefId,
  updateCartItemByRefIdAndProductId,
  deleteCartByRefId,
  getCartItemsByRefId
};
