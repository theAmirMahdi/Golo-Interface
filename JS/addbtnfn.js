(function () {
  let addBtn = document.querySelector(".add-task-func button");
  let modal = document.querySelector("#funcModal");
  let closeBtn = document.querySelector(".close-task");
  let form = document.querySelector("#Form");

  let showModal = () => {
    modal.style.display = "block";
  };

  let hideModal = () => {
    modal.style.display = "none";
  };

  let appendTaskToStage = (newTask, stage) => {
    let columns = document.querySelectorAll(
      ".backlog-cl, .todo-cl, .progress-cl, .review-cl, .done-cl"
    );

    columns.forEach((column) => {
      if (column.classList.contains(stage)) {
        column.appendChild(newTask);
      }
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskName = document.getElementById("taskName").value;
    const priority = document.getElementById("priority").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const stage = document.getElementById("stage").value;

    const task = {
      name: taskName,
      priority: priority,
      startDate: startDate,
      endDate: endDate,
      stage: stage,
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

    appendTaskToStage(newTask, stage);
  });

  addBtn.addEventListener("click", () => {
    showModal();
  });

  closeBtn.addEventListener("click", () => {
    hideModal();
  });

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      hideModal();
    }
  });
})();
