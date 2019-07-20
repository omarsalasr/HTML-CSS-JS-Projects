var a;
var pLives = [3,3];
var player1X = 200;//coordinates
var player1Y = 600;
var player2X = 1100;//coordinates
var player2Y = 600;
var cannon1X = 225;
var cannon1Y = 584;
var cannon2X = 1125;
var cannon2Y = 584;
var moveCanR = false;
var moveCan = false;
var ground = 655;
var wallX = 655;
var wallY = 250;
// var pict = new Image();	//create a new image object and attach it to a reference variable
// pict.src = "resources/Koala.jpg"; //creates a pathname to an image to use. must do this once for each image.
var bullets = [];//array of bullets
var moveBullet = false;//booleans for moving bullets
var pTurn = 0;
var force = [9,9];//force leaving the barrel
var Vy = 0;//Y velocity
var g = .098;//gravity
var xAccl = 0;
var yAccl = 0;
var buttons = [];
var play = false;
var winner = false;

function initialize() {//preview
    drawBackground();
    drawCannons();
    drawPlayers();
    drawMenu();
    drawButton();
}
function startAnimation() {
    animate();
}
function stopAnimation() {
    cancelAnimationFrame(a);
}

function animate(){//animation method
    a=requestAnimationFrame(animate);
    drawBackground();
    drawCannons();
    drawPlayers();
    drawHearts();
    drawWinner();
    drawMeter();
    groundCol();
    wallCol();
    playerCol();
    moveBullets();
    moveCannon();


    // document.getElementById("xCo").innerHTML = "X coor: " + cannon1X;
    // document.getElementById("yCo").innerHTML = "Y coor: " + cannon1Y;
    // document.getElementById("xMs").innerHTML = "X mouse: " + mouseX;
    // document.getElementById("yMs").innerHTML = "Y mouse: " + mouseY;
}

function createButton(x,y,w,h,t) {//method that creates a button object and puts it into an array
    var btn = {xCor:x,yCor:y,width:w,height:h,type:t};
    buttons.push(btn);
}

function drawMenu() {//draws the main menu
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.save();
    ctx.translate(675,125);
    ctx.scale(2,1);
    ctx.beginPath();
    ctx.arc(0, 0, 100, 0, 2 * Math.PI, false);
    var grd = ctx.createLinearGradient(400,300,900,50);
    // var grd = ctx.createRadialGradient(675,125,1,675,125,200);
    grd.addColorStop(0.14, '#882022'); //Red
    grd.addColorStop(0.28, '#E83B23'); //Orange
    grd.addColorStop(0.42, '#FFF101'); //Yellow
    grd.addColorStop(0.56, '#89C540'); //Green
    grd.addColorStop(0.70, '#1BBDC9'); //Blue
    grd.addColorStop(0.84, '#0279B9'); //Indigo
    grd.addColorStop(1.0, '#58235E'); //Violet
    ctx.restore();
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';

    ctx.stroke();
    ctx.font = '80pt Calibri';
    ctx.textAlign = "center";
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    ctx.strokeText("Tanks",675,150);
    ctx.fillStyle = "#FF0000";
    ctx.fillText("Tanks",675,150);

    createButton(550,300,240,120,"start");
}

function drawPP() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    var pict = new Image();	//create a new image object and attach it to a reference variable
    if(play) {
        pict.src = "resources/Pause.png"; //creates a pathname to an image to use. must do this once for each image.
        ctx.drawImage(pict, 1000, -60, 520, 300);
    }else{
        pict.src = "resources/Play.png";
        ctx.drawImage(pict, 1000, -60, 100, 100);
    }

}

