const express = require("express");
const routes = express.Router();

const adminService = require('../services/admin');
const isLogin = require('../middleware/isLogin.js');

routes.get('/account', isLogin, adminService.getAccounts);
routes.get('/account/add', isLogin, adminService.getAddAccount);
routes.get('/account/update', isLogin, adminService.getUpdateAccount);

module.exports = routes;