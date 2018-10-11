/*
 * @author: Tim Ascencio
 * Project S301 : side-step arrow dodging video game
 * v03
 * game.js is default game running
 */

function drawBackground(primaryFill, secondaryFill){

	// Draw primary background
	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = primaryFill;
	ctx.fill();
	ctx.closePath();

	// Draw secondary background
	ctx.beginPath();
	ctx.rect(0, ((canvas.height*3)/4), canvas.width, (canvas.height/4));
	ctx.fillStyle = secondaryFill;
	ctx.fill();
	ctx.closePath();
}

function drawActor(primaryFill, secondaryFill){

	// Draw mainActor (top box)
	ctx.beginPath();
	ctx.rect(actorTopX, actorY, actorWidth, actorHeight);
	ctx.fillStyle = secondaryFill;
	ctx.fill();
	ctx.closePath();
	
	// Draw mainActor (bottom box)
	ctx.beginPath();
	ctx.rect(actorBottomX, actorY+actorHeight, actorWidth, actorHeight);
	ctx.fillStyle = primaryFill;
	ctx.fill();
	ctx.closePath();
	
	// move top actor left/right on key press
	// left/right arrow keys
	if(rightPressed && actorTopX < canvas.width-actorWidth){
		actorTopX += actorSpeed;
	} else if(leftPressed && actorTopX > 0){
		actorTopX -= actorSpeed;
	}
	
	// move bottom actor left/right on key press
	// A key(travel left) D key(travel right)
	if(keyDPressed && actorBottomX < canvas.width-actorWidth){
		actorBottomX += actorSpeed;
	} else if(keyAPressed && actorBottomX > 0){
		actorBottomX -= actorSpeed;
	}
}

// Random Number Generator within bounds of canvas for arrow spawn locations
function arrowSpawnRNG(){
	max = ctx.canvas.width;
	min = 0;
	rng = Math.random() * ((max-min) + min);
	return rng;
}

// Draw the rectangle that is the base of the arrow
// secondary outline - primary fill - thinckness of 5
function drawArrowStick(x, y, width, height, fill, stroke){
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.rect(x, y, width, height);
	ctx.strokeStyle = stroke;
	ctx.stroke();
	ctx.fillStyle = fill;
	ctx.fill();
	ctx.closePath();
}

// Draw arrow head using triangle points. Specified points with variables
// secondary outline - primary fill - thinckness of 5
function drawArrowHead(x, y, baseX, baseY, fill, stroke){
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.moveTo(x, y);  // origin
    ctx.lineTo(baseX, baseY);  // from origin to point1
    ctx.lineTo(baseX+20, baseY);  // from point 1 to point 2
	ctx.lineTo(x, y);  // from point 2 back to origin
	ctx.strokeStyle = stroke;
	ctx.stroke();
	ctx.fillStyle = fill;
	ctx.fill();
	ctx.closePath();
}

// Combine arrow stick and arrow head
// Draw full arrow traveling down (increase Y position variables)
function drawArrow(){
	
	// draw both components of the arrow
	drawArrowStick(arrowX, arrowY, arrowWidth, arrowHeight, primaryColor, secondaryColor);
	drawArrowHead(arrowHeadX, arrowHeadY, arrowHeadBaseX, arrowHeadBaseY, primaryColor, secondaryColor);

	// initial rng spawn for arrow
	if(arrowY==initialArrowY){
		rng = arrowSpawnRNG();
		arrowX = rng;
		arrowHeadX = rng;
		arrowHeadBaseX = rng-10;
	}
	
	// arrow travels down screen until hitting end of canvas
	// otherwise, reset arrow at top of screen in rng location
	if(arrowY<=(canvas.height+20)){
		arrowY += arrowSpeed;
		arrowHeadY += arrowSpeed;
		arrowHeadBaseY += arrowSpeed;
	} else{
		var rng = arrowSpawnRNG();
		arrowX = rng;
		arrowHeadX = rng;
		arrowHeadBaseX = rng-10;
		arrowY = initialArrowY;
		arrowHeadY = initialArrowHeadY;
		arrowHeadBaseY = initialArrowHeadBaseY;
	}
	
	// arrow travel speed manipulates y variables
	// increasing speed over time is simple
	// don't let it get too fast though
	if(arrowSpeed < 2.5){
		arrowSpeed += 0.0001;
	}
	else{
		
		arrowSpeed = 4;
	
		ctx.font = "16px Arial";
		ctx.fillStyle = "#000";
		ctx.fillText("MAXIMUM OVERDRIVE!", (canvas.width-300), 30);
	}
}

// Calculate and display time spent in game
function displayStats(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#000";
	ctx.fillText("Time: "+showTime, (canvas.width-100)/6, 30);
	if(!gameOver){
		timeLapsed += (frameRate*(0.001));
	}
	showTime = Math.trunc(timeLapsed);
	
	ctx.font = "16px Arial";
	ctx.fillStyle = "#000";
	ctx.fillText("Score: "+scoreCounter, (canvas.width-100)/3, 30);
	
	if(!gameOver && arrowY > canvas.height+19.19){
		scoreCounter = Math.floor(scoreCounter+301);
	}
}

// Draw all components onto canvas
function drawGame(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawBackground(primaryColor, secondaryColor);
	drawActor(primaryColor, secondaryColor);
	drawArrow();
	drawArrow();
	displayStats();
	
	// collision detection game over top actor
	if(actorTopX < arrowHeadX && actorTopX+actorWidth > arrowHeadX && actorY < arrowHeadY && actorY+actorHeight > arrowHeadY){
		gameOver = true;
	}
	
	// collision detection game over bottom actor
	if(actorBottomX < arrowHeadX && actorBottomX+actorWidth > arrowHeadX && actorY+actorHeight < arrowHeadY && actorY+(actorHeight*2) > arrowHeadY){
		gameOver = true;
	}
	
	// boolean gameOver determine if document needs to reload
	if(gameOver){
		alert("GAME OVER: "+
			"\nYou survived "+showTime+" seconds"+
			"\nYour score is "+scoreCounter);
		gameOver = false;
		document.location.reload();
	}
}

// draw() function executed within setInterval every 5 milliseconds
if(!startMenu){
	// run game
	setInterval(drawGame, frameRate);
}