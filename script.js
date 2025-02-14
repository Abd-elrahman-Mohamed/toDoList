let input = document.getElementById("input");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("list");
let clearBtn = document.getElementById("clearBtn");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task) => {
  displayTasks(task);
});

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(task) {
  let li = document.createElement("li");
  li.id = "liTask";
  li.textContent = task.text;
  li.dataset.id = task.id;
  let smallContainer = document.createElement("div");
  smallContainer.className = "small-container";
  let span = document.createElement("span");
  span.textContent = "Delete";
  let edit = document.createElement("span");
  edit.textContent = "Edit";
  smallContainer.append(span, edit);
  li.append(smallContainer);
  list.append(li);
  // when click on edit
  edit.addEventListener("click", (event) => {
    const id = event.target.parentElement.parentElement.dataset.id;
    let targetTask = tasks.find((task) => task.id == id);
    if (edit.textContent.toLowerCase() === "edit") {
      input.value = targetTask.text;
      edit.textContent = "Update";
      addBtn.remove();
    } else {
      const add = document.createElement("button");
      add.id = "addBtn";
      add.textContent = "Add";
      document.querySelector(".first").append(add);
      targetTask.text = input.value;
      event.target.parentElement.parentElement.textContent = input.value;
      edit.textContent = "Edit";
      smallContainer.append(span, edit);
      li.append(smallContainer);
      list.append(li);
      input.value = "";
      saveToLocalStorage();
    }
    // input.value = targetTask.text;
    // edit.textContent = "update";
    // edit.addEventListener("click", () => {
    // targetTask.text = 'memo';
    // });
    // console.log(targetTask);
    // saveToLocalStorage();
  });
  // when click on delete
  span.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.remove();
    console.log(e.target.parentElement.parentElement.dataset.id);
    let index = tasks.findIndex((task) => {
      task.id == e.target.parentElement.parentElement.dataset.id;
    });
    tasks.splice(index, 1);
    saveToLocalStorage();
  });
}

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  list.innerHTML = "";
});

function creation() {
  // create a object and push it to tasks array
  if (input.value.trim() === "") {
    const errTxt = document.querySelector(".errText");
    const overLay = document.querySelector(".overlay");
    errTxt.style.display = "block";
    overLay.style.display = "block";
    setTimeout(() => {
      errTxt.style.display = "none";
      overLay.style.display = "none";
    }, 1000);
  } else {
    const taskObject = {
      text: input.value,
      id: Date.now(),
    };
    tasks.push(taskObject);
    displayTasks(taskObject);
    saveToLocalStorage();
    input.value = "";
  }
}

addBtn.addEventListener("click", () => {
  creation();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" || (e.key === "Enter" && edit.textContent === "Update")) {
    creation();
  }
});
