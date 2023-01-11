const express = require("express");
const routes = express.Router();

const adminService = require('../services/admin');
const isLogin = require('../middleware/isLogin.js');

// tasks routes
routes.get('/account', isLogin, adminService.getAccounts);
routes.get('/account/show', isLogin, adminService.getAccount);
routes.get('/account/add', isLogin, adminService.getAddAccount);
routes.post('/account/add', isLogin, adminService.postAddAccount);
routes.get('/account/edit', isLogin, adminService.getUpdateAccount);
routes.post('/account/update', isLogin, adminService.postUpdateAccount);
routes.post('/account/active', isLogin, adminService.postAccountActive);
routes.post('/account/inactive', isLogin, adminService.postAccountInactive);

// classrooms routes
routes.get('/classroom', isLogin, adminService.getClassrooms);
routes.get('/classroom/show', isLogin, adminService.getClassroom);
routes.get('/classroom/add', isLogin, adminService.getAddClassroom);
routes.post('/classroom/add', isLogin, adminService.postAddClassroom);
routes.get('/classroom/edit', isLogin, adminService.getUpdateClassroom);
routes.post('/classroom/update', isLogin, adminService.postUpdateClassroom);
routes.post('/classroom/delete', isLogin, adminService.postDeleteClassroom);
routes.get('/classroom/add_account', isLogin, adminService.getAddStudentWithClassroom);
routes.post('/classroom/add_student', isLogin, adminService.postAddAccountWithClassroom);
routes.post('/classroom/delete_student', isLogin, adminService.postDeleteAccountWithClassroom);

module.exports = routes;