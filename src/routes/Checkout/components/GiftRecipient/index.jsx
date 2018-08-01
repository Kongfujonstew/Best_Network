/* eslint-disable react/jsx-no-duplicate-props */

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from 'modules/checkout';
import styles from './styles.scss';

const muiThemeStyles = theme => ({
  textField: theme.textField,
  button: theme.button,
  Input: theme.Input,
  input: theme.input
});

export class GiftRecipient extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (name) => {
    const { giftRecipient, setGiftRecipient, updateStepValidity } = this.props;
    return (event) => {
      giftRecipient[name] = event.target.value;
      const newGiftRecipient = { ...giftRecipient };
      setGiftRecipient(newGiftRecipient);
      updateStepValidity();
    };
  }

  handleToggle = () => {
    const { isGift, toggleIsGift, updateStepValidity } = this.props;
    toggleIsGift(!isGift);
    updateStepValidity();
  }

  render() {
    const {
      classes,
      giftable,
      giftRecipient: {
        firstName,
        lastName,
        email
      },
      isGift
    } = this.props;

    if (!giftable) {
      return null;
    }

    const giftRecipientInputStyle = { marginRight: '8px' };

    return (
      <Grid item xs={12} id="giftRecipientComponent" className={styles.border} style={{ margin: '0 8px' }}>
        <Grid container justify="center" className={styles.hover} onClick={this.handleToggle}>
          <Grid item xs={1}>
            <Checkbox
              inputProps={{ id: 'giftRecipientCheckbox' }}
              color="primary"
              checked={isGift}
            />
          </Grid>
          <Grid item xs={11}>
            <Typography
              id="giftRecipientPrompt"
              unselectable="on"
              style={{ marginTop: '10px', marginLeft: '16px', userSelect: 'none' }}
              type="subheading"
            >Click here if this is a gift for someone else.
            </Typography>
          </Grid>
        </Grid>
        { isGift ?
          <Grid id="giftRecipientForm" container>
            <Grid item xs={12} style={{ paddingLeft: '12px' }}>
              <Typography
                type="subheading"
              >{'Recipient\'s name and email.'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                InputProps={{ className: classes.Input, style: giftRecipientInputStyle }}
                inputProps={{ className: classes.input, id: 'giftRecipientFirstName' }}
                placeholder="First Name"
                required
                value={firstName}
                onChange={this.handleChange('firstName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                InputProps={{ className: classes.Input, style: giftRecipientInputStyle }}
                inputProps={{ className: classes.input, id: 'giftRecipientLastName' }}
                placeholder="Last Name"
                required
                value={lastName}
                onChange={this.handleChange('lastName')}
              />
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: '16px' }}>
              <TextField
                className={classes.textField}
                InputProps={{ className: classes.Input, style: giftRecipientInputStyle }}
                inputProps={{ className: classes.input, id: 'giftRecipientEmail' }}
                placeholder="Email"
                required
                value={email}
                onChange={this.handleChange('email')}
              />
            </Grid>
          </Grid> : null
        }
      </Grid>
    );
  }
}

GiftRecipient.propTypes = {
  classes: PropTypes.shape({
    textField: PropTypes.string.isRequired
  }).isRequired,
  giftRecipient: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  giftable: PropTypes.bool.isRequired,
  isGift: PropTypes.bool.isRequired,
  setGiftRecipient: PropTypes.func.isRequired,
  toggleIsGift: PropTypes.func.isRequired,
  updateStepValidity: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  giftable: state.checkout.giftable,
  giftRecipient: state.checkout.giftRecipient,
  isGift: state.checkout.isGift
});

const mapDispatchToProps = dispatch => ({
  updateStepValidity: () => {
    dispatch(actions.updateStepValidity('A'));
  },
  setGiftRecipient: (giftRecipient) => {
    dispatch(actions.setGiftRecipient(giftRecipient));
  },
  toggleIsGift: (bool) => {
    dispatch(actions.toggleIsGift(bool));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(muiThemeStyles)(GiftRecipient));