function drawWinner() {//draws the winner menu
    var ctx = document.getElementById("myCanvas").getContext("2d");
    if(winner){
        stopAnimation();
        ctx.save();//oval drawing
        ctx.translate(675,175);
        ctx.scale(2,1);
        ctx.beginPath();
        ctx.arc(0, 0, 180, 0, 2 * Math.PI, false);
        var grd = ctx.createLinearGradient(400,300,900,50);
        // var grd = ctx.createRadialGradient(675,125,1,675,125,200);//gradient
        grd.addColorStop(0.14, '#882022'); //Red
        grd.addColorStop(0.28, '#E83B23'); //Orange
        grd.addColorStop(0.42, '#FFF101'); //Yellow
        grd.addColorStop(0.56, '#89C540'); //Green
        grd.addColorStop(0.70, '#1BBDC9'); //Blue
        grd.addColorStop(0.84, '#0279B9'); //Indigo
        grd.addColorStop(1.0, '#58235E'); //Violet
        ctx.restore();
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        ctx.font = '80pt Calibri';//text
        ctx.textAlign = "center";
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white';
        if(pLives[1] === 0) {
            ctx.strokeText("Player 1 Wins!!!", 675, 200);
            ctx.fillStyle = "#0000FF";
            ctx.fillText("Player 1 Wins!!!",675,200);
        }
        else {
            ctx.strokeText("Player 2 Wins!!!", 675, 200);
            ctx.fillStyle = "#FF0000";
            ctx.fillText("Player 2 Wins!!!",675,200);
        }
        createButton(470,500,400,120,"restart");//creates a new button to show
        drawButton();
    }
}

function drawMeter() {//draws the power meter for each player
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.beginPath();
    ctx.arc(225, 715, 10, 5 * Math.PI / 4, 7 * Math.PI / 4);
    if (force[0] > 9) {
        ctx.strokeStyle = 'green';
    } else {
        ctx.strokeStyle = 'white';
    }
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(225, 705, 20, 5 * Math.PI / 4, 7 * Math.PI / 4);
    if (force[0] > 10) {
        ctx.strokeStyle = 'yellow';
    } else {
        ctx.strokeStyle = 'white';
    }
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(225, 695, 30, 5 * Math.PI / 4, 7 * Math.PI / 4);
    if (force[0] > 11) {
        ctx.strokeStyle = 'red';
    } else {
        ctx.strokeStyle = 'white';
    }
    ctx.lineWidth = 12;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(1125, 715, 10, 5 * Math.PI / 4, 7 * Math.PI / 4);
    if (force[1] > 9) {
        ctx.strokeStyle = 'green';
    } else {
        ctx.strokeStyle = 'white';
    }
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(1125, 705, 20, 5 * Math.PI / 4, 7 * Math.PI / 4);
    if (force[1] > 10) {
        ctx.strokeStyle = 'yellow';
    } else {
        ctx.strokeStyle = 'white';
    }
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(1125, 695, 30, 5 * Math.PI / 4, 7 * Math.PI / 4);
    if (force[1] > 11) {
        ctx.strokeStyle = 'red';
    } else {
        ctx.strokeStyle = 'white';
    }
    ctx.lineWidth = 12;
    ctx.stroke();
}

function drawButton() {//draws the buttons that can be displayed
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = 'blue';
    for(i = 0;i < buttons.length; i++) {
        ctx.fillRect(buttons[i].xCor, buttons[i].yCor, buttons[i].width, buttons[i].height);
    }
    ctx.font = '80pt Calibri';
    ctx.textAlign = "center";
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    if(winner == true) {
        ctx.strokeText("Restart", 670, 592);
        ctx.fillStyle = "#0000FF";
        ctx.fillText("Restart", 670, 592);
    }else{
        ctx.strokeText("Start", 670, 392);
        ctx.fillStyle = "#0000FF";
        ctx.fillText("Start", 670, 392);
    }
}

function drawBackground(){//background with the wall and ground
    var ctx = document.getElementById("myCanvas").getContext("2d");
    var grd = ctx.createLinearGradient(0,0,1350,650);
    grd.addColorStop(0,'#990000');
    grd.addColorStop(1,'#000099');
    ctx.fillStyle= grd;
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    ctx.fillStyle="#8b4513";
    ctx.fillRect(0,650,1400,100);
    ctx.fillRect(wallX,wallY,25,400);
}

function drawPlayers() {//draw the player
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(player1X,player1Y,50,50);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(player2X,player2Y,50,50);
}

function drawHearts() {//draws the hearts at the top
    var ctx = document.getElementById("myCanvas").getContext("2d");
    var pict = new Image();
    pict.src = "resources/Heart.png"; //creates a pathname to an image to use. must do this once for each image.
    var x = 550;
    for(i = 0; i < pLives[0]; i++){
        ctx.drawImage(pict, x ,50,40,40);
        x-=60;
    }
    x = 750;
    for(i = 0; i < pLives[1]; i++){
        ctx.drawImage(pict, x ,50,40,40);
        x+=60;
    }
}

