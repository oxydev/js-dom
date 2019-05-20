//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event Listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    form.addEventListener('submit', addTask);

}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a Task');
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

    //Clear input
    taskInput.value = '';

    e.preventDefault();
}