const port = "http://localhost:3000/";
const Account = require('../models/account');
const Info_Account = require('../models/info_account');
const Account_Class = require('../models/account_class');
const Role = require('../models/role');
const Class = require('../models/class');
const Task = require('../models/task');
const { INTEGER } = require('sequelize');
const multer = require('multer');
const uploadAvatar = require('../util/uploadAvatar');

exports.getAllAccount = (req, res, next) => {
  const accountId = req.query.accountId;
  const userId = req.userId;

  Account.findOne({
    where: {
      id: userId
    },
    order: [
      ['updatedAt', 'DESC'],
    ],
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
          order: [
            ['updatedAt', 'DESC'],
          ],
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
                  path: '/admin/account'
                }
              });
            } else {
              return res.status(200).json({
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
          order: [
            ['updatedAt', 'DESC'],
          ],
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
          return res.status(200).json({
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
  const body = req.body;

  if (!body) {
    return res.status(200).json({
      error: {
        status: 401,
        message: 'Don\'t send a emty data!'
      },
      data: {
        path: '/admin/account'
      }
    });
  }

  const username = body.username;
  const avatarURL = body.avatarURL;
  const password = body.password;
  const full_name = body.full_name;
  const gender = body.gender;
  const roleId = body.roles;

  if (!(username && avatarURL && password && full_name && gender && roleId)) {
    return res.status(200).json({
      error: {
        status: 401,
        message: 'Don\'t send a emty data!'
      },
      data: {
        path: '/admin/account'
      }
    });
  }

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
                  if (account1) {
                    Info_Account.create({
                      full_name: full_name,
                      avatar: avatarURL,
                      gender: gender,
                      accountId: account.id
                    })
                      .then(info => {
                        if (info) {
                          return res.status(200).json({
                            error: {
                              status: 200,
                              message: 'Add Account Successfully!'
                            },
                            data: {
                              account: account,
                              pageTitle: 'All Account',
                              path: '/admin/account'
                            }
                          });
                        } else {
                          return res.status(200).json({
                            error: {
                              status: 401,
                              message: 'Add Account Faild!'
                            },
                            data: {
                              body: JSON.stringify(req.body),
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
                          data: {}
                        });
                      });
                  } else {
                    return res.status(200).json({
                      error: {
                        status: 401,
                        message: 'Add Account Faild!'
                      },
                      data: {
                        body: JSON.stringify(req.body),
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
                    data: {}
                  });
                });
            } else {
              return res.status(200).json({
                error: {
                  status: 401,
                  message: 'Add Account Faild!'
                },
                data: {
                  body: JSON.stringify(req.body),
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
              data: {}
            });
          });
      } else {
        return res.status(200).json({
          error: {
            status: 401,
            message: 'This username is exists!'
          },
          data: {
            body: JSON.stringify(req.body),
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
        data: {}
      });
    });
};

exports.postUpdateAccount = (req, res, next) => {
  const body = req.body;

  if (!body) {
    return res.status(200).json({
      error: {
        status: 401,
        message: 'Don\'t send a emty data!'
      },
      data: {
        path: '/admin/account'
      }
    });
  }

  const id = body.id;
  const username = body.username;
  const avatar = body.avatar;
  const password = body.password;
  const full_name = body.full_name;
  const gender = body.gender;
  const roleId = body.roles;

  Account.findOne({
    where: {
      id: id
    },
    include: {
      all: true,
      nested: true
    }
  })
    .then(acc => {
      if (acc) {
        if (username != acc.username) {
          Account.findOne({
            where: {
              username: username,
            },
            include: {
              all: true,
              nested: true
            }
          })
            .then(account => {
              if (!account) {
                acc.update({
                  username: username,
                  password: password,
                  roleId: roleId,
                });
                acc.save();

                Info_Account.findOne({
                  where: {
                    accountId: id
                  }
                })
                  .then(info => {
                    if (info) {
                      info.update({
                        avatar: avatar,
                        full_name: full_name,
                        gender: gender,
                      });
                      info.save();
                    } else {
                      Info_Account.create({
                        full_name: full_name,
                        avatar: avatar,
                        gender: gender,
                        accountId: id
                      })
                        .then(info => {
                          if (info) {
                            return res.status(200).json({
                              error: {
                                status: 200,
                                message: 'Update Account Successfully!'
                              },
                              data: {
                                accountId: id,
                                path: '/admin/account'
                              }
                            });
                          } else {
                            return res.status(200).json({
                              error: {
                                status: 401,
                                message: 'Update Account Fail!'
                              },
                              data: {
                                body: JSON.stringify(req.body),
                                path: "/admin/account/edit?accountId=" + id
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
                    message: "Username: " + username + " is exists!"
                  },
                  data: {
                    body: JSON.stringify(req.body),
                    path: "/admin/account/edit?accountId=" + id
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
          acc.update({
            username: username,
            password: password,
            roleId: roleId,
          });
          acc.save();

          Info_Account.findOne({
            where: {
              accountId: id
            }
          })
            .then(info => {
              if (info) {
                info.update({
                  avatar: avatar,
                  full_name: full_name,
                  gender: gender,
                });
                info.save();

                return res.status(200).json({
                  error: {
                    status: 200,
                    message: 'Update Account Successfully!'
                  },
                  data: {
                    account: acc,
                    path: "/admin/account"
                  }
                });
              } else {
                Info_Account.create({
                  full_name: full_name,
                  avatar: avatar,
                  gender: gender,
                  accountId: id
                })
                  .then(info => {
                    if (info) {
                      return res.status(200).json({
                        error: {
                          status: 200,
                          message: 'Update Account Successfully!'
                        },
                        data: {
                          account: acc,
                          path: "/admin/account"
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
      } else {
        return res.status(200).json({
          error: {
            status: 401,
            message: 'This Account Doesn\'t exists!'
          },
          data: {
            body: JSON.stringify(req.body),
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
        data: {}
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
  const avatarURL = req.body.avatarURL;
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
            accountId: account.id
          }
        })
          .then(info => {
            if (info != null) {
              info.update({
                full_name: fullname,
                avatar: avatarURL,
                gender: gender,
                dob: dob,
                mobile: mobile,
                address: address
              });
              info.save();
            } else {
              Info_Account.create({
                full_name: full_name,
                avatar: avatarURL,
                gender: gender,
                dob: dob,
                mobile: mobile,
                address: address,
                accountId: account.id
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
            path: '/admin/account'
          }
        });
      } else {
        return res.status(200).json({
          error: {
            status: 401,
            message: 'This Account Doesn\'t exists !'
          },
          data: {
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
        return res.status(200).json({
          error: {
            status: 401,
            message: 'This Account Doesn\'t exists'
          },
          data: {
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
        data: {}
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
      order: [
        ['updatedAt', 'DESC'],
      ],
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
    Class.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
      include: {
        all: true,
        nested: true
      }
    })
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
          data: {}
        });
      });
  }
};

exports.postAddClassroom = (req, res, next) => {
  const name = req.body.name;

  Class.findOne({
    where: {
      name: name
    }
  })
    .then(existsClass => {
      if (existsClass) {
        return res.status(200).json({
          error: {
            status: 401,
            message: name + " is exists!"
          },
          data: {
            body: JSON.stringify(req.body),
            path: '/admin/classroom/add'
          }
        });
      } else {
        Class.create({
          name: name
        })
          .then(classroom => {
            return res.status(200).json({
              error: {
                status: 200,
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
            return res.status(400).json({
              error: {
                status: 400,
                message: err.toString()
              },
              data: {}
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
        data: {}
      });
    });

};

exports.postUpdateClassroom = (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;

  Class.findOne({
    where: {
      id: id
    }
  })
    .then(classroom => {
      if (classroom) {
        Class.findOne({
          where: {
            name: name
          }
        })
          .then(existsClass => {
            if (existsClass && classroom.name != name) {
              return res.status(200).json({
                error: {
                  status: 401,
                  message: name + " is exists!"
                },
                data: {
                  body: JSON.stringify(req.body),
                  path: '/admin/classroom/add'
                }
              });
            } else {
              classroom.update({
                name: name
              });
              classroom.save();

              return res.status(200).json({
                error: {
                  status: 200,
                  message: 'Update Classroom Successfully!'
                },
                data: {
                  classroom: classroom,
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
              data: {}
            });
          });
      } else {
        return res.status(200).json({
          error: {
            status: 200,
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
        data: {}
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
            status: 200,
            message: 'Delete Successfully!'
          },
          data: {
            classroomId: classroomId,
            pageTitle: 'Classrooms',
            path: '/admin/classroom'
          }
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
                    })
                      .then(acc_class => {
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
                        path: "/admin/classroom/add_account?classroomId=" + classroom.id
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
                  path: "/admin/classroom/add_account?classroomId=" + classroom.id
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
};

exports.postDeleteStudentWithClassroom = (req, res, next) => {
  const classroomId = req.body.classroomId;
  const accountId = req.body.accountId;

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
                        message: 'Remove Account in Classroom Successfully!'
                      },
                      data: {
                        classroomId: account_class.classroomId,
                        studentId: account_class.studentId,
                        pageTitle: 'Classrooms',
                        path: '/admin/classroom'
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
};

exports.getRoles = (req, res, next) => {
  Role.findAll()
    .then(roles => {
      return res.status(200).json({
        error: {
          status: 200,
          message: 'OK'
        },
        data: {
          roles: roles
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

exports.postUploadAvatar = (req, res, next) => {
  uploadAvatar(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(200).json({
        error: {
          status: 500,
          message: `Multer uploading error: ${err.message}`
        },
        data: {}
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      if (err.name == 'ExtensionError') {
        return res.status(200).json({
          error: {
            status: 413,
            message: err.message
          },
          data: {}
        });
      } else {
        return res.status(200).json({
          error: {
            status: 500,
            message: `Unknown uploading error: ${err.message}`
          },
          data: {}
        });
      }
    } else {
      const file = req.files;

      if (file.length < 1) {
        return res.status(200).json({
          error: {
            status: 401,
            message: 'Must upload file!'
          },
          data: {}
        });
      } else if (file.length > 1) {
        return res.status(200).json({
          error: {
            status: 401,
            message: 'Cannot upload multipe file!'
          },
          data: {}
        });
      } else {
        // Everything went fine.
        return res.status(200).json({
          error: {
            status: 200,
            message: 'Your files uploaded.'
          },
          data: {
            avatarURL: 'http://localhost:3000/avatar/' + req.files[0].filename
          }
        });
      }
    }
  });
}