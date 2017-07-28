import { getIdentityFromToken } from '../../utils/jwtUtils';

const mongoose = require('mongoose');

const Entry = require('../../models/Product');

exports.getProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({
      data: products,
    });
  } catch (e) {
    next(e);
  }
};

exports.createProduct = async (req, res, next) => {
  try {

    const product = new Product();
    organization.name = req.body.name;

    const products = await Product.insert({
      item: "card",
      qty: 15
    });
    res.json({
      data: products,
    });
  } catch (e) {
    next(e);
  }
};
