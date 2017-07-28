/* eslint-disable */
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const _ = require('lodash');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();

chai.use(chaiHttp);

describe('/Emerce', () => {
  it('should return with success', async () => {
    const res = await chai.request(server)
      .get('/v1')
      .send({ name: 'Forviz Store' });
    res.should.have.status(200);

  });
});
