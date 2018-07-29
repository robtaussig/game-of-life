import React from 'react';
import World from './World.jsx';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { world, height, width, interactive, onClickCell } = this.props;
    return (
      <div style={{
        flex: '1',
      }}>
        <World 
          world={world}
          height={height}
          width={width}
          interactive={interactive}
          onClickCell={onClickCell}
        />
      </div>
    );
  }
}