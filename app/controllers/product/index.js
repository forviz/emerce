//import { getIdentityFromToken } from '../../utils/jwtUtils';

const mongoose = require('mongoose');

const Product = require('../../models/Product');

exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({
      data: products,
    });
  } catch (e) {
    next(e);
  }
};

exports.getSingle = async (req, res, next) => {
  try {//597b012aa1c6000a501c0490
    const productId = req.params.product_id;
    const products = await Product.findOne({ _id: productId });
    res.json({
      data: products,
    });
  } catch (e) {
    next(e);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // const product = new Product();
    const type  = req.body.type;
    const name = req.body.name;
    const description = req.body.description;
    const slug = req.body.slug;
    const status = req.body.status;
    const commodity_type = req.body.commodity_type;
    const amount = req.body.amount;
    const includes_tax = req.body.includes_tax;
    const weight = req.body.weight;

    const products = new Product({
      type: type,
      name: name,
      description: description,
      slug: slug,
      status: status,
      commodity_type: commodity_type,
      price: [{
        "amount": amount,
        "includes_tax": includes_tax
      }],
      weight: {
          "value": weight
      }
    });

    const result = await products.save();

    res.json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.product_id;

    const type  = req.body.type;
    const name = req.body.name;
    const description = req.body.description;
    const slug = req.body.slug;
    const status = req.body.status;
    const commodity_type = req.body.commodity_type;
    const amount = req.body.amount;
    const includes_tax = req.body.includes_tax;
    const weight = req.body.weight;


    const products = await Product.update(
       { _id: productId },
       {
         $set: {
           type: type,
           name: name,
           description: description,
           slug: slug,
           status: status,
           commodity_type: commodity_type,
           price: [{
             amount: amount,
             includes_tax: includes_tax
           }],
           weight: {
             value: weight
           }
         }
       }
    );

    const result = await Product.findOne({ _id: productId });

    res.json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const productId = req.params.product_id;

    await Product.remove( { _id: productId } )

    res.json({
      data: {
        id: productId
      },
    });
  } catch (e) {
    next(e);
  }
};
