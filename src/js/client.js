
import React from 'react';
import ReactDOM from 'react-dom';

import CssAnimation from './engine/CssAnimation';
import Engine from './engine/Engine';

import Editor from './components/Editor';

import * as pageUpdate from './pageUpdate';

let engine = new Engine();

const app = document.getElementById('app');
ReactDOM.render(<Editor/>, app);

pageUpdate.attachCssListener('styles');

let anim = new CssAnimation(`
.react-tabs {
  height: 100%;
  font-size: 17px;
  color: #5baa00;
  font-weight: bold;
  background: #484848;
}

.react-tabs div {
  height: 100%;
}

.react-tabs [role=tablist] {
  border: 1px solid #aaa;
  margin: 0 0 0 0;
  padding: 0;
}

.react-tabs [role=tab] {
  display: inline-block;
  border-bottom: none;
  bottom: -1px;
  position: relative;
  list-style: none;
  padding: 4px 12px;
  cursor: pointer;
}

.react-tabs [role=tab][aria-selected=true] {
  background: #666666;
  border-color: #aaa;
}

.react-tabs [role=tab][aria-disabled=true] {
  color: GrayText;
  cursor: default;
}

.react-tabs [role=tab]:focus {
  box-shadow: 0 0 5px hsl(208, 99%, 50%);
  border-color: hsl(208, 99%, 50%);
  outline: none;
}

.react-tabs [role=tab]:focus:after {
  content: "";
  position: absolute;
  height: 5px;
  left: -4px;
  right: -4px;
  bottom: -5px;
}

.editor-pane {
  font-family: Monaco, monospace;
  background: #484848;
  margin: 0;
  font-size: 14px;
  border: 1px solid #aaa;
  color: white;
}

.editor-pane {
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;
  overflow: auto;
  height: 100%;
  width: 100%;
  border-radius: 1px;
  margin: 0;
  padding: 10px 10px 20px;
  white-space: pre-wrap;
  outline: 0;
}

.comment {
  color: #857F6B;
  font-style: italic;
}

.attr-value {
  color: #add8e6;
}

.semi-colon {
  color: #b35c1d;
}

.selector {
  color: #ffd541;
}
`, 40);

engine.enqueueAnimation(anim, 100);
engine.run();