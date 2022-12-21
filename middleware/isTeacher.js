const jwt = require('jsonwebtoken');
const Account = require('../models/account');

module.exports = (req, res, next) => {
  const token = req.header('token');

  try {
    var data = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  } catch (err) {
    if (err) {
      return res.status(401).json({
        error: {
          status: 401,
          message: err.toString()
        },
        data: {
          pageTitle: 'Sign In',
          path: '/auth/signin'
        }
      });
    }
  }
  // const user = jwt.verify();
  if (data) {

    Account.findOne({
      where: {
        id: data.userId
      }
    })
      .then(account => {
        if (!account.roleId != 2) {
          return res.status(404).json({
            error: {
              status: 404,
              message: 'Page Not Found'
            },
            data: {
              pageTitle: 'Page Not Found',
              path: '/404'
            }
          });
        } else {
          req.userId = data.userId;
          next();
        }
      })
      .catch(err => {
        return res.status(404).json({
          error: {
            status: 404,
            message: err.toString()
          },
          data: {}
        });
      });
  } else {
    return res.status(401).json({
      error: {
        status: 401,
        message: 'Exipred token'
      },
      data: {
        pageTitle: 'Login',
        next_path: '/auth/login'
      }
    });
  }
}