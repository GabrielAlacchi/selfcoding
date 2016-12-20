/*
  React Component for the text editor pane.
 */

import React from "react";

import Comment from "./Comment";
import CssStatement from "./CssStatement";

import codeStore from "../../stores/CodeStore";

export default class EditorPane extends React.Component {

  constructor() {
    super();

    this.state = {
      components: [
        <Comment text={"/*\n Test hi hi \n bro it's time to fucking code \n LOLOLOLOL \n*/"}/>,
        <CssStatement indent={0} line=""/>
      ]
    }
  }

  componentWillMount() {
    this.handleNewCssLine = () => {
      console.log('new_css_line');
      let cssLine = codeStore.getCurrentCssLine();
      let cssIndent = codeStore.getCurrentCssIndent();
      let newState = {...this.state};
      newState.components.push(<CssStatement indent={cssIndent} line={cssLine} />)
    };
    this.handleCssUpdate = () => {
      console.log('css_update');
      let cssLine = codeStore.getCurrentCssLine();
      let cssIndent = codeStore.getCurrentCssIndent();
      let newState = {...this.state};
      newState.components[newState.components.length - 1] =
        (<CssStatement indent={cssIndent} line={cssLine} />);
      this.setState(newState);
    };
    codeStore.on('new_css_line', this.handleNewCssLine);
    codeStore.on('css_update', this.handleCssUpdate);
  }

  componentWillUnmount() {
    codeStore.removeListener('new_css_line', this.handleNewCssLine);
    codeStore.removeListener('css_update', this.handleCssUpdate);
  }

  render() {
    return (
      <div className="editor-pane">
        <pre>
          {this.state.components}
        </pre>
      </div>
    );
  }
}