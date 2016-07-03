import React from 'react';
import ReactDOM from 'react-dom';
import Path from '../components/Path';
import Axis from '../components/Axis'

const fullWidth = 400;
const fullHeight = 150;
const margin = {
    top : 10,
    right : 10,
    bottom : 30,
    left : 30
};
var width = fullWidth - margin.left - margin.right;
var height = fullHeight - margin.top - margin.bottom;

export default class LineChart extends React.Component {
  static get propTypes() {
    return {
      x: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
      y: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
      color: React.PropTypes.string.isRequired,
      size: React.PropTypes.string.isRequired
    };
  };

  render() {
    const {x, y, color, size} = this.props;

    var data = _.zip(x, y);
    const minX =_.min(x);
    const maxX = _.max(x);
    const minY = _.min(y);
    const maxY = _.max(y);

    var xScale = d3.scale.linear()
      .domain([minX, maxX])
      .range([0, width]);

    var yScale = d3.scale.linear()
      .domain([minY, maxY])
      .range([height, 0]);

    var path = d3.svg.line()
      .x(function(d) { return xScale(d[0]); })
      .y(function(d) { return yScale(d[1]); })
      .interpolate('linear');

    var xAxis = d3.svg.axis()
      .outerTickSize(0)
      .scale(xScale)
      .ticks(5)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .outerTickSize(0)
      .scale(yScale)
      .ticks(4)
      .orient("left");

    return (
        <div className='chart'>
          <svg width={fullWidth} height={fullHeight}>
            <Path path={path(data)} color={color} size={size}
              top={margin.top} left={margin.left} />
            <Axis className="axis" axis={xAxis}
              top={height + margin.top} left={margin.left} />
            <Axis className="axis" axis={yAxis}
              top={margin.top} left={margin.left} />
          </svg>
        </div>
      )
  }
}