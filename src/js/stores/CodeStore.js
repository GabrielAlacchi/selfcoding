/**
 * Created by gabriel on 12/19/16.
 */

import { EventEmitter } from "events";
import dispatcher from "../actions/dispatcher";

class CodeStore extends EventEmitter {

  constructor() {
    super();
    this.css = "";
    this.currentCssLine = "";
  }

  getCssBody() {
    return this.css;
  }

  getCurrentCssLine() {
    return this.currentCssLine;
  }

  handleAction(action) {
    if (action.type == "NEW_CSS") {

      this.currentCssLine += action.payload;
      if (action.payload == '\n') {
        this.css += this.currentCssLine + '\n';
        this.currentCssLine = "";

        this.emit('new_css_line');
      } else {
        this.emit('css_update');
      }

    }
  }

}

const codeStore = new CodeStore();
dispatcher.register(codeStore.handleAction.bind(codeStore));
export default codeStore;