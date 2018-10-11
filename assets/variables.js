/*
 * @author: Tim Ascencio
 * Project S301 : side-step arrow dodging video game
 * v03
 * variables.js stores variables for the entire game
 */
 
// Draw canvas : object ctx
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// default frame rate in milliseconds
var frameRate = 5;

// BOX ACTORS : Position and tracking variables
var actorTopX = 285;
var actorBottomX = 285;
var actorY = 430;
var actorWidth = 30;
var actorHeight = 20;

// ARROW (stick) : Position and tracking variables
var arrowX = 50;
var arrowY = -50;
var arrowWidth = 2;
var arrowHeight = 50;
var initialArrowY = arrowY;

// ARROW HEAD : Position and tracking variables
var arrowHeadX = (arrowX+(arrowWidth/2));
var arrowHeadY = (arrowY*(-0.001))+10;
var arrowHeadBaseX = (arrowX-10);
var arrowHeadBaseY = (arrowY*(-0.001));
var initialArrowHeadY = arrowHeadY;
var initialArrowHeadBaseY = (arrowY*(-0.001));

// keyboard keys pressed (arrow keys and A || D)
var leftPressed = false;
var upPressed = false;
var rightPressed = false;
var downPressed = false;
var keyAPressed = false;
var keyDPressed = false;

// LOGIC : game mechanics and logic variables
var gameOver = false;
var startMenu = false;
var actorSpeed = 2;
var arrowSpeed = 0.75;
var scoreCounter = 0;

// rng is random number generator
// these variables are used in a random math function
// in game.js, arrowSpawnRNG is manipulated by these randoms
var rng;
var max;
var min;

// timeLapsed does calculations based on frame rate to appropriate time spent
var timeLapsed = 0;
// showTime is the final result, truncates unnecessary math from timeLapsed
var showTime = 0;

// primary color is background , secondary color is another contrasting color
var primaryColor = "#fff";
var secondaryColor = "#000";