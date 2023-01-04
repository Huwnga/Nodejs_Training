const Admin = require('../model/admin');
const apiUrlAccount = Admin.apiUrlAccount;
const apiUrlClassroom = Admin.apiUrlClassroom;
const apiUrlRole = Admin.apiUrlRole;

exports.getAccounts = (req, res, next) => {
  return renderEjsPageWithApiGet("messageAdminAccount", 'admin/account/index', apiUrlAccount.account, req, res, next);
}

exports.getAccount = (req, res, next) => {
  return renderEjsPageWithApiGet("messageAdminAccount", 'admin/account/show', apiUrlAccount.account, req, res, next);
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
    .catch(err => console.log(err));
}

exports.postAccountActive = (req, res, next) => {
  return renderEjsPageWithApiPost('messageAdminAccount', apiUrlAccount.active, req, res, next);
}

exports.postAccountInactive = (req, res, next) => {
  return renderEjsPageWithApiPost('messageAdminAccount', apiUrlAccount.inactive, req, res, next);
}

exports.postAddAccount = (req, res, next) => {
  return renderEjsPageWithApiPost('messageAdminAccount', apiUrlAccount.add, req, res, next);
}

exports.postUpdateAccount = (req, res, next) => {
  return renderEjsPageWithApiPost('messageAdminAccount', apiUrlAccount.update, req, res, next);
}

exports.getClassrooms = (req, res, next) => {
  return renderEjsPageWithApiGet("messageAdminClassroom", 'admin/classroom/index', apiUrlClassroom.classroom, req, res, next);
}

exports.getClassroom = (req, res, next) => {
  return renderEjsPageWithApiGet("messageAdminClassroom", 'admin/classroom/show', apiUrlClassroom.classroom, req, res, next);
}

exports.getAddClassroom = (req, res, next) => {
  const data = {
    classroom: {},
    pageTitle: 'Add Classroom',
    path: '/admin/classroom'
  };

  return res.render('admin/classroom/add', {
    data: data
  });
}

exports.getUpdateClassroom = (req, res, next) => {
  return renderEjsPageWithApiGet("messageAdminClassroom", 'admin/classroom/update', apiUrlClassroom.classroom, req, res, next);
}

exports.postAddClassroom = (req, res, next) => {
  return renderEjsPageWithApiPost("messageAdminClassroom", apiUrlClassroom.add, req, res, next);
}

exports.postUpdateClassroom = (req, res, next) => {
  return renderEjsPageWithApiPost("messageAdminClassroom", apiUrlClassroom.update, req, res, next);
}

exports.postDeleteClassroom = (req, res, next) => {
  return renderEjsPageWithApiPost("messageAdminClassroom", apiUrlClassroom.delete, req, res, next);
}

// get data a apiUrl and return htmlpage with data and message(only ejs frame)
function renderEjsPageWithApiGet(messageName, pagePath, urlApi, req, res, next) {
  const params = req.query;
  const message = req.flash(messageName);
  const token = req.cookies.token;

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
function renderEjsPageWithApiPost(messageName, urlApi, req, res, next) {
  const token = req.cookies.token;
  const params = req.query;
  const body = req.body;

  Admin.postOne(urlApi, token, body, params)
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