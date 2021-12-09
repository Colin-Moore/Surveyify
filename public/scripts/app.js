const question = require("../../server/models/question");
 
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

function AddSelection(){
  let option1 = document.getElementById("selectionBox");
  //let questionpage = document.getElementById("responseOptions");
  let choiceContainer = document.createElement("div");
  choiceContainer.className = "form-group";
  let choiceLabel = document.createElement("label");
  choiceLabel.textContent = "Option";
  let choiceText = document.createElement("input");
  choiceText.type = "text";
  choiceText.value="";
  choiceText.className = "form-control";
  choiceText.name = "optiontext";
  choiceText.required = "true";
  choiceText.title = "field cannot be blank";  
  choiceContainer.appendChild(choiceLabel);
  choiceContainer.appendChild(choiceText);
  option1.appendChild(choiceContainer);
}