const apiPort = "http://localhost:3000/teacher";
const pathClassroom = "/classroom";

exports.apiUrlClassroom = {
  classroom: apiPort + pathClassroom,
  addStudent: apiPort + pathClassroom + "/add_student",
  removeStudent: apiPort + pathClassroom + "/delete_student"
}