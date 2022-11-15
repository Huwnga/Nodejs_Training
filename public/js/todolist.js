const list_item = document.getElementById("list_item");
const btn_group = document.querySelectorAll(".btn__group");
const count_todolist = document.getElementById('count_todolist');

function activeButton() {
  btn_group.forEach((item) => item.classList.remove('active'));
  this.classList.add('active');
}
btn_group.forEach((item) => item.addEventListener('click', activeButton));

function getAll() {
  
}

function getActive() {
  
}

function getDone() {
  
}

function search() {
  
};

function count_todo_list() {
  const session = JSON.parse(localStorage.getItem("session"));
  const username_session = JSON.parse(localStorage.getItem(session.username));
  const todolist = username_session.todolist;

  var todo = 0;
  var done = 0;
  todolist.forEach(element => {
    if (!element.complete) {
      todo++;
    } else {
      done++;
    }
  });

  count_todolist.innerHTML = '';
  count_todolist.innerHTML = `${todo} more to do, ${done} done`;
}