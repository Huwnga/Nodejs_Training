const express = require('express');
const routes = express.Router();

const adminController = require('../controllers/admin');
const isAdmin = require('../middleware/isAdmin');

// account
routes.get('/account', isAdmin, adminController.getAllAccount);
routes.post('/account/add', isAdmin, adminController.postAddAccount);
routes.post('/account/update', isAdmin, adminController.postUpdateAccount);
routes.post('/account/info/update/', isAdmin, adminController.postUpdateInfoAccount);
routes.post('/account/active', isAdmin, adminController.getActiveAccount);
routes.post('/account/inactive', isAdmin, adminController.getInActiveAccount);

// task
routes.get('/account/todolist', isAdmin, adminController.getTodolistbyAccountId);

// classroom
routes.get('/classroom', isAdmin, adminController.getAllClassroom);
routes.post('/classroom/add', isAdmin, isAdmin, adminController.postAddClassroom);
routes.get('/classroom/update', isAdmin, adminController.getUpdateClassroom);
routes.post('/classroom/udpate', isAdmin, adminController.postUpdateClassroom);
routes.post('/classroom/delete', isAdmin, adminController.postDeleteClassroom);
routes.post('/classroom/add_student', isAdmin, adminController.postAddStudentWithClassroom);
routes.post('/classroom/delete_student', isAdmin, adminController.postDeleteStudentWithClassroomId);

module.exports = routes;