import React, { Component } from 'react';
import './GameOver.css';

export default class GameOver extends Component {
  closeMask = () => {
    const { actions } = this.props;
    actions.closeMask();
  }
  restart = () => {
    const { actions } = this.props;
    actions.startGame();
  }
  showScores = () => {
    const { logicData } = this.props;
    if (logicData.scores >= logicData.bestScores) {
      return (
        <span>新纪录，{logicData.scores}分！</span>
      );
    }
    return <span>恭喜你，{logicData.scores}分！</span>;
  }
  render() {
    return (
      <div className="gameOver">
        <div className="centerBox">
          <div className="overInfo">
            {
                this.showScores()
            }
          </div>
          <div className="btnBox">
            <div className="return" onClick={this.closeMask}>Return</div>
            <div className="restart" onClick={this.restart}>Restart</div>
          </div>
        </div>
      </div>
    );
  }
}
