import React from 'react';
import ReactDOM from 'react-dom';

export default class Warning extends React.Component {
  static get propTypes() {
    return {
      message: React.PropTypes.string
    };
  };

  render() {
    const {message} = this.props;
    return (
      <div className="alert alert-info">
        Chart settings are invalid: {message}
      </div>
    )
  }
}