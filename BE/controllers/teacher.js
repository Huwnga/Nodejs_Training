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
        Account_Class.findOne({
          where: {
            accountId: userId,
            classId: classroomId
          }
        })
          .then(acc_class => {
            if (acc_class) {
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
                  if (classroom) {
                    return res.status(200).json({
                      error: {
                        status: 200,
                        message: 'OK'
                      },
                      data: {
                        userId: userId,
                        accounts: classroom.accounts,
                        pageTitle: 'Classroom',
                        path: '/teacher/classroom'
                      }
                    });
                  } else {
                    return res.status(200).json({
                      error: {
                        status: 401,
                        message: 'This Classroom doesn\'t exists!'
                      },
                      data: {
                        path: '/teacher/classroom'
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
            } else {
              return res.status(200).json({
                error: {
                  status: 401,
                  message: 'Don\'t have permission in this classroom!'
                },
                data: {
                  path: '/teacher/classroom'
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
            path: '/teacher/classroom'
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
};

exports.postAddStudentWithClassroom = (req, res, next) => {
  const userId = req.userId;
  const classroomId = req.body.classroomId;
  const accountId = req.body.accounts;

  Account_Class.findOne({
    where: {
      accountId: userId,
      classId: classroomId
    }
  })
    .then(acc_class => {
      if (acc_class) {
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
                          })
                            .then(acc_class => {
                              if (acc_class) {
                                return res.status(200).json({
                                  error: {
                                    status: 200,
                                    message: "Add " + account.username + " in " + classroom.name + " successfully!"
                                  },
                                  data: {
                                    path: "/teacher/classroom?classroomId=" + classroom.id
                                  }
                                });
                              } else {
                                return res.status(200).json({
                                  error: {
                                    status: 401,
                                    message: "Add faild!"
                                  },
                                  data: {
                                    path: "/teacher/classroom/add_student"
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
                        } else {
                          return res.status(200).json({
                            error: {
                              status: 401,
                              message: account.username + " is already in " + classroom.name + "!"
                            },
                            data: {
                              body: JSON.stringify(req.body),
                              path: '/admin/classroom/add_account'
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
                  } else {
                    return res.status(200).json({
                      error: {
                        status: 401,
                        message: 'This Account Doesn\'t exists!'
                      },
                      data: {
                        body: JSON.stringify(req.body),
                        path: '/admin/classroom/add_account'
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
            } else {
              return res.status(200).json({
                error: {
                  status: 401,
                  message: 'This Classroom Doesn\'t exists!'
                },
                data: {
                  body: JSON.stringify(req.body),
                  path: '/admin/classroom'
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
      } else {
        return res.status(200).json({
          error: {
            status: 401,
            message: 'Don\'t have permission in this classroom!'
          },
          data: {
            path: '/teacher/classroom'
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
};

exports.postDeleteStudentWithClassroom = (req, res, next) => {
  const userId = req.userId;
  const classroomId = req.body.classroomId;
  const accountId = req.body.accountId;

  Account_Class.findOne({
    where: {
      accountId: userId,
      classId: classroomId
    }
  })
    .then(acc_class => {
      if (acc_class) {
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
                        if (account_class) {
                          account_class.destroy();

                          return res.status(200).json({
                            error: {
                              status: 200,
                              message: "Remove " + account.username + " in " + classroom.name + " successfully!"
                            },
                            data: {
                              path: "/teacher/classroom?classroomId=" + classroom.id
                            }
                          });
                        } else {
                          return res.status(200).json({
                            error: {
                              status: 401,
                              message: account.username + " or " + classroom.name + " isn't exists!"
                            },
                            data: {
                              body: JSON.stringify(req.body),
                              path: '/teacher/classroom'
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
                  } else {
                    return res.status(200).json({
                      error: {
                        status: 401,
                        message: 'This Account Doesn\'t exists!'
                      },
                      data: {
                        body: JSON.stringify(req.body),
                        path: '/admin/classroom/add_account'
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
            } else {
              return res.status(200).json({
                error: {
                  status: 401,
                  message: 'This Classroom Doesn\'t exists!'
                },
                data: {
                  path: '/admin/classroom'
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
      } else {
        return res.status(200).json({
          error: {
            status: 401,
            message: 'Don\'t have permission in this classroom!'
          },
          data: {
            path: '/teacher/classroom'
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
};