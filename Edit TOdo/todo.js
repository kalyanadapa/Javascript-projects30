// Get elements from the DOM
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Initialize tasks array from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Event listener for add task button
addTaskButton.addEventListener('click', function() {
  // Get input value and add to tasks array
  const taskText = newTaskInput.value.trim();
  if (taskText !== '') {
    tasks.push({text: taskText, completed: false});
    // Persist tasks array to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // Clear input field and re-render task list
  newTaskInput.value = '';
  renderTasks();
});

// Function to render task list
function renderTasks() {
  // Clear task list container
  taskList.innerHTML = '';
  // Loop through tasks array and add each task to container
  for (let i = 0; i < tasks.length; i++) {
    const task = document.createElement('li');
    task.className = 'task';
    if (tasks[i].completed) {
      task.classList.add('completed');
    }
    task.innerHTML = `
      <span class="task-text">${tasks[i].text}</span>
      <div>
      <button class="complete-button">Complete</button>
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button> 
      </div>
    `;
    // Add event listeners for edit, delete, and complete buttons
    const editButton = task.querySelector('.edit-button');
    editButton.addEventListener('click', function() {
      const currentTaskText = tasks[i].text;
      const newTaskText = prompt('Enter the new task text:', currentTaskText);
      if (newTaskText !== null && newTaskText !== '' && newTaskText !== currentTaskText) {
        tasks[i].text = newTaskText;
        // Persist tasks array to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      }
    });
    const deleteButton = task.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
     // console.log("success");
      tasks.splice(i, 1);
      // Persist tasks array to local storage
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });
    const completeButton = task.querySelector('.complete-button');
    completeButton.addEventListener('click', function() {
      tasks[i].completed = !tasks[i].completed;
      // Persist tasks array to local storage
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });
    // Add task to task list container
    taskList.appendChild(task);
  }
}

// Event listener for window load event
window.addEventListener('load', function() {
  // Retrieve tasks array from local storage and re-render task list
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks();
});
