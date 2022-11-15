const login_username = document.getElementById('login_username');
const login_password = document.getElementById('login_password');
const login_password_icon = document.getElementById('login_password_icon');
const login_submit = document.getElementById('login_submit');
const login_username_error = document.getElementById('login_username_error');
const login_password_error = document.getElementById('login_password_error');

function validate_username() {
  var flag = false;
  const username_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (login_username.value.toLowerCase().match(username_pattern)) {
    login_username_error.classList.add('none');
    
    if (login_password_error.classList.contains('none') && login_password.value != '') {
      remove_login_submit_disable();
    }
    
    flag = true;
  } else {
    add_login_submit_disable();
    login_username_error.classList.remove('none');
  }
  return flag;
};

function validate_password() {
  var flag = false;
  const password_pattern = /^[A-Za-z]\w{8,25}$/;

  if (login_password.value.toLowerCase().match(password_pattern)) {
    login_password_error.classList.add('none');

    if (login_username_error.classList.contains('none') && login_username.value != '') {
      remove_login_submit_disable();
    }

    flag = true;
  } else {
    add_login_submit_disable();
    login_password_error.classList.remove('none');
  }

  return flag;
};

function add_login_submit_disable() {
  login_submit.classList.add('disable');
  login_submit.disabled = true;
};

function remove_login_submit_disable() {
  login_submit.classList.remove('disable');
  login_submit.disabled = false;
};

function hide_show_login_password() {
  if (login_password.getAttribute("type") == "password") {
    this.classList.remove('fa-eye');
    this.classList.add('fa-eye-slash');
    login_password.setAttribute("type", "text");
  } else if (login_password.getAttribute("type") == "text") {
    this.classList.remove('fa-eye-slash');
    this.classList.add('fa-eye');
    login_password.setAttribute("type", "password");
  }
};

login_username.addEventListener('keyup', validate_username);
login_password.addEventListener('keyup', validate_password);
login_password_icon.addEventListener('click', hide_show_login_password);