
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
  navs.forEach((n) => {
    n.classList.remove("fw-bold");
  });
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

//add another option text box to the list for multiple choice questions
function AddSelection(){
  let optionContainer = document.createElement("LI");

  let optionLabel = document.createElement("label");
  optionLabel.textContent = "Option";
  let optionText = document.createElement("input");
  optionText.type = "text";
  optionText.pattern=`.*\\S+.*`;
  optionText.value=" ";
  optionText.className = "form-control";
  optionText.name = "optiontext";
  optionText.required = "true";
  optionText.title = "field cannot be blank"; 

  optionContainer.appendChild(optionLabel);
  optionContainer.appendChild(optionText);

  document.getElementById("list").appendChild(optionContainer);
}

function RemoveSelection(){
  let items = document.querySelectorAll("li");
  
  if(items.length == 2) {
    alert("You must have at least two options!");
  }
  else{
  let list = document.getElementById("list");
  list.removeChild(list.lastChild);
  }
}