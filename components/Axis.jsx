import React from 'react';
import ReactDOM from 'react-dom';

export default class Axis extends React.Component {
  static get propTypes() {
    return {
      axis: React.PropTypes.func.isRequired,
      top: React.PropTypes.number.isRequired,
      left: React.PropTypes.number.isRequired
    };
  };

  componentDidMount() {
    d3.select(this.refs.axis).call(this.props.axis);
  };

  render() {
    const {axis, left, top} = this.props;
    return (
        <g className="axis" ref="axis"
          transform={"translate(" + left + "," + top + ")"}></g>
      )
  }
}