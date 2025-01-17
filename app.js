let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true;//playerX,playerO

let count=0;

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame= () => {
    turnO=true;
    count=0;
    enableboxes();
    msgcontainer.classList.add("hide");
};


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{ 
        if(turnO){
            //playerO
            box.innerText="O";
            turnO=false;

        }
        else{
            //playerX
            box.innerText="X";
            turnO=true;
           
        }
        box.disabled=true;
        count++;

        let isWinner=checkwinner();

        if(count==9 && !isWinner){
            checkDraw();
        }
    });
});

const checkDraw=() => {
    msg.innerText="Match is Draw";
    msgcontainer.classList.remove("hide");
    disableboxes();
}


const disableboxes= () => {
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableboxes= () => {
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulation, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}

const checkwinner=() =>{
    for(let pattern of winPatterns){    
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val!="" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};


newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);
