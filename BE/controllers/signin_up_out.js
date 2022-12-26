const jwt = require('jsonwebtoken');
const Account = require('../models/account');
const Account_Class = require('../models/account_class');
const Class = require('../models/class');
const Info_Account = require('../models/info_account');
const Role = require('../models/role');

// Get Method
exports.getSignin = (req, res, next) => {
  return res.json({
    error: {
      status: 200,
      message: "OK"
    },
    data: {
      pageTitle: 'Sign In',
      path: '/auth/signin'
    }
  });
};

// exports.getLogout = (req, res, next) => {
//   res.render('auth/sign-in.ejs', {
//     pageTitle: '',
//     path: ''
//   });
// };


// Post Method
exports.postSignin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  Account.findOne({
    where: {
      username: username
    },
    include: {
      all: true,
      nested: true
    }
  })
    .then(account => {
      if (account) {
        if (account.password == password) {
          const token = jwt.sign(
            { userId: account.id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          );
          account.update({
            token: token
          });
          account.save();

          return res.status(200).json({
            error: {
              status: 200,
              message: "Login Successfully!"
            },
            data: {
              account: account,
              role: account.roles
            }
          });
        } else {
          return res.json({
            error: {
              status: 401,
              message: "Wrong Username or Password!"
            },
            data: {
              pageTitle: 'Sign In',
              path: '/auth/signin'
            }
          });
        }
      } else {
        return res.json({
          error: {
            status: 401,
            message: "Wrong Username or Password!"
          },
          data: {
            pageTitle: 'Sign In',
            path: '/auth/signin'
          }
        });
      }
    })
    .catch(err => res.status(400).json({
      error: {
        status: 400,
        message: err
      },
      data: {
        pageTitle: 'Page Not Found',
        path: '/404'
      }
    }));
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const full_name = req.body.full_name;

  Account.findOne({
    where: {
      username: username,
    }
  })
    .then(account => {
      if (!account) {
        Account.create({
          username: username,
          password: password,
          status: 1,
          roleId: 3,
        })
          .then(account => {
            Info_Account.create({
              full_name: full_name,
              accountId: account.id,
            })
              .catch(err => {
                return res.status(400).json({
                  error: {
                    status: 400,
                    message: err
                  },
                  data: {}
                })
              });

            return res.status(201).json({
              error: {
                status: 201,
                message: 'Create Account Successfully!'
              },
              data: {
                nextPath: '/admin/account'
              }
            });
          });
      } else {
        return res.status(401).json({
          error: {
            status: 401,
            message: 'This username already exists!'
          },
          data: {
            pageTitle: 'Sign Up',
            path: '/auth/signup'
          }
        });
      }
    })
    .catch(err => {
      return res.status(400).json({
        error: {
          status: 400,
          message: err
        },
        data: {}
      })
    });
};

exports.postLogout = (req, res, next) => {
  res.clearCookie("isAdmin");
  res.clearCookie("isTeacher");
  res.clearCookie("isStudent");
  res.redirect('/auth/signin');
};
