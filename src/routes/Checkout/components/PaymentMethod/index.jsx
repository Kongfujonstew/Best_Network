import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Amex from 'images/SVG/Amex';
import Discover from 'images/SVG/Discover';
import MasterCard from 'images/SVG/MasterCard';
import Visa from 'images/SVG/Visa';
import PayPal from 'images/SVG/PayPal';
import { connect } from 'react-redux';
import { actions } from 'modules/checkout';

const { setSelectedUserPaymentId, setPaymentMethod } = actions;

class PaymentMethods extends React.Component {
  handleClick(method) {
    this.props.setPaymentMethod(method);
    this.props.setSelectedUserPaymentId('0');
  }

  render() {
    const { paymentMethod } = this.props;

    const paymentMethods = [
      { name: 'Credit Card', value: 'braintree', logos: (<div><Visa /> <MasterCard /> <Amex /> <Discover /></div>) },
      { name: 'PayPal', value: 'paypal', logos: (<PayPal />) }
    ];

    return (
      <Grid item xs={12} style={{ marginTop: '12px' }}>
        <Grid container style={{ margin: '8px 0px' }}>
          {paymentMethod !== 'existing' ?
            paymentMethods.map(option => (
              <Grid item xs={12} key={option.value}>
                <Button
                  variant="raised"
                  color={paymentMethod === option.value ? 'primary' : 'default'}
                  onClick={() => this.handleClick(option.value)}
                  style={{ width: '100%' }}
                >
                  {option.logos}
                </Button>
              </Grid>
            )) : null
          }
        </Grid>
      </Grid>
    );
  }
}

PaymentMethods.propTypes = {
  paymentMethod: PropTypes.string.isRequired,
  setSelectedUserPaymentId: PropTypes.func.isRequired,
  setPaymentMethod: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  method: state.checkout.paymentMethod,
  paymentMethod: state.checkout.paymentMethod,
  selectedUserPaymentMethodId: state.checkout.selectedUserPaymentMethodId
});

const mapDispatchToProps = dispatch => ({
  setSelectedUserPaymentId: (id) => {
    dispatch(setSelectedUserPaymentId(id));
  },
  setPaymentMethod: (method) => {
    dispatch(setPaymentMethod(method));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethods);
