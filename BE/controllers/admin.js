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
    },
    include: {
      all: true,
      nested: true
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
            if (account) {
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
            } else {
              return res.status(401).json({
                error: {
                  status: 401,
                  message: 'This Account Doesn\'t exists'
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
            roleId: roleId
          }
        )
          .then(account => {
            if (account) {
              Account.findOne({
                where: {
                  id: account.id,
                },
                include: {
                  all: true,
                  nested: true
                }
              })
                .then(account1 => {
                  Info_Account.create({
                    full_name: full_name,
                    avatar: account1.role.name + account.id + ".png",
                    gender: gender,
                    accountId: account.id
                  })
                    .catch(err => {
                      return res.status(400).json({
                        error: {
                          status: 400,
                          message: err.toString()
                        },
                        data: {
                          account: account1,
                          pageTitle: 'All Account',
                          path: '/admin/account/add'
                        }
                      });
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
              },
              include: {
                all: true,
                nested: true
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
};

exports.postUpdateAccount = (req, res, next) => {
  const id = req.body.id;
  const username = req.body.username;
  const password = req.body.password;
  const full_name = req.body.fullname;
  const gender = req.body.gender;
  const roleId = req.body.roles;

  Account.findOne({
    where: {
      id: id
    }
  })
    .then(acc => {
      if (acc) {
        if (username != acc.username) {
          Account.findOne({
            where: {
              username: username,
            }
          })
            .then(account => {
              if (!account) {
                account.update(
                  {
                    username: username,
                    password: password,
                    status: 1,
                    roleId: roleId,
                  }
                );
                account.save();

                Info_Account.findOne({
                  where: {
                    accountId: id
                  }
                })
                  .then(info => {
                    if (info) {
                      info.update({
                        full_name: full_name,
                        gender: gender,
                      });
                      info.save();
                    } else {
                      Info_Account.create({
                        full_name: fullname,
                        avatar: account.role.name + account.id + ".png",
                        gender: gender,
                        accountId: id
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
                        });;
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

                return res.status(201).json({
                  error: {
                    status: 201,
                    message: 'Update Account Successfully!'
                  },
                  data: {
                    accountId: id
                  }
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
        } else {
          acc.update(
            {
              username: username,
              password: password,
              status: 1,
              roleId: roleId,
            }
          );
          acc.save();

          Info_Account.findOne({
            where: {
              accountId: id
            }
          })
            .then(info => {
              if (info) {
                info.update({
                  full_name: full_name,
                  gender: gender,
                });
                info.save();
              } else {
                Info_Account.create({
                  full_name: fullname,
                  avatar: account.role.name + account.id + ".png",
                  gender: gender,
                  accountId: id
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
                  });;
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

          return res.status(201).json({
            error: {
              status: 201,
              message: 'Update Account Successfully!'
            },
            data: {
              account: account,
              pageTitle: "All Account",
              path: "/admin/account"
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
            accountId: id,
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
  const id = req.body.id;
  const fullname = req.body.full_name;
  const avatar = req.body.avatar;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const mobile = req.body.mobile;
  const address = req.body.address;

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
      } else {
        return res.status(401).json({
          error: {
            status: 401,
            message: 'This Account Doesn\'t exists'
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
          pageTitle: 'Page Not Found',
          path: '/404'
        }
      });
    });

};

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
            account: account,
            pageTitle: 'All Account',
            path: '/admin/account'
          }
        });
      } else {
        return res.status(401).json({
          error: {
            status: 401,
            message: 'This Account Doesn\'t exists'
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
};

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
            account: account,
            pageTitle: 'All Account',
            path: '/admin/account'
          }
        });
      } else {
        return res.status(401).json({
          error: {
            status: 401,
            message: 'This Account Doesn\'t exists'
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
};
// classroom
exports.getAllClassroom = (req, res, next) => {
  const classroomId = req.query.classroomId;

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
        if (classroom) {
          return res.status(200).json({
            error: {
              status: 200,
              message: 'OK'
            },
            data: {
              classroom: classroom,
              pageTitle: 'Classrooms',
              path: '/admin/classroom'
            }
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
          data: {
            classroomId: classroomId,
            pageTitle: 'Classrooms',
            path: '/admin/classroom'
          }
        });
      });
  } else {
    Class.findAll()
      .then(classrooms => {
        return res.status(200).json({
          error: {
            status: 200,
            message: 'OK'
          },
          data: {
            classrooms: classrooms,
            pageTitle: 'Classrooms',
            path: '/admin/classroom'
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
            pageTitle: 'Classrooms',
            path: '/admin/classroom'
          }
        });
      });
  }
};

exports.postAddClassroom = (req, res, next) => {
  const name = req.body.name;

  Class.create({
    name: name
  })
    .then(classroom => {
      return res.status(201).json({
        error: {
          status: 201,
          message: 'Create Classroom Successfully!'
        },
        data: {
          classroom: classroom,
          pageTitle: 'Classrooms',
          path: '/admin/classroom'
        }
      });
    })
    .catch(err => {
      return res.status(401).json({
        error: {
          status: 401,
          message: err.toString()
        },
        data: {
          pageTitle: 'Classrooms',
          path: '/admin/classroom'
        }
      });
    });
};

exports.getUpdateClassroom = (req, res, next) => {
  const classroomId = req.query.classroomId;

  Class.findOne({
    where: {
      id: classroomId
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
            classroom: classroom,
            pageTitle: 'Classrooms',
            path: '/admin/classroom/udpate'
          }
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
            path: '/admin/classroom'
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
          path: '/admin/classroom'
        }
      });
    });
};

exports.postUpdateClassroom = (req, res, next) => {
  const classroomId = req.query.classroomId;
  const id = req.body.id;
  const name = req.body.name;

  if (classroomId != id) {
    return res.status(401).json({
      error: {
        status: 401,
        message: 'Params id with feild id not equals!'
      },
      data: {
        pageTitle: 'Classrooms',
        path: '/admin/classroom'
      }
    });
  }

  Class.findOne({
    where: {
      id: id
    }
  })
    .then(classroom => {
      if (classroom) {
        classroom.update({
          name: name
        });
        classroom.save();

        return res.status(201).json({
          error: {
            status: 201,
            message: 'Update Classroom Successfully'
          },
          data: {
            classroom: classroom,
            pageTitle: 'Classrooms',
            path: '/admin/classroom'
          }
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
            path: '/admin/classroom'
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
          path: '/admin/classroom'
        }
      });
    });
};

exports.postDeleteClassroom = (req, res, next) => {
  const classroomId = req.query.classroomId;

  Class.findOne({
    where: {
      id: classroomId
    }
  })
    .then(classroom => {
      if (classroom) {
        Account_Class.destroy({
          where: {
            classId: classroomId
          }
        });
        Class.destroy({
          where: {
            id: classroomId
          }
        });

        return res.status(200).json({
          error: {
            status: 201,
            message: 'Delete Successfully!'
          },
          data: {
            classroomId: classroomId,
            pageTitle: 'Classrooms',
            path: '/admin/classroom'
          }
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
            path: '/admin/classroom'
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
          classroomId: classroomId,
          pageTitle: 'Classrooms',
          path: '/admin/classroom'
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
                          path: '/admin/classroom'
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
                            path: '/admin/classroom'
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
                        path: '/admin/classroom'
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
                      path: '/admin/classroom'
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
                  path: '/admin/classroom'
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
                path: '/admin/classroom'
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
            path: '/admin/classroom'
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
          path: '/admin/classroom'
        }
      });
    });
};

exports.postDeleteStudentWithClassroomId = (req, res, next) => {
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
            path: '/admin/classroom'
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
            path: '/admin/classroom'
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
          path: '/admin/classroom'
        }
      });
    });
};