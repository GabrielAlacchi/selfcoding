
import dispatcher from './dispatcher';

export function addNewCssChar(payload) {
  dispatcher.dispatch({ type: 'NEW_CSS', payload });
}

export function addNewHtmlChar(payload) {
  dispatcher.dispatch({ type: 'NEW_HTML', payload });
}
