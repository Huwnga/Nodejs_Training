const apiPort = "http://localhost:3000/student";
const pathToDolist = "/todolist";
const pathClassroom = "/classroom";

const apiToDoList = {
  getToDoList: apiPort + pathToDolist,
  postAddToDoList: apiPort + pathToDolist + "/add",
  postCompleteToDoList: apiPort + pathToDolist + "/complete",
  postDeleteToDoList: apiPort + pathToDolist + "/delete",
}

const apiClassroom = {
  getClassrooms: apiPort + pathClassroom
}

// account data
exports.getToDoList = function (token) {
  const response = fetch(apiToDoList.getToDoList, {
    method: 'GET',
    headers: {
      'token': token
    }
  });

  return response.json();
}

exports.postAddToDoList = function (token, body) {
  const response = fetch(apiToDoList.postAddToDoList, {
    method: 'POST',
    headers: {
      'token': token
    },
    body: JSON.stringify(body)
  });

  return response.json();
}


//classroom data
exports.getClassrooms = function (token, params) {
  const response = fetch(apiClassroom.getClassrooms + '?' + new URLSearchParams(params), {
    method: 'GET',
    headers: {
      'token': token
    }
  });

  return response.json();
}