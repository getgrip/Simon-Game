var userClickedPattern = []; 
var numberGeneratedPattern =[];
var array = ["blue", "green", "red", "yellow"];
var level = 0; 
var gameStarted = false; 

//on button click call two functions to create sound and shadow 
$(".btn").click(function(e){

    let buttonId = this.id;
    userClickedPattern.push(buttonId);
    console.log(userClickedPattern);

    pressed(buttonId);
    pressedButtonSound(buttonId);

    checkAnswer(userClickedPattern.length-1);
});

$('body').keypress(function(){
    if(!gameStarted){
        generateNewSequence(); 
    }
}); 

/*
* create a shadow around a  box which has pressed
* @param color 
*/
function pressed(pressedButton){
    $("#"+pressedButton).addClass("pressed");
    setTimeout(function(){
        $("#"+pressedButton).removeClass("pressed"); 
    },100)
}

// play sound correlated to the input 
function pressedButtonSound(pressedButton){
    var audio = new Audio("sounds/" + pressedButton +".mp3");
    audio.play();
}

//if user input is wrong play wrong audio 
function wrong(){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over"); 
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200)
    $("#level-title").text("Game Over, Press Any Key to Restart")
}

function generateNewSequence(){
    userClickedPattern =[];
    gameStarted = true;
    level++; 

    $("#level-title").text("Level "+ level);

    var number =Math.floor( Math.random()*4);
    let randomColor = array[number];
    numberGeneratedPattern.push(randomColor); 

    pressed(randomColor);
    pressedButtonSound(randomColor);    
}

function resetGame(){
    level = 0; 
    gameStarted = false; 
    numberGeneratedPattern =[]; 
}

function checkAnswer(currentLevel){
    if(numberGeneratedPattern[currentLevel] === userClickedPattern[currentLevel]){
        if(numberGeneratedPattern.length  == userClickedPattern.length){
            setTimeout(function(){
                generateNewSequence();
            },1000);
        }
    }else{
        wrong(); 
        resetGame();

    }
}