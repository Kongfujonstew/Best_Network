import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import styles from './styles.scss';

const Step = (props) => {
  const Components = props.children;
  const orderFormMessage = props.orderFormMessage || {};
  const display = props.display ? 'inline' : 'none';
  const arrow = props.stepNumber > 1 ? '< ' : '';
  const {
    validity,
    previousStep,
    buttonText,
    buttonTextInvalid,
    buttonTextIsZero,
    nextStep,
    stepId,
    stepNumber,
    subheading,
    subheadingIsZero,
    totalIsZero,
    totalSteps
  } = props;
  let buttonTextString;

  if (totalIsZero) {
    buttonTextString = buttonTextIsZero || buttonText;
  } else {
    buttonTextString = validity ? buttonText : buttonTextInvalid;
  }

  let subheadingString;
  if (totalIsZero) {
    subheadingString = subheadingIsZero || subheading;
  } else {
    subheadingString = props.subheading;
  }

  return (
    <Grid container style={{ display }}>
      <Grid
        item
        xs={12}
      >
        <Typography
          style={{ color: 'red' }}
          variant="subheading"
        >{!!orderFormMessage && orderFormMessage.text ? orderFormMessage.text : ' '}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container style={{ alignItems: 'flex-end' }}>
          <Grid item xs={6}>
            <Typography
              variant="display2"
            >{'Checkout'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="headline"
              align="right"
            ><span onClick={previousStep} className={styles.backButton}>{arrow}</span>&nbsp;&nbsp;{`Step ${stepNumber} of ${totalSteps}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ paddingBottom: '0' }}>
        <Grid container >
          <Grid item xs={stepId !== 'A' ? 5 : 12}>
            <Typography
              variant="body1"
              onClick={previousStep}
            >{subheadingString}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      { Components }

      { props.stepId !== 'D' ?
        <Grid item xs={12} style={{ paddingRight: '8px', paddingLeft: '8px' }}>
          <Button
            className={styles.stepButton}
            color="primary"
            onClick={nextStep}
            variant="raised"
            disabled={!validity}
          >{buttonTextString}
          </Button>
        </Grid> : null }
      <Grid container justify="center">

        <svg style={{ width: '300px', height: '74px', marginTop: '16px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 257 64" fill="#9B9B9B"><path d="M232 7H51.94A32 32 0 1 0 32 64a31.79 31.79 0 0 0 19.94-7H232a25 25 0 0 0 0-50zM2 32a30 30 0 1 1 30 30A30 30 0 0 1 2 32z" /><path d="M38.5 28.42h-1.17v-2.34a5.83 5.83 0 0 0-11.66 0v2.34H24.5a2.34 2.34 0 0 0-2.33 2.33v11.67a2.34 2.34 0 0 0 2.33 2.33h14a2.34 2.34 0 0 0 2.33-2.33V30.75a2.34 2.34 0 0 0-2.33-2.33zm-7 10.5a2.34 2.34 0 1 1 2.33-2.34 2.34 2.34 0 0 1-2.33 2.34zm3.62-10.5h-7.24v-2.34a3.62 3.62 0 0 1 7.24 0z" /><g style={{ isolation: 'isolate' }} fill="#fff"><path d="M77.25 36.99v-7.75l-1.78 1.81-1.29-1.36 3.36-3.38h2v10.68zM81.12 31.66c0-2.76 1.36-5.51 4.42-5.51S90 28.9 90 31.66s-1.36 5.52-4.42 5.52-4.46-2.77-4.46-5.52zm6.52 0c0-2-.57-3.49-2.1-3.49s-2.1 1.52-2.1 3.49.58 3.5 2.1 3.5 2.1-1.53 2.1-3.5zM91 31.66c0-2.76 1.36-5.51 4.42-5.51s4.42 2.75 4.42 5.51-1.36 5.52-4.42 5.52S91 34.41 91 31.66zm6.52 0c0-2-.57-3.49-2.1-3.49s-2.1 1.52-2.1 3.49.58 3.5 2.1 3.5 2.14-1.53 2.14-3.5zM100.83 28.82a2.72 2.72 0 1 1 2.71 2.68 2.59 2.59 0 0 1-2.71-2.68zm4 0a1.28 1.28 0 1 0-1.28 1.4 1.29 1.29 0 0 0 1.27-1.4zm-2.32 8.17l6.82-10.68h1.21l-6.84 10.68zm4.2-2.49a2.71 2.71 0 1 1 2.7 2.64 2.57 2.57 0 0 1-2.7-2.64zm4 0a1.28 1.28 0 1 0-2.54 0 1.28 1.28 0 1 0 2.54 0zM117 35.5l1.24-1.77a4.72 4.72 0 0 0 3.4 1.45c1.26 0 1.85-.56 1.85-1.18 0-1.86-6.14-.56-6.14-4.58 0-1.78 1.53-3.25 4-3.25a5.94 5.94 0 0 1 4.16 1.49l-1.27 1.7a4.57 4.57 0 0 0-3.1-1.17c-1 0-1.51.41-1.51 1.06 0 1.68 6.13.54 6.13 4.52 0 2-1.4 3.43-4.27 3.43a6.14 6.14 0 0 1-4.49-1.7zM126.77 33.11a3.94 3.94 0 0 1 4-4.05c2.32 0 3.87 1.73 3.87 4.25v.48h-5.74a2.07 2.07 0 0 0 2.22 1.71 3.25 3.25 0 0 0 2-.76l.91 1.35a4.83 4.83 0 0 1-3.18 1.07 3.91 3.91 0 0 1-4.08-4.05zm4-2.38a1.78 1.78 0 0 0-1.89 1.65h3.81a1.77 1.77 0 0 0-1.92-1.65zM135.62 33.11a3.93 3.93 0 0 1 4.09-4.05 3.58 3.58 0 0 1 3.06 1.4l-1.33 1.25a1.87 1.87 0 0 0-1.63-.84 2.07 2.07 0 0 0-2.1 2.24 2.08 2.08 0 0 0 2.1 2.26 1.93 1.93 0 0 0 1.63-.85l1.33 1.25a3.58 3.58 0 0 1-3.06 1.41 3.93 3.93 0 0 1-4.09-4.07zM149.31 36.99v-1a3.64 3.64 0 0 1-2.72 1.17 2.21 2.21 0 0 1-2.49-2.43v-5.47h2v4.69a1.24 1.24 0 0 0 1.42 1.42 2.26 2.26 0 0 0 1.76-.88v-5.23h2v7.73zM153.36 36.99v-7.73h2v1a3.38 3.38 0 0 1 2.47-1.24v2a2.75 2.75 0 0 0-.56-.05 2.62 2.62 0 0 0-1.91.88v5.11zM158.62 33.11a4 4 0 0 1 4-4.05c2.33 0 3.88 1.73 3.88 4.25v.48h-5.75A2.08 2.08 0 0 0 163 35.5a3.27 3.27 0 0 0 2.05-.76l.91 1.35a4.86 4.86 0 0 1-3.19 1.07 3.92 3.92 0 0 1-4.15-4.05zm4-2.38a1.78 1.78 0 0 0-1.88 1.65h3.8a1.76 1.76 0 0 0-1.92-1.65zM171.62 31.66a5.41 5.41 0 0 1 5.69-5.52 4.85 4.85 0 0 1 4.45 2.6l-1.95 1a2.9 2.9 0 0 0-2.5-1.55 3.33 3.33 0 0 0-3.31 3.47 3.33 3.33 0 0 0 3.36 3.5 2.9 2.9 0 0 0 2.5-1.55l1.95.94a4.89 4.89 0 0 1-4.45 2.63 5.43 5.43 0 0 1-5.74-5.52zM188.3 36.99v-4.71c0-1.07-.56-1.41-1.42-1.41a2.24 2.24 0 0 0-1.76.9v5.22h-2.05V26.31h2.05v3.94a3.58 3.58 0 0 1 2.7-1.19 2.23 2.23 0 0 1 2.52 2.44v5.49zM191.85 33.11a4 4 0 0 1 4-4.05c2.32 0 3.87 1.73 3.87 4.25v.48H194a2.09 2.09 0 0 0 2.21 1.71 3.25 3.25 0 0 0 2-.76l.91 1.35a4.86 4.86 0 0 1-3.12 1.09 3.92 3.92 0 0 1-4.15-4.07zm4-2.38a1.78 1.78 0 0 0-1.85 1.65h3.81a1.78 1.78 0 0 0-1.95-1.65zM200.7 33.11a3.94 3.94 0 0 1 4.1-4.05 3.59 3.59 0 0 1 3.06 1.4l-1.33 1.25a1.87 1.87 0 0 0-1.63-.84 2.07 2.07 0 0 0-2.1 2.24 2.08 2.08 0 0 0 2.1 2.26 1.93 1.93 0 0 0 1.63-.85l1.33 1.25a3.6 3.6 0 0 1-3.06 1.41 3.94 3.94 0 0 1-4.1-4.07zM214.19 36.99l-2.05-3-.93 1v2h-2V26.31h2v6.39l2.93-3.44h2.5l-3.06 3.5 3.16 4.23zM217.15 33.11a4.09 4.09 0 1 1 4.08 4.07 3.92 3.92 0 0 1-4.08-4.07zm6.07 0a2 2 0 1 0-4 0 2 2 0 1 0 4 0zM232.06 36.99v-1a3.64 3.64 0 0 1-2.72 1.17 2.21 2.21 0 0 1-2.49-2.43v-5.47h2v4.69a1.24 1.24 0 0 0 1.42 1.42 2.26 2.26 0 0 0 1.76-.88v-5.23h2v7.73zM236.53 35.05v-4h-1.28v-1.79h1.28v-2.12h2v2.12h1.57v1.77h-1.57v3.47c0 .49.26.86.7.86a1 1 0 0 0 .71-.24l.43 1.55a2.47 2.47 0 0 1-1.7.5 1.92 1.92 0 0 1-2.14-2.12z" /></g></svg>

      </Grid>
    </Grid>
  );
};

Step.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonTextInvalid: PropTypes.string.isRequired,
  display: PropTypes.bool.isRequired,
  nextStep: PropTypes.func.isRequired,
  orderFormMessage: PropTypes.shape({}).isRequired,
  previousStep: PropTypes.func.isRequired,
  stepId: PropTypes.string.isRequired,
  stepNumber: PropTypes.number.isRequired,
  subheading: PropTypes.string.isRequired,
  totalSteps: PropTypes.number.isRequired,
  validity: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  orderFormMessage: state.checkout.orderFormMessage
});

export default connect(mapStateToProps)(withStyles(styles)(Step));
