class Rect {  //draws filled rectangle to canvas
  constructor(x, y, w, h, vel, maxVel, mass, color, alpha){
    this.x = x; this.y = y; //x and y of top left corner
    this.w = w; this.h = h; //width and height
    this.vel = vel; this.maxVel = maxVel; //velocity and maximum accepted velocity
    this.mass = mass; //for use in collision calculations
    this.color = color;
    this.alpha = alpha || 1;  //default opacity is 1 (full)
  }
  draw(){
    //update position ased on velocity
    this.x += this.vel.x;
    this.y += this.vel.y;

    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h); //draw rectangle
  }
  fixIntersect(r){
    //determine the direction from which a collision with r is most likely
    let distances = [
      Math.abs(r.y - (this.y + this.h)),
      Math.abs(r.x - (this.x + this.w)),
      Math.abs(r.y + r.h - this.y),
      Math.abs(r.x + r.w - this.x)
    ];

    let min = 0;
    for(var i = 1; i < distances.length; i++)
      min = (distances[i] < distances[min] ? i : min);


    let px = this.mass * this.vel.x;  //x component of momentum
    let py = this.mass * this.vel.y;  //y component of momentum
    let rpx = r.mass * r.vel.x; //x component of r's momentum
    let rpy = r.mass * r.vel.y; //y component of r's momentum

    if(r.y + r.h > this.y && r.y < this.y + this.h){  //if r is within y range of this
      //if closest sides are left of r and right of this AND left of r is more negative than right of this
      if(min === 1 && r.x < this.x + this.w){
        r.x = this.x + this.w;  //reset position of r
        //px0 + rpx0 = pxf + rpxf
        //pxf = 0, so rpxf = px0 + rpx0
        //rpxf = rmass * rxvel, so rxvel = rpxf / rmass = (px0 + rpx0) / rmass
        r.vel.x = (px - rpx) / r.mass;  //subtract rpx from px to automatically reverse diretion
        this.vel.x = 0; //stop moving this in x direction so that momentum calculation makes sense
      }
      //if closest sides are right of r and left of this AND left of this is more negative than right of r
      if(min === 3 && r.x + r.w > this.x){
        //same as above
        r.x = this.x - r.w;
        r.vel.x = (px - rpx) / r.mass;
        this.vel.x = 0;
      }
    }
    if(r.x + r.w > this.x && r.x < this.x + this.w){  //if r is within x range of this
      //if closest sides are top of r and bottom of this AND top of r is more negative than bottom of this
      if(min === 0 && r.y < this.y + this.h){
        //same as above
        r.y = this.y + this.h;
        r.vel.y = (py - rpy) / r.mass;
        this.vel.y = 0;
      }
      //if closest sides are bottom of r and top of this AND top of this is more negative than bottom of r
      if(min === 2 && r.y + r.h > this.y){
        //same as above
        r.y = this.y - r.h;
        r.vel.y = (py - rpy) / r.mass;
        this.vel.y = 0;
      }
    }
    r.vel.clampTo(r.maxVel);  //clamp r velocity to acceptable speed
  }
}
