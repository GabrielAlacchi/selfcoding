/*
  React Component for the text editor pane.
 */

import React, { PropTypes } from 'react';

import CssLine from './CssLine';
import HtmlLine from './HtmlLine';

import codeStore from '../../stores/CodeStore';

export default class EditorPane extends React.Component {

  constructor(props) {
    super(props);

    this.LineComponent = props.css ? CssLine : HtmlLine;
    this.getCodeBody = props.css ?
      codeStore.getCssBody.bind(codeStore) : codeStore.getHtmlBody.bind(codeStore);
    this.getCodeLine = props.css ?
      codeStore.getCurrentCssLine.bind(codeStore) : codeStore.getCurrentHtmlLine.bind(codeStore);

    const { LineComponent, getCodeBody, getCodeLine } = this;

    const code = getCodeBody() + getCodeLine();
    const components = code.split('\n').map(line => <LineComponent line={line} />);

    this.state = { components };
  }

  componentWillMount() {
    const { LineComponent, getCodeLine } = this;

    this.handleNewLine = () => {
      const line = getCodeLine();
      const newState = { ...this.state };
      newState.components.push(<LineComponent line={line} />);
    };

    this.handleCodeUpdate = () => {
      const line = getCodeLine();
      const newState = { ...this.state };
      newState.components[newState.components.length - 1] =
        (<LineComponent line={line} />);
      this.setState(newState);
    };

    if (this.props.css) {
      codeStore.on('new_css_line', this.handleNewLine);
      codeStore.on('css_update', this.handleCodeUpdate);
    } else {
      codeStore.on('new_html_line', this.handleNewLine);
      codeStore.on('html_update', this.handleCodeUpdate);
    }
  }

  componentDidUpdate() {
    this.pretag.scrollTop = this.pretag.scrollHeight;
  }

  componentWillUnmount() {
    if (this.props.css) {
      codeStore.removeListener('new_css_line', this.handleNewLine);
      codeStore.removeListener('css_update', this.handleCodeUpdate);
    } else {
      codeStore.removeListener('new_html_line', this.handleNewLine);
      codeStore.removeListener('html_update', this.handleCodeUpdate);
    }
  }

  render() {
    return (
      // Passes the component as a ref to instance variable pretag.
      <pre ref={(component) => { this.pretag = component; }} className="editor-pane">
        {this.state.components}
      </pre>
    );
  }
}

EditorPane.propTypes = {
  css: PropTypes.bool.isRequired
};
