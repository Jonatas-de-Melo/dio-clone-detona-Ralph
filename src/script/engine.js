const state= {//sao variaves que autera elementos visualmente
    view:{
        squares: document.querySelectorAll(".square"),//seleciona varios
        enemy: document.querySelector(".enemy"),//seleciona sor um
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values:{
       
        gameVelocitty:1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },

    actions:{
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    state.values.curretTime--;// 
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }

    function playSound(audioName){
        let audio = new Audio(`./src/audios/${audioName}.m4a`);
        audio.play();
    }
}
//sortia um quadrado aleatorio
function randomSquare(){
    //forEach -- remover  limpa todos o inimigos
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    });
        //sortei um numero aleatorio e --floor pega a parte inteira
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id; 
}

function moveEnemy(){
        // a cada intervalo de tempo o serInterval chama a funcao randomSquare
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocitty);
}
//esperando alguma acao
function addListenerHitbox(){
 state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
           if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null; //para nao ficar pontuando
                playSound("hit");
            }
    });
 });
}
//chamas outras funcao iniciais
function initialize(){
    
    moveEnemy();
    addListenerHitbox();
    
}

initialize();