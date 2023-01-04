const Admin = require('../model/admin');
const apiUrlAccount = Admin.apiUrlAccount;
const apiUrlClassroom = Admin.apiUrlClassroom;
const apiUrlRole = Admin.apiUrlRole;

exports.getAccounts = async (req, res, next) => {
  await renderEjsPageWithApiGet("messageAdminAccount", 'admin/account/index', apiUrlAccount.account, req, res, next);
}

exports.getAccount = async (req, res, next) => {
  await renderEjsPageWithApiGet("messageAdminAccount", 'admin/account/show', apiUrlAccount.account, req, res, next);
}

exports.getAddAccount = (req, res, next) => {
  const data = {
    error: {
      status: 200,
      message: 'OK'
    },
    data: {
      account: {
        info_account: {}
      },
      pageTitle: 'Add Account',
      path: '/admin/account'
    }
  };

  Admin.getAll(apiUrlRole.role, token)
    .then(response => {
      return response.json();
    })
    .then(roleResults => {
      const roleError = roleResults.error;
      const roleData = roleResults.data;

      if (roleError.status == 200) {
        return res.render('admin/account/add.ejs', {
          data: data.data,
          roles: roleData.roles
        });
      }
    })
    .catch(err => console.log(err));
}

exports.getUpdateAccount = (req, res, next) => {
  const params = req.query;

  Admin.get(apiUrlAccount.account, token, params)
    .then(response => {
      return response.json();
    })
    .then(results => {
      Admin.getAll(apiUrlRole.role, token)
        .then(response => {
          return response.json();
        })
        .then(roleResults => {
          const roleError = roleResults.error;
          const roleData = roleResults.data;
          const error = results.error;
          const data = results.data;

          if (error.status == 200 && roleError.status == 200) {
            return res.render('admin/account/update.ejs', {
              data: data,
              roles: roleData.roles
            });
          }
        })
        .catch(err => console.log(err));
    })
}

exports.postAccountActive = (req, res, next) => {
  return renderEjsPageWithApiPost('messageAdminAccount', apiUrlAccount.active, req, res, next);
  const token = req.cookies.token;
  const params = req.query;
  const body = req.body;

  Admin.postOne(apiUrlAccount.active, token, body, params)
    .then(response => {
      return response.json();
    })
    .then(results => {
      const error = results.error;
      const data = results.data;

      if (error.status == 200) {
        req.flash('messageAdminAccount', error.message);
        return res.redirect(data.path);
      }
    })
    .catch(err => console.log(err));
}

exports.postAccountInactive = (req, res, next) => {
  return renderEjsPageWithApiPost('messageAdminAccount', apiUrlAccount.inactive, req, res, next);
  const token = req.cookies.token;
  const params = req.query;
  const body = req.body;

  Admin.postOne(apiUrlAccount.inactive, token, body, params)
    .then(response => {
      return response.json();
    })
    .then(results => {
      const error = results.error;
      const data = results.data;

      if (error.status == 200) {
        req.flash('messageAdminAccount', error.message);
        return res.redirect(data.path);
      }
    })
    .catch(err => console.log(err));
}

exports.postAddAccount = (req, res, next) => {
  return renderEjsPageWithApiPost('messageAdminAccount', apiUrlAccount.add, req, res, next);
  const token = req.cookies.token;
  const body = req.body;

  Admin.post(apiUrlAccount.add, token, body)
    .then(response => {
      return response.json();
    })
    .then(results => {
      const error = results.error;
      const data = results.data;

      if (error.status == 200) {
        req.flash('messageAdminAccount', error.message);

        return res.redirect(data.path);
      }
    })
    .catch(err => console.log(err));
}

exports.postUpdateAccount = (req, res, next) => {
  return renderEjsPageWithApiPost('messageAdminAccount', apiUrlAccount.update, req, res, next);
  const token = req.cookies.token;
  const body = req.body;

  Admin.post(apiUrlAccount.update, token, body)
    .then(response => {
      return response.json();
    })
    .then(results => {
      const error = results.error;
      const data = results.data;

      if (error.status == 200) {
        req.flash('messageAdminAccount', error.message);

        return res.redirect(data.path);
      }
    })
    .catch(err => console.log(err));
}

exports.getClassrooms = async (req, res, next) => {
  await renderEjsPageWithApiGet("messageAdminClassroom", 'admin/classroom/index', apiUrlClassroom.classroom, req, res, next);
}

exports.getClassroom = async (req, res, next) => {
  await renderEjsPageWithApiGet("messageAdminClassroom", 'admin/classroom/show', apiUrlClassroom.classroom, req, res, next);
}

// get data a apiUrl and return htmlpage with data and message(only ejs frame)
async function renderEjsPageWithApiGet(messageName, pagePath, urlApi, req, res, next) {
  const params = req.query;
  const message = req.flash(messageName);
  const token = req.cookies.token;
  console.log(params);
  console.log(params.toString());
  console.log(params !== {});

  Admin.get(urlApi, token, params)
    .then(response => {
      return response.json();
    })
    .then(results => {
      const error = results.error;
      const data = results.data;

      if (error.status == 200) {
        return res.render(pagePath, {
          data: data,
          message: message
        });
      }
    })
    .catch(err => console.log(err));
}

// post data a apiUrl and return htmlpage with data and message(only ejs frame)
async function renderEjsPageWithApiPost(messageName, urlApi, req, res, next) {
  const params = req.query;
  const token = req.cookies.token;

  Admin.get(urlApi, token, params)
    .then(response => {
      return response.json();
    })
    .then(results => {
      const error = results.error;
      const data = results.data;

      if (error.status == 200) {
        req.flash(messageName, error.message);

        return res.redirect(data.path);
      }
    })
    .catch(err => console.log(err));
}