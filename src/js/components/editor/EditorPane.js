/*
  React Component for the text editor pane.
 */

import React, { PropTypes } from 'react';

import CssLine from './CssLine';

import codeStore from '../../stores/CodeStore';

export default class EditorPane extends React.Component {

  constructor(props) {
    super(props);

    if (props && props.css) {
      let css = codeStore.getCssBody() + codeStore.getCurrentCssLine();
      let cssComponents = css.split('\n').map((line) => <CssLine line={line} />);

      this.state = {
        components: cssComponents
      };
    } else {
      this.state = {
        components: []
      };
    }

  }

  componentWillMount() {

    if (this.props.css){
      this.handleNewCssLine = () => {

        let cssLine = codeStore.getCurrentCssLine();
        let newState = {...this.state};
        newState.components.push(<CssLine line={cssLine} />);

      };
      this.handleCssUpdate = () => {

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