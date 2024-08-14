let sidebar = document.querySelector(".aside");
let toggleBtn = document.querySelector(".toggle-btn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

