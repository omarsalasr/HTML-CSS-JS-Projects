/**
 * Created by salasrodriguez1089 on 10/21/2016.
 */


function onload(){

}
var word = "JAVA IS BETTER"
var picUrl;
var builtWord = "_ _ _ _ &nbsp&nbsp&nbsp&nbsp _ _ &nbsp&nbsp&nbsp&nbsp _ _ _ _ _ _";
var moneyVal;
var imgVal;
var stopPin = true;
var pNames = [];
var pMoney = [0,0,0];
var pTurn = 0;
var picNum = 0;
var guesses = [];
function spin(){
    var myVar = setInterval(function(){ myTimer() }, 100);
    var stop = 10 + parseInt(Math.random() * 10);
    var totalTimes = 0;
    stopPin = false;
    function myTimer() {

        document.getElementById("img").src = "resources/wheel%20images/" + picUrl[picNum];
        picNum++;
        if(picNum ===picUrl.length){
            picNum = 0;
        }
        totalTimes++;
        if(totalTimes === stop){
            imgVal = picNum - 1;
            stopPin = true;
            showBtns(true);
            clearInterval(myVar);
        }

    }

}

function buildWord(){
    var temp = builtWord;//stores the unmodified word into a temp string
    builtWord = "";//built word with _ or letters
    var match = false;//boolean to check if there is a match
    for(i = 0; i < word.length; i++){//loop to go through the word 14
        for(j = 0; j < guesses.length; j++) {//loop to go through the letters guessed
            // alert(word.charAt(i) + "   " + guesses[j].toUpperCase());
            if (word.charAt(i) == guesses[j].toUpperCase()) {//condition to check if a letter matches
                builtWord += word.charAt(i) + " ";//adds the letter to the built word
                match = true;//match is true
                break;
            }
        }
        if(!match) {//condition to check for no match
            if(word.charAt(i) === " "){
                builtWord += "  &nbsp&nbsp&nbsp&nbsp";
            }else
                builtWord += "_ ";//adds an underscore in the word
        }
        match = false;//match reset
    }
    if(temp.toUpperCase() === builtWord.toUpperCase()){//condition to check if the word was modified
        changeTurn();
    }
    updateStuff();
}

function changeTurn() {
    pTurn ++;
    if(pTurn === 3){
        pTurn = 0;
    }
    updateStuff();
}

function guessL(){
    var guess = window.prompt("What is your guess?");
    guesses.push(guess);
    correctGuess(guess);
    buildWord();
    showBtns(false);
}

function guessW(){
    var guess = window.prompt("What is your guess?");
    if(guess.toUpperCase() === word.toUpperCase()){
        alert("You guessed correctly");
    }else{
        alert("Nope");
        changeTurn();
    }
    showBtns(false);
}

function buyVowel(){

}

function correctGuess(guess) {
    var numCorrect = 0;
    for (i = 0; i < word.length; i++){
        if(guess.toUpperCase() === word.charAt(i).toUpperCase()){
            numCorrect++;
        }
    }
    pMoney[pTurn] += parseInt(moneyVal[imgVal]) * parseInt(numCorrect);
}

function showBtns(bool){
    if(bool){
        document.getElementById("btns").style.display = "block";
        document.getElementById("btnSpin").style.display = "none";

    }else{
        document.getElementById("btns").style.display = "none";
        document.getElementById("btnSpin").style.display = "block";

    }
    if(pMoney[pTurn] >= 250){
        document.getElementById("btnBuy").style.display = "block";
    }else{
        document.getElementById("btnBuy").style.display = "none";
    }
}

function start(){
    pNames.push(window.prompt("Player 1 name?"));
    pNames.push(window.prompt("Player 2 name?"));
    pNames.push(window.prompt("Player 3 name?"));

    picUrl = ["wheel01.jpg","wheel02.jpg","wheel03.jpg","wheel04.jpg","wheel05.jpg","wheel06.jpg","wheel07.jpg","wheel08.jpg",
        "wheel09.jpg","wheel10.jpg","wheel11.jpg","wheel12.jpg","wheel13.jpg","wheel14.jpg","wheel15.jpg","wheel16.jpg",
        "wheel17.jpg","wheel18.jpg","wheel19.jpg","wheel20.jpg","wheel21.jpg","wheel22.jpg","wheel23.jpg","wheel24.jpg"];
    moneyVal = ["500","750","Bankrupt","350","250","600","400","150","250","400","200","Lose",
        "450","150","200","100","Spin","200","300","400","500","100","200","300"];

    document.getElementById("p1").innerHTML = pNames[0];
    document.getElementById("p2").innerHTML = pNames[1];
    document.getElementById("p3").innerHTML = pNames[2];
    document.getElementById("img").style.display = "block";
    document.getElementById("tableInfo").style.display = "block";
    document.getElementById("btnSpin").style.display = "block";
    document.getElementById("btnStart").style.visibility = 'hidden';
    updateStuff();
}

function updateStuff(){
    document.getElementById("word").innerHTML = builtWord;
    document.getElementById("p1M").innerHTML = "$" + pMoney[0];
    document.getElementById("p2M").innerHTML = "$" + pMoney[1];
    document.getElementById("p3M").innerHTML = "$" + pMoney[2];
}

