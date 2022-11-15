const express = require('express');
const routes = express.Router();

const studentController = require('../controllers/student');

// classroom
// student
routes.get('/', studentController.getTodolist);
routes.get('/classroom/:classroomId', studentController.getClassroom);
routes.post('/todolist', studentController.postTodolist);
routes.post('/todolist/complete/:taskId', studentController.postTodolistComplete);
routes.post('/todolist/delete/:taskId', studentController.postTodolistDelete);


module.exports = routes;