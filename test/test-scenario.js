const fetch = require('isomorphic-fetch');
const _ = require('lodash');

const BASEURL = 'http://localhost:3000';

const runTest = async () => {
  try {
    const merchantResponse = await fetch(`${BASEURL}/v1/merchant`, { method: 'POST', body: JSON.stringify({ name: 'Forviz Store' }) });
    console.log(merchantResponse);
    const merchantId = _.get(merchantResponse, 'data._id');
    console.log('MerchantId', merchantId);
  } catch (e) {
    console.log(e);
  }
}

runTest();
