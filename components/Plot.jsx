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
  }

  render() {

    return (
      <div
        className={'plot'}
        style={generatePlotStyle(this.level)}
      />
    );
  }
}