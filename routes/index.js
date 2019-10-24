const express = require('express');
const homeRouter = express.Router();

homeRouter.route('/').get(async (req, res) => {
    res.send("Books from Institutions.")
});

module.exports = homeRouter;