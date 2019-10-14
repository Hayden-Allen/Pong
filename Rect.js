class Rect {
  constructor(x, y, w, h, vel, maxVel, mass, color, alpha){
    this.x = x; this.y = y;
    this.w = w; this.h = h;
    this.vel = vel; this.maxVel = maxVel;
    this.mass = mass;
    this.color = color;
    this.alpha = alpha || 1;
  }
  draw(){
    this.x += this.vel.x;
    this.y += this.vel.y;

    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  fixIntersect(r){
    let distances = [
      Math.abs(r.y - (this.y + this.h)),
      Math.abs(r.x - (this.x + this.w)),
      Math.abs(r.y + r.h - this.y),
      Math.abs(r.x + r.w - this.x)
    ];

    let min = 0;
    for(var i = 1; i < distances.length; i++)
      min = (distances[i] < distances[min] ? i : min);


    let px = this.mass * this.vel.x;
    let py = this.mass * this.vel.y;
    let rpx = r.mass * r.vel.x;
    let rpy = r.mass * r.vel.y;

    if(r.y + r.h > this.y && r.y < this.y + this.h){
      if(min === 1 && r.x < this.x + this.w){
        r.x = this.x + this.w;
        r.vel.x = (px - rpx) / r.mass;
        this.vel.x = 0;
      }
      if(min === 3 && r.x + r.w > this.x){
        r.x = this.x - r.w;
        r.vel.x = (px - rpx) / r.mass;
        this.vel.x = 0;
      }
    }
    if(r.x + r.w > this.x && r.x < this.x + this.w){
      if(min === 0 && r.y < this.y + this.h){
        r.y = this.y + this.h;
        r.vel.y = (py - rpy) / r.mass;
        this.vel.y = 0;
      }
      if(min === 2 && r.y + r.h > this.y){
        r.y = this.y - r.h;
        r.vel.y = (py - rpy) / r.mass;
        this.vel.y = 0;
      }
    }
    r.vel.clampTo(r.maxVel);
  }
}
