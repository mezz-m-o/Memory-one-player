const Cards ={
    "3,b,1":"Cards/Card1.png"
    ,"k,r,1":"Cards/Card2.png"
    ,"3,r,1":"Cards/Card3.png"
    ,"2,b,1":"Cards/Card4.png"
    ,"3,r,2":"Cards/Card5.png"
    ,"a,b,1":"Cards/Card6.png"
    ,"2,b,2":"Cards/Card7.png"
    ,"7,r,1":"Cards/Card8.png"
    ,"a,b,2":"Cards/Card9.png"
    ,"a,r,1":"Cards/Card10.png"
    ,"8,r,1":"Cards/Card11.png"
    ,"8,b,1":"Cards/Card12.png"
    ,"k,b,1":"Cards/Card13.png"
    ,"7,b,1":"Cards/Card14.png"
    ,"a,r,2":"Cards/Card15.png"
    ,"j,r,1":"Cards/Card16.png"
    ,"j,b,1":"Cards/Card17.png"
    ,"j,b,2":"Cards/Card18.png"
    ,"8,b,2":"Cards/Card19.png"
    ,"9,r,1":"Cards/Card20.png"
    ,"8,r,2":"Cards/Card21.png"
    ,"j,r,2":"Cards/Card22.png"
    ,"7,r,2":"Cards/Card23.png"
    ,"10,r,1":"Cards/Card24.png"
    ,"10,b,1":"Cards/Card25.png"
    ,"9,b,1":"Cards/Card26.png"
    ,"10,b,2":"Cards/Card27.png"
    ,"10,r,2":"Cards/Card28.png"
    ,"9,b,2":"Cards/Card29.png"
    ,"7,b,2":"Cards/Card30.png"
    ,"9,r,2":"Cards/Card31.png"
    ,"q,b,1":"Cards/Card32.png"
    ,"k,r,2":"Cards/Card34.png"
    ,"q,b,2":"Cards/Card35.png"
    ,"2,r,1":"Cards/Card36.png"
    ,"q,r,1":"Cards/Card37.png"
    ,"4,r,1":"Cards/Card38.png"
    ,"6,b,1":"Cards/Card39.png"
    ,"q,r,2":"Cards/Card40.png"
    ,"6,b,2":"Cards/Card41.png"
    ,"6,r,1":"Cards/Card42.png"
    ,"4,r,2":"Cards/Card43.png"
    ,"5,r,1":"Cards/Card44.png"
    ,"4,b,1":"Cards/Card45.png"
    ,"6,r,2":"Cards/Card46.png"
    ,"4,b,2":"Cards/Card47.png"
    ,"3,b,8":"Cards/Card48.png"
    ,"5,b,1":"Cards/Card49.png"
    ,"5,b,2":"Cards/Card50.png"
    ,"5,r,2":"Cards/Card51.png"
    ,"2,r,2":"Cards/Card52.png"
    ,"3,b,2":"Cards/Card1.png"
    ,"k,b,2":"Cards/Card13.png"
};
let Player=1;
let open_cards=[];
let open_cards_simplified=[];
let open_cards_place=[];
let card_stack=[];
let existing_cards= [];
const card_names=["a","2","3","4","5","6","7","8","9","10","j","q","k"];
let Card_grid = [];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
if(localStorage.getItem("low_score")==null){
  document.getElementById("low_score").textContent="low score: --";
}else{
  document.getElementById("low_score").textContent=`low score: ${localStorage.getItem("low_score")}`;
};
//console.log(getRandomInt(1, 10)); // Returns a whole number from 1 to 10
let Useable_cards = [];
function Set_cards(i){
  let colour="";
  if(i % 2 === 0){colour="r"}else{colour="b"};
  const card_type=card_names[getRandomInt(0, card_names.length-1)];

  Useable_cards.push(`${card_type},${colour},${getRandomInt(1,2)}`);
  Useable_cards.push(`${card_type},${colour},${getRandomInt(1,2)}`);
}
function add_cards_to_grid(){
  let Random_num=0;
  for (let i = 1; i < 17; i++){
    Random_num=getRandomInt(0, Useable_cards.length-1);
    Card_grid.push(Useable_cards[Random_num]);
    Useable_cards.splice(Random_num,1);
  }
  existing_cards=[...Card_grid];
}
function set_alts(){
  for(let i = 1; i < 16 +1; i++){
    document.getElementById(`card${i}`).alt=Card_grid[i-1];
  }
}
for (let i = 1; i < 9; i++){
  Set_cards(i);
}
function View_cards(){
  for (let i = 1; i < 16 +1; i++){
    document.getElementById(`card${i}`).src=Cards[Card_grid[i-1]];
  }
}
function reset_cards(){
  for (let i = 1; i < 16 +1; i++){
    document.getElementById(`card${i}`).src="Cards/Card33.png";
  }
}
function on_card_click(card_number){
  const current_card=Card_grid[card_number-1];
  let current_card_simplified=current_card
  current_card_simplified.split(",");
  current_card_simplified=current_card_simplified.split(",");
  current_card_simplified.pop();
  current_card_simplified=current_card_simplified.join(",");
  if(open_cards.length<2 && open_cards_place[0]!= card_number && !card_stack.includes(card_number)){
    const card = document.getElementById(`card${card_number}`);
    card.src=Cards[current_card];
    open_cards.push(current_card);
    open_cards_simplified.push(current_card_simplified);
    open_cards_place.push(card_number);
    const p1=document.getElementById("p1");
    const p2=document.getElementById("p2");
    if(open_cards.length>1){
      setTimeout(function(){
        const html_card_stack=document.getElementById("card_stack");
        if(open_cards_simplified[0] == open_cards_simplified[1]){
          html_card_stack.innerHTML=`${html_card_stack.innerHTML}<img src='${Cards[open_cards[0]]}' alt='${open_cards[0]}' class='cards'>`;
          html_card_stack.innerHTML=`${html_card_stack.innerHTML}<img src='${Cards[open_cards[1]]}' alt='${open_cards[1]}' class='cards'><br>`;
          console.log("good");
          document.getElementById(`card${open_cards_place[0]}`).style.opacity = "0";
          document.getElementById(`card${open_cards_place[1]}`).style.opacity = "0";
          existing_cards.splice(existing_cards.indexOf(open_cards[0]), 1);
          existing_cards.splice(existing_cards.indexOf(open_cards[1]), 1);
          card_stack.push(open_cards_place[0]);
          card_stack.push(open_cards_place[1]);
        }
        open_cards=[];
        open_cards_place=[];
        open_cards_simplified=[];
        reset_cards();
      }, 500);
      setTimeout(function(){
        if(existing_cards.length<=0){
        const display = document.getElementById('timer');
        
        if(localStorage.getItem("low_score")==null){localStorage.setItem("low_score", seconds);display.style.color = "#808080";}else if(localStorage.getItem("low_score")>current_score){localStorage.setItem("low_score", seconds);display.style.color = "#00ff00";}else if(localStorage.getItem("low_score")<current_score){display.style.color = "#ff0000"}else{display.style.color = "#ffff00"};
        
        display.style.fontSize = `${screen.availHeight}px`;
        display.requestFullscreen()
        setInterval(function(){
          const display = document.getElementById('timer');
          if(display.style.opacity == "1"){display.style.opacity = "0";}else{display.style.opacity = "1";};
        }, 500);
      };}, 500)
      console.log(card_number);
    }
  }
};
let seconds = 0;
let current_score = 0;
function startTimer() {
  const display = document.getElementById('timer');

  const timer = setInterval(() => {
    seconds++;
    
    display.textContent = seconds;
    current_score=seconds; 
    if(existing_cards.length<=0) {
      setTimeout(function(){
        clearInterval(timer);
      }, 500)
    }
  }, 1000);
}
document.getElementById("start_button").addEventListener("click", function(){
  for (let i = 1; i < 16 +1; i++){
    document.getElementById(`card${i}`).addEventListener("click", function(){on_card_click(i);})
  }
  document.getElementById("header").style.display="none";
  startTimer();
})
add_cards_to_grid();//View_cards();
set_alts();