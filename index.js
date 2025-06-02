const taskForm = document.getElementById("task-form");
const listForm = document.getElementById("new-list-form");
const taskTitleInput = document.getElementById("task-title");
const taskDateTimeInput = document.getElementById("task-datetime");
const taskListSelect = document.getElementById("task-list");
const newListNameInput = document.getElementById("new-list-name");
const listsContainer = document.getElementById("lists-container");

let lists = {
  default: []
};

function renderLists() {
  listsContainer.innerHTML = "";
  for (const listName in lists) {
    const section = document.createElement("section");
    section.className = "task-list";

    const header = document.createElement("h2");
    header.textContent = listName.charAt(0).toUpperCase() + listName.slice(1);
    section.appendChild(header);

    lists[listName].forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";
      if (task.completed) taskDiv.classList.add("completed");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        renderLists();
      });

      const taskInfo = document.createElement("span");
      taskInfo.textContent = `${task.title}${task.due ? " (Due: " + task.due + ")" : ""}`;

      const actions = document.createElement("div");
      actions.className = "task-actions";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => {
        const newTitle = prompt("Edit task title:", task.title);
        if (newTitle !== null) task.title = newTitle;
        renderLists();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        lists[listName].splice(index, 1);
        renderLists();
      });

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      taskDiv.appendChild(checkbox);
      taskDiv.appendChild(taskInfo);
      taskDiv.appendChild(actions);

      section.appendChild(taskDiv);
    });

    listsContainer.appendChild(section);
  }

  updateListSelect();
}

function updateListSelect() {
  taskListSelect.innerHTML = "";
  for (const listName in lists) {
    const option = document.createElement("option");
    option.value = listName;
    option.textContent = listName;
    taskListSelect.appendChild(option);
  }
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskTitleInput.value.trim();
  const due = taskDateTimeInput.value;
  const listName = taskListSelect.value;
  if (!lists[listName]) lists[listName] = [];

  lists[listName].push({ title, due, completed: false });
  taskTitleInput.value = "";
  taskDateTimeInput.value = "";
  renderLists();
});

listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListNameInput.value.trim().toLowerCase();
  if (listName && !lists[listName]) {
    lists[listName] = [];
    renderLists();
  }
  newListNameInput.value = "";
});

renderLists();
