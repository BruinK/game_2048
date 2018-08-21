import React from 'react';
import './Body.css';

export default class Body extends React.Component {
  state = {
    startPointX: 0,
    startPointY: 0,
    combineFlag: true
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.startGame();
    window.addEventListener('keydown', this.onListenKeydown);
  }
  onListenKeydown=e => {
    const { actions } = this.props;
    this.setState({
      combineFlag: !this.state.combineFlag
    });
    switch (e.keyCode) {
      case 38:
      case 87:
        actions.toUp();
        break;
      case 40:
      case 83:
        actions.toDown();
        break;
      case 37:
      case 65:
        actions.toLeft();
        break;
      case 39:
      case 68:
        actions.toRight();
        break;
      default:
        break;
    }
  }
  onlistenTouchStart=e => {
    console.log('X1', e.touches[0].screenX);
    console.log('Y1', e.touches[0].screenY);
    this.setState({
      startPointX: e.touches[0].screenX,
      startPointY: e.touches[0].screenY
    });
  }
  onListenTouchEnd=e => {
    const { actions } = this.props;
    console.log('X2', e.changedTouches[0].screenX);
    console.log('Y2', e.changedTouches[0].screenY);
    const X = e.changedTouches[0].screenX - this.state.startPointX;
    const Y = e.changedTouches[0].screenY - this.state.startPointY;
    this.setState({
      combineFlag: !this.state.combineFlag
    });
    if (Math.abs(X) > Math.abs(Y)) {
      if (X > 0) {
        actions.toRight();
      } else {
        actions.toLeft();
      }
    }
    if (Math.abs(X) < Math.abs(Y)) {
      if (Y > 0) {
        actions.toDown();
      } else {
        actions.toUp();
      }
    }
  }
    getCell=() => {
      const { logicData } = this.props;
      return logicData.mainList.map((item, id) => item.map((num, idx) => {
        if (num === 0) {
          return <div className="gameCell num0" key={`${id}-${idx}`} />;
        }
        if (logicData.newNumList[id][idx] === 1) {
          return <div className={`gameCell num${num} animation`} key={`${id}-${idx}`}>{num}</div>;
        }
        if (logicData.combineList[id][idx] === 2) {
          return <div className={`gameCell num${num} combineAnimation${this.state.combineFlag}`} key={`${id}-${idx}`}>{num}</div>;
        }
        return <div className={`gameCell num${num}`} key={`${id}-${idx}`}>{num}</div>;
      }));
    }

    render() {
      return (
        <div className="gameBody" onTouchStart={this.onlistenTouchStart} onTouchEnd={this.onListenTouchEnd}>
          {
            this.getCell()
          }
        </div>
      );
    }
}
