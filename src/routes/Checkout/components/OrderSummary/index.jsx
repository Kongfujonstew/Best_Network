import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { actions } from 'modules/checkout';

const { processOrder } = actions;

const OrderSummary = (props) => {
  const {
    product,
    paymentMethod,
    subTotal,
    totals
  } = props;

  const paypalButtenHidden = paymentMethod === 'paypal' ? 'visible' : 'hidden';
  const paypalButtonStyle = { visibility: paypalButtenHidden };

  return (
    <Grid item xs={12} style={{ marginTop: '12px' }}>
      <Typography type="title">Order Summary</Typography>
      <Grid container>
        <Grid item xs={6}>
          <Typography type="body2">{product.name}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8}>
          <Typography type="body2">Subtotal</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography type="body1">${totals.subtotal || subTotal}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8}>
          <Typography type="body2">Tax</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography type="body1">${totals.tax || 0}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8}>
          <Typography type="body2">Shipping</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography type="body1">${totals.shipping || 0}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8}>
          <Typography type="body2">Total</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography type="body1">${totals.total || subTotal}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          id="submitCreditCardOrder"
          variant="raised"
          color="primary"
          style={{ width: '100%', display: paymentMethod === 'braintree' ? 'inline' : 'none' }}
          disabled={false /*! formComplete */}
        >Order Now
        </Button>
        <Button
          variant="raised"
          color="primary"
          style={{ width: '100%', display: paymentMethod === 'existing' ? 'inline' : 'none' }}
          onClick={props.processOrder}
          disabled={false /*! formComplete */}
        >Order Now
        </Button>
        <div id="#paypal-button" style={paypalButtonStyle} />
      </Grid>
    </Grid>
  );
};

OrderSummary.propTypes = {
  paymentMethod: PropTypes.string.isRequired,
  processOrder: PropTypes.func.isRequired,
  product: PropTypes.shape({}).isRequired,
  subTotal: PropTypes.number.isRequired,
  totals: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  paymentMethod: state.checkout.paymentMethod,
  product: state.checkout.Product,
  subTotal: state.checkout.subTotal,
  totals: state.checkout.totals
});

const mapDispatchToProps = dispatch => ({
  processOrder: () => {
    dispatch(processOrder());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderSummary);