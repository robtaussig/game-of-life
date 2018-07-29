import React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import MobileDetect from 'mobile-detect';
import {
  TOOLBAR_HEIGHT,
} from '../lib/constants.js';
const md = new MobileDetect(window.navigator.userAgent);
const isMobile = Boolean(md.mobile());

const controlsStyles = theme => ({
  root: {
    flex: `0 0 ${TOOLBAR_HEIGHT}px`,
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
    display: isMobile ? 'none' : 'block',
  },
  selectContainer: {
    marginRight: 15,
    display: isMobile ? 'none' : 'block',
  },
  applyButton: {
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
      showAdvanced: false,
    };

    this.handleInputWidth = this.handleInputWidth.bind(this);
    this.handleInputHeight = this.handleInputHeight.bind(this);
    this.handleInputDensity = this.handleInputDensity.bind(this);
    this.handleSelectFrameRate = this.handleSelectFrameRate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggleAdvanced = this.handleToggleAdvanced.bind(this);
    this.handleCloseAdvanced = this.handleCloseAdvanced.bind(this);
    this.handleSelectActiveMode = this.handleSelectActiveMode.bind(this);
    this.handleSelectPassiveMode = this.handleSelectPassiveMode.bind(this);
    this.handleSelectInteractiveMode = this.handleSelectInteractiveMode.bind(this);
    this.handleDisableInteractiveMode = this.handleDisableInteractiveMode.bind(this);
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

  handleCloseAdvanced() {
    this.setState({
      showAdvanced: false,
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

  handleSelectActiveMode() {
    this.props.onSelectActiveMode(true);
    this.handleCloseAdvanced();
  }

  handleSelectPassiveMode() {
    this.props.onSelectActiveMode(false);
    this.handleCloseAdvanced();
  }

  handleSelectInteractiveMode() {
    this.props.onSelectInteractiveMode(true);
    this.handleCloseAdvanced();
  }

  handleDisableInteractiveMode() {
    this.props.onSelectInteractiveMode(false);
    this.handleCloseAdvanced();
  }

  handleToggleAdvanced(e) {
    if (e.nativeEvent.clientX) {
      this.setState({
        showAdvanced: !this.state.showAdvanced,
      });
    }
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
    const { classes, isPlaying, onTogglePlay, isPassive, isInteractive } = this.props;
    const { root, editControls, inputField, inputLabel, formContainer, selectContainer, applyButton } = classes;
    const { inputtedWidth, inputtedHeight, inputtedDensity, selectedFrameRate, showAdvanced } = this.state;

    return (
      <div className={root}>
        <Button color={'secondary'} onClick={onTogglePlay}>
          {isPlaying ? 'Pause' : 'Resume'}
        </Button>
        <Button color={'secondary'} onClick={this.handleToggleAdvanced}>
          {showAdvanced ? 'Hide' : 'Advanced'}
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
          <Button className={applyButton} color={'secondary'} onClick={this.handleSubmit}>
            {'Apply'}
          </Button>
          <Dialog
            fullScreen={isMobile}
            open={showAdvanced}
            onClose={this.handleCloseAdvanced}
            aria-labelledby="advanced-dialogue"
          >
            <DialogTitle id="advanced-dialogue">{"Advanced Settings"}</DialogTitle>
            <DialogContent>
              <Typography variant={'subheading'} color={'primary'}>
                Action Mode
              </Typography>
              <DialogContentText>
                By default, the simulation runs on an interval set to 30 frames per second. Alternatively, you can control progression with the spacebar key. 
              </DialogContentText>
              <Button onClick={this.handleSelectActiveMode} color={isPassive ? 'primary' : 'secondary'}>
                {isPassive ? 'Active mode' : '[Active mode]'}
              </Button>
              <Button onClick={this.handleSelectPassiveMode} color={isPassive ? 'secondary' : 'primary'}>
                {isPassive ? '[Passive mode]' : 'Passive mode'}
              </Button>
            </DialogContent>
            <DialogContent>
              <Typography variant={'subheading'} color={'primary'}>
                Interactive Mode
              </Typography>
              <DialogContentText>
                If enabled, you can create a cluster of cells by clicking anywhere on the screen. Performance might suffer if using Passive mode.
              </DialogContentText>
              <Button onClick={this.handleSelectInteractiveMode} color={isInteractive ? 'secondary' : 'primary'}>
                {isInteractive ? '[Enabled]' : 'Enabled'}
              </Button>
              <Button onClick={this.handleDisableInteractiveMode} color={isInteractive ? 'primary' : 'secondary'}>
                {!isInteractive ? '[Disabled]' : 'Disabled'}
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseAdvanced} color={'primary'}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default withStyles(controlsStyles)(Controls);