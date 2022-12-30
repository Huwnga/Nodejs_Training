const express = require("express");
const routes = express.Router();

const signService = require('../services/sign');

routes.get('/signin', signService.getSignIn);
routes.post('/signin', signService.postSignIn);
routes.get('/signup', signService.getSignUp);
routes.post('/signup', signService.postSignUp);
routes.post('/signout', signService.postSignOut);

module.exports = routes;