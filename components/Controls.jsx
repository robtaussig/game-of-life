import React from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MobileDetect from 'mobile-detect';
const md = new MobileDetect(window.navigator.userAgent);
const isMobile = Boolean(md.mobile());

const controlsStyles = theme => ({
  root: {
    flex: '0 0 50px',
    backgroundColor: '#071013',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editControls: {
    display: 'flex',
    alignItems: 'center',
  },
  inputField: {
    color: 'white',
    borderBottom: '1px solid white',
    width: 50,
    textAlign: 'center',
  },
  inputLabel: {
    color: 'white',
  },
  formContainer: {
    marginRight: 15,
  },
  selectContainer: {
    marginRight: 15,
    display: isMobile ? 'none' : 'block',
  }
});

export class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputtedWidth: props.width,
      inputtedHeight: props.height,
      inputtedDensity: props.density,
      selectedFrameRate: props.frameRate,
    };

    this.handleInputWidth = this.handleInputWidth.bind(this);
    this.handleInputHeight = this.handleInputHeight.bind(this);
    this.handleInputDensity = this.handleInputDensity.bind(this);
    this.handleSelectFrameRate = this.handleSelectFrameRate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputHeight(event) {
    this.setState({
      inputtedHeight: event.target.value,
    });
  }

  handleInputWidth(event) {
    this.setState({
      inputtedWidth: event.target.value,
    });
  }

  handleInputDensity(event) {
    this.setState({
      inputtedDensity: event.target.value,
    });
  }

  handleSelectFrameRate(event) {
    this.setState({
      selectedFrameRate: event.target.value
    });
  }

  handleSubmit() {
    this.props.onSubmit({
      width: Number(this.state.inputtedWidth),
      height: Number(this.state.inputtedHeight),
      density: Number(this.state.inputtedDensity),
      frameRate: Number(this.state.selectedFrameRate),
    });
  }

  render() {
    const { classes, isPlaying, onTogglePlay } = this.props;
    const { root, editControls, inputField, inputLabel, formContainer, selectContainer } = classes;
    const { inputtedWidth, inputtedHeight, inputtedDensity, selectedFrameRate } = this.state;

    return (
      <div className={root}>
        <Button color={'secondary'} onClick={onTogglePlay}>
          {isPlaying ? 'Pause' : 'Resume'}
        </Button>
        <div className={editControls}>
          <select
            className={selectContainer}
            value={selectedFrameRate}
            onChange={this.handleSelectFrameRate}  
          >
            <option value={1}>1 fps</option>
            <option value={10}>10 fps</option>
            <option value={20}>20 fps</option>
            <option value={30}>30 fps</option>
            <option value={40}>40 fps</option>
            <option value={50}>50 fps</option>
            <option value={60}>60 fps</option>
          </select>
          <form className={formContainer}>
            <label className={inputLabel}>
              Density:
              <input className={inputField} type="text" name="density" value={inputtedDensity} onChange={this.handleInputDensity}/>
            </label>
          </form>
          <form className={formContainer}>
            <label className={inputLabel}>
              Width:
              <input className={inputField} type="text" name="width" value={inputtedWidth} onChange={this.handleInputWidth}/>
            </label>
          </form>
          <form className={formContainer}>
            <label className={inputLabel}>
              Height:
              <input className={inputField} type="text" name="height" value={inputtedHeight} onChange={this.handleInputHeight}/>
            </label>
          </form>
          <Button color={'secondary'} onClick={this.handleSubmit}>
            {'Apply'}
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(controlsStyles)(Controls);