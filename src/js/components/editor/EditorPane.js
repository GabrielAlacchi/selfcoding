/*
  React Component for the text editor pane.
 */

import React from "react";

import Comment from "./Comment";
import CssStatement from "./CssStatement";

export default class EditorPane extends React.Component {
  render() {
    return (
      <div className="editor-pane">
        <pre>
          <Comment text={"/*\n Test hi hi \n bro it's time to fucking code \n LOLOLOLOL \n*/"}></Comment>
          <CssStatement indent={0} line=".editor-pane {"/>
          <CssStatement indent={2} line="background: #484848;"/>
          <CssStatement indent={2} line="margin: 0;"/>
          <CssStatement indent={2} line="font-size: 14px;"/>
          <CssStatement indent={2} line="border: 1px solid #aaa;"/>
          <CssStatement indent={2} line="color: white;"/>
          <CssStatement indent={0} line="}"/>
        </pre>
      </div>
    );
  }
}