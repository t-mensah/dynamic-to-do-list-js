// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM Elements
    var addButton = document.getElementById('add-task-btn');
    var taskInput = document.getElementById('task-input');
    var taskList = document.getElementById('task-list');

    // Create the addTask Function
    function addTask() {
        var taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Task Creation and Removal
        var li = document.createElement('li');
        li.textContent = taskText;

        var removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); // ✅ fixed here

        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        taskInput.value = "";
    }

    // Attach Event Listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});