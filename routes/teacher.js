const express = require('express');
const routes = express.Router();

const teacherController = require('../controllers/teacher');
const isTeacher = require('../middleware/isTeacher');

// teacher
routes.get('/', isTeacher, teacherController.getAllClassroom);

// routes.get('/teacher/classroom/:classroomId', teacherController.getClassroom);

// routes.get('/teacher/classroom/:classroomId/add_student/:studentId', adminController.getAddStudentWithClassroomId);
// routes.post('/teacher/classroom/:classroomId/add_student/:studentId', adminController.postAddStudentWithClassroomId);

// routes.get('/teacher/classroom/:classroomId/delete_student/:studentId', adminController.getDeleteStudentWithClassroomId);
// routes.post('/teacher/classroom/:classroomId/delete_student/:studentId', adminController.postDeleteStudentWithClassroomId);

// routes.get('/teacher/student/:studentId', teacherController.getStudent);

module.exports = routes;
