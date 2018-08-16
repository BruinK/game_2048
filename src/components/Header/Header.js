import React from 'react';
import './Header.css';

export default class Header extends React.Component {
    handelReStart=() => {
      const { actions } = this.props;
      actions.startGame();
    }
    render() {
      const { scores, bestScores } = this.props;
      return (
        <div className="header">
          <div className="headerTop">
            <div className="title">2048</div>
            <div className="scores">
              <div>Scores</div>
              <div>{scores}</div>
            </div>
            <div className="scores">
              <div>Best Scores</div>
              <div>{bestScores}</div>
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
