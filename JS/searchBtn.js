let searchBtn = document.querySelector(".search-btn");
let inputElem = document.querySelector(".input-value");
let modal = document.getElementById("modal");
let span = document.querySelector(".close-btn");
let titleContent = document.querySelectorAll(".task-box-details h4");
let resultsContainer = document.querySelector(".results-container");

function displayResults(results) {
  resultsContainer.innerHTML = "";

  if (results.length > 0) {
    resultsContainer.classList.add("active");
    results.forEach(function (result) {
      let resultElem = document.createElement("div");
      resultElem.textContent = result.textContent;
      resultElem.classList.add("result-item");
      resultsContainer.appendChild(resultElem);
    });
  } else {
    resultsContainer.classList.remove("active");
  }
}

inputElem.addEventListener("input", function () {
  let query = inputElem.value.toLowerCase();
  if (query === "") {
    resultsContainer.innerHTML = "";
    resultsContainer.classList.remove("active");
    return;
  }
  let filteredResults = Array.from(titleContent).filter(function (title) {
    return title.textContent.toLowerCase().includes(query);
  });
  displayResults(filteredResults);
});

searchBtn.addEventListener("click", function () {
  modal.style.display = "flex";
});

span.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
