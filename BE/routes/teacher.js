const express = require('express');
const routes = express.Router();

const teacherController = require('../controllers/teacher');
const isTeacher = require('../middleware/isTeacher');

// teacher
routes.get('/classroom', isTeacher, teacherController.getAllClassroom);
routes.post('/classroom/add_student', isTeacher, teacherController.postAddStudentWithClassroom);
routes.post('/classroom/delete_student', isTeacher, teacherController.postDeleteStudentWithClassroom);

module.exports = routes;
