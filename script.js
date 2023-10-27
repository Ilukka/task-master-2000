// DOM Elements
const taskInput = document.getElementById('taskInput');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const error = document.getElementById('error');

// Check if local storage has saved tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        showError('Think something to do, man.');
        return;
    }
    if (taskText.length > 50) {
        showError('Keep it simply,stup*d. Max 50 characters, please.');
        return;
    }

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
    
}

// Function to remove a task
function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Function to mark a task as done
function taskDone(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Function to display error messages
function showError(message) {
    error.innerText = message;
    taskInput.style.borderColor = 'red';
    setTimeout(() => {
        error.innerText = '';
        taskInput.style.borderColor = '#ccc';
    }, 3000);
}

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerText = task.text;
        li.className = task.completed ? 'completed' : '';
        const doneButton = document.createElement('button');
        doneButton.innerText = task.completed ? 'You did not?' : 'Done it!';
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Bye bye, task!';

        doneButton.addEventListener('click', () => taskDone(index));
        removeButton.addEventListener('click', () => removeTask(index));
    
        li.appendChild(doneButton);
        li.appendChild(removeButton);
 
        taskList.appendChild(li);
    });
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners
taskForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    addTask();
});


// Initial render
renderTasks();
