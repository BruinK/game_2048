import React from 'react';
import { KeyDown } from 'react-event-components';
import './Body.css';

export default class Body extends React.Component {
  componentWillMount() {
    const { actions } = this.props;
    actions.startGame();
  }
    getCell=() => {
      const { data } = this.props;
      return data.map((item, id) => item.map((num, idx) => {
        if (num === 0) {
          return <div className="gameCell num0" key={`${id}-${idx}`} />;
        }
        return <div className={`gameCell num${num}`} key={`${id}-${idx}`}>{num}</div>;
      }));
    }
    listenUp=() => {
      const { actions } = this.props;
      actions.toUp();
    }
    listenDown=e => {
      console.log(e);
      const { actions } = this.props;
      actions.toDown();
    }
    listenLeft=() => {
      const { actions } = this.props;
      actions.toLeft();
    }
    listenRight=() => {
      const { actions } = this.props;
      actions.toRight();
    }
    render() {
      return (
        <div className="gameBody" >
          <KeyDown when="w" do={this.listenUp} />
          <KeyDown when="s" do={this.listenDown} />
          <KeyDown when="a" do={this.listenLeft} />
          <KeyDown when="d" do={this.listenRight} />
          {
                this.getCell()
            }
        </div>
      );
    }
}
