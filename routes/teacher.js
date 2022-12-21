const express = require('express');
const routes = express.Router();

const teacherController = require('../controllers/teacher');
const isTeacher = require('../middleware/isTeacher');

// teacher
routes.get('/classroom', isTeacher, teacherController.getAllClassroom);
routes.post('/classroom/add_student', isAdmin, teacherController.postAddStudentWithClassroom);
routes.post('/classroom/delete_student', isAdmin, teacherController.postDeleteStudentWithClassroomId);

module.exports = routes;
