import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import CheckCircleShadow from 'images/SVG/CheckCircleShadow';
import Amex from 'images/SVG/Amex';
import Discover from 'images/SVG/Discover';
import MasterCard from 'images/SVG/MasterCard';
import Visa from 'images/SVG/Visa';
import PayPal from 'images/SVG/PayPal';
import RadioButtonUnchecked from 'material-ui-icons/RadioButtonUnchecked';
import ZeroOrder from './components/ZeroOrder';
import BraintreeForm from 'routes/Checkout/components/BraintreeForm';
import { actions } from 'modules/checkout';
import styles from './styles.scss';

const { setPaymentMethod, setSelectedUserPaymentId } = actions;

const muiThemeStyles = theme => ({
  button: theme.button
});

class Order extends React.Component {
  constructor() {
    super();

    let CollapseProps = {};

    const iOSversion = () => {
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // supports iOS 2.0 and later
        const v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
      }
      return null;
    };

    const ver = iOSversion();

    if (ver && ver[0] && ver[0] <= 9) {
      CollapseProps = { style: { transition: 'none', transitionDuration: '0ms' } };
    }

    this.CollapseProps = CollapseProps;
  }

  componentDidMount() {
    this.props.startBraintree();
  }

  handleClick = method => () => {
    this.props.setMethod(method);
    this.props.setSelectedUserPaymentId('0');
  }

  numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  render() {
    const {
      selectedPaymentOption,
      totals,
      classes,
      paymentMethod,
      processOrder,
      setMethod,
      totalIsZero
    } = this.props;

    const greyStyle = 'linear-gradient(0deg, #FFFFFF 0%, #E4E4E4 100%)';
    const gradientStyle = 'linear-gradient(-180deg, #EEEEEE 0%, #D8D8D8 100%)';
    const { cvvValid, numberValid, expirationDateValid } = this.props.braintreeValidity;
    const disabled = !cvvValid || !numberValid || !expirationDateValid;

    const TOTAL = totals.default || !totals[selectedPaymentOption] ?
      '0.00' :
      totals[selectedPaymentOption].transaction.total;
    const TAX = totals.default || !totals[selectedPaymentOption] ?
      '0.00' :
      totals[selectedPaymentOption].transaction.tax;

    const taxMessage = TAX === '' || TAX === '0.00' ? '' : `$${TAX} CA sales tax`;
    const SHIPPING = totals.default || !totals[selectedPaymentOption] ?
      '0.00' :
      totals[selectedPaymentOption].transaction.shipping;
    const shippingMessage = SHIPPING === '' || SHIPPING === '0.00' ? '' : `$${SHIPPING} S&H`;

    let shippingTaxMessage = `${taxMessage}${shippingMessage && taxMessage ? ' and ' : ''}${shippingMessage}`;
    shippingTaxMessage = shippingTaxMessage ? ` (incl. ${shippingTaxMessage})` : '';

    const total = () => (
      <Typography
        type="body2"
        style={{ fontWeight: 400 }}
      >{`Your total for today is: $${this.numberWithCommas(TOTAL)}${shippingTaxMessage}`}
      </Typography>
    );

    return (
      <Grid
        item
        xs={12}
        className={styles.gridItem}
      >
        <div style={{ display: totalIsZero ? 'none' : null }}>
          <ExpansionPanel
            style={{ marginBottom: '0px' }}
            elevation={0}
            expanded={paymentMethod === 'braintree'}
            onClick={this.handleClick('braintree')}
            CollapseProps={this.CollapseProps}
          >
            <ExpansionPanelSummary
              className={styles.expansionPanelSummary}
              style={{
                backgroundImage: paymentMethod !== 'braintree' ? gradientStyle : greyStyle,
                borderTop: '1px solid grey',
                borderLeft: '1px solid grey',
                borderRight: '1px solid grey',
                borderBottom: paymentMethod === 'braintree' ? 'none' : '1px solid grey',
                borderRadius: '8px 8px 0 0'
              }}
            >
              <Grid item xs={12} style={{ textAlign: 'center' }} className={`${paymentMethod === 'braintree' ? styles.paymentMethodActive : styles.paymentMethodInactive} ${styles.paymentMethod}`}>
                <div style={{
 position: 'absolute', left: '20px', top: '50%', marginTop: '-14px'
}}
                >{paymentMethod === 'braintree' ? <CheckCircleShadow color="primary" /> : <RadioButtonUnchecked />}
                </div>
                <Visa style={{ paddingRight: '5px' }} /><MasterCard style={{ paddingRight: '5px' }} /><Amex style={{ paddingRight: '5px' }} /><Discover />
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              className={styles.expansionPanelDetails}
            >
              <Grid container>
                <Grid item xs={12}>
                  <BraintreeForm />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className={`${classes.button} ${styles.button}`}
                    style={{ width: '100%', height: '65px', fontSize: '24px' }}
                    id="submitCreditCardOrder"
                    variant="raised"
                    color="primary"
                    disabled={disabled}
                  >{disabled ? 'Enter Credit Card Details' : 'Order Now'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  { total() }
                </Grid>
              </Grid>

            </ExpansionPanelDetails>

          </ExpansionPanel>
          <ExpansionPanel
            style={{ marginTop: '0px', marginBottom: '0px' }}
            elevation={0}
            expanded={paymentMethod === 'paypal'}
            onClick={() => setMethod('paypal')}
            CollapseProps={{ style: { transition: 'none', transitionDuration: '0ms' } }}
          >
            <ExpansionPanelSummary
              style={{
                backgroundImage: paymentMethod !== 'paypal' ? gradientStyle : greyStyle,
                border: '1px solid grey',
                borderRadius: paymentMethod !== 'paypal' ? '0 0 8px 8px' : '0 0 0 0',
                height: '75px',
                borderTop: paymentMethod === 'paypal' ? '0' : '1px solid grey',
              }}
            >
              <Grid item xs={12} style={{ textAlign: 'center' }} className={`${paymentMethod === 'paypal' ? styles.paymentMethodActive : styles.paymentMethodInactive} ${styles.paymentMethod}`}>
                <div style={{
 position: 'absolute', left: '20px', top: '50%', marginTop: '-14px'
}}
                >{paymentMethod === 'paypal' ? <CheckCircleShadow color="primary" /> : <RadioButtonUnchecked />}
                </div>
                <PayPal height="28px" />
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              className={styles.expansionPanelDetails}
              style={{
                borderBottom: '1px solid grey',
                borderRadius: '0 0 8px 8px'
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <div
                    id="#paypal-button"
                    style={{ marginBottom: '16px', marginTop: '16px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  { total() }
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        { totalIsZero ? <ZeroOrder processOrder={processOrder} styles={styles} /> : null }
      </Grid>
    );
  }
}

Order.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  braintreeValidity: PropTypes.shape({
    cvvValid: PropTypes.bool.isRequired,
    numberValid: PropTypes.bool.isRequired,
    expirationDateValid: PropTypes.bool.isRequired
  }).isRequired,
  paymentMethod: PropTypes.string.isRequired,
  selectedPaymentOption: PropTypes.number,
  setMethod: PropTypes.func.isRequired,
  setSelectedUserPaymentId: PropTypes.func.isRequired,
  startBraintree: PropTypes.func.isRequired,
  stepValidity: PropTypes.bool.isRequired,
  totalIsZero: PropTypes.bool.isRequired,
  totals: PropTypes.shape({}).isRequired
};

Order.defaultProps = {
  selectedPaymentOption: 0
};

const mapStateToProps = state => ({
  method: state.checkout.paymentMethod,
  stepValidity: state.checkout.stepValidity.D,
  braintreeValidity: state.checkout.braintreeValidity,
  paymentMethod: state.checkout.paymentMethod,
  selectedUserPaymentMethodId: state.checkout.selectedUserPaymentMethodId,
  selectedPaymentOption: state.checkout.selectedPaymentOption,
  totals: state.checkout.totals
});

const mapDispatchToProps = dispatch => ({
  setMethod: (method) => {
    dispatch(setPaymentMethod(method));
  },
  setSelectedUserPaymentId: (id) => {
    dispatch(setSelectedUserPaymentId(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(muiThemeStyles)(Order));
