export const ALIVE = 1;
export const DEAD = 0;
export const STARTING_HEIGHT = 100;
export const STARTING_WIDTH = 100;
export const STARTING_LIFE_DENSITY = 50;
export const STARTING_FRAMERATE = 30;
export const JUST_DEAD = 'JUST_DEAD';
export const JUST_ALIVE = 'JUST_ALIVE';
export const MORE_ALIVE = 'MORE_ALIVE';
export const STILL_DEAD = 'STILL_DEAD';
export const NEUTRAL = 'NEUTRAL';

export const generateGrid = props => {
  const { height, width } = props;

  return {
    display: 'grid',
    height: '100%',
    width: '100%',
    gridTemplateRows: `repeat(${height}, 1fr)`,
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    backgroundColor: '#CBD4C2',
  };
};

export const generatePlotStyle = level => {
  const style = {};
  switch (level) {
  case JUST_DEAD:
    style.backgroundColor = '#FB3640';
    break;
  case STILL_DEAD:
    style.backgroundColor = '#eaeaea';
    break;
  case JUST_ALIVE:
    style.backgroundColor = '#247BA0';
    break;
  case MORE_ALIVE:
    style.backgroundColor = '#1D3461';
    break;
  }
  return style;
};

export const createWorld = (height, width) => (
  new Array(height * width)
    .fill(null)
    .map(() => DEAD)
);

const getNorth = (world, plotIdx, height, width) => {
  return world[plotIdx - width] || 0;
};

const getSouth = (world, plotIdx, height, width) => {
  return world[plotIdx + width] || 0;
};

const getEast = (world, plotIdx, height, width) => {
  return plotIdx % width === (width - 1) ? 0 : world[plotIdx + 1] || 0;
};

const getWest = (world, plotIdx, height, width) => {
  return plotIdx % width === 0 ? 0 : world[plotIdx - 1] || 0;
};

const getNorthEast = (world, plotIdx, height, width) => {
  return plotIdx % width === (width - 1) ? 0 : world[plotIdx - width + 1] || 0;
};

const getNorthWest = (world, plotIdx, height, width) => {
  return plotIdx % width === 0 ? 0 : world[plotIdx - width - 1] || 0;
};

const getSouthEast = (world, plotIdx, height, width) => {
  return plotIdx % width === (width - 1) ? 0 : world[plotIdx + width + 1] || 0;
};

const getSouthWest = (world, plotIdx, height, width) => {
  return plotIdx % width === 0 ? 0 : world[plotIdx + width - 1] || 0;
};

const getNeighbors = (world, plotIdx, height, width) => {
  const north = getNorth(world, plotIdx, height, width);
  const south = getSouth(world, plotIdx, height, width);
  const east = getEast(world, plotIdx, height, width);
  const west = getWest(world, plotIdx, height, width);
  const northEast = getNorthEast(world, plotIdx, height, width);
  const northWest = getNorthWest(world, plotIdx, height, width);
  const southEast = getSouthEast(world, plotIdx, height, width);
  const southWest = getSouthWest(world, plotIdx, height, width);
  const neighbors = north + south + east+ west + northEast + northWest + southEast + southWest;
  return neighbors;
};

export const getNextWorld = (world, height, width) => {
  return world.map((plot, idx) => {
    const neighbors = getNeighbors(world, idx, height, width);
    let isAlive = false;
    if (!plot && neighbors === 3) {
      isAlive = true;
    } else if (plot) {
      if (neighbors === 2 || neighbors === 3) {
        isAlive = true;
      }
    }
    
    return isAlive ? ALIVE : DEAD;
  });
};