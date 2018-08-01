import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import List, { ListItem } from 'material-ui/List';
import styles from './styles.scss';

const { USER_CONTENT_URL } = process.env;

export const OrderConfirmation = (props) => {
  const { upsellPageMessage } = props.offer;
  const { order } = props.offer;

  if (!order || !order.id) return null;

  const transactionSummary = order.OrderTransactions.reduce((acc, val) => {
    acc.total += Number(val.amount);
    return acc;
  }, {
    subtotal: 0.0, shipping: 0.0, tax: 0.0, total: 0.0
  });

  const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (!order || !order.id) return null;

  const isPPT = props.offer.slug.slice(0, 4) === 'ppt-';
  const logoUrl = isPPT ?
    'assets/images/ppt-logo.svg' :
    'assets/images/frs18-logo.svg';

  return (
    <Grid container justify="center" style={{ maxWidth: '100%' }}>
      <Grid item xs={12} md={9} style={{ marginTop: '16px', maxWidth: '600px' }} >
        <Grid container>
          <Grid item xs={12} >
            <Grid container style={{ maxWidth: '100%' }}>
              <Grid item style={{ width: '100%', maxWidth: '600px', paddingLeft: '16px' }}>
                <img alt="logo" src={`${USER_CONTENT_URL}${logoUrl}`} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={styles.top}>
            <Typography variant="display2" align="center">Thank you!</Typography>
            <Typography className={`${styles.margin} ${styles.top} ${styles.orderProcessed}`} variant="subheading" style={{ fontSize: '1.5em', textAlign: 'center', lineHeight: '1.1em' }}>Congratulations, you've taken a tremendous step towards a healthier life and a healthier world.</Typography>
            <Typography className={`${styles.margin} ${styles.top} ${styles.orderProcessed}`} variant="subheading">Soon, you will get an email with instructions for enjoying your content. Please check your email inbox, and if you don’t get your login instructions from us in the next 10 minutes, check your spam and promotions folders.</Typography>

            {!!upsellPageMessage && upsellPageMessage.text ?
              <Grid item xs={12}>
                <Typography
                  type="title"
                >Unfortunately, we were unable to add the limited offer items to your order.
                </Typography>
                <Typography
                  id="upsellPageMessage"
                  style={{ color: 'red' }}
                  type="subheading"
                >{upsellPageMessage.text}
                </Typography>
              </Grid> :
              null
            }
            <br />
            <Typography className={styles.margin} variant="headline">Order #{order.id}</Typography>
          </Grid>

          <Grid item xs={12} className={styles.margin}>
            <List>
              {order.OrderTransactions.reduce((a, v) => a.concat(v.TransactionProducts), []).map((product, i) => {
                const OrderProduct = order.OrderProducts.find(el => el.ProductId === product.ProductId);
                const productName = OrderProduct ? OrderProduct.Product.name : '';
                const hackyIndex = i + 100;
                const quantityMessage = product.qtyOrdered > 1 ? <span style={{ fontSize: '0.75em' }}> (Qty: {product.qtyOrdered})</span> : '';
                return (
                  <ListItem style={{ paddingLeft: 0, paddingRight: 0 }} key={hackyIndex}>
                    <Grid xs={8} style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}><Typography>{productName}{quantityMessage}</Typography></Grid>
                    <Grid xs={4}><Typography align="right">{`$${numberWithCommas(Number(product.amount).toFixed(2))}`}</Typography></Grid>
                  </ListItem>
                );
              })}
              {(order.shipping > 0 || order.tax > 0) ?
                <ListItem style={{
 paddingLeft: 0, paddingRight: 0, borderTop: '1px solid', paddingBottom: 0
}}
                >
                  <Grid item xs={8}><Typography className={`${styles.nameWidth}`}>Subtotal</Typography></Grid>
                  <Grid item xs={4}><Typography align="right" className={`${styles.priceWidth}`}>{`$${numberWithCommas(order.subtotal)}`}</Typography></Grid>
                </ListItem>
                : null
              }
              {order.shipping > 0 ?
                <ListItem style={{ padding: 0 }}>
                  <Grid item xs={8}><Typography className={`${styles.nameWidth}`}>Shipping</Typography></Grid>
                  <Grid item xs={4}><Typography align="right" className={`${styles.priceWidth}`}>{`$${numberWithCommas(order.shipping)}`}</Typography></Grid>
                </ListItem>
                : null
              }
              {order.tax > 0 ?
                <ListItem style={{ padding: 0 }}>
                  <Grid item xs={8}><Typography className={`${styles.nameWidth}`}>Tax</Typography></Grid>
                  <Grid item xs={4}><Typography align="right" className={`${styles.priceWidth}`}>{`$${numberWithCommas(order.tax)}`}</Typography></Grid>
                </ListItem>
                : null
              }
              <ListItem style={{
 paddingLeft: 0, paddingRight: 0, paddingTop: 0, borderTop: (order.shipping > 0 || order.tax > 0) ? '' : '1px solid'
}}
              >
                <Grid item xs={8}><Typography className={`${styles.bold} ${styles.nameWidth}`}>Total</Typography></Grid>
                <Grid item xs={4}><Typography align="right" className={`${styles.bold} ${styles.priceWidth}`}>{`$${numberWithCommas(transactionSummary.total.toFixed(2))}`}</Typography></Grid>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

OrderConfirmation.propTypes = {
  offer: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({ offer: state.checkout });

export default connect(mapStateToProps)(OrderConfirmation);
