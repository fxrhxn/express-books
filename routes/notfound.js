const express = require('express');

const notFoundRouter = express.Router();

notFoundRouter.route('/').get((req, res) => {
  res.status(404).send('Route Not Found');
});

module.exports = notFoundRouter;
