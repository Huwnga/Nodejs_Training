const list = document.getElementById("list_item");
const item = document.querySelectorAll(".list_item");
const item_name = document.querySelectorAll(".list_item-name");
const btn_group = document.querySelectorAll(".btn__group");
const btn_all = document.getElementById('all');
const btn_done = document.getElementById('done');
const btn_active = document.getElementById('active');
const input_search = document.getElementById('inp_search');
const count_todolist = document.getElementById('count_todolist');

count_todo_list();

function activeButton() {
  btn_group.forEach((item) => item.classList.remove('active'));
  this.classList.add('active');
}

btn_group.forEach((item) => item.addEventListener('click', activeButton));

function getAll() {
  list.innerHTML = ``;

  item.forEach((element) => {
    list.appendChild(element);
  });
}

function getActive() {
  list.innerHTML = ``;
  item.forEach((element) => {
    if (!element.classList.contains("complete")) {
      list.appendChild(element);
    }
  });
}

function getDone() {
  list.innerHTML = ``;
  item.forEach((element) => {
    if (element.classList.contains("complete")) {
      list.appendChild(element);
    }
  });
}

function search() {
  list.innerHTML = ``;
  item.forEach((element) => {
    const item_name = element.childNodes[1].textContent;
    
    if(item_name.search(input_search.value)>-1){
      list.appendChild(element);
    }
  });
};

function count_todo_list() {
  var active = 0;
  var done = 0;

  count_todolist.innerHTML = '';

  item.forEach(element => {
    if (!element.classList.contains("complete")) {
      active++;
    } else {
      done++;
    }
  });

  count_todolist.innerHTML = `${active} more to do, ${done} done`;
}

btn_all.addEventListener('click', getAll);
btn_active.addEventListener('click', getActive);
btn_done.addEventListener('click', getDone);
input_search.addEventListener('keyup', search);