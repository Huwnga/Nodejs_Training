// const express = require('express');
// const FormData = require('form-data');
const apiPort = "http://localhost:3000/admin";
const pathAccount = "/account";
const pathClassroom = "/classroom";
const pathRole = "/role";

exports.apiUrlAccount = {
  account: apiPort + pathAccount,
  todolist: apiPort + pathAccount + "/todolist",
  add: apiPort + pathAccount + "/add",
  update: apiPort + pathAccount + "/update",
  active: apiPort + pathAccount + "/active",
  inactive: apiPort + pathAccount + "/inactive",
  updateInfo: apiPort + pathAccount + "/info/update"
};

exports.apiUrlClassroom = {
  classroom: apiPort + pathClassroom,
  add: apiPort + pathClassroom + "/add",
  update: apiPort + pathClassroom + "/update",
  delete: apiPort + pathClassroom + "/delete",
  addStudent: apiPort + pathClassroom + "/add_student",
  removeStudent: apiPort + pathClassroom + "/delete_student"
};

exports.apiUrlRole = {
  role: apiPort + pathRole
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
};

exports.get = function (url, token, params) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", token);
  
  const response = fetch(url + "?" + new URLSearchParams(params), {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  });

  return response;
};

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
};

exports.postOne = function (url, token, body, params) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("token", token);

  const response = fetch(url + "?" + new URLSearchParams(params), {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
    redirect: 'follow'
  });

  return response;
};