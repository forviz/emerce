const Merchant = require('../models/Merchant');
const uuidv1 = require('uuid/v1');

const checkInput = (req) => {
  if (req.body.name === '') {
    return {
      error: {
        code: 402,
        status: 'bad request',
      },
    };
  } else if (!req.body.name) {
    return {
      error: {
        code: 400,
        status: 'bad request',
      },
    };
  }
  return false;
};

const createMerchant = async (req, res, next) => {
  try {
    const checkError = checkInput(req);
    if (checkError) {
      res.status(checkError.error.code).send(checkError.error);
      return;
    }

    const m = new Merchant({
      name: req.body.name,
      client_id: uuidv1(),
      client_secret: uuidv1(),
    });
    m.save((err) => {
      if (err) {
        res.status(500).send({
          error: {
            code: 500,
            status: 'cannot save into database',
          },
        });
      }
      res.json({
        data: {
          id: m._id,
          name: m.name,
          client_id: m.client_id,
          client_secret: m.client_secret,
        },
      });
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createMerchant,
};
