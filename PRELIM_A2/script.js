document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const sortByPriorityButton = document.getElementById('sortByPriorityButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    sortByPriorityButton.addEventListener('click', sortTasksByPriority);

    function addTask() {
        const task = taskInput.value.trim();
        const priority = priorityInput.value;
        const dueDate = dueDateInput.value;

        if (task) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.setAttribute('data-priority', priority);
            listItem.setAttribute('data-due-date', dueDate);

            listItem.innerHTML = `
                <span>${task} (Priority: ${priority}, Due: ${dueDate})</span>
                <div>
                    <button class="btn btn-sm btn-success done-button">Done</button>
                    <button class="btn btn-sm btn-warning edit-button">Edit</button>
                    <button class="btn btn-sm btn-danger delete-button">Delete</button>
                </div>
            `;

            // Highlight overdue tasks
            if (dueDate && new Date(dueDate) < new Date()) {
                listItem.classList.add('list-group-item-danger');
            }

            taskList.appendChild(listItem);
            taskInput.value = '';
            dueDateInput.value = '';
            saveTasks();
        } else {
            alert('Task cannot be empty!');
        }
    }

    taskList.addEventListener('click', (e) => {
        const listItem = e.target.parentElement.parentElement;

        if (e.target.classList.contains('delete-button')) {
            taskList.removeChild(listItem);
        }
        if (e.target.classList.contains('done-button')) {
            listItem.classList.toggle('list-group-item-success');
        }
        if (e.target.classList.contains('edit-button')) {
            const taskText = listItem.querySelector('span').textContent;
            const newTask = prompt('Edit your task:', taskText);
            if (newTask && newTask.trim()) {
                listItem.querySelector('span').textContent = newTask.trim();
                saveTasks();
            }
        }
    });

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach((item) => {
            tasks.push({
                text: item.querySelector('span').textContent,
                priority: item.getAttribute('data-priority'),
                dueDate: item.getAttribute('data-due-date'),
                completed: item.classList.contains('list-group-item-success')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => {
            const listItem = document.createElement('li');
            listItem.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''}`;
            listItem.setAttribute('data-priority', task.priority);
            listItem.setAttribute('data-due-date', task.dueDate);

            listItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="btn btn-sm btn-success done-button">Done</button>
                    <button class="btn btn-sm btn-warning edit-button">Edit</button>
                    <button class="btn btn-sm btn-danger delete-button">Delete</button>
                </div>
            `;

            // Highlight overdue tasks
            if (task.dueDate && new Date(task.dueDate) < new Date()) {
                listItem.classList.add('list-group-item-danger');
            }

            taskList.appendChild(listItem);
        });
    }

    // Sort tasks by priority
    function sortTasksByPriority() {
        const tasks = Array.from(taskList.querySelectorAll('li'));
        tasks.sort((a, b) => {
            const priorityOrder = { High: 3, Medium: 2, Low: 1 };
            return priorityOrder[b.getAttribute('data-priority')] - priorityOrder[a.getAttribute('data-priority')];
        });

        // Clear the task list and re-add sorted tasks
        taskList.innerHTML = '';
        tasks.forEach((task) => taskList.appendChild(task));
    }
});