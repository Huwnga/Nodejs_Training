const apiPort = "http://localhost:3000";
const pathToDolist = "/todolist";
const pathClassroom = "/classroom";

exports.apiToDoList = {
  todolist: apiPort + pathToDolist,
  add: apiPort + pathToDolist + "/add",
  complete: apiPort + pathToDolist + "/complete",
  delete: apiPort + pathToDolist + "/delete",
}

exports.apiClassroom = {
  classroom: apiPort + pathClassroom
}

// get
exports.getAll = function (url, token) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", token);

  const response = fetch(url, {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  });

  return response;
}

exports.getOne = function (url, token, params) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", token);
  
  const response = fetch(url + "?" + new URLSearchParams(params), {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  });

  return response;
}

// post
exports.post = function (url, token, body) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", token);

  const response = fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
    redirect: 'follow'
  });

  return response;
}

exports.postOne = function (url, token, params) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", token);

  const response = fetch(url + "?" + new URLSearchParams(params), {
    method: 'POST',
    headers: headers,
    redirect: 'follow'
  });

  return response;
}