
import Animation from "./Animation";
import * as editorActions from "../actions/editorActions";

export default class CssAnimation extends Animation {

  constructor(code, deltaT) {
    super(deltaT);

    this.code = code;
    this.codeIndex = 0;
    this.pauseChanged = false;
    this.indent = 0;
  }

  newLine() {
    let indent = 0;
    while (this.codeIndex <= this.code.length && this.code[this.codeIndex] == ' ') {
      indent++;
      this.codeIndex++;
    }
    if (indent != this.indent) {
      editorActions.setCssIndent(indent);
      this.indent = indent;
    }
  }

  mount() {
    editorActions.setCssIndent(0);
  }

  tick() {

    if (this.codeIndex >= this.code.length) {
      return;
    }

    if (this.pauseChanged) {
      super.setDeltaT(super.getDeltaT() / 3);
      this.pauseChanged = false;
      this.newLine();
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