/* eslint-disable react/jsx-no-duplicate-props */

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import NewBillingZipForm from 'routes/Checkout/components/NewBillingZipForm';
import { connect } from 'react-redux';
import { actions } from 'modules/checkout';
import { actions as modalActions } from 'modules/modal';

const muiThemeStyles = theme => ({
  textField: theme.textField,
  button: theme.button,
  Input: theme.Input,
  input: theme.input
});

export class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    if (props.newUser) {
      this.state = { user: props.newUser };
    } else {
      this.state = {
        user: {
          email: '',
          firstName: '',
          lastName: '',
          phone: ''
        }
      };
    }
  }

  componentWillMount() {
    this.props.updateStepValidity();
  }

  componentWillReceiveProps(nextProps) {
    const { newUser } = nextProps;
    this.setState({ user: newUser });
  }

  handleChange(name) {
    const { updateStepValidity, setNewUser } = this.props;
    return (event) => {
      const { user } = this.state;
      user[name] = event.target.value;
      const newUser = { ...user };
      setNewUser(newUser);
      updateStepValidity();
    };
  }

  render() {
    const { classes, productName } = this.props;
    const {
      email, firstName, lastName, phone
    } = this.state.user;

    return (
      <Grid item xs={12} style={{ paddingBottom: '16px' }}>
        <Grid container>
          <Grid item xs={12} style={{ paddingBottom: '0' }}>
            <Typography
              type="subheading"
            >To complete your <strong>{productName}</strong> purchase, please enter your name, email, phone number and billing postal code below.
            </Typography>
            <Typography
              style={{ padding: '1.0em 0 0.5em 0' }}
              type="subheading"
            ><strong>Your Billing Information</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              InputProps={{ className: classes.Input }}
              inputProps={{ className: classes.input, id: 'firstName' }}
              name="firstName"
              placeholder="First Name"
              required
              value={firstName}
              onChange={this.handleChange('firstName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              InputProps={{ className: classes.Input }}
              inputProps={{ className: classes.input, id: 'lastName' }}
              name="lastName"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={this.handleChange('lastName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              InputProps={{ className: classes.Input }}
              inputProps={{ className: classes.input, id: 'email' }}
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={this.handleChange('email')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              InputProps={{ className: classes.Input }}
              inputProps={{ className: classes.input, id: 'phone' }}
              name="phone"
              placeholder="Billing Phone Number"
              value={phone}
              onChange={this.handleChange('phone')}
            />
          </Grid>
          <NewBillingZipForm />
        </Grid>
      </Grid>
    );
  }
}

NewUserForm.propTypes = {
  classes: PropTypes.shape({
    textField: PropTypes.string.isRequired
  }).isRequired,
  newUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    emailIsValid: PropTypes.bool
  }).isRequired,
  productName: PropTypes.string,
  setNewUser: PropTypes.func.isRequired,
  updateStepValidity: PropTypes.func.isRequired
};

NewUserForm.defaultProps = {
  productName: ''
};

const mapStateToProps = state => ({
  newUser: state.checkout.newUser,
  productName: state.checkout.Product.name
});

const mapDispatchToProps = dispatch => ({
  updateStepValidity: () => {
    dispatch(actions.updateStepValidity('A'));
  },
  login: () => {
    dispatch(modalActions.openModal('login'));
  },
  setNewUser: (user) => {
    dispatch(actions.setNewUser(user));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(muiThemeStyles)(NewUserForm));
