import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { actions } from 'modules/checkout';

const { checkFormValidity, setSelectedUserPaymentId, setPaymentMethod } = actions;

class StoredPaymentMethods extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickNew = this.handleClickNew.bind(this);
  }

  componentDidMount() {
    if (this.props.UserPaymentMethods.length) {
      this.props.setPaymentMethod('existing');
      // this.handleClickExisting(this.props.UserPaymentMethods[0].id.toString())
    }
  }

  handleClickExisting(id) {
    this.props.setSelectedUserPaymentId(id);
    this.props.setPaymentMethod('existing');
    this.props.checkFormValidity();
  }

  handleClickNew() {
    this.props.setSelectedUserPaymentId('0');
    this.props.setPaymentMethod('braintree');
    this.props.checkFormValidity();
  }

  render() {
    const {
      isAuthenticated,
      paymentMethod,
      UserPaymentMethods
    } = this.props;

    if (!isAuthenticated || !UserPaymentMethods.length) {
      return null;
    }

    return (
      <Grid item sm={5} style={{ marginTop: '12px' }}>
        <Typography type="title">Select Payment</Typography>
        <List>
          {UserPaymentMethods.map(method => (
            <ListItem
              key={method.id}
              button
              dense
            >
              <ListItemText
                primary={method.brand}
                secondary={(method.brand !== 'paypal' && method.brand !== 'Paypal') ?
                  `Card Ending . . . ${method.last4}` :
                  null}
                onClick={() => this.handleClickExisting(method.id.toString())}
              />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={() => this.handleClickExisting(method.id.toString())}
                  checked={method.id.toString() === this.props.selectedUserPaymentMethodId}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem key={1000} button dense>
            <ListItemText
              primary="New"
              secondary="Use different payment method . . ."
              onClick={this.handleClickNew}
            />
            <ListItemSecondaryAction>
              <Checkbox
                onChange={this.handleClickNew}
                checked={paymentMethod !== 'existing'}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    );
  }
}

StoredPaymentMethods.propTypes = {
  checkFormValidity: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  setPaymentMethod: PropTypes.func.isRequired,
  UserPaymentMethods: PropTypes.arrayOf(PropTypes.shape({})),
  setSelectedUserPaymentId: PropTypes.func.isRequired,
  selectedUserPaymentMethodId: PropTypes.string.isRequired
};

StoredPaymentMethods.defaultProps = {
  UserPaymentMethods: []
};

const mapStateToProps = state => ({
  UserPaymentMethods: state.user.UserPaymentMethods,
  isAuthenticated: state.user.isAuthenticated,
  paymentMethod: state.checkout.paymentMethod,
  selectedUserPaymentMethodId: state.checkout.selectedUserPaymentMethodId
});

const mapDispatchToProps = dispatch => ({
  checkFormValidity: () => {
    dispatch(checkFormValidity());
  },
  setSelectedUserPaymentId: (id) => {
    dispatch(setSelectedUserPaymentId(id));
  },
  setPaymentMethod: (method) => {
    dispatch(setPaymentMethod(method));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoredPaymentMethods);