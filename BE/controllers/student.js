const Account = require('../models/account');
const Info_Account = require('../models/info_account');
const Role = require('../models/role');
const Class = require('../models/class');
const Task = require('../models/task');

// method get
exports.getTodolist = (req, res, next) => {
  const userId = req.userId;

  Account.findOne({
    where: {
      id: userId
    },
    include: {
      all: true,
      nested: true
    }
  })
    .then(account => {
      return res.status(200).json({
        error: {
          status: 200,
          message: 'OK'
        },
        data: {
          userId: userId,
          tasks: account.tasks,
          pageTitle: 'All To Do',
          path: '/todolist'
        }
      });
    })
    .catch(err => {
      return res.status(400).json({
        error: {
          status: 400,
          message: err.toString()
        },
        data: {}
      });
    });
}

exports.getAllClassroom = (req, res, next) => {
  const userId = req.userId;
  const classroomId = req.query.classroomId;

  Account.findOne({
    where: {
      id: userId
    },
    include: {
      all: true,
      nested: true
    }
  })
    .then(accounts => {
      if (classroomId) {
        Class.findOne({
          where: {
            id: classroomId
          },

          include: {
            all: true,
            nested: true
          }
        })
          .then(classroom => {
            res.status(200).json({
              error: {
                status: 200,
                message: 'OK'
              },
              data: {
                userId: userId,
                classroom: classroom,
                pageTitle: 'Classroom',
                path: '/classroom'
              }
            });
          })
          .catch(err => {
            return res.status(400).json({
              error: {
                status: 400,
                message: err.toString()
              },
              data: {
                pageTitle: 'Page Not Found',
                path: '/404'
              }
            });
          });
      } else {
        return res.status(200).json({
          error: {
            status: 200,
            message: 'OK'
          },
          data: {
            userId: userId,
            classrooms: accounts.classes,
            pageTitle: 'Classrooms',
            path: '/classroom'
          }
        });
      }
    })
    .catch(err => {
      return res.status(400).json({
        error: {
          status: 400,
          message: err.toString()
        },
        data: {
          pageTitle: 'Page Not Found',
          path: '/404'
        }
      });
    });
};

// method post
exports.postTodolist = (req, res, next) => {
  const userId = req.userId;
  const task = req.body.task;

  Task.create({
    name: task,
    status: 1,
    accountId: userId
  })
    .then(task => {
      if (task) {
        return res.status(200).json({
          error: {
            status: 200,
            message: 'Create a Task successfully!'
          },
          data: {
            nextPath: '/todolist'
          }
        });
      } else {
        return res.status(200).json({
          error: {
            status: 200,
            message: 'Create a Task fail!'
          },
          data: {
            nextPath: '/todolist'
          }
        });
      }
    })
    .catch(err => {
      return res.status(400).json({
        error: {
          status: 400,
          message: err.toString()
        },
        data: {}
      });
    });
}

exports.postTodolistComplete = (req, res, next) => {
  const userId = req.userId;
  const taskId = req.query.taskId;

  Task.findOne({
    where: {
      id: taskId
    }
  })
    .then(task => {
      if (task) {
        task.update({
          status: 0
        });
        task.save();

        return res.status(200).json({
          error: {
            status: 200,
            message: 'This Task is complete!'
          },
          data: {
            nextPath: '/todolist'
          }
        });
      } else {
        return res.status(200).json({
          error: {
            status: 200,
            message: 'This Task is dosen\'t exists!'
          },
          data: {
            nextPath: '/todolist'
          }
        });
      }
    })
    .catch(err => {
      return res.status(400).json({
        error: {
          status: 400,
          message: err.toString()
        },
        data: {}
      });
    });
}

exports.postTodolistDelete = (req, res, next) => {
  const userId = req.userId;
  const taskId = req.query.taskId;

  Task.findOne({
    where: {
      id: taskId
    }
  })
    .then(task => {
      if (task) {
        task.destroy();

        return res.status(200).json({
          error: {
            status: 200,
            message: 'Deleted this Task successfully!'
          },
          data: {
            nextPath: '/todolist'
          }
        });
      } else {
        return res.status(200).json({
          error: {
            status: 200,
            message: 'This Task is dosen\'t exists!'
          },
          data: {
            nextPath: '/todolist'
          }
        });
      }
    })
    .catch(err => {
      return res.status(400).json({
        error: {
          status: 400,
          message: err.toString()
        },
        data: {}
      });
    });
}