
import React from 'react';
import ReactDOM from 'react-dom';

import CodeAnimation from './engine/CodeAnimation';
import Engine from './engine/Engine';

import Editor from './components/Editor';

import * as pageUpdate from './pageUpdate';

let engine = new Engine();

const app = document.getElementById('app');
ReactDOM.render(<Editor/>, app);

pageUpdate.attachMount('css', 'styles');
pageUpdate.attachMount('html', 'page');

let anim = new CodeAnimation(`
<div>
  <img src="/img/favicon.ico">
</div>`, 'html', 5);

let anim2 = new CodeAnimation(`

/*
 * HI
 */

`, 'css', 5);

engine.enqueueAnimation(anim, 100);
engine.enqueueAnimation(anim2, 1000);
engine.run();