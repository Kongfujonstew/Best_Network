import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import OrderConfirmation from 'routes/Checkout/components/OrderConfirmation';
import Upsell from 'routes/Checkout/components/Upsell';

class Receipt extends Component {
  constructor(props) {
    super(props);
    const { OfferPaymentOptions, selectedPaymentOption } = props.offer;
    OfferPaymentOptions && OfferPaymentOptions.map((option) => {
      if (option.id == selectedPaymentOption) {
        if (option.UpSells && option.UpSells.length) {
          this.UpSells = true;
        }
      }
    });
  }

  componentDidMount() {
    this.props.history.replace(`/checkout/${this.props.offer.slug}/#/thankyou`);
    this.props.hideModal();
    // if (window.modalReceipt === true && !this.props.offer.upsellExpired) {
    //   this.props.openModal('upsell');
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.history.location.hash.substring(2) !== 'receipt' && nextProps.offer.upsellExpired) {
      this.props.history.push(`/checkout/${this.props.offer.slug}/#/receipt`);
    }
  }

  render() {
    const hash = this.props.history.location.hash.substring(2);
    const { receiptMessage } = this.props.offer;
    if (this.UpSells && !this.props.offer.upsellExpired && hash === 'thankyou') {
      return (<Grid container><Upsell /></Grid>);
    }
    return (
      <Grid container>
        <Typography
          style={{ color: 'red' }}
          variant="subheading"
        >{!!receiptMessage && receiptMessage.text ? receiptMessage.text : ' '}
        </Typography>
        <OrderConfirmation />
      </Grid>
    );
  }
}

Receipt.propTypes = {
  offer: PropTypes.shape({
    receiptMessage: PropTypes.shape({}).isRequired,
    slug: PropTypes.string.isRequired,
    upsellExpired: PropTypes.bool.isRequired
  }).isRequired,
  hideModal: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      hash: PropTypes.string.isRequired
    }),
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  openModal: PropTypes.func.isRequired
};

export default withRouter(Receipt);
