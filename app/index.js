const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiPrefix = '/v1';

const rountNotMethodAllow = (req, res) => {
  const err = Response.responseWithError(405);
  res.status(err.status).send(err);
};

app.get(`${apiPrefix}/`, (req, res) => {
  res.send({ message: 'Welcome to EMERCE' });
});

// ************************** Set Url 404 ************************** //
app.use((req, res) => {
  const err = Response.responseWithError(404);
  res.status(err.status).send(err);
});
// ************************** End Set Url 404 ************************** //


app.listen(app.get('port'), () => {
  console.log('EMERCE api server started');
});

module.exports = app;
