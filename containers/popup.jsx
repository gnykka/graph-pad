import { connect } from 'react-redux';
import PopUp from '../components/Popup';

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    hide() {
      dispatch({
        type: 'STARTGRAPH',
        createGraph: false
      });
    },
    undoGraph() {
      dispatch({
        type: 'UNDOGRAPH'
      });
    },
    showGraph(showGraph) {
      dispatch({
        type: 'SHOWGRAPH',
        showGraph: showGraph
      });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
