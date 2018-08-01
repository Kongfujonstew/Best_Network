import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import AddressList from 'routes/Checkout/components/AddressList';
import { actions } from 'modules/checkout';

const { setSelectedShippingAddress } = actions;

const AddressOptions = props => (
  <Grid container>
    <Grid item xs={12}>
      <AddressList
        addresses={props.isAuthenticated ? props.addresses : []}
        onToggle={id => props.onToggle(id)}
        selectedId={props.selectedAddressId}
        addressType={props.addressType}
      />
    </Grid>
  </Grid>
);

AddressOptions.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  addresses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onToggle: PropTypes.func.isRequired,
  selectedAddressId: PropTypes.string,
  addressType: PropTypes.string.isRequired
};

AddressOptions.defaultProps = {
  selectedAddressId: '0'
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  addresses: state.user.addresses,
  selectedAddressId: state.checkout.selectedShippingAddressId,
  addressType: 'shipping'
});

const mapDispatchToProps = dispatch => ({
  onToggle: (id) => {
    dispatch(setSelectedShippingAddress(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressOptions);