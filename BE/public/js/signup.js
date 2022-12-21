const signup_submit = document.getElementById('signup_submit');

const signup_username = document.getElementById('signup_username');
const signup_password = document.getElementById('signup_password');
const signup_repassword = document.getElementById('signup_repassword');
const signup_fullname = document.getElementById('signup_fullname');
const signup_roles = document.getElementById('signup_roles');
const signup_classrooms = document.getElementById('signup_classrooms');

const signup_username_error = document.getElementById('signup_username_error');
const signup_password_error = document.getElementById('signup_password_error');
const signup_repassword_error = document.getElementById('signup_repassword_error');
const signup_roles_error = document.getElementById('signup_roles_error');
const signup_classrooms_error = document.getElementById('signup_classrooms_error');

const signup_password_icon = document.getElementById('signup_password_icon');
const signup_repassword_icon = document.getElementById('signup_repassword_icon');

function validate_signup_username() {
  var flag = false;
  const username_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (signup_username.value.toLowerCase().match(username_pattern)) {
    signup_username_error.classList.add('none');

    if (signup_repassword_error.classList.contains('none') && signup_repassword.value != '' && signup_fullname != '' && parseInt(signup_roles.value) > 1) {
      remove_signup_submit_disable();
    }

    flag = true;
  } else {
    add_signup_submit_disable();
    signup_username_error.classList.remove('none');
  }

  return flag;
};

function validate_signup_fullname() {
  var flag = false;

  if (signup_fullname.value != '') {
    signup_fullname.value = jsUcfirst(signup_fullname.value);
    signup_fullname_error.classList.add('none');

    flag = true;
  } else {
    signup_fullname_error.classList.remove('none');
  }

  return flag;
}

function validate_signup_password() {
  var flag = false;
  const password_pattern = /^[A-Za-z]\w{8,25}$/;

  if (signup_password.value.match(password_pattern)) {
    signup_password_error.classList.add('none');

    validate_signup_repassword();

    flag = true;
  } else {
    add_signup_submit_disable();
    signup_password_error.classList.remove('none');
  }


  return flag;
};

function validate_signup_repassword() {
  var flag = false;

  if ((signup_password.value == signup_repassword.value)) {
    signup_repassword_error.classList.add('none');

    flag = true;
  } else {
    add_signup_submit_disable();
    signup_repassword_error.classList.remove('none');
  }

  if (validate_signup_username() && validate_signup_fullname() && validate_signup_roles()) {
    remove_signup_submit_disable();
  }

  return flag;
};

function validate_signup_roles() {
  var flag = false;
  if (parseInt(signup_roles.value) > 1) {
    signup_roles.setAttribute('style', 'color: #000;');
    signup_roles_error.classList.add('none');

    if (parseInt(signup_roles.value) == 3) {
      add_signup_submit_disable();
      signup_classrooms.classList.remove('none');
      signup_classrooms_error.classList.add('none');
    } else {
      signup_classrooms.classList.add('none');
      signup_classrooms_error.classList.add('none');
      
      if (signup_repassword_error.classList.contains('none') && signup_repassword.value != '' && signup_username.value != '' && signup_fullname.value != '') {
        remove_signup_submit_disable();
      }
    }

    flag = true;
  } else {
    add_signup_submit_disable();
    signup_roles_error.classList.remove('none');
    signup_roles.setAttribute('style', 'color: #666;');
    flag = flase;
  }
  return flag;
};

function validate_signup_classrooms() {
  var flag = false;
  if (parseInt(signup_classrooms.value) > 0) {
    signup_classrooms.setAttribute('style', 'color: #000;');
    signup_classrooms_error.classList.add('none');

    if (signup_repassword_error.classList.contains('none') && signup_repassword.value != '' && signup_username.value != '' && signup_fullname.value != '') {
      remove_signup_submit_disable();
    }

    flag = true;
  } else {
    add_signup_submit_disable();
    signup_roles_error.classList.remove('none');
    signup_roles.setAttribute('style', 'color: #666;');
    flag = flase;
  }
  return flag;
};

function add_signup_submit_disable() {
  signup_submit.classList.add('disable');
  signup_submit.disabled = true;
};

function remove_signup_submit_disable() {
  signup_submit.classList.remove('disable');
  signup_submit.disabled = false;
};

function hide_show_signup_password() {
  if (signup_password.getAttribute("type") == "password") {
    this.classList.remove('fa-eye');
    this.classList.add('fa-eye-slash');
    signup_password.setAttribute("type", "text");
  } else if (signup_password.getAttribute("type") == "text") {
    this.classList.remove('fa-eye-slash');
    this.classList.add('fa-eye');
    signup_password.setAttribute("type", "password");
  }
};

function hide_show_signup_repassword() {
  if (signup_repassword.getAttribute("type") == "password") {
    this.classList.remove('fa-eye');
    this.classList.add('fa-eye-slash');
    signup_repassword.setAttribute("type", "text");
  } else if (signup_repassword.getAttribute("type") == "text") {
    this.classList.remove('fa-eye-slash');
    this.classList.add('fa-eye');
    signup_repassword.setAttribute("type", "password");
  }
};

function jsUcfirst(string) {
  const parts = string.split(" ");
  var newStr = "";
  for (let part of parts) {
    newStr += part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() + " ";
  }
  return newStr;
}

signup_username.addEventListener('keyup', validate_signup_username);
signup_fullname.addEventListener('change', validate_signup_fullname);
signup_password.addEventListener('keyup', validate_signup_password);
signup_repassword.addEventListener('keyup', validate_signup_repassword);
signup_roles.addEventListener('change', validate_signup_roles);
signup_classrooms.addEventListener('change', validate_signup_classrooms);
signup_password_icon.addEventListener('click', hide_show_signup_password);
signup_repassword_icon.addEventListener('click', hide_show_signup_repassword);