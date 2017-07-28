const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accessTokenSchema = new Schema({
  identifier: {
    type: String,
    default: 'implicit',
    enum: ['implicit', 'client_credentials'],
  },
  access_token: String,
  token_type: {
    type: String,
    default: 'Bearer',
    enum: ['Bearer'],
  },
  expires: { type: 'Date', default: +new Date() + (1 * 24 * 60 * 60 * 1000), required: true },
  expires_in: { type: Number, default: 86400, required: true },
});

const AccessToken = mongoose.model('AccessToken', accessTokenSchema);

module.exports = AccessToken;
