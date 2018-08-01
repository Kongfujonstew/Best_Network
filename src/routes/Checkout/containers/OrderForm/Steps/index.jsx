/* eslint-disable react/prop-types */

import React from 'react';
import NewUserForm from 'routes/Checkout/components/NewUserForm';
import GiftRecipient from 'routes/Checkout/components/GiftRecipient';
import BonusOffers from 'routes/Checkout/components/BonusOffers';
import PaymentOptions from 'routes/Checkout/components/PaymentOptions';
import Order from 'routes/Checkout/components/Order';
import AddressOptions from 'routes/Checkout/components/AddressOptions';
import NewShippingAddressForm from 'routes/Checkout/components/NewShippingAddressForm';
import OrderSummary from 'routes/Checkout/components/OrderSummary';
import Step from 'routes/Checkout/containers/OrderForm/Step';

export const A = {
  id: 'A',
  path: 'user',
  children: props => (
    <Step {...props}>
      <NewUserForm />
      <GiftRecipient />
    </Step>
  ),
  // subheading: 'Have an account? Log in for faster checkout',
  subheading: ' ',
  buttonText: 'Review order >',
  buttonTextInvalid: 'Enter Your Info to Continue'
};

export const B = {
  id: 'B',
  path: 'options',
  children: props => (
    <Step {...props}>
      <BonusOffers />
      <PaymentOptions totalIsZero={props.totalIsZero} />
    </Step>
  ),
  subheading: 'Your purchase',
  subheadingIsZero: 'Your order',
  buttonText: 'Select payment method >',
  buttonTextInvalid: 'Select an Option',
  buttonTextIsZero: 'Continue'
};

export const C = {
  id: 'C',
  path: 'address',
  children: props => (
    <Step {...props}>
      <AddressOptions />
      <NewShippingAddressForm />
    </Step>
  ),
  subheading: 'Your shipping info',
  buttonText: 'Review order >',
  buttonTextInvalid: 'Enter Your Info to Continue',
};

export const D = {
  id: 'D',
  path: 'order',
  children: props => (
    <Step {...props}>
      <Order
        processOrder={props.processOrder}
        startBraintree={props.startBraintree}
        totalIsZero={props.totalIsZero}
      />
    </Step>
  ),
  subheading: 'Payment Method',
  subheadingIsZero: 'Confirmation',
  buttonText: 'Enter credit card details',
  buttonTextInvalid: 'Enter credit card details'
  // button Text for zero order is set on zero order component
};


export const E = {
  id: 'E',
  children: props => (
    <Step {...props}>
      <OrderSummary />
    </Step>
  ),
  subheading: 'Order Summary',
  buttonText: 'Place order',
  buttonTextInvalid: 'Review Your Order'
};
