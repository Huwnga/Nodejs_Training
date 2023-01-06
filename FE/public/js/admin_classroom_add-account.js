const accounts = document.getElementById('accounts');
const submit = document.getElementById('submit');

function validated() {
  flag = false;

  if (flag) {
    submit.classList.add('disabled');
  } else {
    submit.classList.remove('disabled');
  }
}

accounts.addEventListener('click', validated);