const Account = require('../models/account');
const Account_Class = require("../models/account_class");
const Class = require('../models/class');
const Info_Account = require('../models/info_account');
const Role = require('../models/role');
const Task = require('../models/task');

exports.getAllClassroom = (req, res, next) => {
  Account.findAll({
    where: {
      id: req.cookies.isTeacher.id
    },
    include: {
      model: Class
    }
  })
    .then(accounts => {
      res.render('teacher/all_classroom', {
        classrooms: accounts[0].classes,
        pageTitle: 'Teacher Classroom',
        path: 'teacher/classroom'
      });
    })
    .catch(err => console.log(err));
}

exports.getAClassroom = (req, res, next) => {
  const classroomId = req.params.classroomId;

  Class.findOne({
    where: {
      id: classroomId
    },
    include: {
      model: Account,
      include: [{
        model: Info_Account
      }]
    }
  })
    .then(classroom => {
      console.log(classroom.accounts[0].info_account);
      res.render('teacher/classroom', {
        classroom: classroom,
        pageTitle: 'Teacher Classroom',
        path: 'teacher/classroom'
      });
    })
    .catch(err => console.log(err));
}

exports.getAStudent = (req, res, next) => {
  const studentId = req.params.studentId;

  Account.findOne({
    where: {
      id: studentId
    },
    include: { 
      all: true,
      nested: true 
    }
  })
    .then(student => {
      console.log(student);
      res.render('teacher/student', {
        student: student,
        pageTitle: 'Teacher Classroom',
        path: 'teacher/student'
      });
    })
    .catch(err => console.log(err));
}