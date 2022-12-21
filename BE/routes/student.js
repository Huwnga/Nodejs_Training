const express = require('express');
const routes = express.Router();

const studentController = require('../controllers/student');
const adminController = require('../controllers/admin');
const isStudent = require('../middleware/isStudent');

// to do list
routes.get('/todolist', isStudent, studentController.getTodolist);
routes.post('/todolist/add', isStudent, studentController.postTodolist);
routes.post('/todolist/complete', isStudent, studentController.postTodolistComplete);
routes.post('/todolist/delete', isStudent, studentController.postTodolistDelete);
// classroom
routes.get('/classroom', isStudent, studentController.getAllClassroom);
// routes.get('/classroom/:classroomId', studentController.getClassroom);
// // account
// routes.get('/account/:accountId', adminController.getAccount);
// routes.get('/account/info/update/:accountId', adminController.getUpdateInfoAccount);
routes.post('/account/info/edit', adminController.postUpdateInfoAccount);


module.exports = routes;