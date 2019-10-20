class Ball {  //rectangle that is hit by paddles
  constructor(rect, trailLength){
    this.rect = rect; //visual

    this.trail = [];  //array of rectangles that look like a trail
    this.maxTrailLength = trailLength;  //length of trail
    this.trailAlphaStep = 1 / (this.maxTrailLength + 1);  //decrease in opacity for each consecutive trail element
  }
  reset(){
    this.trail = [];  //delete trail
    //reset position to center of screen
    this.rect.x = c.width / 2 - this.rect.w / 2;
    this.rect.y = c.height / 2 - this.rect.h / 2;
    this.rect.vel = new Vec2(0, 0); //set velocity to 0
  }
  async update(){
    if(this.rect.y < 0){  //bounce off top of screen
      this.rect.y = 0;
      this.rect.vel.y *= -1;
    }
    if(this.rect.y + this.rect.h > c.height){ //bounce off bottom of screen
      this.rect.y = c.height - this.rect.h;
      this.rect.vel.y *= -1;
    }

    if(this.rect.x + this.rect.w < 0){  //if past left side of screen
      right.score++;
      await reset(true);
    }
    if(this.rect.x > c.width){  //if past right side of screen
      left.score++;
      await reset(false);
    }

    if(this.trail.length < this.maxTrailLength){  //add trail elements
      this.trail.push(new Rect(this.resetx, this.resety, this.rect.w, this.rect.h,
        new Vec2(0, 0), new Vec2(0, 0), this.rect.mass,
        this.rect.color, this.rect.alpha - this.trailAlphaStep * (this.trail.length + 1)));
    }

    //update/draw trail
    for(var i = this.trail.length - 1; i > 0; i--){
      this.trail[i].x = this.trail[i - 1].x;
      this.trail[i].y = this.trail[i - 1].y;
      this.trail[i].draw();
    }
    this.trail[0].x = this.rect.x;
    this.trail[0].y = this.rect.y;
    this.trail[0].draw();
    this.rect.draw(); //draw this
  }
  setVel(point){  //set velocity based on who scored
    let xsign = (point ? -1 : 1); //if right scored, move toward left; otherwise, move toward right
    let ysign = (Math.random() > .5 ? -1 : 1);  //randomly determine y velocity
    let xbase = this.rect.maxVel.x / 4, ybase = this.rect.maxVel.y / 8; //minimum velocities

    //somewhat randomize velocities
    this.rect.vel.x = xsign * ((Math.random() * (this.rect.maxVel.x / 2 - xbase)) + xbase);
    this.rect.vel.y = ysign * ((Math.random() * (this.rect.maxVel.y / 4 - ybase)) + ybase);
    this.rect.vel.clampTo(new Vec2(this.rect.maxVel.x / 2, this.rect.maxVel.y / 4));  //clamp to acceptable speed
  }
}
