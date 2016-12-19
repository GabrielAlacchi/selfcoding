
import React from "react";

export default class CssStatement extends React.Component {

  render() {
    let { line, indent } = this.props;

    if (line.indexOf('{') > -1) {
      line = line.replace(/\{/g, '');
      let term = '{\n';

      return (
        <span>{" ".repeat(indent)}
          <span className="selector">{line}</span>
          <span>{term}</span>
        </span>
      );
    }

    let re = /([^:]+:)([^;]+)(;)/;
    let matches = line.match(re);

    if (!matches) {
      return (<span>{" ".repeat(indent) + line + '\n'}</span>);
    } else {
      return (<span>{" ".repeat(indent)}
        {matches[1]}
        <span className="attr-value">{matches[2]}</span>
        <span className="semi-colon">{matches[3]}</span>
        {'\n'}
      </span>);
    }
  }
}
