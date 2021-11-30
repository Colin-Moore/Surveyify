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

  //Bold nav bar
  const pathname = window.location.pathname;
  const navHome = document.getElementById("navHome");
  const navAbout = document.getElementById("navAbout");
  const navContact = document.getElementById("navContact");
  const navMySurveyList = document.getElementById("navMySurvey");
  const navs = [navHome, navAbout, navContact, navMySurveyList];
  navs.forEach((n) => { n.classList.remove("fw-bold"); });
  if (pathname.includes("/home") || pathname === "/") {
    navHome.classList.add("fw-bold");
  } else if (pathname.includes("/survey-list")) {
    navMySurveyList.classList.add("fw-bold");
  } else if (pathname.includes("/about")) {
    navAbout.classList.add("fw-bold");
  } else if (pathname.includes("/contact")) {
    navContact.classList.add("fw-bold");
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
