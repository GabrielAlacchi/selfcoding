
import Animation from "./Animation"

const DEFAULT_PAUSE = 2000;

export default class Engine {

  constructor() {
    this.queue = [];
    this.currentAnimation = null;
    this.tick = this.tickAnimation.bind(this);
  }

  enqueueAnimation(animation, pause=DEFAULT_PAUSE) {
    if (!(animation instanceof Animation)) {
      throw new TypeError("Engine.enqueueAnimation requires an Animation instance as input.");
    }

    this.queue.push({
      animation, pause
    });
  }

  tickAnimation() {
    let { animation } = this.currentAnimation;

    if (!animation.done()) {
      animation.tick();
      setTimeout(this.tick, animation.getDeltaT());
    }
    else {
      this.currentAnimation = this.queue.shift();
      this.currentAnimation.animation.mount();
      setTimeout(this.tick, this.currentAnimation.pause);
    }

  }

  run() {
    this.currentAnimation = this.queue.shift();
    this.currentAnimation.animation.mount();

    if (this.currentAnimation) {
      setTimeout(this.tick, this.currentAnimation.pause);
    }

  }


}