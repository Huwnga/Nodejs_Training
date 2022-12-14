const cookie_key = document.cookie.split('=')[0];
const isAdmin = cookie_key == "isAdmin";
const btn_group = document.querySelectorAll(".btn__group");
const list_account = document.getElementById('list');
const account = document.querySelectorAll(".account");
const role = document.querySelectorAll(".role");
const btn_admin = document.getElementById('Admin');
const btn_teacher = document.getElementById('Teacher');
const btn_student = document.getElementById('Student');

function activeButton() {
  btn_group.forEach((item) => item.classList.remove('active'));
  this.classList.add('active');
}

function getAdminRole() {
  list.innerHTML = ``;
  account.forEach((element) => {
    const item_name = element.childNodes[5].textContent;
    
    if(item_name.search("Admin") > -1){
      list.appendChild(element);
    }
  });
};

function getTeacherRole() {
  list.innerHTML = ``;
  account.forEach((element) => {
    const item_name = element.childNodes[5].textContent;
    
    if(item_name.search("Teacher") > -1){
      list.appendChild(element);
    }
  });
};

function getStudentRole(){
  list.innerHTML = ``;
  account.forEach((element) => {
    const item_name = element.childNodes[5].textContent;
    
    if(item_name.search("Student") > -1){
      list.appendChild(element);
    }
  });
};

btn_group.forEach((item) => item.addEventListener('click', activeButton));
if(isAdmin){
  btn_admin.addEventListener('click', getAdminRole);
}
btn_teacher.addEventListener('click', getTeacherRole);
btn_student.addEventListener('click', getStudentRole);