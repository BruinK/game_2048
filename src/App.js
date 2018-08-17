import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Body from './components/Body/Body';
import Header from './components/Header/Header';
import './App.css';
import * as actionCreators from './actions';

/*eslint-disable*/
class App extends Component {
  render() {
    const {scores, bestScores, isHidden} = this.props;
    return (
      <div className="App">
        <Header actions={this.props.actions} scores={scores} bestScores={bestScores} isHidden={isHidden}/>
        < Body data = {this.props.mainList} actions={this.props.actions}/>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}
function mapStateToProps(state) {
  const {mainList,scores,bestScores}=state.gameLogic;
  const {isHidden}=state.gameUI;
  return {
    mainList,
    scores,
    bestScores,
    isHidden
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

