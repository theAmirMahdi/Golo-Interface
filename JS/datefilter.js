(function () {
  let modal = document.getElementById("myModal");
  let span = document.getElementsByClassName("close")[0];
  let select = document.getElementById("funcdateelemnt");
  let dateInput = document.getElementById("dateInput");
  let selectedDate;

  select.addEventListener("click", function () {
    if (select.value !== "date") {
      modal.style.display = "block";
      dateInput.style.display = "block";
    }
  });

  span.onclick = function () {
    modal.style.display = "none";
    dateInput.style.display = "none";
    selectedDate = dateInput.value;
    dateInput.value = "";
    select.value = "date";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      dateInput.style.display = "none";
      selectedDate = dateInput.value;
      dateInput.value = "";
      select.value = "date";
    }
  };
})();
