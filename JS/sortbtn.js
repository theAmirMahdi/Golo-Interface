let sortBtn = document.querySelector(".sort-btn");
let modalElem = document.querySelector("#sortmodal");
let applyBtn = document.querySelector(".apply-sort");
let closeBtn = document.querySelector("#sort-close");

sortBtn.addEventListener("click", () => {
  modalElem.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modalElem.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modalElem) {
    modalElem.style.display = "none";
  }
});

applyBtn.addEventListener("click", () => {
  let sortBy = [];

  let alphabetCheckbox = document.querySelector("#alphabet");
  let priorityCheckbox = document.querySelector("#prority");

  console.log("Alphabet checkbox checked:", alphabetCheckbox.checked);
  console.log("Priority checkbox checked:", priorityCheckbox.checked);

  if (alphabetCheckbox.checked) sortBy.push("alphabet");
  if (priorityCheckbox.checked) sortBy.push("priority");

  console.log("Sorting by criteria:", sortBy);

  let stages = ["backlog-cl", "todo-cl", "progress-cl", "review-cl", "done-cl"];
  stages.forEach((stageClass) => {
    let stageContainer = document.querySelector(`.${stageClass}`);
    if (stageContainer) {
      let taskBoxes = stageContainer.querySelectorAll(".task-box");
      sortTasks(Array.from(taskBoxes), stageContainer, sortBy);
    }
  });

  modalElem.style.display = "none";
});

function sortTasks(tasksArray, container, criteria) {
  const priorityMap = {
    "low-prority": 1,
    "medium-prority": 2,
    "high-prority": 3,
  };

  tasksArray.sort((a, b) => {
    for (let criterion of criteria) {
      if (criterion === "alphabet") {
        let titleA = a
          .querySelector(".task-box-details h4")
          .innerText.toLowerCase();
        let titleB = b
          .querySelector(".task-box-details h4")
          .innerText.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
      } else if (criterion === "priority") {
        console.log("Entering priority sorting");
        let priorityElemA = a.querySelector(".prority");
        let priorityElemB = b.querySelector(".prority");

        if (priorityElemA && priorityElemB) {
          let priorityA = priorityElemA.classList[0].toLowerCase();
          let priorityB = priorityElemB.classList[0].toLowerCase();

          if (priorityMap[priorityA] < priorityMap[priorityB]) return -1;
          if (priorityMap[priorityA] > priorityMap[priorityB]) return 1;
        } else {
          console.log("Priority elements not found");
        }
      }
    }
    return 0;
  });

  tasksArray.forEach((task) => {
    container.appendChild(task);
  });
}
