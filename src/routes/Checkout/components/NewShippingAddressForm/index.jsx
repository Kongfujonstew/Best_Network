/* eslint-disable react/jsx-no-duplicate-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { actions } from 'modules/checkout';
import countries from './countries';

const {
  updateStepValidity, setNewAddress, setSelectedShippingAddress, loadTotals
} = actions;

const muiThemeStyles = theme => ({
  textField: theme.textField,
  Input: theme.Input,
  input: theme.input
});

export class NewShippingAddressForm extends React.Component {
  constructor(props) {
    super(props);

    const address = this.props.newShippingAddress;
    this.state = {
      address: {
        name: address.name || '',
        address1: address.address1 || '',
        address2: address.address2 || '',
        city: address.city || '',
        state: address.state || '',
        postalCode: address.postalCode || '',
        country: address.country || 'USA'
      }
    };
  }

  componentWillMount() {
    this.props.updateStepValidity();
  }

  componentWillReceiveProps(nextProps) {
    const { newShippingAddress } = nextProps;
    this.setState({ address: newShippingAddress });
  }

  handleChange = name => (event) => {
    const { address } = this.state;
    address[name] = event.target.value;
    const newShippingAddress = { ...address };
    this.props.setNewAddress(newShippingAddress);
    if (this.props.selectedShippingAddress !== '0') {
      this.props.setSelectedShippingAddress('0');
    }
    this.props.updateStepValidity();
  }

  render() {
    const { classes } = this.props;
    const {
      name, address1, address2, city, state, postalCode, country
    } = this.state.address;

    const countryValue = country || 'USA';

    return (
      <Grid item xs={12} style={{ marginBottom: '24px', paddingLeft: '12px' }}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              InputProps={{ className: classes.Input }}
              required
              name="name"
              placeholder="Name"
              value={name}
              style={{ width: '100%' }}
              inputProps={{ id: 'name', className: classes.input }}
              onChange={this.handleChange('name')}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              InputProps={{ className: classes.Input }}
              required
              name="address1"
              placeholder="Address"
              value={address1}
              style={{ width: '100%' }}
              inputProps={{ id: 'address1', className: classes.input }}
              onChange={this.handleChange('address1')}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              InputProps={{ className: classes.Input }}
              required
              name="address2"
              placeholder="Address2"
              value={address2}
              style={{ width: '100%' }}
              inputProps={{ id: 'address2', className: classes.input }}
              onChange={this.handleChange('address2')}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <TextField
              className={classes.textField}
              InputProps={{ className: classes.Input }}
              required
              placeholder="City"
              value={city}
              inputProps={{ id: 'city', className: classes.input }}
              onChange={this.handleChange('city')}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={classes.textField}
              InputProps={{ className: classes.Input }}
              required
              name="state"
              placeholder="State"
              value={state}
              inputProps={{ id: 'state', className: classes.input }}
              onChange={this.handleChange('state')}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={classes.textField}
              InputProps={{ className: classes.Input }}
              required
              name="postalCode"
              placeholder="ZIP"
              value={postalCode}
              inputProps={{ id: 'postalCode', className: classes.input }}
              onChange={this.handleChange('postalCode')}
              onBlur={this.props.loadTotals}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <Select
              className={classes.textField}
              MenuProps={{ className: classes.Input }}
              inputProps={{ id: 'country', className: classes.input }}
              required
              name="country"
              placeholder="USA"
              value={countryValue}
              style={{ fontSize: '1.2rem', width: '100%' }}
              onChange={this.handleChange('country')}
              onBlur={this.props.loadTotals}
            >
              { countries.map((countryObj) => {
                const country = countryObj.name;
                const alpha3 = countryObj.alpha3;
                return (
                  <MenuItem style={{ fontSize: '1.2rem' }} value={alpha3}>{ country }</MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

NewShippingAddressForm.propTypes = {
  classes: PropTypes.shape({
    textField: PropTypes.string
  }).isRequired,
  newShippingAddress: PropTypes.shape({}),
  updateStepValidity: PropTypes.func.isRequired,
  loadTotals: PropTypes.func.isRequired,
  selectedShippingAddress: PropTypes.string,
  setNewAddress: PropTypes.func.isRequired,
  setSelectedShippingAddress: PropTypes.func.isRequired
};

NewShippingAddressForm.defaultProps = {
  newShippingAddress: {
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
    empty: true
  },
  selectedShippingAddress: null
};

const mapStateToProps = state => ({
  addresses: state.user.addresses,
  selectedShippingAddress: state.checkout.selectedShippingAddressId,
  newShippingAddress: state.checkout.newShippingAddress
});

const mapDispatchToProps = dispatch => ({
  updateStepValidity: () => {
    dispatch(updateStepValidity('C'));
  },
  setNewAddress: (address, addressType = 'newShippingAddress') => {
    dispatch(setNewAddress(address, addressType));
  },
  setSelectedShippingAddress: (id) => {
    dispatch(setSelectedShippingAddress(id));
  },
  loadTotals: () => {
    dispatch(loadTotals());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(muiThemeStyles)(NewShippingAddressForm));