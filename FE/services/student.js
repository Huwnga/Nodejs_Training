const Student = require('../model/student'); 

exports.getTodolist = (req, res, next) => {
  const token = req.token;
  const data = Student.getToDoList(token);

  return res.render('student/index', {
    data: data
  })
}