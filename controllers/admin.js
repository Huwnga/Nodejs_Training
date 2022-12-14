const multer = require('multer');
const Account = require('../models/account');
const Info_Account = require('../models/info_account');
const Account_Class = require('../models/account_class');
const Role = require('../models/role');
const Class = require('../models/class');
const Task = require('../models/task');
const { INTEGER } = require('sequelize');

exports.getAllAccount = (req, res, next) => {
  const accountId = parseInt(req.query.accountId);
  const userId = req.userId;

  Account.findOne({
    where: {
      id: userId
    }
  })
    .then(user => {
      if (accountId) {
        Account.findOne({
          where: {
            id: accountId
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
                account: account,
                userId: userId,
                pageTitle: 'Profile',
                path: '/account/accountId'
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
                pageTitle: 'All Account',
                path: '/admin/account'
              }
            });
          });
      } else {
        Account.findAll({
          include: {
            all: true,
            nested: true
          }
        })
          .then(accounts => {
            return res.status(200).json({
              error: {
                status: 200,
                message: 'OK'
              },
              data: {
                accounts: accounts,
                userId: userId,
                pageTitle: 'All Account',
                path: '/admin/account'
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
                pageTitle: 'All Account',
                path: '/admin/account'
              }
            });
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
          pageTitle: 'All Account',
          path: '/admin/account'
        }
      });
    });
};

