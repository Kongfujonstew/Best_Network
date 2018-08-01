import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { actions } from 'modules/checkout';

const { checkFormValidity } = actions;

class AddressList extends React.Component {
  constructor(props) {
    super(props);
    const { addresses } = props;
    const addressesList = [];
    if (addresses.length > 0) {
      addresses.map((address) => {
        // TODO make this component agnostic billing vs shipping
        if (address.type === 'shipping') {
          addressesList.push(address);
        }
      });
    }
    this.state = {
      addressesList
    };
  }

  toggleBilling(id, checked) {
    if (checked) {
      this.props.onToggle(id);
    } else {
      this.props.onToggle('0');
    }
  }

  render() {
    return (
      <Grid item xs={12}>
        <List dense>
          {this.state.addressesList.map(address => (
            <ListItem
              button
              key={address.id}
              style={{ paddingLeft: '12px' }}
              onClick={this.props.checkFormValidity}
            >
              <ListItemText
                primary={address.name}
                secondary={`${address.address1} ${address.address2} ${address.state} ${address.postalCode}`}
              />
              <ListItemSecondaryAction>
                <Checkbox
                  key={address.id}
                  onChange={() => this.props.onToggle(address.id.toString())}
                  value={address.id.toString()}
                  checked={(this.props.selectedId === address.id.toString())}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {this.state.addressesList.length ?
          <List dense>
            <ListItem button style={{ paddingLeft: '12px' }}>
              <ListItemText
                primary="New"
                secondary="Enter a new shipping address"
              />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={() => this.props.onToggle('0')}
                  value="0"
                  checked={(this.props.selectedId === '0')}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List> :
          null }
      </Grid>
    );
  }
}

AddressList.propTypes = {
  onToggle: PropTypes.func.isRequired,
  checkFormValidity: PropTypes.func.isRequired,
  addresses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  selectedId: state.checkout.selectedShippingAddressId
});

const mapDispatchToProps = dispatch => ({
  checkFormValidity: () => {
    dispatch(checkFormValidity());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressList);