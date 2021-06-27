// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listners

loadEventListners();

function loadEventListners() {
    document.addEventListener('DOMContentLoaded',getTasks);
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTask)
}

// Add tasks stored in LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(
        function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';

        // create text node and append 
        li.appendChild(document.createTextNode(task));

        // create link element and append
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);
        }
    );
}

// add task 
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a Task');
    }
    else {
        const li = document.createElement('li');
        li.className = 'collection-item';

        // create text node and append 
        li.appendChild(document.createTextNode(taskInput.value));

        // create link element and append
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);

        // store in LS
        store(taskInput.value);

        // clear input 
        taskInput.value = '';

        e.preventDefault();
    }
    
}

// Store in LS
function store(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}



// delete Task

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?'))
        {
            e.target.parentElement.parentElement.remove();
            remove(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS

function remove(task) {
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let shouldSkip = false;
    tasks.forEach(
        function (storedTask, index)
        {
            if(shouldSkip) {
                return ;
            }
            if(task.textContent === storedTask) {
                tasks.splice(index,1); console.log('hello');
                shouldSkip = true;
                return;
            }
        });
    console.log(tasks.length);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    
}

// Clear Tasks 

function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // or -> taskList.innerHTML = ''; (slower)

    removeAll();
}

function removeAll() {
    localStorage.clear();
}

// filter tasks

function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;
            console.log(text,item);
            if(item.toLowerCase().indexOf(text) != -1 ) {
                task.style.display = 'block';
                console.log('match');
            }
            else {
                task.style.display = 'none';
                console.log('un-matched');
            }
        });

}