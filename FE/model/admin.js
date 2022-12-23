const apiPort = "http://localhost:3000/admin";
const pathAccount = "/account";
const pathClassroom = "/classroom";

const apiAdminManagementAccount = {
  getAccounts: apiPort + pathAccount,
  getAccountToDoList: apiPort + pathAccount + "/todolist",
  postAddAccount: apiPort + pathAccount + "/add",
  postUpdateAccount: apiPort + pathAccount + "/update",
  postActiveAccount: apiPort + pathAccount + "/active",
  postInactiveAccount: apiPort + pathAccount + "/inactive"
}

const apiAdminManagementClassroom = {
  getClassrooms: apiPort + pathClassroom,
  postAddClassroom: apiPort + pathClassroom + "/add",
  postUpdateClassroom: apiPort + pathClassroom + "/update",
  postDeleteClassroom: apiPort + pathClassroom + "/delete",
  postAddStudentInClassroom: apiPort + pathClassroom + "/add-student",
  postDeleteStudentInClassroom: apiPort + pathClassroom + "/delete-student"
}

// account data
exports.getAccounts = fetch(apiAdminManagementAccount.getAccounts).then((response) => response.json());
exports.getAccountToDoList = fetch(apiAdminManagementAccount.getAccountToDoList).then((response) => response.json());


//classroom data
exports.getClassrooms = fetch(apiAdminManagementClassroom.getClassrooms).then((response) => response.json());