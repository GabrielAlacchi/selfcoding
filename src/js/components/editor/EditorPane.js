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
    this.getCodeBody = props.css ? codeStore.getCssBody.bind(codeStore) : codeStore.getHtmlBody.bind(codeStore);
    this.getCodeLine = props.css ? codeStore.getCurrentCssLine.bind(codeStore) : codeStore.getCurrentHtmlLine.bind(codeStore);

    let { LineComponent, getCodeBody, getCodeLine } = this;

    let code = getCodeBody() + getCodeLine();
    let components = code.split('\n').map((line) => <LineComponent line={line}/>);

    this.state = {
      components: components
    };

  }

  componentWillMount() {

    let { LineComponent, getCodeLine} = this;

    this.handleNewLine = () => {
      let line = getCodeLine();
      let newState = {...this.state};
      newState.components.push(<LineComponent line={line} />);
    };

    this.handleCodeUpdate = () => {
      let line = getCodeLine();
      let newState = {...this.state};
      newState.components[newState.components.length - 1] =
        (<LineComponent line={line}/>);
      this.setState(newState);
    };

    if (this.props.css){
      codeStore.on('new_css_line', this.handleNewLine);
      codeStore.on('css_update', this.handleCodeUpdate);
    } else {
      codeStore.on('new_html_line', this.handleNewLine);
      codeStore.on('html_update', this.handleCodeUpdate);
    }

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

  componentDidUpdate() {
    // let node = ReactDOM.findDOMNode(this);
    // node.scrollTop = node.scrollHeight;
    this.refs.pretag.scrollTop = this.refs.pretag.scrollHeight;
  }

  render() {
    return (
      <pre ref="pretag" className="editor-pane">
        {this.state.components}
      </pre>
    );
  }
}

EditorPane.propTypes = {
  css: PropTypes.bool.isRequired,
  scrollTop: PropTypes.number
};