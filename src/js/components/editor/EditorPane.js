/*
  React Component for the text editor pane.
 */

import React from "react";
import ReactDOM from "react-dom";

import CssLine from "./CssLine";
import HtmlLine from "./HtmlLine";

import codeStore from "../../stores/CodeStore";

export default class EditorPane extends React.Component {

  constructor(props) {
    super(props);

    if (props && props.css) {
      let css = codeStore.getCssBody() + codeStore.getCurrentCssLine();
      let cssComponents = css.split('\n').map((line, i) => <CssLine line={line} />);

      this.state = {
        components: cssComponents
      }
    } else {
      this.state = {
        components: []
      };
    }

  }

  componentWillMount() {

    if (this.props.css){
      this.handleNewCssLine = () => {
        console.log('new_css_line');
        let cssLine = codeStore.getCurrentCssLine();
        let newState = {...this.state};
        newState.components.push(<CssLine line={cssLine} />)
      };
      this.handleCssUpdate = () => {
        console.log('css_update');
        let cssLine = codeStore.getCurrentCssLine();
        let newState = {...this.state};
        newState.components[newState.components.length - 1] =
          (<CssLine line={cssLine} />);
        this.setState(newState);
      };
      codeStore.on('new_css_line', this.handleNewCssLine);
      codeStore.on('css_update', this.handleCssUpdate);
    }

  }

  componentWillUnmount() {
    if (this.props.css) {
      codeStore.removeListener('new_css_line', this.handleNewCssLine);
      codeStore.removeListener('css_update', this.handleCssUpdate);
    }
  }

  componentDidUpdate() {
    let node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  render() {
    return (
      <pre className="editor-pane">
        {this.state.components}
      </pre>
    );
  }
}