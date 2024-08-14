let boxItems = document.querySelectorAll(".task-box");
let logCl = document.querySelector(".backlog-cl");
let toDoCl = document.querySelector(".todo-cl");
let progressCl = document.querySelector(".progress-cl");
let reviewCl = document.querySelector(".review-cl");
let doneCl = document.querySelector(".done-cl");

let draggedElement = null;
const placeholder = document.createElement("div");
placeholder.classList.add("placeholder");

function saveState() {
  const columns = document.querySelectorAll(
    ".backlog-cl, .todo-cl, .progress-cl, .review-cl, .done-cl"
  );
  const state = Array.from(columns).map((column) => ({
    className: column.className,
    tasks: Array.from(column.querySelectorAll(".task-box")).map((task) => {
      const taskAttributes = {};
      Array.from(task.attributes).forEach((attr) => {
        taskAttributes[attr.name] = attr.value;
      });
      return {
        attributes: taskAttributes,
        content: task.innerHTML,
      };
    }),
  }));
  localStorage.setItem("columnsState", JSON.stringify(state));
}

function restoreState() {
  const state = JSON.parse(localStorage.getItem("columnsState"));
  if (state) {
    state.forEach((columnState) => {
      const column = document.querySelector(
        `.${columnState.className.split(" ").join(".")}`
      );
      if (column) {
        column.innerHTML = columnState.tasks
          .map((task) => {
            const taskElement = document.createElement("div");
            Object.entries(task.attributes).forEach(([name, value]) => {
              taskElement.setAttribute(name, value);
            });
            taskElement.innerHTML = task.content;
            taskElement.classList.add("task-box");
            taskElement.setAttribute("draggable", "true");
            return taskElement.outerHTML;
          })
          .join("");
      }
    });

    document.querySelectorAll(".task-box").forEach((item) => {
      item.addEventListener("dragstart", handleDragStart);
      item.addEventListener("dragend", handleDragEnd);
    });
  }
}

function handleDragStart(e) {
  draggedElement = e.target;
  e.dataTransfer.setData("text/plain", null);
  e.dataTransfer.effectAllowed = "move";
  e.target.classList.add("dragging");
  setTimeout(() => e.target.classList.add("invisible"), 0);
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  const target = e.target;
  if (target.classList.contains("task-box") && target !== draggedElement) {
    target.parentNode.insertBefore(placeholder, target.nextSibling);
  } else if (target.classList.contains("task-column")) {
    target.appendChild(placeholder);
  }
}

function handleDrop(e) {
  e.preventDefault();
  if (draggedElement) {
    placeholder.parentNode.insertBefore(draggedElement, placeholder);
    draggedElement.classList.remove("dragging", "invisible");
    draggedElement = null;
    placeholder.remove();
    saveState();
  }
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging", "invisible");
  placeholder.remove();
}

boxItems.forEach((item) => {
  item.setAttribute("draggable", true);
  item.addEventListener("dragstart", handleDragStart);
  item.addEventListener("dragend", handleDragEnd);
});

[logCl, toDoCl, progressCl, reviewCl, doneCl].forEach((container) => {
  container.classList.add("task-column");
  container.addEventListener("dragover", handleDragOver);
  container.addEventListener("drop", handleDrop);
});

document.addEventListener("DOMContentLoaded", restoreState);
