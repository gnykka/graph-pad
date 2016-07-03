import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div className="bs-component">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <img src="../icons/dual-chart.png" className="logo"/>
            <h2 className="app-header">GraphPad</h2>
          </div>
        </nav>
      </div>
      )
  }
}
