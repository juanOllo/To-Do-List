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
    const dad = e.target.parentElement;

    if (e.target.classList.contains("task-delete-btn")) {
        if(confirm(`Borrar tarea "${dad.children[1].textContent}" ?`)) {
            e.target.parentElement.remove();
            saveData();
        }
    }

    if (e.target.classList.contains("task-check-btn")) {
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
    if (inputTask.value !== "") {
        anim(inputTask, "add-task-anim-input 0.4s ease 0s forwards");
        anim(addTaskBtn ,"add-task-anim 0.4s ease 0s forwards");
        const taskP = inputTask.value;
        setTimeout(()=>{
            inputTask.value = "";
        }, 200)
        setTimeout(()=>{
            taskList.innerHTML = `
                <li class="task">
                    <button class="task-check-btn"></button>
                    <p class="task-p">${taskP}</p>
                    <button class="task-delete-btn">X</button>
                </li>
            ` + taskList.innerHTML;
            saveData();
            anim(taskList.children[0].children[0], "new-task-anim 0.5s ease-in-out 0s forwards");
            anim(taskList.children[0].children[1], "new-task-anim 0.5s ease-in-out 0s forwards");
            anim(taskList.children[0].children[2], "new-task-anim 0.5s ease-in-out 0s forwards");
        }, 180);
    }
});

const anim = (el, str, fin) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = str;
    setTimeout(()=>{
    el.style.animation = "none";
    }, 1000*fin || 1000);
}