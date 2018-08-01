/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import checkoutReducer, { actions } from 'modules/checkout';
import productReducer, { actions as productActions } from 'modules/product';
import { actions as userActions } from 'modules/user';
import { actions as modalActions } from 'modules/modal';
import { injectAsyncReducers } from 'store';
import OrderForm from './OrderForm';
import Receipt from './Receipt';


//Phase me out!
import { MuiThemeProvider } from 'material-ui/styles';
import theme from 'theme';

// inject reducers that might not have been originally there
injectAsyncReducers({
  checkout: checkoutReducer,
  products: productReducer
});

@connect(
  state => ({
    modalOpen: state.modal.showModal,
    offer: state.checkout,
    location: state.router.location,
    isAuthenticated: state.user.isAuthenticated,
    user: state.user
    // DefaultBillingAddress: state.user.DefaultBillingAddress,
    // DefaultShippingAddress: state.user.DefaultShippingAddress,
  }),
  {
    createUser: userActions.createUser,
    loadOffer: actions.loadOffer,
    loadTotals: actions.loadTotals,
    disableUpsell: actions.disableUpsell,
    updateProductAmount: actions.updateProductAmount,
    setPaymentMethod: actions.setPaymentMethod,
    setNewAddress: actions.setNewAddress,
    setOrderFormMessage: actions.setOrderFormMessage,
    setCurrentStep: actions.setCurrentStep,
    setUpsellPageMessage: actions.setUpsellPageMessage,
    addPhysicalProduct: actions.addPhysicalProduct,
    clickBumpOffer: actions.clickBumpOffer,
    processOrder: actions.processOrder,
    processUpSell: actions.processUpSell,
    receiveOffer: actions.receiveOffer,
    resetOnLeavePage: actions.resetOnLeavePage,
    checkFormValidity: actions.checkFormValidity,
    saveNewUserInfo: userActions.receiveUpdateProfile,
    setSelectedBillingAddress: actions.setSelectedBillingAddress,
    setSelectedShippingAddress: actions.setSelectedShippingAddress,
    setSelectedUserPaymentId: actions.setSelectedUserPaymentId,
    setSelectedPaymentOption: actions.setSelectedPaymentOption,
    setSteps: actions.setSteps,
    splitTestOptionsFirst: actions.splitTestOptionsFirst,
    openModal: modalActions.openModal,
    hideModal: modalActions.hideModal,
    addProducts: productActions.addProductsToAll,
    setBraintreeValidity: actions.setBraintreeValidity,
    blurBraintreeField: actions.blurBraintreeField
  }
)
class Checkout extends Component {
  componentWillMount() {
    const {
      location,
      offer,
      loadOffer,
      user,
      isAuthenticated,
      setSelectedBillingAddress,
      setSelectedShippingAddress,
      splitTestOptionsFirst
    } = this.props;

    window.SPLIT_TEST_OPTIONS_FIRST = splitTestOptionsFirst;

    // parse pathname for offer slug
    const slug = location.pathname.split('/')[2];

    // Only load the slug if undefined or different than before
    if (slug !== offer.slug) loadOffer(slug);

    if (!offer.submitted) {
      // Load default addresses from user profile if logged in and form name is blank
      if (offer.newBillingAddress.name === '' && user.isAuthenticated && user.DefaultBillingAddress) {
        setSelectedBillingAddress(user.DefaultBillingAddress.id.toString());
      }

      if (offer.newShippingAddress.name === '' && user.isAuthenticated && user.DefaultShippingAddress) {
        setSelectedShippingAddress(user.DefaultShippingAddress.id.toString());
      }

      // If the user logs out on the page then reset to default address ids
      if (!isAuthenticated && offer.selectedBillingAddressId !== '0') setSelectedBillingAddress('0');
      if (!isAuthenticated && offer.selectedShippingAddressId !== '0') setSelectedShippingAddress('0');
    }
  }

  componentWillUnmount() {
    this.props.hideModal();
  }

  render() {
    const { optionsFirst, submitted } = this.props.offer;
    // changing the key will cause OrderForm to remount, and reset steps
    const key = optionsFirst ? 1 : 2;
    return !submitted ?
      <MuiThemeProvider theme={theme}><OrderForm key={key} {...this.props} /></MuiThemeProvider> :
      <MuiThemeProvider theme={theme}><Receipt {...this.props} /></MuiThemeProvider>;
    // return <Receipt {...this.props} />;
  }
}

export default Checkout;