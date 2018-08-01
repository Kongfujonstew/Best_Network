/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import { actions } from 'modules/checkout';
import styles from './styles.scss';

@connect(
  () => ({}),
  {
    disableUpsell: actions.disableUpsell
  }
)
class UpsellTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: null,
      seconds: null
    };
  }

  componentDidMount() {
    this.tick();
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    const t = Date.parse(this.props.upsellDeadline) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);

    if (t <= 0) {
      clearInterval(this.timer);
      this.setState({
        minutes: '00',
        seconds: '00'
      });
      this.props.disableUpsell();
    } else {
      this.setState({
        minutes: (`0${minutes}`).slice(-2),
        seconds: (`0${seconds}`).slice(-2)
      });
    }
  }

  render() {
    return (
      <div className={styles.timer}>
        <div>
          <span className="minutes">{this.state.minutes}</span>
          <Typography style={{ color: '#fff' }}>Minutes</Typography>
        </div>
        <div>
          <span className="seconds">{this.state.seconds}</span>
          <Typography style={{ color: '#fff' }}>Seconds</Typography>
        </div>
      </div>
    );
  }
}

export default UpsellTimer;