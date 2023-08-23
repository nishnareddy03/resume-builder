var expCount = 1;
var academicExperince = 1;
var proCount = 1;
// const skillSet = new Set(); //set() avoid duplicates like even if u add smthg 2 time the count will still be 1
const skillA = [];
var fileName = "" //to name file while downloading

function previewimg(event) {
    console.log("previewimg(event) <<");
    console.log(typeof event);
    var imagePreview = document.getElementById("img-preview");

    if (event.target.files[0]) {
        // files is a array, and we only have 1 file, the whole block will be triggered
        // even you have only one file.
        imagePreview.src = URL.createObjectURL(event.target.files[0]);
        imagePreview.style.display = "block";
        // to free the memory after loading the image we write the next line
        imagePreview.onload = function () {
            URL.revokeObjectURL(imagePreview.src); //free memory
        }

    }
}

function addSkill() {
    if (document.querySelector("#skill-input").value.length == 0) {
        alert("Please Enter a Skill");
    }
    else {
        var skillValue = document.querySelector("#skill-input").value;
        var c = skillA.includes(skillValue)
        if (c == true) {
            alert("Skill already exists");//skill already in skill set
            return;
        }
        skillA.push(skillValue); //new skill is added to skill set

        document.querySelector("#skills").innerHTML += `
        <div class="skill mt-1">
        <span class="skill-name">${skillValue}</span>
        <button class="btn btn-outline-danger delete">
        <i class="fa-solid fa-trash-can"></i>
        </button>
        </div>
        `;
        document.querySelector("#skill-input").value = "";
        var current_skill = document.querySelectorAll(".delete");
        for (var i = 0; i < current_skill.length; i++) {
            current_skill[i].onclick = function () {
                this.parentNode.remove();
                skillA.splice(0, i);
            }
        }
    }
}

function addwe() {
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control", "we-field", "mt-1");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute("id", "exp-" + ++expCount);
    newNode.setAttribute("placeholder", "Enter work/project experience " + expCount);

    let expDiv = document.getElementById("add-experience-input");
    let expAddbtnDiv = document.getElementById("we-btns")
    expDiv.insertBefore(newNode, expAddbtnDiv);

}
function delwe() {
    let latestExp = document.getElementById("exp-" + expCount);

    if (expCount > 1) {
        latestExp.remove();
        --expCount;
    }
}
function addpro() {
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control", "pro-field", "mt-1");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute("id", "pro-" + ++proCount);
    newNode.setAttribute("placeholder", "Explain about your project briefly");

    let proDiv = document.getElementById("add-project-input");
    let proAddbtnDiv = document.getElementById("pro-btns")
    proDiv.insertBefore(newNode, proAddbtnDiv);

}
function delpro() {
    let latestPro = document.getElementById("pro-" + proCount);

    if (proCount > 1) {
        latestPro.remove();
        --proCount;
    }
}

function addEducation() {
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control", "ed-field", "mt-1");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute("id", "education-" + ++academicExperince);
    newNode.setAttribute(
        "placeholder",
        "Enter academic details  " + academicExperince
    );
    let educationDiv = document.getElementById("education-div");
    let educationAddButtonDivs = document.getElementById("ed-btns-div");
    let ed_del_btn = document.getElementById("ed-del-btn");
    if (academicExperince > 1) {
        ed_del_btn.removeAttribute("disabled");
    }

    educationDiv.insertBefore(newNode, educationAddButtonDivs);
}

function removeEducation() {
    let latestEducation = document.getElementById("education-" + academicExperince);
    let ed_del_btn = document.getElementById("ed-del-btn");
    if (academicExperince == 1) {
        ed_del_btn.setAttribute("disabled", true);
    }
    if (academicExperince > 1) {
        latestEducation.remove();
        --academicExperince;
    }
}

function startOver() {
    window.location.reload() //refeshes the whole page, it is a windowAPI
}
function generateResume() {
    console.log("generateresume()<<");
    let fullName = document.getElementById("full-name").value;
    let fullNameTemplate = document.getElementById("full-name-template");
    fullNameTemplate.innerHTML = fullName;
    let phoneNumber = document.getElementById("phone-number").value;
    let phoneNumberTemplate = document.getElementById("phone-template");
    phoneNumberTemplate.innerHTML = phoneNumber;
    let email = document.getElementById("email").value;
    let emailTemplate = document.getElementById("email-template");
    emailTemplate.innerHTML = email;
    let address = document.getElementById("address").value;
    let addressTemplate = document.getElementById("address-template");
    addressTemplate.innerHTML = address;
    let linkedIn = document.getElementById("linkedIn").value;
    let linkedInTemplate = document.getElementById("linkedIn-template");
    linkedInTemplate.innerHTML = linkedIn;
    let github = document.getElementById("github").value;
    let githubTemplate = document.getElementById("github-template");
    githubTemplate.innerHTML = github;
    let objective = document.getElementById("objective").value;
    let objectiveTemplate = document.getElementById("objective-template");
    objectiveTemplate.innerHTML = objective;


    let skillSetString = ""
    for (let skill of skillA) {
        skillSetString += `<span class="badge rounded-pill bg-secondary skill-pill">${skill}</span>\n`;
    }
    document.getElementById("skill-template-div").innerHTML = skillSetString;

    let experiences = document.getElementsByClassName("we-field");
    let experienceString = "";
    for (let experience of experiences) {
        experienceString += `<li>${experience.value}</li>`
    }
    let experiencesTemplate = document.getElementById("we-template-div");
    experiencesTemplate.innerHTML = experienceString;

    let projects = document.getElementsByClassName("pro-field");
    let projectString = "";
    for (let project of projects) {
        projectString += `<li>${project.value}</li>`
    }
    let projectsTemplate = document.getElementById("pro-template-div");
    projectsTemplate.innerHTML = projectString;
    
    let educations = document.getElementsByClassName("ed-field");
    let educationString = "";
    for (let education of educations) {
        educationString += `<li>${education.value}</li>`
    }
    let educationsTemplate = document.getElementById("edu-template-div");
    educationsTemplate.innerHTML = educationString;

    //profile picture
    let file = document.getElementById("profile-img").files[0];
  console.log(file);
  if (file === undefined) {
    console.log("No file selected");
  } else {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      //setting when data loading is complete
      document.getElementById("profile-img-template").src = reader.result;
    };
  }

  document.getElementById("resume_form").style.display = "none";
  document.getElementById("resume-template").style.display = "block";
  document.getElementById("save-btn").style.display = "block";



    console.log("generateresume()>>");
}

//print
function printResume(resumeID) {
    console.log("printResume() <<");
    var printContent = document.getElementById(resumeID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    console.log("printResume() >>");
}