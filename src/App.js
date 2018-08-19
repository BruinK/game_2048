import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Body from './components/Body/Body';
import Header from './components/Header/Header';
import GameOver from './components/GameOver/GameOver';
import './App.css';
import * as actionCreators from './actions';

class App extends Component {
  isGameOver = () => {
    const { logicData, actions } = this.props;
    if (logicData.overFlag) {
      return <GameOver logicData={logicData} actions={actions} />;
    }
    return null;
  }
  render() {
    const { logicData, uiData, actions } = this.props;
    return (
      <div className="App">
        <Header actions={actions} logicData={logicData} uiData={uiData} />
        <Body logicData={logicData} actions={actions} />
        {
          this.isGameOver()
        }
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
  return {
    logicData: state.gameLogic,
    uiData: state.gameUI
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

