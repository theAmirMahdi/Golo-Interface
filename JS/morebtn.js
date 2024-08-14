let moreBtns = document.querySelectorAll("#more-option");
let dropDowns = document.querySelectorAll("#dropdown-menu");
let commentModal = document.querySelector("#commentModal");
let listItems = document.querySelectorAll(".items li");
let addButton = document.querySelector("#cmAddBtn");
let closeBtn = document.querySelector(".close-box");

moreBtns.forEach((btn, index) => {
  btn.addEventListener("click", (event) => {
    // Hide all dropdowns
    dropDowns.forEach((dropdown) => {
      dropdown.style.display = "none";
    });

    // Find the corresponding dropdown for the clicked button
    let dropdown = dropDowns[index];
    dropdown.style.display = "block";

    // Prevent the event from propagating to the window
    event.stopPropagation();
  });
});

window.addEventListener("click", () => {
  dropDowns.forEach((dropdown) => {
    dropdown.style.display = "none";
  });
});

closeBtn.addEventListener("click", () => {
  commentModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === commentModal) {
    commentModal.style.display = "none";
  }
});

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    dropDowns.forEach((dropdown) => {
      dropdown.style.display = "none";
    });
    commentModal.style.display = "block";
  });
});
