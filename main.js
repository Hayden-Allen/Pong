let c = document.getElementById("c");
let ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;

let resetTime = 1000;
let grey = "#ededed";
let playerMass = 1;
let pause = false;

let playerW = 50, playerH = 4 * playerW;
let playerMaxVel = new Vec2(20, 20);
let playerAccel = new Vec2(1, 1);

let left = new Player(new Rect(0, c.height / 2 - playerH / 2, playerW, playerH, new Vec2(0, 0), playerMaxVel, playerMass, grey),
                      new Bitset(0), playerAccel, playerBounds(true));
let right = new Player(new Rect(c.width - playerW, c.height / 2 - playerH / 2, playerW, playerH, new Vec2(0, 0), playerMaxVel, playerMass, grey),
                      new Bitset(0), playerAccel, playerBounds(false));

let ball = new Ball(new Rect(c.width / 2 - 10, c.height / 2 - 10, playerW, playerW, new Vec2(0, 0), new Vec2(25, 25), playerMass, grey), 5);

function playerBounds(left){
  if(left)
    return {top: -playerH / 2, left: 0, bottom: c.height - playerH / 2, right: playerW * 8};
  return {top: -playerH / 2, left: c.width - playerW * 9, bottom: c.height - playerH / 2, right: c.width - playerW};
}
async function reset(point){
  ball.reset();
  ball.rect.draw();
  await sleep(resetTime);
  ball.setVel(point);
}
ball.setVel(false);

async function update(){
  if(!pause){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, c.width, c.height);

    left.update();
    right.update();
    left.rect.fixIntersect(ball.rect);
    right.rect.fixIntersect(ball.rect);
    ball.update();
  }
  setTimeout(update, 1000 / 60);
}
update();

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.onresize = function(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  left.bounds = playerBounds(true);
  right.bounds = playerBounds(false);
}
window.onkeydown = function(e){
  switch(e.keyCode){
  case 87: left.keys.set(3); break;
  case 65: left.keys.set(2); break;
  case 83: left.keys.set(1); break;
  case 68: left.keys.set(0); break;

  case 38: right.keys.set(3); break;
  case 37: right.keys.set(2); break;
  case 40: right.keys.set(1); break;
  case 39: right.keys.set(0); break;

  case 32: pause = !pause; break;
  }
}
window.onkeyup = function(e){
  switch(e.keyCode){
  case 87: left.keys.reset(3); break;
  case 65: left.keys.reset(2); break;
  case 83: left.keys.reset(1); break;
  case 68: left.keys.reset(0); break;

  case 38: right.keys.reset(3); break;
  case 37: right.keys.reset(2); break;
  case 40: right.keys.reset(1); break;
  case 39: right.keys.reset(0); break;
  }
}
