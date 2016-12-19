
import dispatcher from "./dispatcher";

export function addNewCssChar(payload) {
  dispatcher.dispatch({type: 'NEW_CSS', payload});
}

export function setCssIndent(indent) {
  dispatcher.dispatch({type: 'NEW_CSS_INDENT', payload: indent});
}

window.addNewCssChar = addNewCssChar;