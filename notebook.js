let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');
let updateform = document.getElementById('form');
let textInputupdate = document.getElementById('textInputupdate');
let textareaupdate = document.getElementById('textareaupdate');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === '') {
    console.log('failure');
    msg.innerHTML = 'Task cannot be blank';
  } else {
    console.log('success');
    msg.innerHTML = '';
    acceptData();
    add.setAttribute('data-bs-dismiss', 'modal');
    add.click();

    (() => {
      add.setAttribute('data-bs-dismiss', '');
    })();
  }
};

let data2 = [{}];

let acceptData = () => {
  if (updateform.dataset.taskId) {
    let selectedTaskId = updateform.dataset.taskId;
    let selectedTask = data2[selectedTaskId];
    selectedTask.text = textInput.value;
    selectedTask.description = textarea.value;

    localStorage.setItem('data2', JSON.stringify(data2));
  } else {
    // Add new Note
    data2.push({
      text: textInput.value,
      description: textarea.value,
    });

    localStorage.setItem('data2', JSON.stringify(data2));
  }
  console.log(data2);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = '';
  data2.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y} style="font-family: 'Monstserrat', Raleway;">
    <span class="fw-bold" style="font-size: 15px; padding: 2px 5px;">${x.text}</span> 
    <span style="font-size: 12px; padding: 2px 5px">${x.description}</span> <br>
    <span class="options">
    <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i> &nbsp; &nbsp; &nbsp; &nbsp; <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i> </span>
    </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data2.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem('data2', JSON.stringify(data2));
  console.log(data2);
};
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  let selectedData = data2[selectedTask.id];
  textInput.value = selectedData['text'];
  textarea.value = selectedData['description'];
  updateform.dataset.taskId = selectedTask.id;
  console.log(selectedTask.id);
};


let resetForm = () => {
  textInput.value = '';
  textarea.value = '';
  delete updateform.dataset.taskId;
};

(() => {
  data2 = JSON.parse(localStorage.getItem('data2')) || [];
  console.log(data2);
  createTasks();
})();
