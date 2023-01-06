const express = require("express");
const routes = express.Router();

const teacherService = require('../services/teacher');
const isLogin = require('../middleware/isLogin.js');

routes.get('/classroom', isLogin, teacherService.getClassrooms);
routes.get('/classroom/add_student', isLogin, teacherService.getAddStudentWithClassroom);
routes.post('/classroom/add_student', isLogin, teacherService.postAddStudentWithClassroom);
routes.post('/classroom/delete_student', isLogin, teacherService.postDeleteStudentWithClassroom);

module.exports = routes;