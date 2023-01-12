const Admin = require('../model/admin');
const apiUrlAccount = Admin.apiUrlAccount;
const apiUrlClassroom = Admin.apiUrlClassroom;
const apiUrlRole = Admin.apiUrlRole;
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

// account
exports.getAccounts = (req, res, next) => {
  return renderEjsPageWithApiGet("messageAdminAccount", 'admin/account/index', apiUrlAccount.account, req, res, next);
}

exports.getAccount = (req, res, next) => {
  return renderEjsPageWithApiGet("messageAdminAccount", 'admin/account/show', apiUrlAccount.account, req, res, next);
}

exports.getAddAccount = (req, res, next) => {
  const body = req.body;
  const message = req.flash("messageAdminAccount");

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
          roles: roleData.roles,
          message: message
        });
      }
    })
    .catch(err => console.log(err));
}

exports.getUpdateAccount = (req, res, next) => {
  const body = req.body;
  const params = req.query;
  const message = req.flash("messageAdminAccount");

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
              roles: roleData.roles,
              message: message
            });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

exports.postAddAccount = (req, res, next) => {
  const avatarURL = localStorage.getItem('avatar');
  req.body.avatar = avatarURL;

  return renderEjsPageWithApiPost('messageAdminAccount', apiUrlAccount.add, req, res, next);
}

exports.postUpdateAccount = (req, res, next) => {
  const avatarURL = localStorage.getItem('avatar');
  req.body.avatar = avatarURL;

  return renderEjsPageWithApiPost('messageAdminAccount', apiUrlAccount.update, req, res, next);
}

exports.postAccountActive = (req, res, next) => {
  return renderEjsPageWithApiPost('messageAdminAccount', apiUrlAccount.active, req, res, next);
}

exports.postAccountInactive = (req, res, next) => {
  return renderEjsPageWithApiPost('messageAdminAccount', apiUrlAccount.inactive, req, res, next);
}

// classroom
exports.getClassrooms = (req, res, next) => {
  return renderEjsPageWithApiGet("messageAdminClassroom", 'admin/classroom/index', apiUrlClassroom.classroom, req, res, next);
}

exports.getClassroom = (req, res, next) => {
  return renderEjsPageWithApiGet("messageAdminClassroom", 'admin/classroom/show', apiUrlClassroom.classroom, req, res, next);
}

exports.getAddClassroom = (req, res, next) => {
  const message = req.flash("messageAdminClassroom");

  const data = {
    classroom: {},
    pageTitle: 'Add Classroom',
    path: '/admin/classroom'
  };

  return res.render('admin/classroom/add', {
    data: data,
    message: message
  });
}

exports.getUpdateClassroom = (req, res, next) => {
  return renderEjsPageWithApiGet("messageAdminClassroom", 'admin/classroom/update', apiUrlClassroom.classroom, req, res, next);
}

exports.getAddStudentWithClassroom = (req, res, next) => {
  const params = req.query;
  const token = req.cookies.token;
  const message = req.flash("messageAdminClassroom");

  Admin.get(apiUrlClassroom.classroom, token, params)
    .then(classroomResponse => {
      return classroomResponse.json();
    })
    .then(classroomResults => {
      Admin.getAll(apiUrlAccount.account, token)
        .then(accountRespone => {
          return accountRespone.json();
        })
        .then(accountResults => {
          const classroomError = classroomResults.error;
          const classroomData = classroomResults.data;
          const accountError = accountResults.error;
          const accountData = accountResults.data;

          if (classroomError.status == 200 && accountError.status == 200) {
            return res.render('admin/classroom/add-account', {
              data: classroomData,
              accounts: accountData.accounts,
              message: message
            });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
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

exports.postAddAccountWithClassroom = (req, res, next) => {
  return renderEjsPageWithApiPost("messageAdminClassroom", apiUrlClassroom.addStudent, req, res, next);
}

exports.postDeleteAccountWithClassroom = (req, res, next) => {
  return renderEjsPageWithApiPost("messageAdminClassroom", apiUrlClassroom.removeStudent, req, res, next);
}

// get data a apiUrl and return htmlpage with data and message(only ejs framework)
function renderEjsPageWithApiGet(messageName, pagePath, urlApi, req, res, next) {
  const params = req.query;
  const message = req.flash(messageName);
  const token = req.cookies.token;
  const body = req.body;

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
          body: body,
          message: message
        });
      } else {
        return res.redirect(data.path);
      }
    })
    .catch(err => console.log(err));
}

// post data a apiUrl and return htmlpage with data and message(only ejs framework)
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

      if (error.status != 200) {
        req.flash(messageName, error.message);

        return res.redirect(data.path);
      } else {
        req.flash(messageName, error.message);

        return res.redirect(data.path);
      }
    })
    .catch(err => console.log(err));
}