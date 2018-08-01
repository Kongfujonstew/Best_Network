/* eslint-disable class-methods-use-this */
/* eslint-disable no-new-func */
/* eslint-disable  no-cond-assign */

import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from 'modules/checkout';
import { actions as modalActions } from 'modules/modal';
import { actions as productActions } from 'modules/product';
import UpSellComponents from './components';

const contentUrl = process.env.USER_CONTENT_URL;

const muiThemeStyles = theme => ({
  button: theme.button
});

class Upsell extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClickUpsell = this.handleClickUpsell.bind(this);
    this.handleDeclineUpsell = this.handleDeclineUpsell.bind(this);
    const { OfferPaymentOptions, selectedPaymentOption } = props.offer;
    let Option;
    let paymentDescription;
    let UpSell;


    OfferPaymentOptions && OfferPaymentOptions.map((option) => {
      if (option.id === selectedPaymentOption) {
        Option = option;
      }
    });

    if (Option && Option.UpSells.length) {
      [UpSell] = Option.UpSells;
    }

    if (!(UpSell && UpSell.componentName && UpSellComponents[UpSell.componentName])) {
      this.props.history.push(`/checkout/${this.props.offer.slug}/#/receipt`);
    }


    const { numInstallments, interval } = Option;
    const { amount } = UpSell.OfferPaymentOptionUpSell;

    if (Option.numInstallments > 1) {
      paymentDescription = `Add this to your order for only ${numInstallments} ${interval}ly payments of only $ ${amount}.`;
    } else {
      paymentDescription = `Add this to your order for only $${amount}.`;
    }

    this.state = {
      amount,
      paymentDescription,
      numInstallments,
      interval,
      UpSell
    };
  }

  componentDidMount() {
    if (this.state.UpSell.id === 'empty') {
      this.props.history.push(`/checkout/${this.props.offer.slug}/#/receipt`);
    }
  }

  handleClickUpsell = (id) => {
    this.props.processUpSell(id)
      .then((resp) => {
        if (resp) {
          this.props.addProducts([resp]);
          this.props.disableUpsell();
          this.props.hideModal();
          this.props.history.push(`/checkout/${this.props.offer.slug}/#/receipt`);
        } else {
          this.props.disableUpsell();
          this.props.hideModal();
          this.props.setReceiptMessage(100);
          this.props.history.push(`/checkout/${this.props.offer.slug}/#/receipt`);
        }
      })
      .catch(() => {
        this.props.disableUpsell();
        this.props.setReceiptMessage(100);
        this.props.history.push(`/checkout/${this.props.offer.slug}/#/receipt`);
        this.props.hideModal();
      });
  }

  handleDeclineUpsell = () => {
    this.props.history.push(`/checkout/${this.props.offer.slug}/#/receipt`);
  }

  render() {
    const {
      UpSell, amount, interval, paymentDescription, numInstallments
    } = this.state;

    // const Component = UpSellComponents[UpSell.componentName];
    const Component = UpSellComponents.MV18;

    return (
      <Component
        handleClickUpsell={() => this.handleClickUpsell(UpSell.id)}
        handleDeclineUpsell={() => this.handleDeclineUpsell(UpSell.id)}
        classes={this.props.classes}
        paymentDescription={paymentDescription}
        amount={amount}
        numInstallments={numInstallments}
        interval={interval}
        contentUrl={contentUrl}
      />
    );
  }
}

Upsell.propTypes = {
  addProducts: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  disableUpsell: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  offer: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    UpSells: PropTypes.array.isRequired,
    upsellExpired: PropTypes.bool.isRequired,
    upsellPageMessage: PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string
    })
  }).isRequired,
  processUpSell: PropTypes.func.isRequired,
  setReceiptMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ offer: state.checkout });

const mapDispatchToProps = dispatch => ({
  disableUpsell: () => dispatch(actions.disableUpsell()),
  setReceiptMessage: gatewayCode => dispatch(actions.setReceiptMessage(gatewayCode)),
  processUpSell: id => dispatch(actions.processUpSell(id)),
  openModal: modalType => dispatch(modalActions.openModal(modalType)),
  hideModal: () => dispatch(modalActions.hideModal()),
  addProducts: products => dispatch(productActions.addProductsToAll(products))
});

export default compose(
  withStyles(muiThemeStyles),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Upsell);
