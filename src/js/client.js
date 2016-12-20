
import React from "react";
import ReactDOM from "react-dom";
import Editor from "./components/Editor";

import CssAnimation from "./engine/CssAnimation";
import Engine from "./engine/Engine";

let engine = new Engine();

let testCode = `
.editor-pane {
  font-family: Monaco, monospace;
  background: #484848;
  margin: 0;
  font-size: 14px;
  border: 1px solid #aaa;
  color: white;
}

.editor-pane pre {
  overflow: auto;
  max-height: 90%;
  width: 100%;
  border-radius: 1px;
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
`;

const app = document.getElementById("app");
ReactDOM.render(<Editor/>, app);

let anim = new CssAnimation(testCode, 25);
engine.enqueueAnimation(anim, 100);
engine.run();