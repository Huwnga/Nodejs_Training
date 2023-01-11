const username = document.getElementById("username");
const username_error = document.getElementById("username_error");
const password = document.getElementById("password");
const password_error = document.getElementById("password_error");
const full_name = document.getElementById("full_name");
const full_name_error = document.getElementById("full_name_error");
const gender = document.getElementById("gender");
const roles = document.getElementById("roles");
const submit = document.getElementById("submit");

//pattern
const username_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const password_pattern = /^(?=.*[0-9])(?=.*[a-z])([a-z0-9]{8,64})$/;
const full_name_pattern = /^[a-zA-Z]+ [a-zA-Z]+$/;

function validated() {
  flag = false;

  if (username.value.toLowerCase().match(username_pattern)) {
    username_error.classList.add('d-none');
  }
  else {
    username_error.classList.remove('d-none');
    flag = true;
  }

  if (password.value.match(password_pattern)) {
    password_error.classList.add('d-none');
  }
  else {
    password_error.classList.remove('d-none');
    flag = true;
  }

  if (full_name.value.match(full_name_pattern)) {
    full_name_error.classList.add('d-none');
  }
  else {
    full_name_error.classList.remove('d-none');
    flag = true;
  }

  if (flag) {
    submit.classList.add("disabled");
    submit.disabled = true;
  } else {
    submit.classList.remove("disabled");
    submit.disabled = false;
  }
}

username.addEventListener('keyup', validated);
password.addEventListener('keyup', validated);
full_name.addEventListener('keyup', validated);
gender.addEventListener('click', validated);
roles.addEventListener('click', validated);