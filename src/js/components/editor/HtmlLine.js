
import React, { PropTypes } from 'react';

export default class HtmlLine extends React.Component {

  scanTag(tag) {
    let firstSpace = tag.indexOf(' ');
    let openTag = firstSpace != -1 ? tag.substr(0, firstSpace) : tag;
    let tagSpan = (<span className="html-syntax-tag">{openTag}</span>);

    if (firstSpace == -1) {
      return tagSpan;
    }

    let rest = tag.substr(firstSpace);
    let spans = [tagSpan];
    let token = '';
    let quoteCount = 0;

    let parseName = true;

    let closingSpan;
    for (let i = 0; i < rest.length; i++) {
      let char = rest[i];

      if (char == '>') {
        closingSpan = (<span className="html-syntax-tag">{char}</span>);
        break;
      }

      token += char;
      if (char == '=' && parseName) {
        spans.push((<span className="html-syntax-attr-name">{token}</span>));
        token = '';
        parseName = false;
      } else {
        if (char == '"') {
          quoteCount++;
        }

        // We've encountered an even number of quotes (the value string is terminated)
        if (!parseName && quoteCount % 2 == 0) {
          spans.push((<span className="html-syntax-attr-value">{token}</span>));
          token = '';
          parseName = true;
        }

      }

    }

    // Check token length for remaining bits of the tag string
    if (token.length > 0 && parseName) {
      spans.push((<span className="html-syntax-attr-name">{token}</span>));
    } else if (token.length > 0 && !parseName) {
      spans.push((<span className="html-syntax-attr-value">{token}</span>));
    }

    // If there was a closing span
    if (closingSpan) {
      spans.push(closingSpan);
    }

    return (<span>{spans}</span>);

  }

  findAllTags(line) {
    let left = line.indexOf('<');
    let right = line.indexOf('>');
    let spans = [];

    while (left != -1) {

      let substr;
      let tagSpan;
      let leftStr = line.substr(0, left);

      if (right != -1) {
        substr = line.substr(left, right - left + 1);
      } else {
        substr = line.substr(left);
      }

      tagSpan = this.scanTag(substr);

      spans.push(<span>{leftStr}{tagSpan}</span>);

      if (right == -1) {
        line = '';
      } else {
        line = line.substr(right + 1);
      }

      left = line.indexOf('<');
      right = line.indexOf('>');

    }

    if (line != '') {
      spans.push(<span>{line}</span>);
    }

    return spans;

  }

  render() {

    let { line } = this.props;
    let commentIndex = line.indexOf('<!--');
    let commentSpan = null;
    if (commentIndex != -1) {
      commentSpan = (<span className="comment">{line.substr(commentIndex)}</span>);
      line = line.substr(0, commentIndex);
    }

    let spans = this.findAllTags(line);

    return (
      <span>{spans}{commentSpan}{'\n'}</span>
    );

  }

}

HtmlLine.propTypes = {
  line: PropTypes.string.isRequired
};