import React from 'react';
import Game from './components/Game.jsx';
import Controls from './components/Controls.jsx';
import {
  STARTING_HEIGHT,
  STARTING_WIDTH,
  STARTING_LIFE_DENSITY,
  STARTING_FRAMERATE,
  createWorld,
  getNextWorld,
} from './lib/constants.js';

export default class GameOfLifeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      world: createWorld(STARTING_HEIGHT, STARTING_WIDTH),
      height: STARTING_HEIGHT,
      width: STARTING_WIDTH,
      isPlaying: false,
      frameRate: STARTING_FRAMERATE,
      density: STARTING_LIFE_DENSITY,
      passive: true,
    };

    this.updateWorld = this.updateWorld.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.resumeGame = this.resumeGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.handleSubmitChanges = this.handleSubmitChanges.bind(this);
    this.interval = null;
  }

  componentDidMount() {
    this.generateLife();
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  generateLife() {
    const world = this.state.world.map(() => {
      return Math.random() * 100 < this.state.density ? 1 : 0;
    });

    this.setState({
      world,
    });
  }

  handleSubmitChanges(changes) {
    const { height, width, density, frameRate } = changes;
    if (height === this.state.height && width === this.state.width && density === this.state.density) {
      if (frameRate !== this.state.frameRate) {
        this.setState({
          frameRate
        }, () => {
          this.pauseGame();
          if (this.state.isPlaying) {
            this.resumeGame();
          }
        });
      } else {
        this.resetGame();
      }
    } else {
      this.setState({
        height,
        width,
        density,
        frameRate
      }, () => {
        this.resetGame();
      });
    }
  }

  handleKeyPress(event) {
    if (event.code === 'Space') {
      this.updateWorld();
    }
  }

  handleTogglePlay() {
    if (this.state.isPlaying) {
      this.pauseGame();
    } else {
      this.resumeGame();
    }    
  }

  pauseGame() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = null;

    this.setState({
      isPlaying: false,
    });
  }

  resetGame() {
    this.setState({
      world: createWorld(this.state.height, this.state.width),
    }, () => {
      this.generateLife();
      this.startGame();
    });
  }

  resumeGame() {
    const update = this.updateWorld;
    const frameRate = this.state.frameRate;
    this.interval = setInterval(() => {
      update();
    }, (1000 / frameRate));

    this.setState({
      isPlaying: true,
    });
  }

  startGame() {    
    if (this.passive) {
      if (this.state.isPlaying) {
        this.resumeGame();
      }
    } else {
      document.addEventListener('keypress', this.handleKeyPress);
    }
  }

  updateWorld() {
    const world = getNextWorld(this.state.world, this.state.height, this.state.width);
    this.setState({
      world,
    });
  }

  render() {
    const { world, height, width, isPlaying, frameRate, density } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Controls
          isPlaying={isPlaying}
          onTogglePlay={this.handleTogglePlay}
          frameRate={frameRate}
          width={width}
          height={height}
          density={density}
          onSubmit={this.handleSubmitChanges}
        />
        <Game
          world={world}
          height={height}
          width={width}
        />
      </div>
    );
  }
}