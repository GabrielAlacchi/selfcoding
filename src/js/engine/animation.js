
import dispatcher from "../actions/dispatcher";

class Animation {

  constructor(deltaT) {

    this.block = block;
    this.deltaT = deltaT;
    this.blockIndex = 0;

  }

  getAnimationStep() {
    let newChar = this.block[this.blockIndex++];
    newChar
  }

  done() {
    return this.blockIndex == this.block.length;
  }

}

