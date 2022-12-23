const express = require("express");
const routes = express.Router();

const studentService = require('../services/student');

routes.get('/todolist', studentService.getTodolist);

module.exports = routes;