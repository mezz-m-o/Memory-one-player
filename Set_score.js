const submitButton=document.getElementById("submitButton");
const password=document.getElementById("password");
const label=document.getElementById("label");
const pass=document.getElementById("pass");
const SetScore=document.getElementById("setScore");
const score=document.getElementById("score");
const saveButton=document.getElementById("saveButton");
const resetButton=document.getElementById("resetButton");
if(localStorage.getItem("passwordAttempts")==null){localStorage.setItem("passwordAttempts", 0)};
if(localStorage.getItem("passwordAttempts")>=5){
    pass.style.display = "none";     
    label.style.color = "#ff0000";
    label.style.fontSize = `100px`;
    label.textContent = "locked out";
}else{submitButton.addEventListener("click", enterPass);};

function enterPass(){
    if(password.value=="voliboll"){
        pass.style.display = "none";
        SetScore.style.display = "Block";
        saveButton.addEventListener("click", function(){
            localStorage.setItem("low_score", score.value);
            window.location.href = "index.html";
        });
        resetButton.addEventListener("click", function(){
            localStorage.removeItem("low_score");
            window.location.href = "index.html";
        });
    }else{
        localStorage.setItem("passwordAttempts", parseInt(localStorage.getItem("passwordAttempts"))+1);
        label.style.color = "#ff0000";
        label.textContent = `incorrect ${localStorage.getItem("passwordAttempts")}`;
        if(localStorage.getItem("passwordAttempts")>=5){window.location.reload()};
    };
}
