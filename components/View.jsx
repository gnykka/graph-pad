import marked from 'marked';
import LineChart from '../components/LineChart'
import Warning from '../components/Warning'
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server'

export default class View extends React.Component {
  static get propTypes() {
    return {
      text: React.PropTypes.string.isRequired
    };
  }

  componentWillMount() {
    this.chartDiv = document.createElement('div');
  }

  parseLine(str) {
    var settings = str.split([';']);
    var x = settings[0].trim().substring(1, settings[0].length - 1).split([',']);
    var y = settings[1].trim().substring(1, settings[1].length - 1).split([',']);
    return {
      x: x.map((v) => parseFloat(v)),
      y: y.map((v) => parseFloat(v)),
      size: settings[2].trim(),
      color: settings[3].trim()
    };
  }

  validSettings(settings) {
    if (settings.x.length != settings.y.length) return "check lengths of x and y arrays.";
    for (var i = 0; i < settings.x.length; i++)
      if (isNaN(settings.x[i])) return "element " + (i + 1) + " of x array is not a number";
    for (var i = 0; i < settings.y.length; i++)
      if (isNaN(settings.y[i])) return "element " + (i + 1) + " of y array is not a number";
    return "";
  }

  parseText(text) {
    var result = marked(text);
    var str = result;
    var start = str.search(/%% Line\(/);
    while (start > -1) {
      str = str.substring(start);
      var end = start + str.search(/\) %%/);
      if (end > start) {
        const lineSettings = this.parseLine(result.substring(start + 8, end));
        var element = {};
        var errorMessage = this.validSettings(lineSettings)
        if (errorMessage == "") {
          element = ReactDOM.render(
            <LineChart x={lineSettings.x} y={lineSettings.y} 
                size={lineSettings.size} color={lineSettings.color}
            />, this.chartDiv);
        }
        else {
          element = ReactDOM.render(<Warning message={errorMessage}/>, this.chartDiv);
        }
        element = ReactDOM.findDOMNode(element).outerHTML;
        ReactDOM.unmountComponentAtNode(this.chartDiv);
        result = result.substring(0, start) + element + result.substring(end + 4);
        str = result;
        start = str.search(/%% Line\(/);
      }
      else {
        start = -1;
      }
    }
    return result;
  }

  render() {
    var textarea;
    const {text, createGraph} = this.props;
    const onChange = () => {
      var txt = textarea.value
      var index = txt.indexOf("/plot");
      if (index != -1) this.props.startGraph();
      this.props.edit(txt);
    };

    return (
      <div className="view-container col-sm-12">
        <div className="form-container well bs-component col-sm-6">
          <legend>Editor</legend>
          <textarea ref={(ta) => textarea = ta}
            placeholder="Write your text here. Use markdown to format text. To add graph type '//plot'..."
            onChange={onChange} value={text}>
          </textarea>
        </div>
        <div className="form-container well bs-component col-sm-6">
          <legend>Preview</legend>
          <div className="output"
            dangerouslySetInnerHTML={{__html: this.parseText(text)}}></div>
        </div>
      </div>
      )
  }
}