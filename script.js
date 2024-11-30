const listSection = document.getElementById("list-section");
const addTaskBtn = document.querySelector(".add-task");
const inputTask = document.querySelector(".input-task");
const taskList = document.querySelector(".tasks-list");
const volverBtn = document.querySelector(".volver-btn");

const roomsSection = document.getElementById("rooms-section");
const newListBtn = document.querySelector(".new-list");
const inputListName = document.querySelector(".input-list-name");
const listsList = document.querySelector(".lists-list");

// localStorage.clear();

let dataArr = JSON.parse(localStorage.getItem("data")) || [];
let actualListIndex;

showData();

function saveData() {
    localStorage.setItem("data", JSON.stringify(dataArr));
}

function showData() {
    listsList.innerHTML = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")).reduce((acc, html) => acc + html.listHtml, "") : "";
    taskList.innerHTML = localStorage.getItem("data") && actualListIndex+1 ? JSON.parse(localStorage.getItem("data"))[actualListIndex].tasksHtml : "";;
}

























newListBtn.addEventListener("click", () => {
    if (inputListName.value !== "") {
        anim(inputListName, "add-task-anim-input 0.4s ease 0s forwards");
        anim(newListBtn ,"add-task-anim 0.4s ease 0s forwards");
        const newListName = inputListName.value;
        setTimeout(()=>{
            inputListName.value = "";
        }, 200)
        setTimeout(()=>{
            const newListCode = generarCódigoAleatorio(6);
            const newList = {
                listName: newListName,
                listId: newListCode,
                listHtml: ` <li class="list toList" id="${newListCode}">
                                <p class="list-name child-toList">${newListName}</p>
                                <button class="list-delete-btn">Eliminar</button>
                            </li>
                        `,
                tasksHtml: ``,
            }
            dataArr.unshift(newList);
            saveData();
            showData();
            anim(listsList.children[0].children[0], "new-task-anim 0.5s ease-in-out 0s forwards");
            anim(listsList.children[0].children[1], "new-task-anim 0.5s ease-in-out 0s forwards");
            // anim(listsList.children[0].children[2], "new-task-anim 0.5s ease-in-out 0s forwards");
        }, 180);
    }
});

listsList.addEventListener("click", (e) => {

    if (e.target.classList.contains("list-delete-btn")) {
        if(confirm(`Borrar lista "${e.target.parentElement.children[0].textContent}" ?`)) {
            // e.target.parentElement.remove();

            const indexToRemove = dataArr.findIndex((x) => x.listId === e.target.parentElement.id);
            // console.log("data id type", typeof(dataArr[0].listId))
            // console.log("index: ", indexToRemove);
            // console.log("id: ", e.target.parentElement.id);
            dataArr.splice(indexToRemove, 1);
            // console.log("new dataArr: ", dataArr);

            saveData();
            showData();
        }
    }

    if (e.target.classList.contains("child-toList")) {
        roomsSection.style.display = "none";
        listSection.style.display = "block";

        actualListIndex = dataArr.findIndex((x) => x.listId === e.target.parentElement.id);
        listSection.children[0].textContent = dataArr[actualListIndex].listName;
        // console.log("actualIndex es: ", actualListIndex);
        showData();
    }

    if (e.target.classList.contains("toList")) {
        roomsSection.style.display = "none";
        listSection.style.display = "block";

        actualListIndex = dataArr.findIndex((x) => x.listId === e.target.id);
        // console.log("actualIndex es: ", actualListIndex);
        showData();
    }
});





















addTaskBtn.addEventListener("click", () => {
    if (inputTask.value !== "") {
        // anim(inputTask, "add-task-anim-input 0.4s ease 0s forwards");
        // anim(addTaskBtn ,"add-task-anim 0.4s ease 0s forwards");
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

            dataArr[actualListIndex].tasksHtml = taskList.innerHTML;

            saveData();
            anim(taskList.children[0].children[0], "new-task-anim 0.5s ease-in-out 0s forwards");
            anim(taskList.children[0].children[1], "new-task-anim 0.5s ease-in-out 0s forwards");
            anim(taskList.children[0].children[2], "new-task-anim 0.5s ease-in-out 0s forwards");
        }, 180);
    }
});

// Usar delegación de eventos en el contenedor padre (taskList)
taskList.addEventListener("click", (e) => {
    const dad = e.target.parentElement;

    if (e.target.classList.contains("task-delete-btn")) {
        if(confirm(`Borrar tarea "${dad.children[1].textContent}" ?`)) {
            e.target.parentElement.remove();
            dataArr[actualListIndex].tasksHtml = taskList.innerHTML;
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
        dataArr[actualListIndex].tasksHtml = taskList.innerHTML;
        saveData();
    }
});

volverBtn.addEventListener("click", () => {
    roomsSection.style.display = "block";
    listSection.style.display = "none";
    actualListIndex = -1;
    // showData();
})














    // FUNCIONES AUXILIARES

const anim = (el, str, fin) => {
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = str;
    setTimeout(()=>{
    el.style.animation = "none";
    }, 1000*fin || 1000);
}

function generarCódigoAleatorio(longitud) {
    const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let código = '';
    for (let i = 0; i < longitud; i++) {
      código += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return código;
}