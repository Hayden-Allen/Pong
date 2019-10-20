class Bitset{
	constructor(value){	//default value is 0
		this.value = value || 0;
	}
	bit(index){	//only bit at index is 1
		return 1 << index;
	}
	at(index){	//true if bit at index is 1, false if it is 0
		return (this.value & this.bit(index)) > 0;
	}
	set(index){	//set bit at index to 1 regardless of current value
		this.value |= this.bit(index);
	}
	reset(index){	//set bit at index to 0 regardless of current value
		this.value &= ~(this.bit(index));
	}
}
