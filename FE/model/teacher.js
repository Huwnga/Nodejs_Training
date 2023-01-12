const apiPortTeacher = "http://localhost:3000/teacher";
const pathClassroom = "/classroom";

exports.apiUrlClassroom = {
  classroom: apiPortTeacher + pathClassroom,
  addStudent: apiPortTeacher + pathClassroom + "/add_student",
  removeStudent: apiPortTeacher + pathClassroom + "/delete_student"
}