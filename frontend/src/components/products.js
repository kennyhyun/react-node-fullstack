import React from 'react';
import injectSheet from 'react-jss'
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { ProductCard, ListHeader, ListFooter } from 'react-components';

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
};

const Products = ({ appState, state, classes }) => {
  console.log(state, appState);
  const { page, products: allProducts } = state;
  const { items } = appState;
  const total = allProducts.length;
  // const pages = Math.floor(allProducts.length / items) + 1;
  const offset = ((page - 1) * items);
  const products = allProducts.slice(offset, offset + items);
  return (
  <div className={classes.wrapper}>
    <ListHeader title="All Products" />
    <div className={classes.grid}>
      {products.map((p, i) => {
        return <ProductCard
            key={p._id}
            title={p.name}
            description={p.description}
            price={p.price}
          />;
      })}
    </div>
    <ListFooter
      confirmPage={p => console.log(p)}
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
  injectSheet(styles)
)(Products);

