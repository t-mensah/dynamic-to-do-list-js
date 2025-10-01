// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM Elements
    var addButton = document.getElementById('add-task-btn');
    var taskInput = document.getElementById('task-input');
    var taskList = document.getElementById('task-list');

    // In-memory tasks array (keeps sync with localStorage)
    var tasks = [];

    // Create the addTask Function
    // - Can be called as an event handler (no args)
    // - Or called with (taskText, save=false) when loading from storage
    function addTask(arg1, save) {
        var usedInput = false;

        // default save to true when not provided
        if (typeof save === 'undefined') {
            save = true;
        }

        var taskText;

        // If called as an event handler (click passed an Event object),
        // arg1 will be an object with a .type property (like 'click').
        if (arg1 && typeof arg1 === 'object' && arg1.type) {
            taskText = taskInput.value.trim();
            usedInput = true;
        } else {
            // If no arg1 provided, read from the input (user hit Enter or button)
            if (typeof arg1 === 'undefined') {
                taskText = taskInput.value.trim();
                usedInput = true;
            } else {
                // arg1 is the provided task text (used when loading from storage)
                taskText = arg1;
            }
        }

        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Task Creation and Removal
        var li = document.createElement('li');
        li.textContent = taskText;

        var removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // When removing, remove from DOM and update localStorage
        removeBtn.onclick = function () {
            taskList.removeChild(li);

            var idx = tasks.indexOf(taskText);
            if (idx > -1) {
                tasks.splice(idx, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If this call should save to storage, update tasks array + localStorage
        if (save) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear the input if we took the value from it
        if (usedInput) {
            taskInput.value = "";
        }
    }

    // Load tasks from localStorage and render them
    function loadTasks() {
        var storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // keep the in-memory array in sync
        tasks = storedTasks.slice();
        storedTasks.forEach(function (taskText) {
            // pass save=false so we don't duplicate in storage
            addTask(taskText, false);
        });
    }

    // Attach Event Listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize from localStorage
    loadTasks();
});