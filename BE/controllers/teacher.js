const Account = require('../models/account');
const Account_Class = require("../models/account_class");
const Class = require('../models/class');
const Info_Account = require('../models/info_account');
const Role = require('../models/role');
const Task = require('../models/task');


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
              userId: userId,
              accounts: classroom.accounts,
              pageTitle: 'Teacher Classroom',
              path: 'teacher/classroom'
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
            pageTitle: 'Teacher Classroom',
            path: 'teacher/classroom'
          }
        });
      }
    })
    .catch(err => {
      return res.status(404).json({
        error: {
          status: 404,
          message: err.toString()
        },
        data: {
          pageTitle: 'Page Not Found',
          path: '/404'
        }
      });
    });
};

exports.postAddStudentWithClassroom = (req, res, next) => {
  const classroomId = req.query.classroomId;
  const accountId = req.body.accounts;

  Class.findOne({
    where: {
      id: classroomId
    }
  })
    .then(classroom => {
      if (classroom) {
        Account.findOne({
          where: {
            id: accountId
          }
        })
          .then(account => {
            if (account) {
              Account_Class.findOne({
                where: {
                  classId: classroomId,
                  accountId: accountId
                }
              })
                .then(account_class => {
                  if (!account_class) {
                    Account_Class.create({
                      quantity: 0,
                      classId: classroomId,
                      accountId: accountId
                    }).then(acc_class => {
                      return res.status(200).json({
                        error: {
                          status: 200,
                          message: 'Add Account in Classroom Successfully!'
                        },
                        data: {
                          classes: acc_class,
                          pageTitle: 'Classrooms',
                          path: '/teacher/classroom'
                        }
                      });
                    })
                      .catch(err => {
                        console.log(err);
                        return res.status(401).json({
                          error: {
                            status: 401,
                            message: err.toString()
                          },
                          data: {
                            pageTitle: 'Classrooms',
                            path: '/teacher/classroom'
                          }
                        });
                      });
                  } else {
                    return res.status(200).json({
                      error: {
                        status: 200,
                        message: 'This Account is already in Classroom Successfully!'
                      },
                      data: {
                        classes: account_class,
                        pageTitle: 'Classrooms',
                        path: '/teacher/classroom'
                      }
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                  return res.status(401).json({
                    error: {
                      status: 401,
                      message: err.toString()
                    },
                    data: {
                      pageTitle: 'Classrooms',
                      path: '/teacher/classroom'
                    }
                  });
                });
            } else {
              return res.status(401).json({
                error: {
                  status: 401,
                  message: 'This Account Doesn\'t exists!'
                },
                data: {
                  accountId: accountId,
                  pageTitle: 'Classrooms',
                  path: '/teacher/classroom'
                }
              });
            }
          })
          .catch(err => {
            console.log(err);
            return res.status(401).json({
              error: {
                status: 401,
                message: err.toString()
              },
              data: {
                pageTitle: 'Classrooms',
                path: '/teacher/classroom'
              }
            });
          });
      } else {
        return res.status(401).json({
          error: {
            status: 401,
            message: 'This Classroom Doesn\'t exists!'
          },
          data: {
            classroomId: classroomId,
            pageTitle: 'Classrooms',
            path: '/teacher/classroom'
          }
        });
      }
    })
    .catch(err => {
      return res.status(401).json({
        error: {
          status: 401,
          message: err.toString()
        },
        data: {
          pageTitle: 'Classrooms',
          path: '/teacher/classroom'
        }
      });
    });
};

exports.postDeleteStudentWithClassroom = (req, res, next) => {
  const classroom_accountId = req.query.classroom_accountId;

  Account_Class.findOne({
    where: {
      id: classroom_accountId
    }
  })
    .then(account_class => {
      if (account_class) {
        account_class.destroy();

        return res.status(200).json({
          error: {
            status: 200,
            message: 'Remove Student in Classroom Successfully!'
          },
          data: {
            classroomId: account_class.classroomId,
            studentId: account_class.studentId,
            pageTitle: 'Classrooms',
            path: '/teacher/classroom'
          }
        });
      } else {
        return res.status(401).json({
          error: {
            status: 401,
            message: "Delete faild! This student doesn't exists in classroom or This classroom doesn't exists!"
          },
          data: {
            classroom_accountId: classroom_accountId,
            pageTitle: 'Classrooms',
            path: '/teacher/classroom'
          }
        });
      }
    })
    .catch(err => {
      return res.status(401).json({
        error: {
          status: 401,
          message: err.toString()
        },
        data: {
          classroom_accountId: classroom_accountId,
          pageTitle: 'Classrooms',
          path: '/teacher/classroom'
        }
      });
    });
};