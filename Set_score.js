const submitButton=document.getElementById("submitButton");
const password=document.getElementById("password");
const label=document.getElementById("label");
const pass=document.getElementById("pass");
const SetScore=document.getElementById("setScore");
const score=document.getElementById("score");
const saveButton=document.getElementById("saveButton");
const resetButton=document.getElementById("resetButton");
submitButton.addEventListener("click", function(){
    if(password.value=="voli Boll"){
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
        label.style.color = "#ff0000";
        label.textContent = "incorrect";
    };
});
