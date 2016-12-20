
import React from "react";

export default class CssStatement extends React.Component {

  render() {
    let { line } = this.props;

    if (line.indexOf('{') > -1) {
      line = line.replace(/\{/g, '');
      let term = '{\n';

      return (
        <span>
          <span className="selector">{line}</span>
          <span>{term}</span>
        </span>
      );
    }

    let re = /([^:]+:)([^;]+)(;)/;
    let matches = line.match(re);

    if (!matches) {
      return (<span>{line + '\n'}</span>);
    } else {
      return (<span>
        {matches[1]}
        <span className="attr-value">{matches[2]}</span>
        <span className="semi-colon">{matches[3]}</span>
        {'\n'}
      </span>);
    }
  }
}
