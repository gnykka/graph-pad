import { connect } from 'react-redux';
import View from '../components/View';

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    edit(text) {
      dispatch({
        type: 'EDIT',
        text: text
      });
    },
    startGraph() {
      dispatch({
        type: 'STARTGRAPH',
        createGraph: true
      });
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(View);
