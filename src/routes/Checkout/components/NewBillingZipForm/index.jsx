/* eslint-disable react/jsx-no-duplicate-props */

import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { actions } from 'modules/checkout';

const {
  updateStepValidity,
  setNewAddress,
  setSelectedBillingAddress,
  loadTotals
} = actions;

const muiThemeStyles = theme => ({
  textField: theme.textField,
  Input: theme.Input,
  input: theme.input
});

export class NewBillingZip extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    const { newBillingAddress } = props;
    if (newBillingAddress && newBillingAddress.postalCode) {
      this.state = { postalCode: newBillingAddress.postalCode };
    } else {
      this.state = { postalCode: '' };
    }
  }

  componentWillMount() {
    // this.props.updateStepValidity();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.newBillingAddress.postalCode !== this.state.postalCode) {
      this.setState({ postalCode: newProps.newBillingAddress.postalCode });
    }
  }

  handleChange(event) {
    this.props.setNewAddress({ postalCode: event.target.value });
    if (this.props.selectedBillingAddressId !== '0') {
      this.props.setSelectedBillingAddress('0');
    }
    this.props.updateStepValidity();
  }

  handleBlur() {
    this.props.loadTotals();
  }

  render() {
    const { postalCode } = this.state;
    const { classes } = this.props;

    return (
      <Grid item xs={12}>
        <TextField
          className={classes.textField}
          InputProps={{ className: classes.Input }}
          inputProps={{ className: classes.input, id: 'postalCode' }}
          name="postalCode"
          placeholder="ZIP / Postal code"
          value={postalCode}
          required
          onChange={this.handleChange}
          onFocus={this.handleChange}
          onBlur={this.handleBlur}
        />
      </Grid>
    );
  }
}

NewBillingZip.propTypes = {
  newBillingAddress: PropTypes.shape({ postalCode: PropTypes.string }).isRequired,
  updateStepValidity: PropTypes.func.isRequired,
  selectedBillingAddressId: PropTypes.string.isRequired,
  loadTotals: PropTypes.func.isRequired,
  setNewAddress: PropTypes.func.isRequired,
  setSelectedBillingAddress: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  newBillingAddress: state.checkout.newBillingAddress,
  newShippingAddress: state.checkout.newShippingAddress,
  selectedBillingAddressId: state.checkout.selectedBillingAddressId,
});

const mapDispatchToProps = dispatch => ({
  updateStepValidity: () => {
    dispatch(updateStepValidity('A'));
  },
  setNewAddress: (address, addressType = 'newBillingAddress') => {
    dispatch(setNewAddress(address, addressType));
  },
  setSelectedBillingAddress: (id) => {
    dispatch(setSelectedBillingAddress(id));
  },
  loadTotals: () => {
    dispatch(loadTotals());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(muiThemeStyles)(NewBillingZip));