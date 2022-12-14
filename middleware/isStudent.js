const jwt = require('jsonwebtoken');
const Account = require('../models/account');

module.exports = (req, res, next) => {
  const token = req.header('token');
  try {
    var data = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: {
          status: 401,
          message: err.toString()
        },
        data: {}
      });
    }
  }

  if (data) {
    Account.findOne({
      where: {
        id: data.userId
      }
    })
      .then(account => {
        if (account.roleId != 3) {
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

    req.userId = data.userId;
    next();
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