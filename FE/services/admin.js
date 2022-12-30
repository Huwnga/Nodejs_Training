const Admin = require('../model/admin');
const apiUrlAccount = Admin.apiUrlAccount;
const apiUrlClassroom = Admin.apiUrlClassroom;

exports.getAccounts = (req, res, next) => {
  const message = req.flash("messageAdminAccount")[0];
  const token = req.cookies.token;

  Admin.getAll(apiUrlAccount.account, token)
    .then(response => {
      return response.json();
    })
    .then(results => {
      const error = results.error;
      const data = results.data;

      if (error.status == 200) {
        return res.render('admin/account/index', {
          data: data,
          message: `${message}`
        });
      }
    })
    .catch(err => console.log(err));
}

exports.getAddAccount = (req, res, next) => {
  const data = {
    error: {
      status: 200,
      message: 'OK'
    },
    data: {
      account: {},
      pageTitle: 'Add Account',
      path: '/admin/account'
    }
  };

  
  return res.render('admin/account/add.ejs', {
    data: data.data,
    // roles: 
  });
}

exports.getUpdateAccount = (req, res, next) => {
  const params = req.query;

  Admin.getOne(apiUrlAccount.account, token, params)
  .then(response => {
    return response.json();
  })
  .then(results => {
    const error = results.error;
    const data = results.data;

    if(error.status == 200) {
      return res.render('admin/account/update.ejs', {
        data: data
      });
    }
  })
}