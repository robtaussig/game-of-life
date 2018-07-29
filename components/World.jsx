import React from 'react';
import Plot from './Plot.jsx';
import {  
  generateGrid,
} from '../lib/constants.js';

export default class World extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { world} = this.props;

    return (
      <div
        style={generateGrid(this.props)}
      >
        {world.map((plot, plotIdx) => {
          return (
            <Plot
              key={`${plotIdx}-plot`}
              self={plot}
            />
          );
        })}
      </div>
    );
  }
}