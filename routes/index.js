const express = require('express');
const homeRouter = express.Router();

homeRouter.route('/').get(async (req, res) => {
    res.send("Books and More!")
});

module.exports = homeRouter;