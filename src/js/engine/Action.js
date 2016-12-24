
import Animation from './Animation';

/**
 * An animation which performs a provided function one tick.
 */
export default class Action extends Animation {

  constructor(func) {
    super(0);

    this.action = func;
    this.actionPerformed = false;
  }

  tick() {
    this.action();
    this.actionPerformed = true;
  }

  done() {
    return this.actionPerformed;
  }

}
