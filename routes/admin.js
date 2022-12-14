const express = require('express');
const routes = express.Router();

const adminController = require('../controllers/admin');
const isAdmin = require('../middleware/isAdmin');

// routes.get('/dashbord', isAdmin, adminController.getDashBoard);
// account
routes.get('/account', isAdmin, adminController.getAllAccount);
// routes.get('/account/info/update/:accountId', isAdmin, adminController.getUpdateInfoAccount);
routes.post('/account/info/update/', isAdmin, adminController.postUpdateInfoAccount);
routes.post('/account/active', isAdmin, adminController.getActiveAccount);
routes.post('/account/inactive', isAdmin, adminController.getInActiveAccount);
// routes.get('/account/:accountId', isAdmin, adminController.getAccount);
// // task
// routes.get('/todolist/:accountId', isAdmin, adminController.getTodolistbyAccountId);
// // classroom



// routes.get('/classroom', isAdmin, adminController.getAllClassroom);

// routes.get('/classroom/add', isAdmin, adminController.getAddClassroom);
// routes.get('/classroom/:classroomId', isAdmin, adminController.getClassroom);
// routes.post('/classroom/add', isAdmin, isAdmin, adminController.postAddClassroom);

// routes.get('/classroom/update/:classroomId', isAdmin, adminController.getUpdateClassroom);
// routes.post('/classroom/udpate/:classroomId', isAdmin, adminController.postUpdateClassroom);

// routes.post('/classroom/delete/:classroomId', isAdmin, adminController.postDeleteClassroom);

// routes.get('/classroom/add_student', isAdmin, adminController.getAddStudentWithClassroom);
// routes.post('/classroom/add_student', isAdmin, adminController.postAddStudentWithClassroom);

// routes.post('/classroom/:classroomId/delete_student/:studentId', isAdmin, adminController.postDeleteStudentWithClassroomId);

module.exports = routes;