document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const list = document.getElementById("task-list");
  const form = document.getElementById("todo-form");
  const tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  const audio = document.getElementById("background-music");
  const musicToggle = document.getElementById("music-toggle");

  function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  function renderTasks() {
    list.innerHTML = "";
    tasksArray.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("taskDiv");
      const li = document.createElement("li");
      li.className = "task";
      li.textContent = task;
      const span = document.createElement("span");
      span.innerText = "Del";
      div.append(li, span);
      list.append(div);

      span.addEventListener("click", () => {
        div.remove();
        tasksArray.splice(tasksArray.indexOf(task), 1);
        saveToLocalStorage();
      });
    });
  }

  function addNewTask(value) {
    if (value.trim() === "") {
      showError(".err2");
    } else if (tasksArray.includes(value)) {
      showError(".err1");
    } else {
      tasksArray.push(value);
      saveToLocalStorage();
      renderTasks();
      input.value = "";
    }
  }

  function showError(selector) {
    const errorElement = document.querySelector(selector);
    errorElement.classList.add("visible");
    setTimeout(() => {
      errorElement.classList.remove("visible");
    }, 1000);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewTask(input.value);
  });

  musicToggle.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      musicToggle.textContent = "Pause Music";
    } else {
      audio.pause();
      musicToggle.textContent = "Play Music";
    }
  });

  renderTasks();
});
