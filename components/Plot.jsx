import React from 'react';
import {
  generatePlotStyle,
  JUST_DEAD,
  JUST_ALIVE,
  MORE_ALIVE,
  STILL_DEAD,
  NEUTRAL,
} from '../lib/constants.js';

export default class Plot extends React.Component {
  constructor(props) {
    super(props);
    this.level = NEUTRAL;
    this.node = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.self) {
      if (nextProps.self) {
        this.level = MORE_ALIVE;
      } else {
        this.level = JUST_DEAD;
      }
    } else {
      if(nextProps.self) {
        this.level = JUST_ALIVE;
      } else {
        this.level = STILL_DEAD;
      }
    }

    if (nextProps.interactive && !this.props.interactive) {
      this.node.current.addEventListener('click', this.handleClick);
    } else if (this.props.interactive && !nextProps.interactive) {
      this.node.current.removeEventListener('click', this.handleClick);
    }
  }

  handleClick() {
    this.props.onClick(this.props.plotIdx);
  }

  render() {

    return (
      <div
        ref={this.node}
        className={'plot'}
        style={generatePlotStyle(this.level)}
      />
    );
  }
}