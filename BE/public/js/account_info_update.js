const full_name = document.getElementById("full_name");
const avatar = document.getElementById("avatar");
const gender = document.getElementById("gender");
const dob = document.getElementById("gender");
const address = document.getElementById("addresss");
const error_fullname = document.getElementById("error_fullname");
const error_avatar = document.getElementById("error_avatar");
const error_gender = document.getElementById("error_gender");
const error_dob = document.getElementById("error_dob");
const error_address = document.getElementById("error_address");

function validated() {
  let flag = false;

  if (full_name.value == "" || full_name.value.length > 64) {
    error_fullname.classList.add("none");
  }
}