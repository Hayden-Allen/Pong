class Bitset {
  constructor(value){
    this.value = value;
  }
  bit(index){
    return 1 << index;
  }
  at(index){
    return (this.value & this.bit(index)) > 0;
  }
  set(index){
    this.value |= this.bit(index);
  }
  reset(index){
    this.value &= ~(this.bit(index));
  }
}
