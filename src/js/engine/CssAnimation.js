
import Animation from './Animation';
import * as editorActions from '../actions/editorActions';

export default class CssAnimation extends Animation {

  constructor(code, deltaT) {
    super(deltaT);

    this.code = code;
    this.codeIndex = 0;
    this.pauseChanged = false;
  }

  tick() {

    if (this.codeIndex >= this.code.length) {
      return;
    }

    if (this.pauseChanged) {
      super.setDeltaT(super.getDeltaT() / 3);
      this.pauseChanged = false;
    }

    let char = this.code[this.codeIndex++];
    if (char == '\n') {
      super.setDeltaT(super.getDeltaT() * 3);
      this.pauseChanged = true;
    }
    editorActions.addNewCssChar(char);
  }

  done() {
    return this.codeIndex >= this.code.length;
  }

}