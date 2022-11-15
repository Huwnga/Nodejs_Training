const Account = require('../models/account');
const Account_Class = require('../models/account_class');
const Class = require('../models/class');
const Info_Account = require('../models/info_account');
const Role = require('../models/role');

// Get Method
exports.getSignin = (req, res, next) => {
  res.render('auth/sign-in', {
    pageTitle: 'Sign In',
    path: '/auth/signin'
  });
};

exports.getSignup = (req, res, next) => {
  Role.findAll()
    .then(roles => {
      Class.findAll()
        .then(classrooms => {
          res.render('auth/sign-up', {
            roles: roles,
            classrooms: classrooms,
            pageTitle: 'Sign Up',
            path: '/auth/signup'
          });
        });
    })
    .catch(err => console.log(err));
};

// exports.getLogout = (req, res, next) => {
//   res.render('auth/sign-in.ejs', {
//     pageTitle: '',
//     path: ''
//   });
// };


// Post Method
exports.postSignin = (req, res, next) => {
  const username = req.body.login_username;
  const password = req.body.login_password;
  Account.findOne({
    where: {
      username: username
    }
  })
    .then(account => {
      if (account) {
        if (account.password == password) {
          res.clearCookie("isAdmin");
          res.clearCookie("isTeacher");
          res.clearCookie("isStudent");

          if (account.roleId == 1) {
            res.cookie('isAdmin', {
              id: account.id,
              roleId: account.roleId
            });

            return res.redirect('/admin/account');

          } else if (account.roleId == 2) {
            res.cookie('isTeacher', {
              id: account.id,
              roleId: account.roleId
            });

            return res.redirect('/teacher');

          } else {
            res.cookie('isStudent', {
              id: account.id,
              roleId: account.roleId
            });

            return res.redirect('/');
          }
        } else {
          console.log('Account or password is wrong!');
          return res.redirect('/auth/signin');
        }
      } else {
        console.log('Account or password is wrong!');
        return res.redirect('/auth/signin');
      }
    })
    .catch();
};

exports.postSignup = (req, res, next) => {
  const username = req.body.signup_username;
  const password = req.body.signup_password;
  const full_name = req.body.signup_fullname;
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
            Info_Account.create(
              {
                full_name: full_name,
                accountId: account.id,
              }
            );

            if (parseInt(account.roleId) == 3) {
              Account_Class.findOne({
                classId: classroomId
              })
                .then(err => {
                  Account_Class.create({
                    quantity: 0,
                    accountId: account.id,
                    classId: classroomId
                  });

                  console.log("Welcome Student" + full_name);
                  return res.redirect('/auth/signin');
                })
                .catch(err => console.log(err));
            }
            return res.redirect('/auth/signin');
          });
      } else {
        console.log('This username already exists!');
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  res.clearCookie("isAdmin");
  res.clearCookie("isTeacher");
  res.clearCookie("isStudent");
  res.redirect('/auth/signin');
};
