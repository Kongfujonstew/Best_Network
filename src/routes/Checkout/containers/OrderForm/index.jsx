/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import braintreeInit from 'braintree';
import { withRouter } from 'react-router-dom';
import { A, B, C, D } from 'routes/Checkout/containers/OrderForm/Steps';

const { USER_CONTENT_URL } = process.env;

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.startBraintree = this.startBraintree.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.state = {
      steps: {
        user: A, options: B, address: C, order: D
      }
    };
  }

  componentDidMount() {
    const { optionsFirst } = this.props.offer;

    let steps;

    if (!this.props.user.isAuthenticated) {
      steps = optionsFirst ? ['options', 'user'] : ['user', 'options'];
    } else {
      steps = ['options'];
    }

    if (this.props.offer.physicalProducts.length) {
      steps.push('address');
    }

    steps.push('order');
    this.props.setSteps(steps);
    this.props.setOrderFormMessage(0);

    if (this.props.modalOpen) {
      this.props.hideModal();
    }
    window.onbeforeunload = () => false;
    if (optionsFirst) {
      this.props.history.replace(`/checkout/${this.props.offer.slug}/#/options`);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { optionsFirst } = this.props.offer;

    if (!this.props.offer.slug && !!nextProps.offer.slug) {
      if (!this.props.history.location.hash) {
        const firstStep = this.props.user.isAuthenticated ? 'options' : optionsFirst ? 'options' : 'user';
        this.props.history.replace(`/checkout/${nextProps.offer.slug}/#/${firstStep}`);
      } else if (!this.props.user.isAuthenticated && !this.props.offer.stepValidity.A) {
        optionsFirst ?
          this.props.history.replace(`/checkout/${nextProps.offer.slug}/#/options`) :
          this.props.history.replace(`/checkout/${nextProps.offer.slug}/#/user`);
      }
    }

    if (this.props.offer && !this.props.offer.physicalProducts.length && nextProps.offer.physicalProducts.length) {
      const { steps } = this.props.offer;
      steps.splice(-1, 0, 'address');
      this.props.setSteps(steps);
    }
    if (this.props.offer && this.props.offer.physicalProducts.length && !nextProps.offer.physicalProducts.length) {
      const { steps } = this.props.offer;
      steps.splice(-2, 1);
      this.props.setSteps(steps);
    }
    if (!this.props.user.isAuthenticated && nextProps.user.isAuthenticated) {
      if (this.props.history.location.hash.substring(2) === 'user') {
        const { steps } = this.props.offer;
        steps.splice(0, 1);
        this.props.setSteps(steps);
        this.props.history.push(`/checkout/${this.props.offer.slug}/#/options`);
      }
    }

    if (this.props.user.isAuthenticated && !nextProps.user.isAuthenticated) {
      this.props.history.location.reload();
    }
  }

  componentWillUnmount() {
    window.onbeforeunload = null;
  }

  startBraintree() {
    braintreeInit({
      openModal: this.props.openModal,
      processOrder: this.props.processOrder,
      addProducts: this.props.addProducts,
      setPaymentMethod: this.props.setPaymentMethod,
      setSelectedUserPaymentId: this.props.setSelectedUserPaymentId,
      setBraintreeValidity: this.props.setBraintreeValidity,
      blurBraintreeField: this.props.blurBraintreeField,
      setOrderFormMessage: this.props.setOrderFormMessage,
    });
  }

  nextStep() {
    const currentStep = this.props.history.location.hash.substring(2);
    const currentStepIdx = this.props.offer.steps.indexOf(currentStep);
    const nextStep = currentStepIdx + 1;
    this.props.setCurrentStep(nextStep, currentStepIdx);
    if (nextStep <= this.props.offer.steps.length - 1) {
      this.props.history.push(`/checkout/${this.props.offer.slug}/#/${this.props.offer.steps[nextStep]}`);
    }
  }

  previousStep() {
    this.props.history.goBack();
  }

  render() {
    const { stepValidity, selectedPaymentOption, totals } = this.props.offer;
    const { processOrder } = this.props;
    let totalIsZero = false;
    if (totals[selectedPaymentOption]) {
      if (parseInt(totals[selectedPaymentOption].transaction.total) === 0) {
        totalIsZero = true;
      }
    }

    const isPPT = this.props.offer.slug.slice(0, 3) === 'ppt';
    const logoUrl = isPPT ?
      'assets/images/ppt-logo.svg' :
      'assets/images/frs18-logo.svg';

    return (
      <Grid container justify="center" style={{ maxWidth: '100%' }}>
        <Grid item xs={12} md={9} style={{ marginTop: '16px', maxWidth: '600px' }} >
          <Grid item xs={12}>
            <img alt="logo" src={`${USER_CONTENT_URL}${logoUrl}`} />
          </Grid>

          {this.props.offer.steps.map((path, i) => {
            const Step = this.state.steps[path];

            if (!Step) return;

            return (<Step.children
              key={Step.id}
              stepId={Step.id}
              display={this.props.history.location.hash.substring(2) === Step.path}
              buttonText={Step.buttonText}
              buttonTextInvalid={Step.buttonTextInvalid}
              buttonTextIsZero={Step.buttonTextIsZero}
              nextStep={this.nextStep}
              previousStep={this.previousStep}
              processOrder={processOrder}
              stepNumber={i + 1}
              subheading={Step.subheading}
              subheadingIsZero={Step.subheadingIsZero}
              totalIsZero={totalIsZero}
              totalSteps={this.props.offer.steps.length}
              validity={stepValidity[Step.id]}
              startBraintree={this.startBraintree}
            />);
          })}
        </Grid>
      </Grid>
    );
  }
}

OrderForm.propTypes = {
  addProducts: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    location: PropTypes.shape({
      hash: PropTypes.string.isRequired
    }),
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  modalOpen: PropTypes.bool.isRequired,
  offer: PropTypes.shape({
    braintreeValidity: PropTypes.shape({}).isRequired,
    optionsFirst: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
    stepValidity: PropTypes.shape({
      A: PropTypes.bool.isRequired
    }).isRequired,
    physicalProducts: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired,
  openModal: PropTypes.func.isRequired,
  processOrder: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool
  }).isRequired,
  setBraintreeValidity: PropTypes.func.isRequired,
  blurBraintreeField: PropTypes.func.isRequired,
  setOrderFormMessage: PropTypes.func.isRequired,
  setPaymentMethod: PropTypes.func.isRequired,
  setSelectedUserPaymentId: PropTypes.func.isRequired,
  setSteps: PropTypes.func.isRequired
};

export default withRouter(OrderForm);
