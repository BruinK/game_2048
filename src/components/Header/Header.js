import React from 'react';
import './Header.css';

export default class Header extends React.Component {
    state={
      scoresHistory: 0,
      bestScoresHistory: 0,
      showScores: 0,
      showBestScores: 0
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
    handelScores=() => {
      const { logicData } = this.props;
      if (logicData.scores > this.state.scoresHistory) {
        this.setState({
          scoresHistory: logicData.scores,
          showScores: logicData.scores - this.state.scoresHistory
        });
      }
      if (logicData.bestScores > this.state.bestScoresHistory) {
        this.setState({
          bestScoresHistory: logicData.bestScores,
          showBestScores: logicData.bestScores - this.state.bestScoresHistory
        });
      }
    }

    displayAdd=() => {
      const { uiData } = this.props;
      if (this.state.showBestScores !== 0) {
        if (!uiData.isHidden) {
          return <div className="scoresAnimation ">+{this.state.showBestScores}</div>;
        }
      }
      return null;
    }
    showAdd=() => {
      const { uiData } = this.props;
      if (this.state.showScores !== 0) {
        if (!uiData.isHidden) {
          return <div className="scoresAnimation">+{this.state.showScores}</div>;
        }
      }
      return null;
    }
    render() {
      const { logicData } = this.props;
      return (
        <div className="header">
          <div className="headerTop">
            <div className="title">2048</div>
            <div className="scores">
              {
                this.handelScores()
              }
              <div>Scores</div>
              <div > {
                logicData.scores
              }
              </div>
              {
                this.showAdd()
              }
            </div>
            <div className="scores">
              <div>Best Scores</div>
              <div>{logicData.bestScores}</div>
              {
                this.displayAdd()
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
