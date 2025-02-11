
###  Dynamic To-Do List with Bootstrap 5 and DOM Manipulation

#### Objective:
To create a dynamic, interactive to-do list application using HTML, Bootstrap for styling, and vanilla JavaScript for DOM manipulation.

### Steps:

#### 1. Setup HTML and Bootstrap:
Create a basic HTML structure and include Bootstrap for styling.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic To-Do List</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center">To-Do List</h1>
        <div class="input-group mb-3">
            <input type="text" id="taskInput" class="form-control" placeholder="Add a new task" aria-label="Add a new task">
            <button class="btn btn-primary" type="button" id="addTaskButton">Add Task</button>
        </div>
        <ul class="list-group" id="taskList"></ul>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

#### 2. Create the Script:
Create a JavaScript file (`script.js`) to handle the DOM manipulation and functionality.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span>${task}</span>
                <div>
                    <button class="btn btn-sm btn-success done-button">Done</button>
                    <button class="btn btn-sm btn-danger delete-button">Delete</button>
                </div>
            `;
            taskList.appendChild(listItem);
            taskInput.value = '';
        }
    }

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-button')) {
            const listItem = e.target.parentElement.parentElement;
            taskList.removeChild(listItem);
        }
        if (e.target.classList.contains('done-button')) {
            const listItem = e.target.parentElement.parentElement;
            listItem.classList.toggle('list-group-item-success');
        }
    });
});
```

### Tasks:

1. **Basic Functionality**:
   - Implement the ability to add new tasks to the list.
   - Implement the ability to mark tasks as done and strike through the task text.
   - Implement the ability to delete tasks from the list.

2. **Enhancements**:
   - Add functionality to edit existing tasks.
   - Save tasks to `localStorage` so that they persist even after the page is refreshed.
   - Add validation to ensure no empty tasks are added.

3. **Additional Challenges** (optional):
   - Implement task sorting by priority.
   - Implement due dates for tasks and highlight overdue tasks.
   - Allow users to mark tasks as high, medium, or low priority and sort accordingly.

4. **Submission Instructions**:
   - Create a GitHub repository named in the following format: **BSIT_[SECTION]_A2_LASTNAME_FIRSTNAME**.
   - Do **NOT** submit the project as a ZIP file.
   - Put the files inside a folder named PRELIM_A2
