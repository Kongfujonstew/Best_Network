import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { actions } from 'modules/checkout';

const {
  updateStepValidity, setNewAddress, setSelectedBillingAddress, loadTotals
} = actions;

export class NewBillingAddressForm extends Component {
  constructor(props) {
    super(props);
    this.needShippingAddress = !!this.props.physicalProducts.length;
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    const { /* DefaultBillingAddress, */newBillingAddress } = this.props;
    // const useDefault = (DefaultBillingAddress && !DefaultBillingAddress.empty && !newBillingAddress.empty);
    // const postalCode = useDefault ?
    //   DefaultBillingAddress.postalCode :
    //   newBillingAddress.postalCode;
    this.state = { postalCode: newBillingAddress.postalCode };
  }

  handleChange(event) {
    this.setState({ postalCode: event.target.value });
    if (this.props.selectedBillingAddressId !== '0') {
      this.props.setSelectedBillingAddress('0');
    }
  }

  handleBlur() {
    this.props.setNewAddress({
      postalCode: this.state.postalCode,
      empty: false
    }, 'newBillingAddress');
    this.props.loadTotals();
    this.props.updateStepValidity();
  }

  render() {
    const { postalCode } = this.state;

    if (this.props.selectedBillingAddressId.toString() !== '0') {
      return null;
    }

    return (
      <Grid item>
        <form noValidate autoComplete="off">
          <TextField
            margin="normal"
            value={postalCode.length ? postalCode : 'Billing ZIP'}
            required={this.needShippingAddress}
            onChange={this.handleChange}
            onFocus={this.handleChange}
            onBlur={this.handleBlur}
          />
        </form>
      </Grid>
    );
  }
}

NewBillingAddressForm.propTypes = {
  // DefaultBillingAddress: PropTypes.shape({}),
  newBillingAddress: PropTypes.shape({ postalCode: PropTypes.string }),
  // newShippingAddress: PropTypes.shape({
  //   postalCode: PropTypes.string
  // }),
  updateStepValidity: PropTypes.func.isRequired,
  physicalProducts: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedBillingAddressId: PropTypes.string.isRequired,
  loadTotals: PropTypes.func.isRequired,
  setNewAddress: PropTypes.func.isRequired,
  setSelectedBillingAddress: PropTypes.func.isRequired
};

NewBillingAddressForm.defaultProps = {
  // DefaultBillingAddress: { empty: true, postalCode: '' },
  newBillingAddress: { postalCode: '' }
  // newShippingAddress: { empty: true, postalCode: '' }
};

const mapStateToProps = state => ({
  // DefaultBillingAddress: state.user.DefaultBillingAddress,
  newBillingAddress: state.checkout.newBillingAddress,
  physicalProducts: state.checkout.physicalProducts,
  newShippingAddress: state.checkout.newShippingAddress,
  selectedBillingAddressId: state.checkout.selectedBillingAddressId,
});

const mapDispatchToProps = dispatch => ({
  updateStepValidity: () => {
    dispatch(updateStepValidity('D'));
  },
  setNewAddress: (address, addressType) => {
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
)(NewBillingAddressForm);