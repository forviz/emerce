// import _ from 'lodash';
const util = require('util');
const AccessToken = require('../models/AccessToken');
const jwt = require('jsonwebtoken');

const createToken = async (req, res, next) => {
  try {
    const clientId = req.body.client_id;
    // const clientSecret = req.body.client_secret;
    const grantType = req.body.grant_type;

    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
        return;
      }

      const m = new AccessToken({
        identifier: grantType,
      });

      m.save((err) => {
        if (err) {
          res.json({
            errors: {
              code: 404,
              status: 'not found',
            },
          });
        }

        const _token = jwt.sign({ data: clientId + m._id }, 'emerceSecret', { expiresIn: '1 days' });

        AccessToken.findOneAndUpdate({ _id: m._id },
          {
            $set: {
              access_token: _token,
            },
          },
          (updateErr, updateM) => {
            if (updateErr) {
              res.json({
                errors: {
                  code: 404,
                  status: 'failed',
                },
              });
            }
            res.json({
              data: {
                identifier: updateM.identifier,
                access_token: updateM.access_token,
                expires: updateM.expires,
                expires_in: updateM.expires_in,
                token_type: updateM.token_type,
              },
            });
          },
        );
      });
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createToken,
};
