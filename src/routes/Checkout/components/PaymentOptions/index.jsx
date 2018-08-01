import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import CheckCircleShadow from 'images/SVG/CheckCircleShadow';
import RadioButtonUnchecked from 'material-ui-icons/RadioButtonUnchecked';
import { actions } from 'modules/checkout';
import styles from './styles.scss';

const { loadTotals, updateStepValidity, setSelectedPaymentOption } = actions;

class PaymentOptions extends PureComponent {
  constructor(props) {
    super(props);
    const options = [];
    this.state = { options };
  }

  componentDidMount() {
    if (this.props.options && this.props.options.length) {
      const options = [];

      if (this.props.options.length === 1) {
        this.props.clickPaymentOption(this.props.options[0].id);
      }

      this.props.options.map((option) => {
        if (option.numInstallments !== 1) {
          options.push(option);
        } else {
          // default: add the numInstallments = 1 option to the top of the list
          this.props.clickPaymentOption(option.id);
          options.unshift(option);
        }
      });
      this.setState({ options, haveOptions: true });
    }
    // if (this.props.totals.default === true) {
    //   this.props.updateTotals();
    // }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.totals.default) {
      this.props.updateTotals();
    }

    if (newProps.options.length && !this.state.haveOptions) {
      if (!newProps.selectedPaymentOption) {
        this.props.clickPaymentOption(newProps.options[0].id);
      }

      const options = [];
      newProps.options.map((option) => {
        if (option.numInstallments !== 1) {
          options.push(option);
        } else {
          this.props.clickPaymentOption(option.id);
          options.unshift(option);
        }
      });
      this.setState({ options, haveOptions: true });
    }
  }

  formatDescription = (option) => {
    if (option.numInstallments === 1) {
      return ' 1 payment today';
    }
    return ` ${option.numInstallments} ${option.interval}ly payments`;
  }

  numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  render() {
    if (!this.state.options.length || this.props.totalIsZero) {
      return null;
    }

    const { selectedPaymentOption, clickPaymentOption, totals } = this.props;
    const { options } = this.state;
    const { dynamicSize } = styles;

    const TAX = totals.default || !totals[selectedPaymentOption] ?
      '0.00' :
      totals[selectedPaymentOption].transaction.tax;
    const SHIPPING = totals.default || !totals[selectedPaymentOption] ?
      '0.00' :
      totals[selectedPaymentOption].transaction.shipping;

    let taxAndShippingMessage = '';

    if (TAX !== '0.00') {
      taxAndShippingMessage = `Based on your postal code, we are required to collect $${TAX} CA sales tax.`;
    }

    if (SHIPPING !== '0.00') {
      taxAndShippingMessage = `${taxAndShippingMessage !== '' ? ' ' : ''}There is a $${SHIPPING} shipping and handling fee for your location.`;
    }

    return (
      <Grid item xs={12} style={{ marginTop: '12px' }}>
        <Typography
          style={{ marginBottom: '8px', fontWeight: 400 }}
          variant="headline"
          align="center"
        >How would you like to pay?
        </Typography>
        <Grid container >
          <Grid item xs={12}>
            <List style={{ borderRadius: '8px', padding: '0' }}>
              {options.map((value, index) => {
                const checked = selectedPaymentOption === value.id;
                const description = this.formatDescription(value);
                const total = totals.default || !selectedPaymentOption ? '0.00' : totals[value.id].transaction.subtotal;
                const total1 = total.slice(0, total.length - 3);
                const total2 = total.slice(total.length - 3);

                window.total = total;


                let border;

                if (options.length === 1) {
                  border = styles.onlyOption;
                }
                if (options.length > 1 && index === 0) {
                  border = styles.topOption;
                }
                if (options.length > 1 && index < options.length - 1 && index > 0) {
                  border = styles.middleOption;
                }
                if (index === options.length - 1 && options.length > 1) {
                  border = styles.lastOption;
                }

                const color = checked ? styles.green : styles.black;
                const gradient = checked ? styles.checkedGradient : styles.uncheckedGradient;

                return (
                  <ListItem
                    className={`${styles.option} ${gradient} ${border}`}
                    key={value.id}
                    button
                    dense
                    onClick={() => {
                      this.props.updateStepValidity();
                      clickPaymentOption(value.id);
                    }}
                  >
                    <Grid container direction="row" style={{ alignItems: 'center' }}>
                      <Grid item xs={1} style={{ padding: '0' }}>
                        <Checkbox
                          onChange={() => clickPaymentOption(value.id)}
                          checked={checked}
                          icon={<RadioButtonUnchecked style={{ fontSize: '24px' }} />}
                          checkedIcon={<CheckCircleShadow style={{ fontSize: '24px' }} color="primary" />}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Grid
                          container
                          direction="row"
                          wrap="nowrap"
                          alignItems="center"
                          style={{ paddingLeft: '4px' }}
                        >
                          <Typography
                            className={`${styles.sup} ${color}`}
                            style={{ marginLeft: '8px' }}
                            variant="display2"
                          >$
                          </Typography>
                          <Typography
                            className={color}
                            variant="display2"
                          >{`${this.numberWithCommas(total1)} `}
                          </Typography>
                          <Typography
                            className={`${styles.sup} ${color}`}
                            variant="display2"
                          >{`${this.numberWithCommas(total2)}`}
                          </Typography>

                          <Grid item xs={8}>
                            <Grid container alignItems="flex-end" spacing={8} style={{ paddingLeft: '8px' }}>

                              <Typography
                                className={`${color} ${dynamicSize}`}
                                variant="body1"
                                noWrap
                              >{description}
                              </Typography>

                              { value.numInstallments !== 1 ?
                                <Typography
                                  className={color}
                                  style={{ fontSize: '.75em', marginLeft: '8px', transform: 'translateY(-.4em)' }}
                                  variant="body1"
                                >{' (1 today)'}
                                </Typography> : null }

                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                    </Grid>
                  </ListItem>
                );
              })}
            </List>
            { taxAndShippingMessage.length ?
              <Typography
                style={{ margin: '16px', fontSize: '1em' }}
                variant="body1"
              >{taxAndShippingMessage}
              </Typography> : null
            }
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

PaymentOptions.propTypes = {
  clickPaymentOption: PropTypes.func.isRequired,
  updateTotals: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  selectedPaymentOption: PropTypes.number,
  totals: PropTypes.shape({
    default: PropTypes.bool
  }).isRequired,
  updateStepValidity: PropTypes.func.isRequired
};

PaymentOptions.defaultProps = {
  options: [],
  selectedPaymentOption: 0
};

const mapStateToProps = state => ({
  amount: state.checkout.productAmount,
  options: state.checkout.OfferPaymentOptions,
  selectedPaymentOption: state.checkout.selectedPaymentOption,
  totals: state.checkout.totals
});

const mapDispatchToProps = dispatch => ({
  updateTotals: () => {
    dispatch(loadTotals());
  },
  clickPaymentOption: (id) => {
    dispatch(setSelectedPaymentOption(id));
  },
  updateStepValidity: () => {
    dispatch(updateStepValidity('B'));
  },
  updateProductAmount: (amount) => {
    dispatch(actions.updateProductAmount(amount));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentOptions);
