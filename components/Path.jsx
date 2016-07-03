import React from 'react';
import ReactDOM from 'react-dom';

export default class Path extends React.Component {
  static get propTypes() {
    return {
      path: React.PropTypes.string.isRequired,
      color: React.PropTypes.string.isRequired,
      size: React.PropTypes.string.isRequired,
      left: React.PropTypes.number.isRequired,
      top: React.PropTypes.number.isRequired
    };
  };

  render() {
    const {path, color, size, left, top} = this.props;
    return (
        <g transform={"translate(" + left + "," + top + ")"}>
          <path d={path} stroke={color} strokeWidth={size} fill="none" />
        </g>
      )
  }
}