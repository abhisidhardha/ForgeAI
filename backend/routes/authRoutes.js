/** Public registration and login endpoints. Protected feature routers install JWT verification separately. */
const express = require('express');
const auth = express.Router();
const authController = require('../controllers/authController.js');
const asyncHandler = require('../middleware/asyncHandler.js');

auth.post('/register',asyncHandler(authController.register));
auth.post('/login',asyncHandler(authController.login));

module.exports = auth ;
