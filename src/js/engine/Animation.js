
import dispatcher from "../actions/dispatcher";

export default class Animation {

  constructor(deltaT) {

    if (new.target === Animation) {
      throw new TypeError("Cannot construct Animation class directly");
    }

    this.deltaT = deltaT;
  }

  mount() {
    return false;
  }

  tick() {
    return false;
  }

  getDeltaT() {
    return this.deltaT;
  }

  setDeltaT(deltaT) {
    this.deltaT = deltaT;
  }

  done() {
    return false;
  }

}

