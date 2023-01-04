const Student = require('../model/student');
const apiToDoList = Student.apiToDoList;
const apiClassroom = Student.apiClassroom;

// to do list
exports.getTodolist = (req, res, next) => {
  const message = req.flash("messageTodolist")[0];
  const token = req.cookies.token;

  Student.getAll(apiToDoList.todolist, token)
    .then(todolistResponse => {
      return todolistResponse.json();
    })
    .then(todolistResults => {
      Student.getAll(apiClassroom.classroom, token)
        .then(classroomResponse => {
          return classroomResponse.json();
        })
        .then(classroomResults => {
          const todolistError = todolistResults.error;
          const todolistData = todolistResults.data;
          const classroomError = classroomResults.error;
          const classroomData = classroomResults.data;

          if (todolistError.status == 200 && classroomError.status == 200) {
            return res.render('student/index', {
              data: todolistData,
              classrooms: classroomData.classrooms,
              message: `${message}`
            });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

exports.postAddTask = (req, res, next) => {
  const body = req.body;
  const token = req.cookies.token;

  Student.post(apiToDoList.add, token, body)
    .then(response => {
      return response.json();

    })
    .then(results => {
      const error = results.error;
      const data = results.data;

      if (error.status == 200) {
        return res.redirect("/student" + data.nextPath);

      }

    })
    .catch(err => console.log(err));
}

exports.postCompleteTask = (req, res, next) => {
  const params = req.query;
  const token = req.cookies.token;

  Student.postOne(apiToDoList.complete, token, params)
    .then(response => {
      return response.json();

    })
    .then(results => {
      const error = results.error;
      const data = results.data;

      if (error.status == 200) {
        return res.redirect("/student" + data.nextPath);

      }
    })
    .catch(err => console.log(err));
}

exports.postDeleteTask = (req, res, next) => {
  const params = req.query;
  const token = req.cookies.token;

  Student.postOne(apiToDoList.delete, token, params)
    .then(response => {
      return response.json();

    })
    .then(results => {
      const error = results.error;
      const data = results.data;

      if (error.status == 200) {
        return res.redirect("/student" + data.nextPath);

      }

    })
    .catch(err => console.log(err));
}

// classroom
exports.getClassrooms = (req, res, next) => {
  const token = req.cookies.token;
  const cb = Student.getAll(apiClassroom.getClassrooms, token);

  cb.then(response => {
    return response.json();
  })
    .then(results => {
      const error = results.error;
      const data = results.data;

      if (error.status == 200) {
        return res.render('student/classrooms', {
          data: data
        });
      }
    })
    .catch(err => console.log(err));
}

exports.getClassroom = (req, res, next) => {
  const token = req.cookies.token;
  const params = req.query;

  Student.getOne(apiClassroom.classroom, token, params)
    .then(response => {
      return response.json();
    })
    .then(classroomResults => {
      Student.getAll(apiClassroom.classroom, token)
        .then(classroomResponse => {
          return classroomResponse.json();
        })
        .then(classroomsResults => {
          const classroomError = classroomResults.error;
          const classroomData = classroomResults.data;
          const classroomsError = classroomsResults.error;
          const classroomsData = classroomsResults.data;

          if (classroomError.status == 200 && classroomsError.status == 200) {
            return res.render('student/classroom', {
              data: classroomData,
              classrooms: classroomsData.classrooms
            });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}