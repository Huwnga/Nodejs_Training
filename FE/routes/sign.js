const express = require("express");
const routes = express.Router();

const signService = require('../services/sign');

routes.get('/signin', signService.getSignIn);
routes.post('/signin', signService.postSignIn);

module.exports = routes;