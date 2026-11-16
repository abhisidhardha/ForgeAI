/** Authenticated dashboard endpoint; all report queries are scoped to the token owner. */
const express = require('express');
const verify = require("../middleware/authMiddleware");
const asyncHandler = require("../middleware/asyncHandler");
const dashboardController = require('../controllers/dashboardController');

const dashboard = express.Router({mergeParams: true});
dashboard.use(verify);

dashboard.get('/', asyncHandler(dashboardController.getReports));

module.exports = dashboard ;
