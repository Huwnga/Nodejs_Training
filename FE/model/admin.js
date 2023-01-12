// const express = require('express');
// const FormData = require('form-data');
const apiPortAdmin = "http://localhost:3000/admin";
const pathAccount = "/account";
const pathClassroom = "/classroom";
const pathRole = "/role";

exports.apiUrlAccount = {
  account: apiPortAdmin + pathAccount,
  todolist: apiPortAdmin + pathAccount + "/todolist",
  add: apiPortAdmin + pathAccount + "/add",
  update: apiPortAdmin + pathAccount + "/update",
  active: apiPortAdmin + pathAccount + "/active",
  inactive: apiPortAdmin + pathAccount + "/inactive",
  updateInfo: apiPortAdmin + pathAccount + "/info/update"
};

exports.apiUrlClassroom = {
  classroom: apiPortAdmin + pathClassroom,
  add: apiPortAdmin + pathClassroom + "/add",
  update: apiPortAdmin + pathClassroom + "/update",
  delete: apiPortAdmin + pathClassroom + "/delete",
  addStudent: apiPortAdmin + pathClassroom + "/add_student",
  removeStudent: apiPortAdmin + pathClassroom + "/delete_student"
};

exports.apiUrlRole = {
  role: apiPortAdmin + pathRole
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

exports.postSingleFile = function (url, token, feildName, fileField) {
  var headers = new Headers();
  headers.append("token", token);

  const formData = new FormData();
  formData.append(feildName, fileField.files[0]);

  const response = fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
    redirect: 'follow'
  });

  return response;
};