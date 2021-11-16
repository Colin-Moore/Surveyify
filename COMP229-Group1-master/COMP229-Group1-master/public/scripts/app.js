// IIFE -- Immediately Invoked Function Expression
(function () {
  function Start() {
    console.log("App Started...");

    let deleteButtons = document.querySelectorAll(".btn-danger");

    for (button of deleteButtons) {
      button.addEventListener("click", (event) => {
        if (!confirm("Are you sure?")) {
          event.preventDefault();
          window.location.assign("/home");
        }
      });
    }
  }

  window.addEventListener("load", Start);
})();

// Nav Toggle
function classToggle() {
  const nav = document.querySelectorAll(".nav_item");

  nav.forEach((nav) => nav.classList.toggle("navbar_toggleShow"));
}

// Event Listeners
document.querySelector(".hamburger").addEventListener("click", classToggle);
