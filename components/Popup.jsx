import React from 'react';
import ReactDOM from 'react-dom';

export default class PopUp extends React.Component {
  static get propTypes() {
    return {
      createGraph: React.PropTypes.bool
    };
  }

  componentWillUpdate() {
    document.getElementById('x').value = "0, 1, 2, 3, 4, 5";
    document.getElementById('y').value = "0, 5, 0, 10, 0, 15";
    document.getElementById('size').value = "2";
    document.getElementById('color').value = "#000000";
  };

  render() {
    const {createGraph} = this.props;
    const onClose = () => {
      this.props.undoGraph();
    };
    const onSave = () => {
      var x = document.getElementById('x').value.replace(/\s/g, '');
      var y = document.getElementById('y').value.replace(/\s/g, '');
      var size = document.getElementById('size').value.replace(/\s/g, '');
      var color = document.getElementById('color').value.replace(/\s/g, '');
      this.props.showGraph("%% Line([" + x + "]; [" + y + "]; " + size + "; " + color + ") %%");
    };

    return (
      <div className={this.props.createGraph ? 'modal visible' : 'modal'}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">New line graph</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <span className="label-values">x </span>
                <input className="input-xy-values form-control input-sm" id="x" type="text"
                  placeholder="0, 1, 2, ..."/>
              </div>
              <div className="form-group">
                <span className="label-values">y </span>
                <input className="input-xy-values form-control input-sm" id="y" type="text"
                  placeholder="0, 1, 2, ..."/>
              </div>
              <div className="form-group">
                <span className="label-values">color </span>
                <input className="input-sc-values form-control input-sm" id="color" type="text"
                  defaultValue="#000000" placeholder="#000000"/>
              </div>
              <div className="form-group">
                <span className="label-values">size </span>
                <input className="input-sc-values form-control input-sm" id="size" type="text"
                  defaultValue="2" placeholder="2"/>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal"
                onClick={onClose}>Close</button>
              <button type="button" className="btn btn-primary"
                onClick={onSave}>Create</button>
            </div>
          </div>
        </div>
      </div>
      )
  }
}