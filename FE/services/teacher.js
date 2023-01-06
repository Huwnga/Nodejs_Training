const Teacher = require('../model/teacher');
const Admin = require('../model/admin');
const adminService = require('../services/admin');
const apiUrlClassroom = Teacher.apiUrlClassroom;

exports.getClassrooms = (req, res, next) => {
  const message = req.flash('messageTeacherClassroom');
  const token = req.cookies.token;

  Admin.getAll(apiUrlClassroom.classroom, token)
    .then(response => {
      return response.json();
    })
    .then(results => {
      const error = results.error;
      const data = results.data;
      console.log(data.classrooms);
      if (error.status == 200) {
        return res.render('teacher/classrooms', {
          data: data,
          message: message
        });
      }
    })
    .catch(err => console.log(err));
  // if (req.query.classroomId) {
  //   return renderEjsPageWithApiGet('messageTeacherClassroom', 'teacher/classroom', apiUrlClassroom.classroom, res, res, next);
  // } else {
  //   return renderEjsPageWithApiGet('messageTeacherClassroom', 'teacher/classrooms', apiUrlClassroom.classroom, res, res, next);
  // }
}

exports.getAddStudentWithClassroom = (req, res, next) => {
  const params = req.query;
  const token = req.cookies.token;
  const message = req.flash("messageTeacherClassroom");

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
            return res.render('teacher/classroom/add-student', {
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

exports.postAddStudentWithClassroom = (req, res, next) => {
  return renderEjsPageWithApiPost("messageTeacherClassroom", apiUrlClassroom.addStudent, req, res, next);
}

exports.postDeleteStudentWithClassroom = (req, res, next) => {
  return renderEjsPageWithApiPost("messageTeacherClassroom", apiUrlClassroom.removeStudent, req, res, next);
}


// get data a apiUrl and return htmlpage with data and message(only ejs framework)
function renderEjsPageWithApiGet (messageName, pagePath, urlApi, req, res, next) {
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
      } else {
        return res.redirect(data.path);
      }
    })
    .catch(err => console.log(err));
}

// post data a apiUrl and return htmlpage with data and message(only ejs framework)
function renderEjsPageWithApiPost (messageName, urlApi, req, res, next) {
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

      if(data.body){
        res.body = data.body;
      }
      req.flash(messageName, error.message);

      return res.redirect(data.path);
    })
    .catch(err => console.log(err));
}