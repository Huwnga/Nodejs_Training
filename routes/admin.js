const express = require('express');
const routes = express.Router();

const adminController = require('../controllers/admin');
const isAdmin = require('../middleware/isAdmin');

routes.get('/dashbord', isAdmin, adminController.getDashBoard);

routes.get('/account', isAdmin, adminController.getAllAccount);
routes.get('/todolist/:accountId', isAdmin, adminController.getTodolistbyAccountId);

routes.get('/classroom', isAdmin, adminController.getAllClassroom);

routes.get('/classroom/add', isAdmin, adminController.getAddClassroom);
routes.post('/classroom/add', isAdmin, isAdmin, adminController.postAddClassroom);

routes.get('/classroom/update/:classId', isAdmin, adminController.getUpdateClassroom);
routes.post('/classroom/udpate/:classId', isAdmin, adminController.postUpdateClassroom);

routes.post('/classroom/delete/:classId', isAdmin, adminController.postDeleteClassroom);

routes.get('/classroom/add_student', isAdmin, adminController.getAddStudentWithClassroom);
routes.post('/classroom/add_student', isAdmin, adminController.postAddStudentWithClassroom);

routes.post('/classroom/:classroomId/delete_student/:studentId', isAdmin, adminController.postDeleteStudentWithClassroomId);

module.exports = routes;