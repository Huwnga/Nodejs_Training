const Account = require('../models/account');
const Info_Account = require('../models/info_account');
const Account_Class = require('../models/account_class');
const Role = require('../models/role');
const Class = require('../models/class');
const Task = require('../models/task');

exports.getDashBoard = (req, res, next) => {
  Account.findAll()
    .then(accounts => {
      console.log("Dashboard: " + account);

      res.render('admin/dashboard', {
        accounts: accounts,
        pageTitle: 'DashBoard',
        path: 'admin/dashboard'
      });
    })
    .catch(err => {
      console.log(err);
    });

};

exports.getAllAccount = (req, res, next) => {
  Account.findAll({
    include: {
      all: true,
      nested: true
    }
  })
    .then(accounts => {
      res.render('admin/account/index', {
        accounts: accounts,
        pageTitle: 'All Account',
        path: 'admin/account'
      });
    })
    .catch(err => console.log(err));
};

exports.getTodolistbyAccountId = (req, res, next) => {
  const accountId = req.params.accountId;

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
      if (account.role.id === 3) {
        res.render('admin/todolist/index', {
          account: account,
          pageTitle: 'All Todolist',
          path: 'admin/account'
        });
      }
    })
    .catch(err => console.log(err));
};

// classroom get
exports.getAllClassroom = (req, res, next) => {
  Class.findAll({
    include: {
      all: true,
      nested: true
    }
  })
    .then(classrooms => {
      res.render('admin/classmate/index', {
        classrooms: classrooms,
        pageTitle: 'Classrooms',
        path: '/admin/classroom'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAddClassroom = (req, res, next) => {
  const classroom = {
    id: null,
    name: null
  }

  res.render('admin/classroom/index', {
    classroom: classroom,
    pageTitle: 'Classrooms',
    path: '/admin/classroom/add'
  });
};

exports.getUpdateClassroom = (req, res, next) => {
  const classroomId = req.params.classroomId;

  Class.findOne({
    where: {
      id: classroomId
    }
  })
    .then(classroom => {
      if (classroom) {
        res.render('admin/classroom/index', {
          classroom: classroom,
          pageTitle: 'Classrooms',
          path: '/admin/classroom/add'
        });
      } else {
        console.log('Classroom: Get Update Method Fail! Classroom doesn\'t exists');
        res.redirect('/admin/classroom/add');
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAddStudentWithClassroom = (req, res, next) => {
  Class.findAll()
    .then(classrooms => {
      Account.findAll()
        .then(accounts => {
          res.render('admin/classmate/add-student', {
            classrooms: classrooms,
            accounts: accounts,
            pageTitle: 'Add Student With Classroom',
            path: '/admin/classroom/add_student'
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};
// classroom post
exports.postAddClassroom = (req, res, next) => {
  const name = req.body.name;

  Class.create({
    name: name
  })
    .then(classroom => {
      console.log("Add Successfully with id: " + classroom.id);
      res.redirect('/admin/classroom');
    })
    .catch(err => {
      console.log(err);
    })
};

exports.postUpdateClassroom = (req, res, next) => {
  const classroomId = req.params.classroomId;
  const id = req.body.id;
  const name = req.body.name;

  if (classroomId != id) {
    return redirect('/admin/classroom');
  }

  Class.findOne({
    where: {
      id: id
    }
  })
    .then(classroom => {
      classroom.update({
        name: name
      });
      classroom.save();
    })
    .then(results => {
      console.log("Classroom: Update successfully");
      return res.redirect('/classroom');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteClassroom = (req, res, next) => {
  const classroomId = req.params.classroomId;

  Class.findOne({
    where: {
      id: classroomId
    }
  })
    .then(classroom => {
      if (classroom) {
        return classroom.destroy();
      }
    })
    .then(results => {
      console.log("Classroom: Delete successfully");
      return res.redirect('/classroom');
    })
    .catch(err => console.log(err));
};

exports.postAddStudentWithClassroom = (req, res, next) => {
  const classroomId = req.body.classrooms;
  const studentId = req.body.students;

  Class.findOne({
    where: {
      id: classroomId
    }
  })
    .then(classroom => {
      Account.findOne({
        where: {
          id: studentId
        }
      })
        .then(account => {
          if (classroom && account) {
            Account_Class.create({
              classroomId: classroomId,
              accountId: studentId
            })
              .then(account_class => {
                res.redirect('/classroom');
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteStudentWithClassroomId = (req, res, next) => {
  const classroomId = req.params.classroomId;
  const studentId = req.params.classroomId;

  Account_Class.findOne({
    where: {
      classroomId: classroomId,
      studentId: studentId
    }
  })
    .then(account_class => {
      if (account_class) {
        return account_class.destroy();
      } else {
        console.log("Classroom: Delete Relation ship faild! Id doesn't exists!")
      }
    })
    .then(results => {
      console.log("Classroom: Delete Relationship with at Account_Classroom successfully!");
      return res.redirect('/classroom');
    })
};