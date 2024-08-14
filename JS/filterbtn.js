let filterBtn = document.querySelector(".filter-btn");
let modalElem = document.querySelector("#filtermodal");
let closeBtn = document.querySelector("#close-btn");
let applyBtn = document.querySelector(".apply-btn");
let prioritySelect = document.querySelector("#priority");
let taskBoxes = document.querySelectorAll(".task-box");

filterBtn.addEventListener("click", () => {
  modalElem.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  modalElem.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modalElem) {
    modalElem.style.display = "none";
  }
});

applyBtn.addEventListener("click", () => {
  let selectedPriority = prioritySelect.value;
  taskBoxes.forEach((box) => {
    box.style.display = "none";
  });

  taskBoxes.forEach((box) => {
    let tasks = box.querySelectorAll(".prority");
    tasks.forEach((task) => {
      if (task.classList.contains(selectedPriority)) {
        box.style.display = "flex";
      }
    });
  });

  modalElem.style.display = "none";
});
