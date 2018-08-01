import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ProductItem from 'routes/Products/List/components/ProductItem';

const RecommendedProducts = (props) => {
  const { recommendedProducts } = props.offer;

  return (
    <Grid item sm={12}>
      <Grid container>
        {recommendedProducts !== undefined && recommendedProducts.length > 0 ?
          <div>
            <Typography type="title" paragraph>You might also be interested in:</Typography>
            { recommendedProducts.map(product => <ProductItem key={product.id} {...product} />) }
          </div> : null}
      </Grid>
    </Grid>
  );
};

RecommendedProducts.propTypes = {
  offer: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  offer: state.checkout
});

export default connect(mapStateToProps)(RecommendedProducts);