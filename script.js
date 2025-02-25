let taskInputValue = document.getElementById("input");
let addBtn = document.getElementById("addBtn");
let list = document.querySelector(".taskLists");
let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;

taskArray.forEach((element) => {
  let li = document.createElement("li");
  li.classList.add("task");
  li.dataset.id = element.id;
  let p = document.createElement("p");
  p.classList.add("text");
  p.textContent = element.text;
  let divBtns = document.createElement("div");
  divBtns.classList.add("btns");
  let editBtn = document.createElement("button");
  editBtn.classList.add("EditBtn");
  editBtn.textContent = "Edit";
  let delBtn = document.createElement("button");
  delBtn.classList.add("deleteBtn");
  delBtn.textContent = "Delete";
  list.append(li);
  li.append(p, divBtns);
  divBtns.append(editBtn, delBtn);
  delBtn.addEventListener("click", () => {
    deleteTask(element.id);
  });
  editBtn.addEventListener("click", () => {
    if (editingTaskId !== null && editingTaskId !== element.id) {
      return;
    }

    if (editBtn.textContent === "Edit") {
      editingTaskId = element.id;
      addBtn.classList.add("editBtnHidden");
      taskInputValue.value = li.firstElementChild.textContent;
      editBtn.textContent = "Update";
    } else if (editBtn.textContent === "Update") {
      addBtn.classList.remove("editBtnHidden");
      li.firstElementChild.textContent = taskInputValue.value;
      element.text = taskInputValue.value;
      taskInputValue.value = "";
      editBtn.textContent = "Edit";
      editingTaskId = null;
      saveToLocalStorage();
    }
  });
});

function deleteTask(id) {
  taskArray = taskArray.filter((task) => task.id !== id);
  saveToLocalStorage();
  const taskElement = document.querySelector(`[data-id="${id}"]`);
  if (taskElement) {
    taskElement.remove();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function createNewTask() {
  let task = {
    id: Date.now(),
    text: taskInputValue.value,
  };
  taskArray.push(task);
  let li = document.createElement("li");
  li.classList.add("task");
  li.dataset.id = task.id;
  let p = document.createElement("p");
  p.classList.add("text");
  p.textContent = task.text;
  let divBtns = document.createElement("div");
  divBtns.classList.add("btns");
  let editBtn = document.createElement("button");
  editBtn.classList.add("EditBtn");
  editBtn.textContent = "Edit";
  let delBtn = document.createElement("button");
  delBtn.classList.add("deleteBtn");
  delBtn.textContent = "Delete";
  list.append(li);
  li.append(p, divBtns);
  divBtns.append(editBtn, delBtn);
  delBtn.addEventListener("click", () => {
    deleteTask(task.id);
  });
  editBtn.addEventListener("click", () => {
    if (editingTaskId !== null && editingTaskId !== task.id) {
      return;
    }
    if (editBtn.textContent === "Edit") {
      editingTaskId = task.id;
      addBtn.classList.add("editBtnHidden");
      taskInputValue.value = li.firstElementChild.textContent;
      editBtn.textContent = "Update";
    } else if (editBtn.textContent === "Update") {
      addBtn.classList.remove("editBtnHidden");
      li.firstElementChild.textContent = taskInputValue.value;
      task.text = taskInputValue.value;
      taskInputValue.value = "";
      editBtn.textContent = "Edit";
      editingTaskId = null;
      saveToLocalStorage();
    }
  });
  saveToLocalStorage();
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createNewTask();
  saveToLocalStorage();
  taskInputValue.value = "";
});

/* 
problem one => {
  - can click more than edit btn and make problems
  } solution {
  - create that variable let editingTaskId = null;
  and make this condition in the first of code {click on edit btn}
      if (editingTaskId !== null && editingTaskId !== task.id) {
      return;
    }
  - 
  }
*/
