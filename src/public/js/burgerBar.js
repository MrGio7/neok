const burgerBar = document.getElementById("burgerBar");
const burgerBarBtn = document.getElementById("burgerBarBtn");

document.addEventListener("click", function (event) {
  const isClickInside = burgerBar.contains(event.target);

  if (!isClickInside) {
    burgerBarBtn.checked = false;
  }
});
