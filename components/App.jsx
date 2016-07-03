import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Header from '../components/Header';
import View from '../containers/view';
import PopUp from '../containers/popup'

function reducer(state = { text: "", createGraph: false }, action) {
  switch(action.type) {
    case "EDIT":
      return { ...state, text: action.text };
    case "STARTGRAPH":
      return { ...state, createGraph: action.createGraph };
    case "UNDOGRAPH":
      return { ...state, createGraph: false, text: state.text.replace('//plot', '') };
    case "SHOWGRAPH":
      return { ...state, createGraph: false, text: state.text.replace('//plot', action.showGraph) };
    default:
      return state;
  }
}
const store = createStore(reducer)

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <View text=""/>
        <PopUp />
      </div>
      )
  }
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementsByClassName('app')[0]
);
