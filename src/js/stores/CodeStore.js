/**
 * Created by gabriel on 12/19/16.
 */

import { EventEmitter } from 'events';
import dispatcher from '../actions/dispatcher';

class CodeStore extends EventEmitter {

  constructor() {
    super();
    this.css = '';
    this.currentCssLine = '';

    this.html = '';
    this.currentHtmlLine = '';
  }

  getCssBody() {
    return this.css;
  }

  getCurrentCssLine() {
    return this.currentCssLine;
  }

  getHtmlBody() {
    return this.html;
  }

  getCurrentHtmlLine() {
    return this.currentHtmlLine;
  }

  handleAction(action) {
    if (action.type === 'NEW_CSS') {
      this.currentCssLine += action.payload;
      if (action.payload === '\n') {
        this.css += this.currentCssLine;
        this.currentCssLine = '';

        this.emit('new_css_line');
      } else {
        this.emit('css_update');
      }
    } else if (action.type === 'NEW_HTML') {
      this.currentHtmlLine += action.payload;
      if (action.payload === '\n') {
        this.html += this.currentHtmlLine;
        this.currentHtmlLine = '';

        this.emit('new_html_line');
      } else {
        this.emit('html_update');
      }
    }
  }

}

const codeStore = new CodeStore();
dispatcher.register(codeStore.handleAction.bind(codeStore));
export default codeStore;
