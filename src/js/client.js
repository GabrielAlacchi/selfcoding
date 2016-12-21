
import React from "react";
import ReactDOM from "react-dom";
import Editor from "./components/Editor";

import CssAnimation from "./engine/CssAnimation";
import Engine from "./engine/Engine";

import * as pageUpdate from "./pageUpdate"

let engine = new Engine();

const app = document.getElementById("app");
ReactDOM.render(<Editor/>, app);

pageUpdate.attachCssListener("styles");

let anim = new CssAnimation(`
/**
 * Hey, I'm Gabriel Alacchi.
 * Nice to meet you.
 */
`, 40);

let anim2 = new CssAnimation(`
  
/**
 * Lights out! 
 * */

#app {
  display: none;
}

`, 40);

engine.enqueueAnimation(anim, 100);
engine.enqueueAnimation(anim2, 1000);
engine.run();