/*
 * @author: Tim Ascencio
 * Project S301 : side-step arrow dodging video game
 * v03
 * keyboard.js handles event listener for keyboard events
 */

// check if keyboard keys are pressed down or lifted up
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// key codes : 37=left , 38=up, 39=right , 40=down, 65=A , 68=D

function keyDownHandler(event){
    if(event.keyCode == 37) {
        leftPressed = true;
    } else if(event.keyCode == 38){
        upPressed = true;
    } else if(event.keyCode == 39){
        rightPressed = true;
    } else if(event.keyCode == 40){
        downPressed = true;
    } else if(event.keyCode == 65) {
        keyAPressed = true;
    } else if(event.keyCode == 68){
        keyDPressed = true;
    }
}

function keyUpHandler(event){
    if(event.keyCode == 37){
        leftPressed = false;
    } else if(event.keyCode == 38){
        upPressed = false;
    } else if(event.keyCode == 39){
        rightPressed = false;
    } else if(event.keyCode == 40){
        downPressed = false;
    } else if(event.keyCode == 65) {
        keyAPressed = false;
    } else if(event.keyCode == 68){
        keyDPressed = false;
    }
}