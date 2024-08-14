const showModal = () => {
  modalElem.style.display = "block";
};

const hideModal = () => {
  modalElem.style.display = "none";
};

const appendTaskToStage = (newTask) => {
  let backlogCl = document.querySelector(".backlog-cl");
  console.log("clicked");
  backlogCl.appendChild(newTask);
};

let form = document.querySelector("#Form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskName = document.getElementById("taskName").value;
  const priority = document.getElementById("priority").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  const task = {
    name: taskName,
    priority: priority,
    startDate: startDate,
    endDate: endDate,
  };

  hideModal();

  form.reset();

  const taskTemplate = document.querySelector(".task-box");
  const newTask = taskTemplate.cloneNode(true);
  newTask.style.display = "block";

  const taskBoxComment = newTask.querySelector(".task-box-comment");
  if (taskBoxComment) {
    taskBoxComment.remove();
  }

  const priorityElem = newTask.querySelector(".prority");
  priorityElem.textContent = priority;

  // Add appropriate class based on priority
  priorityElem.classList.remove(
    "low-prority",
    "medium-prority",
    "high-prority"
  );
  if (priority === "Low") {
    priorityElem.classList.add("low-prority");
  } else if (priority === "Medium") {
    priorityElem.classList.add("medium-prority");
  } else if (priority === "High") {
    priorityElem.classList.add("high-prority");
  }

  newTask.querySelector(".task-box-details h4").textContent = taskName;
  newTask.querySelector(
    ".task-box-details p"
  ).textContent = `${startDate} → ${endDate}`;

  appendTaskToStage(newTask);
});

const modalElem = document.getElementById("taskModal");
const addBtns = document.querySelectorAll(".add-task-btn button");
const closeButtons = document.querySelectorAll(".close-task");

addBtns.forEach((addBtn) => {
  addBtn.addEventListener("click", () => {
    showModal();
  });
});

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    hideModal();
  });
});

window.addEventListener("click", (event) => {
  if (event.target === modalElem) {
    hideModal();
  }
});
