const burgerBar = document.getElementById("burgerBar");
const burgerBarBtn = document.getElementById(
  "burgerBarBtn",
) as HTMLInputElement;

document.addEventListener("click", function (event) {
  if (!event.target) return;

  const isClickInside = burgerBar?.contains(event.target as Node);

  if (!isClickInside) {
    burgerBarBtn.checked = false;
  }
});
