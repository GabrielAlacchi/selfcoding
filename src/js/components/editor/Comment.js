
import React from "react";

export default class Comment extends React.Component {
  render() {
    return (
      <span className="comment">{this.props.text + '\n'}</span>
    )
  }
}