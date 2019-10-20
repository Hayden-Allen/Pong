class Vec2 {  //represents velocities
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  clampTo(v){ //clamps values to another Vec2's values
    this.x = Math.max(-v.x, Math.min(v.x, this.x));
    this.y = Math.max(-v.y, Math.min(v.y, this.y));
  }
}
