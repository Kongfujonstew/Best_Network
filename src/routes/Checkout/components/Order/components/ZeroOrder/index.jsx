import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { actions } from 'modules/checkout';
import styles from '../../styles.scss';

const muiThemeStyles = theme => ({
  button: theme.button
});

class ZeroOrder extends React.Component {
  handleClick = () => {
    this.props.processOrder('manual')
      .then((resp) => {
        if (resp) this.props.addProducts(resp);
      })
      .catch((err) => {
        this.props.setOrderFormMessage(999);
      });
  }

  render() {
    const {
      classes,
      processOrder
    } = this.props;

    return (
      <Grid
        item
        xs={12}
        className={styles.gridItem}
      >
        <ExpansionPanel
          style={{ marginBottom: '0px' }}
          elevation={0}
          expanded
          onClick={this.handleClick}
        >
          <ExpansionPanelDetails
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Button
                  className={classes.button}
                  style={{ width: '100%', height: '65px', fontSize: '22px' }}
                  variant="raised"
                  color="primary"
                >Place your order
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  type="body2"
                  style={{ fontWeight: 400 }}
                >Your total for today is: $0.00
                </Typography>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    );
  }
}

ZeroOrder.propTypes = {
  addProducts: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  processOrder: PropTypes.func.isRequired,
  setOrderFormMessage: PropTypes.func.isRequired
};


// const mapStateToProps = state => ({
//   method: state.checkout.paymentMethod,
//   stepValidity: state.checkout.stepValidity.D,
//   braintreeValidity: state.checkout.braintreeValidity,
//   paymentMethod: state.checkout.paymentMethod,
//   selectedUserPaymentMethodId: state.checkout.selectedUserPaymentMethodId,
//   selectedPaymentOption: state.checkout.selectedPaymentOption,
//   totals: state.checkout.totals
// });

const mapDispatchToProps = dispatch => ({
  addProducts: (respProducts) => {
    dispatch(actions.addProducts(respProducts));
  },
  setOrderFormMessage: (id) => {
    dispatch(actions.setOrderFormMessage(id));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(muiThemeStyles)(ZeroOrder));