exports.getTodolistbyAccountId = (req, res, next) => {
  const accountId = req.query.accountId;

  Account.findOne({
    where: {
      id: accountId
    },
    include: {
      all: true,
      nested: true
    }
  })
    .then(account => {
      if (account) {
        if (account.status == 1) {
          return res.status(200).json({
            error: {
              status: 200,
              message: 'OK'
            },
            data: {
              accountId: accountId,
              tasks: account.tasks,
              pageTitle: 'All To Do',
              path: '/account/todolist'
            }
          });
        } else {
          return res.status(401).json({
            error: {
              status: 401,
              message: 'This Account is banned!'
            },
            data: {
              accountId: accountId,
              tasks: account.tasks,
              pageTitle: 'All Account',
              path: '/admin/account'
            }
          });
        }
      } else {
        return res.status(401).json({
          error: {
            status: 401,
            message: 'This Account Doesn\'t exists!'
          },
          data: {
            accountId: accountId,
            pageTitle: 'All Account',
            path: '/admin/account'
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
          pageTitle: 'All Account',
          path: '/admin/account'
        }
      });
    });
};

exports.postAddAccount = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const full_name = req.body.fullname;
  const gender = req.body.gender;
  const roleId = req.body.roles;
  const classroomId = req.body.classrooms;

  Account.findOne({
    where: {
      username: username,
    }
  })
    .then(account => {
      if (!account) {
        Account.create(
          {
            username: username,
            password: password,
            status: 1,
            roleId: roleId,
          }
        )
          .then(account => {
            if (account) {
              Info_Account.create({
                full_name: full_name,
                gender: gender,
                accountId: account.id,
              })
                .catch(err => {
                  return res.status(400).json({
                    error: {
                      status: 400,
                      message: err.toString()
                    },
                    data: {
                      body: req.body,
                      pageTitle: 'All Account',
                      path: '/admin/account/add'
                    }
                  });
                });

              Account_Class.findOne({
                classId: classroomId
              })
                .then(classes => {
                  if (classes) {
                    Account_Class.create({
                      quantity: 0,
                      accountId: account.id,
                      classId: classroomId
                    });
                  } else {
                    return res.status(400).json({
                      error: {
                        status: 400,
                        message: 'Classes doesn\'t exists!'
                      },
                      data: {
                        body: req.body,
                        pageTitle: 'All Account',
                        path: '/admin/account/add'
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
                      pageTitle: 'All Account',
                      path: '/admin/account'
                    }
                  });
                });

              return account.id;
            } else {
              return res.status(401).json({
                error: {
                  status: 401,
                  message: 'Add Account Faild!'
                },
                data: {
                  body: req.body,
                  pageTitle: 'All Account',
                  path: '/admin/account/add'
                }
              });
            }
          })
          .then(accId => {
            Account.findOne({
              where: {
                id: accId,
              }
            })
              .then(account => {
                if (account) {
                  return res.status(201).json({
                    error: {
                      status: 201,
                      message: 'Add Account Successfully!'
                    },
                    data: {
                      account: account,
                      pageTitle: 'All Account',
                      path: '/admin/account'
                    }
                  });
                } else {
                  return res.status(401).json({
                    error: {
                      status: 401,
                      message: 'Add Account Faild!'
                    },
                    data: {
                      account: account,
                      pageTitle: 'All Account',
                      path: '/admin/account'
                    }
                  });
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
                pageTitle: 'All Account',
                path: '/admin/account'
              }
            });
          });
      } else {
        return res.status(401).json({
          error: {
            status: 401,
            message: 'This username is exists!'
          },
          data: {
            pageTitle: 'All Account',
            path: '/admin/account'
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
          pageTitle: 'All Account',
          path: '/admin/account'
        }
      });
    });
}

exports.getUpdateInfoAccount = (req, res, next) => {
  const accountId = req.query.accountId;

  Account.findOne({
    where: {
      id: accountId
    },
    include: {
      all: true,
      nested: true
    }
  })
    .then(account => {
      if (account) {
        return res.status(200).json({
          error: {
            status: 200,
            message: 'OK'
          },
          data: {
            account: account,
            pageTitle: 'Profile',
            path: '/admin/account/info/update'
          }
        });
      } else {
        return res.status(401).json({
          error: {
            status: 401,
            message: 'This Account Doesn\'t exists!'
          },
          data: {
            accountId: accountId,
            pageTitle: 'All Account',
            path: '/admin/account'
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
          pageTitle: 'All Account',
          path: '/admin/account'
        }
      });
    });
};

exports.postUpdateInfoAccount = (req, res, next) => {
  const accountId = req.query.accountId;
  const id = req.body.id;
  const fullname = req.body.full_name;
  const avatar = req.body.avatar;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const mobile = req.body.mobile;
  const address = req.body.address;

  if (accountId != id) {
    return res.status(401).json({
      error: {
        status: 401,
        message: 'id Params and id feild not equals'
      },
      data: {}
    });
  }

  Account.findOne({
    where: {
      id: id
    },
    include: {
      all: true,
      nested: true
    }
  })
    .then(account => {
      if (account) {
        Info_Account.findOne({
          where: {
            accountId: id
          }
        })
          .then(info => {
            if (info != null) {
              info.update({
                full_name: fullname,
                avatar: account.role.name + account.id + ".png",
                gender: gender,
                dob: dob,
                mobile: mobile,
                address: address
              });
              info.save();
            } else {
              Info_Account.create({
                full_name: fullname,
                avatar: account.role.name + account.id + ".png",
                gender: gender,
                dob: dob,
                mobile: mobile,
                address: address,
                accountId: accountId
              });
            }
          })
          .then(results => {
            return res.status(200).json({
              error: {
                status: 201,
                message: 'Edit Account Successfully!'
              },
              data: {
                nextPath: '/admin/account'
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

}

exports.getActiveAccount = (req, res, next) => {
  const accountId = req.query.accountId;

  Account.findOne({
    where: {
      id: accountId
    }
  })
    .then(account => {
      if (account) {
        account.update({
          status: 1
        });
        account.save();

        return res.status(200).json({
          error: {
            status: 200,
            message: 'Active Account Successfully!'
          },
          data: {
            nextPath: '/admin/account'
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
}

exports.getInActiveAccount = (req, res, next) => {
  const accountId = req.query.accountId;

  Account.findOne({
    where: {
      id: accountId
    }
  })
    .then(account => {
      if (account) {
        account.update({
          status: 0
        });
        account.save();

        return res.status(200).json({
          error: {
            status: 200,
            message: 'Inactive Account Successfully!'
          },
          data: {
            nextPath: '/admin/account'
          }
        });
      } else {
        return res.status(401).json({
          error: {
            status: 401,
            message: 'This Account Doesn\'t exists'
          },
          data: {
            nextPath: '/admin/account'
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
}


// // classroom get
// exports.getAllClassroom = (req, res, next) => {
//   Class.findAll({
//     include: {
//       all: true,
//       nested: true
//     }
//   })
//     .then(classrooms => {
//       console.log(classrooms);
//       res.render('admin/classmate/index', {
//         classrooms: classrooms,
//         isAdmin: req.cookies.isAdmin,
//         isTeacher: req.cookies.isTeacher,
//         isStudent: req.cookies.isStudent,
//         pageTitle: 'Classrooms',
//         path: '/admin/classroom'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.getClassroom = (req, res, next) => {
//   const classroomId = req.params.classroomId;

//   Class.findOne({
//     where: {
//       id: classroomId
//     },

//     include: {
//       all: true,
//       nested: true
//     }
//   })
//     .then(classroom => {
//       console.log(classroom);
//       res.render('admin/account/index', {
//         accounts: classroom.accounts,
//         isAdmin: req.cookies.isAdmin,
//         isTeacher: req.cookies.isTeacher,
//         isStudent: req.cookies.isStudent,
//         pageTitle: 'Classroom',
//         path: 'admin/classroom'
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.getAddClassroom = (req, res, next) => {

//   res.render('admin/classmate/create', {
//     pageTitle: 'Classrooms',
//     path: '/admin/classroom/add'
//   });
// };

// exports.getUpdateClassroom = (req, res, next) => {
//   const classroomId = req.params.classroomId;

//   Class.findOne({
//     where: {
//       id: classroomId
//     }
//   })
//     .then(classroom => {
//       if (classroom) {
//         res.render('admin/classmate/update', {
//           classroom: classroom,
//           pageTitle: 'Classrooms',
//           path: '/admin/classroom/add'
//         });
//       } else {
//         console.log('Classroom: Get Update Method Fail! Classroom doesn\'t exists');
//         res.redirect('/admin/classroom/add');
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.getAddStudentWithClassroom = (req, res, next) => {
//   Class.findAll()
//     .then(classrooms => {
//       Account.findAll()
//         .then(accounts => {
//           res.render('admin/classmate/add-student', {
//             classrooms: classrooms,
//             accounts: accounts,
//             pageTitle: 'Add Student With Classroom',
//             path: '/admin/classroom/add_student'
//           });
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
// // classroom post
// exports.postAddClassroom = (req, res, next) => {
//   const name = req.body.name;

//   Class.create({
//     name: name
//   })
//     .then(classroom => {
//       console.log("Add Successfully with id: " + classroom.id);
//       res.redirect('/admin/classroom');
//     })
//     .catch(err => {
//       console.log(err);
//     })
// };

// exports.postUpdateClassroom = (req, res, next) => {
//   const classroomId = req.params.classroomId;
//   const id = req.body.id;
//   const name = req.body.name;

//   if (classroomId != id) {
//     return redirect('/admin/classroom');
//   }

//   Class.findOne({
//     where: {
//       id: id
//     }
//   })
//     .then(classroom => {
//       classroom.update({
//         name: name
//       });
//       classroom.save();
//     })
//     .then(results => {
//       console.log("Classroom: Update successfully");
//       return res.redirect('/classroom');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.postDeleteClassroom = (req, res, next) => {
//   const classroomId = req.params.classroomId;
//   console.log("delete");
//   Class.findOne({
//     where: {
//       id: classroomId
//     }
//   })
//     .then(classroom => {
//       if (classroom) {
//         Account_Class.destroy({
//           where: {
//             classId: classroomId
//           }
//         });
//         return classroom.destroy({
//           where: {
//             id: classroomId
//           }
//         });
//       }
//     })
//     .then(results => {
//       console.log("Classroom: Delete successfully");
//       return res.redirect('/admin/classroom');
//     })
//     .catch(err => console.log(err));
// };

// exports.postAddStudentWithClassroom = (req, res, next) => {
//   const classroomId = req.body.classrooms;
//   const studentId = req.body.students;

//   Class.findOne({
//     where: {
//       id: classroomId
//     }
//   })
//     .then(classroom => {
//       Account.findOne({
//         where: {
//           id: studentId
//         }
//       })
//         .then(account => {
//           if (classroom && account) {
//             Account_Class.create({
//               classroomId: classroomId,
//               accountId: studentId
//             })
//               .then(account_class => {
//                 res.redirect('/classroom');
//               })
//               .catch(err => {
//                 console.log(err);
//               });
//           }
//         });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.postDeleteStudentWithClassroomId = (req, res, next) => {
//   const classroomId = req.params.classroomId;
//   const studentId = req.params.classroomId;

//   Account_Class.findOne({
//     where: {
//       classroomId: classroomId,
//       studentId: studentId
//     }
//   })
//     .then(account_class => {
//       if (account_class) {
//         return account_class.destroy();
//       } else {
//         console.log("Classroom: Delete Relation ship faild! Id doesn't exists!")
//       }
//     })
//     .then(results => {
//       console.log("Classroom: Delete Relationship with at Account_Classroom successfully!");
//       return res.redirect('/classroom');
//     })
// };