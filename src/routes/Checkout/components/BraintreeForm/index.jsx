import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import styles from './styles.scss';

const {
  form,
  warning
} = styles;

const BraintreeForm = (props) => {
  const {
    numberBlurred,
    numberValid,
    cvvBlurred,
    cvvValid,
    expirationDateBlurred,
    expirationDateValid
  } = props.braintreeValidity;

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12} style={{ marginTop: '24px' }}>
          <div
            id="card-number"
            className={form}
          />
          { numberBlurred && !numberValid ?
            <Typography
              type="body"
              className={warning}
            >{'Invalid Credit Card Number'}
            </Typography> : null }
        </Grid>

        <Grid item xs={6}>
          <div
            id="expiration-date"
            className={form}
          />
          { expirationDateBlurred && !expirationDateValid ?
            <Typography
              type="body"
              className={warning}
            >{'Invalid Exp. Date'}
            </Typography> : null }
        </Grid>

        <Grid item xs={6} style={{ paddingBottom: '8px' }}>
          <div
            id="cvv"
            className={form}
          />
          { cvvBlurred && !cvvValid ?
            <Typography
              type="body"
              className={warning}
            >{'Invalid Security Code'}
            </Typography> : null }
        </Grid>
      </Grid>
    </Grid>
  );
};

BraintreeForm.propTypes = {
  braintreeValidity: PropTypes.shape({
    numberBlurred: PropTypes.bool.isRequired,
    cvvBlurred: PropTypes.bool.isRequired,
    expirationDateBlurred: PropTypes.bool.isRequired,
    numberValid: PropTypes.bool.isRequired,
    cvvValid: PropTypes.bool.isRequired,
    expirationDateValid: PropTypes.bool.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  braintreeValidity: state.checkout.braintreeValidity,
});

export default connect(mapStateToProps)(BraintreeForm);
