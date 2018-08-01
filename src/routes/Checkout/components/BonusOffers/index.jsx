/* eslint-disable react/no-unused-prop-types */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import CheckCircleShadow from 'images/SVG/CheckCircleShadow';
import RadioButtonUnchecked from 'material-ui-icons/RadioButtonUnchecked';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { actions } from 'modules/checkout';
import styles from './styles.scss';

const muiThemeStyles = theme => ({
  textField: theme.textField,
  Input: theme.Input,
  input: theme.input
});

const {
  loadTotals, updateBumpOfferQuantity, updateQuantity, updateStepValidity
} = actions;

class BonusOffers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentOption: { id: 'init', BumpOffers: [] } };
  }

  componentDidMount() {
    const { OfferPaymentOptions, selectedPaymentOption } = this.props;
    if (!!OfferPaymentOptions && this.state.currentOption.id !== selectedPaymentOption) {
      OfferPaymentOptions.map((option) => {
        if (option.id === selectedPaymentOption) {
          this.setState({ currentOption: option });
        }
      });
    }
    this.props.updateStepValidity();
  }

  componentWillReceiveProps(nextProps) {
    const { OfferPaymentOptions, selectedPaymentOption } = nextProps;
    if (this.state.currentOption.id !== selectedPaymentOption && OfferPaymentOptions) {
      OfferPaymentOptions.map((option) => {
        if (option.id === selectedPaymentOption) {
          this.setState({ currentOption: option });
        }
      });
    }
  }

  handleChangeProductQuantity = (e) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity >= 1) {
      this.props.selectProductQuantity(newQuantity);
    }

    this.props.loadTotals();
  }

  handleChangeBumpOfferQuantity = option => (e) => {
    const { BumpOffers } = this.props;
    if (e.target.value === 0) {
      for (const i in BumpOffers) {
        if (BumpOffers[i].id === option.id) {
          if (BumpOffers[i].selected) {
            this.props.toggleOffer(BumpOffers[i]);
          }
        }
      }
    } else if (e.target.value !== 0) {
      let isSelected = false;

      for (const i in BumpOffers) {
        if (BumpOffers[i].id === option.id) {
          isSelected = true;
        }
      }

      if (!isSelected) {
        this.props.toggleOffer(option);
      }
    }

    this.props.selectBumpOfferQuantity(e.target.value, option.id);
    this.props.loadTotals();
  }

  formatDescription = () => {
    if (this.props.OfferPaymentOptions.length > 2) {
      return 'or multi-payments';
    } else if (this.props.OfferPaymentOptions.length === 1) {
      return '';
    }
    let otherOption;
    this.props.OfferPaymentOptions.map((option) => {
      if (option.numInstallments !== 1) {
        otherOption = option;
      }
    });
    return `or ${otherOption.numInstallments} ${otherOption.interval}ly payments`;
  }

  render() {
    const {
      BumpOffers, bumpOfferQuantities, classes, Product, quantity, selectProductQuantity
    } = this.props;

    const { currentOption } = this.state;
    const currentBumpOffers = currentOption.BumpOffers;
    const selectedBumpOfferIds = [];
    BumpOffers.map((bumpOffer) => {
      selectedBumpOfferIds.push(bumpOffer.OfferPaymentOptionBumpOffer.BumpOfferId);
    });

    const description = Product.description || '';
    const contentUrl = process.env.USER_CONTENT_URL;
    const thisProductUrl = this.props.thisProductUrl ?
      this.props.thisProductUrl : 'placeholder.png';

    const MenuProps = {
      className: classes.Input,
      PaperProps: {
        style: {
          maxHeight: '240px',
          width: 250,
        }
      }
    };

    return (
      <Grid item xs={12} style={{ marginTop: '12px' }}>
        <List>
          <ListItem
            className={styles.listItemThisProduct}
            dense
          >
            <Grid container direction="column">
              <Grid item>
                <Grid container className={styles.imageContainer}>
                  <Grid
                    item
                    xs={3}
                    className={styles.imageItem}
                    style={{
                      backgroundImage: `url(${contentUrl}${thisProductUrl})`,
                    }}
                  />
                  <Grid item xs={9} className={styles.headlineItem}>
                    <Typography
                      className={styles.headlineTypography}
                      variant="headline"
                      color="primary"
                    >{Product.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      className={styles.descriptionTypography}
                      color="primary"
                    >{description}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container className={styles.lowerContainer}>
                  <Grid item xs={3} className={styles.lowerContainerItem1}>
                    <Grid container className={styles.checkboxContainer}>
                      <Checkbox
                        checked
                        icon={<RadioButtonUnchecked style={{ fontSize: '24px' }} className={styles.radioButtonUnchecked} />}
                        checkedIcon={<CheckCircleShadow style={{ fontSize: '24px' }} className={styles.checkCircleShadow} color="primary" />}
                      />
                      <Typography
                        className={styles.inCartTypography}
                        style={{ color: '#289B18' }}
                        variant="body1"
                      >In cart
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item className={styles.minWidth}>
                    <Grid container alignItems="baseline" style={{ alignItems: 'center' }}>
                      <Grid item>
                        <Grid container alignItems="flex-end">
                          <Typography
                            className={styles.amountTypography}
                            style={{
                              color: '#289B18'
                            }}
                            color="primary"
                            type="body1"
                          >{`$${currentOption.amount} `}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography
                          className={styles.paymentOptionsTypography}
                          style={{ color: '#289B18', maxWidth: '300px', marginLeft: '8px' }}
                          color="primary"
                          type="body1"
                        >{currentOption.numInstallments === 1 ? `${this.formatDescription()}` : `today & ${currentOption.numInstallments - 1} ${currentOption.interval}ly payments`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              { Product.quantifiable ?
                <Grid item xs={12}>
                  <Grid container alignItems="center" style={{ paddingLeft: '16px' }}>

                    <Grid item xs={3} className={styles.lowerContainerItem1}>
                      <Typography
                        className={styles.inCartTypography}
                        color="primary"
                        variant="body1"
                      >Quantity:
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Select
                        className={classes.textField}
                        MenuProps={MenuProps}
                        color="primary"
                        disableUnderline
                        inputProps={{ id: 'quantity', className: classes.input }}
                        name="quantity"
                        value={quantity}
                        style={{
                          fontSize: '1.2rem',
                          color: '#289B18',
                          transform: 'translateX(-18px) translateY(4px)',
                          width: '58px'
                        }}
                        onChange={this.handleChangeProductQuantity}
                      >
                        { Array(...Array(99)).map((u, index) => {
                            const hackyIndex = index + 100;
                            if (index !== 0) {
                            return (
                              <MenuItem style={{ fontSize: '1.2rem' }} value={index}>{index}</MenuItem>
                              );
                            }
                          })
                        }
                      </Select>
                    </Grid>
                  </Grid>
                </Grid> : null
              }
            </Grid>
          </ListItem>

          {currentBumpOffers.map((option) => {
            if (!option) return null;
            let thisBumpOfferQuantity = 0;

            for (const i in BumpOffers) {
              if (BumpOffers[i].id === option.id) {
                thisBumpOfferQuantity = BumpOffers[i].quantity;
                break;
              }
            }

            option.selected = selectedBumpOfferIds.includes(option.OfferPaymentOptionBumpOffer.BumpOfferId);
            const border = thisBumpOfferQuantity > 0 ? styles.solidBorder : styles.dashedBorder;
            const image = option.image ? option.image : 'placeholder.png';

            return (
              <ListItem
                color="secondary"
                className={`${styles.listItemBumpOffer} ${border}`}
                style={{ backgroundColor: 'rgba(255,153,0,0.05)' }}
                key={option.name}
                button
                disableRipple
                dense
              >
                <Grid container direction="column">
                  <Grid item onClick={() => this.props.toggleOffer(option)}>
                    <Grid container className={styles.imageContainer}>
                      <Grid
                        item
                        xs={3}
                        className={styles.imageItem}
                        style={{ backgroundImage: `url(${contentUrl}${image})` }}
                      />
                      <Grid item xs={9} className={styles.headlineItem}>
                        <Typography
                          className={styles.headlineTypography}
                          variant="headline"
                        >{option.name}
                        </Typography>
                        <Typography
                          style={{ fontSize: '1rem' }}
                          variant="body1"
                        >{option.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item onClick={() => this.props.toggleOffer(option)}>
                    <Grid container className={styles.lowerContainer}>
                      <Grid item xs={3} className={styles.lowerContainerItem1}>
                        <Grid container className={styles.checkboxContainer}>
                          <Checkbox
                            checked={option.selected}
                            icon={<RadioButtonUnchecked style={{ fontSize: '24px' }} className={styles.radioButtonUnchecked} />}
                            checkedIcon={<CheckCircleShadow style={{ fontSize: '24px' }} className={styles.checkCircleShadow} color="secondary" />}
                          />
                          <Typography
                            className={styles.inCartTypography}
                            style={{ color: 'black' }}
                            variant="body1"
                          >Add it!
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item className={styles.minWidth}>
                        <Grid container alignItems="baseline" style={{ alignItems: 'center' }}>
                          <Grid item>
                            <Grid container alignItems="flex-end">
                              <Typography
                                className={styles.amountTypography}
                                style={{ color: 'black' }}
                                type="body1"
                              >{`$${option.OfferPaymentOptionBumpOffer.amount} `}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Typography
                              className={styles.paymentOptionsTypography}
                              style={{ color: 'black', maxWidth: '300px', marginLeft: '8px' }}
                              type="body1"
                            >{currentOption.numInstallments === 1 ? `${this.formatDescription()}` : `today & ${currentOption.numInstallments - 1} ${currentOption.interval}ly payments`}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  { option.Product.quantifiable ?
                    <Grid item xs={12}>
                      <Grid container alignItems="center" style={{ paddingLeft: '16px' }}>
                        <Grid item xs={3} className={styles.lowerContainerItem1}>
                          <Typography
                            className={styles.inCartTypography}
                            style={{ color: 'black' }}
                            variant="body1"
                          >Quantity:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Select
                            className={classes.textField}
                            MenuProps={MenuProps}
                            inputProps={{ id: `bumpOffer${option.id}`, className: classes.input }}
                            name="bumpOfferQuantity"
                            disableUnderline
                            value={thisBumpOfferQuantity}
                            style={{
                             fontSize: '1.2rem', width: '100%', transform: 'translateX(-18px) translateY(4px)', width: '58px'
                            }}
                            onChange={this.handleChangeBumpOfferQuantity(option)}
                          >
                            { Array(...Array(99)).map((u, index) => {
                                const hackyIndex = index + 100;
                                return (
                                  <MenuItem style={{ fontSize: '1.2rem' }} value={index}>{index}</MenuItem>
                                );
                              })
                            }
                          </Select>

                        </Grid>
                        <Grid item xs={7} onClick={() => this.props.toggleOffer(option)}>
                          <Typography />
                        </Grid>
                      </Grid>
                    </Grid> : null
                  }
                </Grid>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    );
  }
}

BonusOffers.propTypes = {
  BumpOffers: PropTypes.arrayOf(PropTypes.shape({})),
  description: PropTypes.string.isRequired,
  OfferPaymentOptions: PropTypes.arrayOf(PropTypes.shape({})),
  Product: PropTypes.shape({
    name: PropTypes.string
  }),
  selectedPaymentOption: PropTypes.number,
  thisProductUrl: PropTypes.string,
  toggleOffer: PropTypes.func.isRequired,
  updateStepValidity: PropTypes.func.isRequired
};

BonusOffers.defaultProps = {
  thisProductUrl: 'placeholder.png',
  OfferPaymentOptions: {}
};

BonusOffers.defaultProps = {
  BumpOffers: [],
  Product: {
    description: ''
  },
  selectedPaymentOption: 0
};

const mapStateToProps = state => ({
  BumpOffers: state.checkout.BumpOffers,
  bumpOfferQuanties: state.checkout.bumpOfferQuanties,
  description: state.checkout.description,
  OfferPaymentOptions: state.checkout.OfferPaymentOptions,
  productAmount: state.checkout.productAmount,
  Product: state.checkout.Product,
  quantity: state.checkout.quantity,
  selectedPaymentOption: state.checkout.selectedPaymentOption,
  thisProductUrl: state.checkout.image,
  totals: state.checkout.totals
});

const mapDispatchToProps = dispatch => ({
  loadTotals: () => {
    dispatch(loadTotals());
  },
  toggleOffer: (option) => {
    dispatch(actions.clickBumpOffer(option));
  },
  updateStepValidity: () => {
    dispatch(updateStepValidity('B'));
  },
  selectProductQuantity: (quantity) => {
    dispatch(updateQuantity(quantity));
  },
  selectBumpOfferQuantity: (quantity, id) => {
    dispatch(updateBumpOfferQuantity(quantity, id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(muiThemeStyles)(BonusOffers));