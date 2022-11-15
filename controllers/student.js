const Account = require('../models/account');
const Info_Account = require('../models/info_account');
const Role = require('../models/role');
const Task = require('../models/task');

exports.getTodolist = (req, res, next) => {
  Account.findOne({
    where: {
      id: req.cookies.isStudent.id
    },
    include: {
      model: Task
    }
  })
    .then(account => {
      console.log(account.tasks);
      res.render('student/todolist', {
        items: account.tasks,
        pageTitle: 'All To Do',
        path: '/todolist'
      });
    })
    .catch(err => console.log(err));
}

exports.getClassroom = (req, res, next) => {

}

exports.postTodolist = (req, res, next) => {
  const task = req.body.task;

  Task.create({
    name: task,
    status: 1,
    accountId: req.cookies.isStudent.id
  })
    .then(task => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
}

exports.postTodolistComplete = (req, res, next) => {
  const taskId = req.params.taskId;

  Task.findOne({
    where: {
      id: taskId
    }
  })
    .then(task => {
      task.update({
        status: 0
      });
      task.save();
    })
    .then(results => {
      console.log("UPDATE Task Successfully!");
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postTodolistDelete = (req, res, next) => {
  const taskId = req.params.taskId;

  Task.findOne({
    where: {
      id: taskId
    }
  })
    .then(task => {
      if (task) {
        return task.destroy();
      }
    })
    .then(results => {
      console.log("Delete Task Successfully!");
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
}