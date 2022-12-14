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

// exports.getAClassroom = (req, res, next) => {
//   const classroomId = req.params.classroomId;

//   Class.findOne({
//     where: {
//       id: classroomId
//     },
//     include: {
//       model: Account,
//       include: [{
//         model: Info_Account
//       }]
//     }
//   })
//     .then(classroom => {
//       console.log(classroom.accounts[0].info_account);
//       res.render('teacher/classroom', {
//         classroom: classroom,
//         pageTitle: 'Teacher Classroom',
//         path: 'teacher/classroom'
//       });
//     })
//     .catch(err => console.log(err));
// }

// exports.getAStudent = (req, res, next) => {
//   const studentId = req.params.studentId;

//   Account.findOne({
//     where: {
//       id: studentId
//     },
//     include: { 
//       all: true,
//       nested: true 
//     }
//   })
//     .then(student => {
//       console.log(student);
//       res.render('teacher/student', {
//         student: student,
//         pageTitle: 'Teacher Classroom',
//         path: 'teacher/student'
//       });
//     })
//     .catch(err => console.log(err));
// }