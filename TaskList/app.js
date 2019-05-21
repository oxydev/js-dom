//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event Listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    // DOM load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear Task event
    clearBtn.addEventListener('click', clearTask);
    //Filter Task events
    filter.addEventListener('keyup', filterTask);
}

// Get Task from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        //create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element to delete
        const link = document.createElement('a');
        //ADD Class
        link.className = 'delete-item secondary-content';
        //Add icom html
        link.innerHTML = '<i class = "fa fa-remove"><i/>';
        //Append link to li
        li.appendChild(link);

        //Append Li to the Ul
        taskList.appendChild(li);
    })
}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a Task');
        return;
    }
    
    //create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element to delete
    const link = document.createElement('a');
    //ADD Class
    link.className = 'delete-item secondary-content';
    //Add icom html
    link.innerHTML = '<i class = "fa fa-remove"><i/>';
    //Append link to li
    li.appendChild(link);

    //Append Li to the Ul
    taskList.appendChild(li);

    // Store In local Storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove for LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    console.log(tasks);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task
function clearTask(e) {
    
    // taskList.innerHTML = '';

    //faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTaskFormLocalStorage();

}

// Clear Task form ls
function clearTaskFormLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTask(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) !== -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }        
    });
}