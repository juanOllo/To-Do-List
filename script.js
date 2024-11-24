let addTaskBtn = document.querySelector(".add-task");
let inputTask = document.querySelector(".input-task");
const taskList = document.querySelector(".tasks-list");

showData();

function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showData() {
    taskList.innerHTML = localStorage.getItem("data") || "";
}

// Usar delegación de eventos en el contenedor padre (taskList)
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("task-delete-btn")) {
        e.target.parentElement.remove();
        saveData();
    }

    if (e.target.classList.contains("task-check-btn")) {
        const dad = e.target.parentElement;
        if (e.target.classList.contains("task-check-btn-checked")) {
            e.target.classList.remove("task-check-btn-checked");
            dad.children[1].style.textDecoration = "none";
        } else {
            e.target.classList.add("task-check-btn-checked");
            dad.children[1].style.textDecoration = "line-through";
        }
        saveData();
    }
});

addTaskBtn.addEventListener("click", () => {
    if (inputTask.value === "") {
        console.log("vacio");
    } else {
        const taskP = inputTask.value;
        inputTask.value = "";
        taskList.innerHTML = `
            <li class="task">
                <button class="task-check-btn"></button>
                <p class="task-p">${taskP}</p>
                <button class="task-delete-btn">X</button>
            </li>
        ` + taskList.innerHTML;
        saveData();
    }
});