function drawCannons(){//draw the cannon
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.strokeStyle = "#000000";
    ctx.beginPath();//a line
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.moveTo(player1X+25, player1Y);//from the tank center
    ctx.lineTo(cannon1X, cannon1Y);//to the calculated x and y
    ctx.stroke();
    ctx.beginPath();//a line
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.moveTo(player2X+25, player2Y);//from the tank center
    ctx.lineTo(cannon2X, cannon2Y);//to the calculated x and y
    ctx.stroke();
}

var createBullet = function(src,xcoord,ycoord) {//function that creates bullets
    var img   = new Image();
    img.src   = src;
    img.left = xcoord;
    img.top = ycoord;
    return img;
};

function moveBullets() {//move the bullets
    var ctx = document.getElementById("myCanvas").getContext("2d");
    if(moveBullet){//checks if it has been shot
        for(i = 0; i < bullets.length; i++){//goes through the array
            Vy -=g;//modifies the y velocity with gravity
            bullets[i].top -= Vy;
            //x velocity is always constant
            if(pTurn == 0) {
                bullets[i].left+= force[0]*Math.cos(calcTheta());
            }else{
                bullets[i].left-= force[1]*Math.cos(calcTheta());
            }
            // document.getElementById("xCoB").innerHTML = "Bullet X : " + bullets[0].left;
            // document.getElementById("yCoB").innerHTML = "Bullet Y : " + bullets[0].top;
            ctx.drawImage(bullets[i],bullets[i].left,bullets[i].top, 10,10);
        }
    }
}

function moveCannon() {//method that moves the cannon
    if(moveCan)
        if(moveCanR){
            if (!(cannon1X - (player1X + 25) == 16) && pTurn == 0){
                cannon1X += 1;
                cannon1Y = player1Y - (Math.sqrt((Math.pow(16, 2)) - (Math.pow(cannon1X - (player1X + 25), 2))));
            }else if(!(cannon2X - (player2X + 25) == 0) && pTurn == 1){
                cannon2X += 1;
                cannon2Y = player2Y - (Math.sqrt((Math.pow(16, 2)) - (Math.pow(cannon2X - (player2X + 25), 2))));
            }
        }else{
            if (!(cannon1X - (player1X + 25) == 0) && pTurn == 0){
                cannon1X -= 1;
                cannon1Y = player1Y - (Math.sqrt((Math.pow(16, 2)) - (Math.pow(cannon1X - (player1X + 25), 2))));//circle formula to get the y of the tip of the cannon
            }else if(!(cannon2X - (player2X + 25) == -16) && pTurn == 1){
                cannon2X -= 1;
                cannon2Y = player2Y - (Math.sqrt((Math.pow(16, 2)) - (Math.pow(cannon2X - (player2X + 25), 2))));//circle formula to get the y of the tip of the cannon
            }
        }
    moveCan = false;
}

function calcTheta(){//calc angle of elevation
    var xCom;
    var yCom;
    if(pTurn == 0){
        xCom = Math.abs(cannon1X - (player1X+25));
        yCom = Math.abs(cannon1Y - (player1Y));
    }
    else{
        xCom = Math.abs(cannon2X - (player2X+25));
        yCom = Math.abs(cannon2Y - (player2Y));
    }
    return Math.atan(yCom/xCom);//returns the angle in radians
}

function groundCol() {//checks collision with the ground
    if(moveBullet){
        for(i = 0; i < bullets.length; i++){
            if(bullets[i].top+10 >= ground){
                moveBullet = false;
                bullets.shift();//eliminates the bullet from the array
                changeTurn();
            }
        }
    }
}

function wallCol() {//checks collision with the wall
    if(moveBullet){
        for(i = 0; i < bullets.length; i++){
            if((bullets[i].left+10 >= wallX && bullets[i].top >= wallY && bullets[i].left <= wallX+30) || (bullets[i].left >= wallX && bullets[i].left+10 <= wallX+30 && bullets[i].top+10 >= wallY)){
                moveBullet = false;
                bullets.shift();
                changeTurn();
            }
        }
    }
}

