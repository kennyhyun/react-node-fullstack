import React from 'react';
import injectSheet from 'react-jss'
import { connect } from 'react-redux';
import { compose, lifecycle, withProps, withHandlers } from 'recompose';
import 'url-search-params-polyfill';

import { ProductGrid, ListHeader, ListFooter } from 'react-components';

import * as actions from '../actions/product';
import { getParam } from '../history';

const styles = {
  wrapper: {
    overflow: 'hidden',
  },
};

const Products = ({ searchParam, state, classes, isMobile, setPage, setItemsPerPage }) => {
  const { products: allProducts } = state;
  const { itemsPerPage: items = 8, page } = searchParam;
  const total = allProducts.length;
  const offset = ((page - 1) * items);
  const products = allProducts.slice(offset, offset + items);

  return (
    <div className={classes.wrapper}>
      <ListHeader
        title="All Products"
        totalItems={total}
        itemsPerPage={items}
        confirmItemsPerPage={setItemsPerPage}
      />
      <ProductGrid
        items={products}
      />
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
  withHandlers({
    setItemsPerPage: ({
      location: { pathname, search },
      history,
    }) =>
      items => {
        const sp = new URLSearchParams(search);
        sp.set('itemsPerPage', items);
        history.push(pathname + '?' + sp.toString());
      },
    setPage: ({
      location: { pathname, search },
      history,
    }) =>
      p => {
        const sp = new URLSearchParams(search);
        sp.set('page', p);
        history.push(pathname + '?' + sp.toString());
      },
  }),
  withProps(({ location }) => {
    const { search } = location;
    const searchParam = getParam(search);
    return {
      searchParam: {
        page: Number(searchParam.page || 1),
        itemsPerPage: Number(searchParam.itemsPerPage || 8),
      }
    };
  }),
  injectSheet(styles)
)(Products);

