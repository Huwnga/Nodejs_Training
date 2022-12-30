const express = require("express");
const routes = express.Router();

const studentService = require('../services/student');
const isLogin = require('../middleware/isLogin.js');

routes.get('/todolist', isLogin,studentService.getTodolist);
routes.post('/todolist/add', isLogin,studentService.postAddTask);
routes.get('/todolist/complete', isLogin,studentService.postCompleteTask);
routes.get('/todolist/delete', isLogin,studentService.postDeleteTask);
routes.get('/classroom', isLogin, studentService.getClassroom);

module.exports = routes;