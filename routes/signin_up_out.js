const express = require('express');
const routes = express.Router();

const signin_up_outController = require('../controllers/signin_up_out');

const isAdmin = require('../middleware/isAdmin');

routes.get('/signin', signin_up_outController.getSignin);
routes.post('/signin', signin_up_outController.postSignin);
routes.get('/signup',isAdmin, signin_up_outController.getSignup);
routes.post('/signup',isAdmin, signin_up_outController.postSignup);
routes.post('/logout', signin_up_outController.postLogout);

module.exports = routes;