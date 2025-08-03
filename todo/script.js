let currentFilter = 'all';

document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});

function addTask() {
    const input = document.getElementById("taskInput");
    const dateInput = document.getElementById("dueDate");
    const text = input.value.trim();
    const due = dateInput.value;

    if (!text) return;

    const task = { text, due, completed: false };
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    dateInput.value = "";
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (currentFilter === "pending") {
        tasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === "completed") {
        tasks = tasks.filter(task => task.completed);
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const header = document.createElement("div");
        header.className = "task-header";

        const span = document.createElement("span");
        span.textContent = task.text;

        const due = document.createElement("div");
        due.className = "task-due";
        due.textContent = task.due ? `Due: ${task.due}` : "";

        const actions = document.createElement("div");
        actions.className = "actions";

        const toggle = document.createElement("button");
        toggle.textContent = task.completed ? "Undo" : "Done";
        toggle.onclick = () => toggleComplete(index);

        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.onclick = () => editTask(index);

        const del = document.createElement("button");
        del.textContent = "❌";
        del.onclick = () => deleteTask(index);

        actions.append(toggle, edit, del);
        header.append(span);
        li.append(header, due, actions);
        list.appendChild(li);
    });
}

function toggleComplete(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
}

function filterTasks(mode) {
    currentFilter = mode;
    renderTasks();
}
