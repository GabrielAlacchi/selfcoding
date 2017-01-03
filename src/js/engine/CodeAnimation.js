
import Animation from './Animation';
import * as editorActions from '../actions/editorActions';

export default class CodeAnimation extends Animation {

  constructor(code, lang, deltaT) {
    super(deltaT);

    const css = lang === 'css';
    this.code = code;
    this.addNewChar = css ? editorActions.addNewCssChar : editorActions.addNewHtmlChar;

    this.codeIndex = 0;
    this.pauseChanged = false;
  }

  tick() {
    if (this.codeIndex >= this.code.length) {
      // To avoid any unwanted errors.
      return;
    }

    // There's a longer pause when switching lines of code.
    // this.pauseChanged indicates whether or not the pause was changed so it can be changed back.
    if (this.pauseChanged) {
      super.setDeltaT(super.getDeltaT() / 3);
      this.pauseChanged = false;
    }

    const char = this.code[this.codeIndex++];
    if (char === '\n') {
      // Increase the pause by a third.
      super.setDeltaT(super.getDeltaT() * 3);
      this.pauseChanged = true;
    }

    this.addNewChar(char);
  }

  done() {
    return this.codeIndex >= this.code.length;
  }
}
