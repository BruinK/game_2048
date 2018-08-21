import React from 'react';
import './Header.css';

export default class Header extends React.Component {
  state = {
    scoresHistory: 0,
    bestScoresHistory: 0,
    showScores: 0,
    showBestScores: 0,
    changeScoresFlag: false,
    changeBSFlag: false
  };
  componentWillReceiveProps() {
    const { logicData } = this.props;
    if (logicData.scores > this.state.scoresHistory) {
      this.setState({
        scoresHistory: logicData.scores,
        showScores: logicData.scores - this.state.scoresHistory,
        changeScoresFlag: !this.state.changeScoresFlag
      });
    }
    if (logicData.bestScores > this.state.bestScoresHistory) {
      this.setState({
        bestScoresHistory: logicData.bestScores,
        showBestScores: logicData.bestScores - this.state.bestScoresHistory,
        changeBSFlag: !this.state.changeBSFlag
      });
    }
    if (logicData.scores === 0) {
      this.setState({
        scoresHistory: 0,
        showScores: 0,
        showBestScores: 0
      });
    }
  }
    handelReStart=() => {
      this.setState({
        scoresHistory: 0,
        showScores: 0,
        showBestScores: 0
      });
      const { actions } = this.props;
      actions.startGame();
    }
    showAdd= mark => {
      if (mark === 1) {
        if (this.state.showScores !== 0) {
          return (
            <div className={`scoresAnimation-${this.state.changeScoresFlag}`}>
              +{this.state.showScores}
            </div>);
        }
      }
      if (mark === 2) {
        if (this.state.showBestScores !== 0) {
          return (
            <div className={`scoresAnimation-${this.state.changeBSFlag}`}>
              +{this.state.showBestScores}
            </div>);
        }
      }
      return null;
    }
    showScores= id => {
      const { logicData } = this.props;
      if (id === 1) {
        return <div > {logicData.scores}</div>;
      }
      if (id === 2) {
        return <div>{logicData.bestScores}</div>;
      }
      return null;
    }
    render() {
      return (
        <div className="header">
          <div className="headerTop">
            <div className="title">2048</div>
            <div className="scores">
              <div>Scores</div>
              {
                this.showScores(1)
              }
              {
                this.showAdd(1)
              }
            </div>
            <div className="scores">
              <div>Record</div>
              {
                this.showScores(2)
              }
              {
                this.showAdd(2)
              }
            </div>
          </div>
          <div className="headerBottom">
            <div className="intro">
              <span>Keypressing W A S D on PC</span>
              <br />
              <span>TouchMoving on Phone!</span>
            </div>
            <div className="reStart" onClick={this.handelReStart}>Restart</div>
          </div>

        </div>
      );
    }
}
