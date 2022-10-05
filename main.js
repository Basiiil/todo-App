const form = document.querySelector('#task-form');
const input = document.querySelector('.add-task');
const taskList = document.querySelector('.list');
const clearBtn = document.querySelector('.clear');
const filter = document.querySelector('#filter');

loadEventListeners();

function loadEventListeners() {
  // Dom Loas event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTask);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// get Tasks from Ls
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.classList = 'list-item';
    const text = document.createTextNode(task);
    
    li.appendChild(text);

    const link = document.createElement('a');
    link.classList = 'delete-item';
    link.innerHTML = '<i class="fa fa-close"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
  })
}

// Create a new list item when clicking on the "Add" button
function addTask(e) {
  e.preventDefault();
  if (input.value.trim() === '') {
    alert('You must write something!');
  } else {
    const li = document.createElement('li');
    li.classList = 'list-item';
    const text = document.createTextNode(input.value);
    
    li.appendChild(text);

    const link = document.createElement('a');
    link.classList = 'delete-item';
    link.innerHTML = '<i class="fa fa-close"></i>';
    li.appendChild(link);

    taskList.appendChild(li);

    // store in LS
    storeTaskInLocalStorage(input.value);

    input.value = '';
  }
}

// store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  // console.log(e.target.parentElement.parentElement);
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you Sure?')) {
      e.target.parentElement.parentElement.remove();
      // // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear Task
function clearTask() {
  // console.log(taskList.firstChild)
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear from LS
  clearTasksFromLocalStorage();
}

// clear from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('li').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  })
}