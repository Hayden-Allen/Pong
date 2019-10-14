class Vec2 {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  clampTo(v){
    this.x = Math.max(-v.x, Math.min(v.x, this.x));
    this.y = Math.max(-v.y, Math.min(v.y, this.y));
  }
}
