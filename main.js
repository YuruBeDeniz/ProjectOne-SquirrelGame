const game = new Game();
 

function setup() {
    createCanvas(1088, 640);
  };
  
function draw() {
    clear();
    game.draw();
  };
  
function preload(){
    game.preload();
  };

function keyPressed(){ 
    if (keyCode === 32){
      game.squirrel.jump();
    }
  };
