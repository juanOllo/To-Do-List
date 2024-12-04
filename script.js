const listSection = document.getElementById("list-section");
const addTaskBtn = document.querySelector(".add-task");
const inputTask = document.querySelector(".input-task");
const taskList = document.querySelector(".tasks-list");
const volverBtn = document.querySelector(".volver-btn");

const roomsSection = document.getElementById("rooms-section");
const newListBtn = document.querySelector(".new-list");
const inputListName = document.querySelector(".input-list-name");
const listsList = document.querySelector(".lists-list");

const searchBtn = document.querySelector(".search-btn");
const inputSearch = document.querySelector(".input-search");

// localStorage.clear();

let dataArr = JSON.parse(localStorage.getItem("data")) || [];
showData();

function saveData() {
    localStorage.setItem("data", JSON.stringify(dataArr));
}

function showData() {
    listsList.innerHTML = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")).reduce((acc, list) => acc + createListHtml(list), "") : "";
    taskList.innerHTML = localStorage.getItem("data") && dataArr.length > 0 ? JSON.parse(localStorage.getItem("data"))[0].tasksHtml : "";
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
                tasksHtml: ``,
                cantTasks: 0,
                completedTasks: 0
            }
            dataArr.unshift(newList);
            saveData();
            showData();
            anim(listsList.children[0], "new-task-anim 0.5s ease-in-out 0s forwards");
            anim(listsList.children[0].children[1], "new-task-anim 0.5s ease-in-out 0s forwards");
            anim(listsList.children[0].children[2].children[0], "new-task-anim 0.5s ease-in-out 0s forwards");
            anim(listsList.children[0].children[2].children[2], "new-task-anim 0.5s ease-in-out 0s forwards");
        }, 180);
    }
});

listsList.addEventListener("click", (e) => {

    if (e.target.classList.contains("list-delete-btn")) {
        if(confirm(`Borrar lista "${e.target.parentElement.children[0].textContent}" ?`)) {
            const indexToRemove = dataArr.findIndex((x) => x.listId === e.target.parentElement.id);
            anim(e.target.parentElement, "new-task-anim 0.5s ease-in-out 0s forwards reverse");
            anim(e.target.parentElement.children[1], "new-task-anim 0.5s ease-in-out 0s forwards reverse");
            anim(e.target.parentElement.children[2].children[0], "new-task-anim 0.5s ease-in-out 0s forwards reverse");
            anim(e.target.parentElement.children[2].children[2], "new-task-anim 0.5s ease-in-out 0s forwards reverse");
            setTimeout(() => {
                dataArr.splice(indexToRemove, 1);
    
                saveData();
                showData();
            }, 500);
        }
    }

    if (e.target.classList.contains("toList") || e.target.classList.contains("child-toList")) {

        const eventTarget = e.target.classList.contains("toList") ? e.target : e.target.parentElement;

        inputSearch.value = "";
        roomsSection.style.display = "none";
        listSection.style.display = "block";

        const actualListIndex = dataArr.findIndex((x) => x.listId === eventTarget.id);

        listSection.children[0].textContent = dataArr[actualListIndex].listName;

        //  CADA VEZ QUE ENTRAS A UNA LISTA ESTA SE REUBICA EN EL INDEX 0 DEL ARRAY
        //  ENTONCES A PARTIR D AHORA SIEMPRE TRABAJAS EN dataArr[0]
        if(dataArr.length > 1){
            const removedlist = dataArr.splice(actualListIndex, 1);
            dataArr.unshift(removedlist[0]);
            saveData();
        }
        // console.log("actualIndex es: ", 0);
        showData();
    }
});















inputSearch.addEventListener("input", () => {
    if(inputSearch.value !== ""){
        // const newListHtml = dataArr.filter((x) => x.listName.toLowerCase().includes(`${inputSearch.value.toLowerCase()}`)).map((x) => x.listHtml);
        const newListHtml = dataArr.filter((x) => x.listName.toLowerCase().includes(`${inputSearch.value.toLowerCase()}`)).map((x) => createListHtml(x));
        listsList.innerHTML = newListHtml.join().replaceAll(",", "");
    } else {
        // listsList.innerHTML = dataArr.map(x => x.listHtml).join().replaceAll(",", "")
        listsList.innerHTML = dataArr.map(x => createListHtml(x)).join().replaceAll(",", "");
    }
    for(let l of document.querySelectorAll(".list")){
        anim(l, "new-task-anim 0.5s ease-in-out 0s forwards");
        anim(l.children[1], "new-task-anim 0.5s ease-in-out 0s forwards");
        anim(l.children[2].children[0], "new-task-anim 0.5s ease-in-out 0s forwards");
        anim(l.children[2].children[2], "new-task-anim 0.5s ease-in-out 0s forwards");
    }
})

















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

            dataArr[0].tasksHtml = taskList.innerHTML;

            dataArr[0].cantTasks++;

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

            anim(e.target.parentElement, "new-task-anim 0.5s ease-in-out 0s forwards reverse");
            anim(e.target.parentElement.children[0], "new-task-anim 0.5s ease-in-out 0s forwards reverse");
            anim(e.target.parentElement.children[2], "new-task-anim 0.5s ease-in-out 0s forwards reverse");

            setTimeout(() => {
                e.target.parentElement.remove();
                dataArr[0].tasksHtml = taskList.innerHTML;

                dataArr[0].cantTasks--;
                if(e.target.parentElement.children[0].classList.contains("task-check-btn-checked")){
                    dataArr[0].completedTasks--;
                }

                saveData();
            }, 500);
        }
    }

    if (e.target.classList.contains("task-check-btn")) {
        if (e.target.classList.contains("task-check-btn-checked")) {
            e.target.classList.remove("task-check-btn-checked");
            dad.children[1].style.textDecoration = "none";
            dataArr[0].completedTasks--;
        } else {
            e.target.classList.add("task-check-btn-checked");
            dad.children[1].style.textDecoration = "line-through";
            dataArr[0].completedTasks++;
        }
        dataArr[0].tasksHtml = taskList.innerHTML;
        saveData();
    }
});

volverBtn.addEventListener("click", () => {
    roomsSection.style.display = "block";
    listSection.style.display = "none";
    showData();
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

function createListHtml(listData) {
    return `
                <li class="list toList" id="${listData.listId}">
                    <p class="list-name child-toList">${listData.listName}</p>
                    <button class="list-delete-btn">Eliminar</button>
                    <div class="count-tasks-div child-toList">
                        <div class="task-check-btn-checked-inlist task-check-btn-checked"></div>
                        <p> <span class="list-p-tasks-count">${listData.completedTasks}</span></p>
                        <div class="task-check-btn-checked-inlist"></div>
                        <p><span class="list-p-tasks-count">${listData.cantTasks - listData.completedTasks}</span></p>
                    </div>
                </li>
            `
}