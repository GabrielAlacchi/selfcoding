
/* global require */

import React from 'react';
import ReactDOM from 'react-dom';

import CodeAnimation from './engine/CodeAnimation';
import Action from './engine/Action';
import Engine from './engine/Engine';

import Editor from './components/Editor';

import * as pageUpdate from './pageUpdate';

require('../scss/style.scss');

let engine = new Engine();

const app = document.getElementById('app');
ReactDOM.render(<Editor/>, app);

pageUpdate.attachMount('css', 'styles');
pageUpdate.attachMount('html', 'page');

let anim = new CodeAnimation(`
<div>
  <img src="/img/favicon.ico">
</div>`, 'html', 20);

let anim2 = new Action(() => {
  let elements = document.getElementsByClassName('ReactTabs__Tab');
  elements[0].click();
});

let anim3 = new CodeAnimation(`

/*
 * HI
 */

`, 'css', 20);

engine.enqueueAnimation(anim, 100);
engine.enqueueAnimation(anim2, 1000);
engine.enqueueAnimation(anim3, 100);
engine.run();

