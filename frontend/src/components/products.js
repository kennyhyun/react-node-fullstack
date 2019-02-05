import React from 'react';
import injectSheet from 'react-jss'
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import withSizes from 'react-sizes';

import { ProductCard, ListHeader, ListFooter } from 'react-components';
import Grid from '@material-ui/core/Grid';

import * as actions from '../actions/product';

const styles = {
  grid: {
    display: 'flex',
    margin: [[ 16, -16 ]],
    '& > *': {
      margin: 16,
      width: '40%',
    },
  },
  wrapper: {
    overflow: 'hidden',
  },
};

const Products = ({ appState, state, classes, isMobile, setPage }) => {
  const { page, products: allProducts } = state;
  const { items } = appState;
  const total = allProducts.length;
  const offset = ((page - 1) * items);
  const products = allProducts.slice(offset, offset + items);

  return (
  <div className={classes.wrapper}>
    <ListHeader
      title="All Products"
      totalItems={total}
    />
    <Grid container spacing={isMobile ? 8 : 16}>
      {products.map((p, i) => {
        return <Grid item xs={6} sm={4} md={3} lg={2} key={p._id}>
          <ProductCard
            title={p.name}
            description={p.description}
            price={p.price}
            image={p.image}
          />
        </Grid>;
      })}
    </Grid>
    <ListFooter
      confirmPage={setPage}
      page={page}
      itemsPerPage={items}
      totalItems={total}
    />
  </div>
);
};

export default compose(
  connect(
    state => ({
      state: state.productReducer,
      appState: state.appReducer,
    }),
    dispatch => ({
      setPage(p) {
        return dispatch(actions.setPage(p));
      },
      fetchProducts() {
        return dispatch(actions.fetchProducts());
      },
    })
  ),
  lifecycle({
    componentWillMount() {
      this.props.fetchProducts();
    },
  }),
  withSizes(({ width }) => ({
    isMobile: width < 600,
  })),
  injectSheet(styles)
)(Products);

