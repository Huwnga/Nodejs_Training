const express = require('express');
const routes = express.Router();

const signin_up_outController = require('../controllers/signin_up_out');

routes.get('/signin', signin_up_outController.getSignin);
routes.post('/signin', signin_up_outController.postSignin);
routes.post('/signup', signin_up_outController.postSignup);
routes.post('/logout', signin_up_outController.postLogout);

module.exports = routes;