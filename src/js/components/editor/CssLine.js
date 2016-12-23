
import React, { PropTypes } from 'react';

export default class CssLine extends React.Component {

  getCommentIndex(line) {
    let commentIndex = line.indexOf('/*');
    if (commentIndex == -1) {
      commentIndex = line.indexOf('*');
    }
    return commentIndex;
  }

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

    let commentLine = '';
    let commentIndex = this.getCommentIndex(line);
    if (commentIndex != -1) {
      commentLine = (<span className="comment">{line.substr(commentIndex)}</span>);
      line = line.substr(0, commentIndex);
    }

    let re = /([^:]+:)([^;]+)(;\s*)/;
    let matches = line.match(re);

    if (!matches) {
      return (<span>{line}{commentLine}{'\n'}</span>);
    } else {
      return (<span>
        {matches[1]}
        <span className="attr-value">{matches[2]}</span>
        <span className="semi-colon">{matches[3]}</span>
        {commentLine}
        {'\n'}
      </span>);
    }
  }
}

CssLine.propTypes = {
  line: PropTypes.string.isRequired
};