function boundCol() {
    if(!moveBullet){

    }
}

function playerCol() {//checks for player collision
    if(moveBullet){
        for(i = 0; i < bullets.length; i++){
            if(((bullets[i].left+10 >= player1X && bullets[i].top >= player1Y && bullets[i].left <= player1X+50) || (bullets[i].left >= player1X && bullets[i].left+10 <= player1X+50 && bullets[i].top+10 >= player1Y)) ||
                ((bullets[i].left+10 >= player2X && bullets[i].top >= player2Y && bullets[i].left <= player2X+50) || (bullets[i].left >= player2X && bullets[i].left+10 <= player2X+50 && bullets[i].top+10 >= player2Y))){
                moveBullet = false;
                bullets.shift();
                pLives[pTurn] -= 1;
                changeTurn();
            }
        }
    }
    if(pLives[0] === 0 || pLives[1] === 0){
        winner = true;
    }
}

function changeTurn() {//method that changes turns
    pTurn++;
    if(pTurn % 2 == 0){
        pTurn = 0;
    }
}

//Keypress Event code
$(document).keydown(function(event){  //jQuery code to recognize a keydown event
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == 87) {//w



    }
    if(keycode == 65) {//a
        if(!moveBullet) {
            moveCanR = false;
            moveCan = true;
        }
    }
    if(keycode == 68) {//d
        if(!moveBullet) {
            moveCanR = true;
            moveCan = true;
        }
    }
    if(keycode == 83) {//s



    }
    if(keycode == 37){//left arrow
        if(!moveBullet) {
            if (pTurn == 0) {
                if(player1X <= 0)
                    return;
                cannon1X -= 5;
                player1X -= 5;
            } else {
                if(player2X <= 680)
                    return;
                cannon2X -= 5;
                player2X -= 5;
            }
        }
    }
    if(keycode == 38){//up arrow
        if(!moveBullet) {
            force[pTurn] ++;
            if (force[pTurn] == 13) {
                force[pTurn] = 12;
            }
        }
    }
    if(keycode == 39){//right arrow
        if(!moveBullet) {
            if (pTurn == 0) {
                if(player1X + 50 >= 655)//checks for collision with the boundaries
                    return;
                cannon1X += 5;
                player1X += 5;
            } else {
                if(player2X >= 1300)
                    return;
                cannon2X += 5;
                player2X += 5;
            }
        }
    }
    if(keycode == 40){//down arrow
        if(!moveBullet) {
            force[pTurn]--;
            if (force[pTurn] == 8) {
                force[pTurn] = 9;
            }
        }
    }
    if(keycode == 70){//F
        if(!moveBullet) {
            if (pTurn == 0) {
                bullets.push(createBullet("resources/Koala.jpg", cannon1X - 5, cannon1Y));
                Vy = force[0] * Math.sin(calcTheta());//gets the initial y velocity
            }else{
                bullets.push(createBullet("resources/Koala.jpg", cannon2X - 5, cannon2Y));
                Vy = force[1] * Math.sin(calcTheta());//gets the initial y velocity
            }

            moveBullet = true;
        }
    }

    if(keycode == 48){//zero
        play = false;
    }

});

var mouseX = 0;
var mouseY = 0;

$(function() {
    var canvas = $("#myCanvas");
    var ctx = document.getElementById("myCanvas").getContext("2d");

    $("#myCanvas").click(function(eventObject) {
        mouseX = eventObject.pageX - this.offsetLeft;
        mouseY = eventObject.pageY - this.offsetTop;

        if(mouseX >= buttons[0].xCor && mouseX <= buttons[0].xCor + buttons[0].width && mouseY >= buttons[0].yCor && mouseY <= buttons[0].yCor + buttons[0].height) {
            // $('#outputSpan').fadeIn("fast");
            // $("#outputSpan").html("You clicked the button");
            // $('#outputSpan').fadeOut("slow");
            if(buttons[0].type === "start") {//checks if the button is a start type button
                startAnimation();
                play = true;
                buttons.shift();
            }else if(buttons[0].type === "restart"){//checks if the button is a restart type of button
                play = true;
                winner = false;
                buttons.shift();
                pLives[0] = 3;
                pLives[1] = 3;
                startAnimation();
            }

        }
    });

});