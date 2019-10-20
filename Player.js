class Player {  //paddles that hit ball
  constructor(rect, keys, accel, bounds){
    this.rect = rect; //visual
    this.keys = keys; //used to control
    this.accel = accel; //Vec2 representing acceleration along each axis
    this.bounds = bounds; //boundaries to clamp to
    this.score = 0; //points scored
  }
  update(){
    this.move();

    if(this.rect.x < this.bounds.left){
      this.rect.x = this.bounds.left;
      this.rect.vel.x = 0;
    }
    if(this.rect.x > this.bounds.right){
      this.rect.x = this.bounds.right;
      this.rect.vel.x = 0;
    }
    if(this.rect.y < this.bounds.top){
      this.rect.y = this.bounds.top;
      this.rect.vel.y = 0;
    }
    if(this.rect.y > this.bounds.bottom){
      this.rect.y = this.bounds.bottom;
      this.rect.vel.y = 0;
    }

    this.rect.draw();
  }
  move(){
    if(this.keys.at(2) || this.keys.at(0))  //if pressing left or right
      this.rect.vel.x += (this.keys.at(0) - this.keys.at(2)) * this.accel.x;  //accelerate left or right
    else
      this.rect.vel.x -= Math.sign(this.rect.vel.x) * this.accel.x; //else slow down

    if(this.keys.at(3) || this.keys.at(1))  //if pressing up or down
      this.rect.vel.y += (this.keys.at(1) - this.keys.at(3)) * this.accel.y;  //accelerate up or down
    else
      this.rect.vel.y -= Math.sign(this.rect.vel.y) * this.accel.y; //else slow down

    this.rect.vel.clampTo(this.rect.maxVel);  //clamp to acceptable speed
  }
}
