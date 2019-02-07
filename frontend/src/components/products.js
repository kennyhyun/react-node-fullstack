import React from 'react';
import injectSheet from 'react-jss'
import { connect } from 'react-redux';
import { compose, lifecycle, withProps, withHandlers } from 'recompose';
import 'url-search-params-polyfill';

import { ProductGrid, ListHeader, ListFooter } from 'react-components';

import * as actions from '../actions/product';
import { getParam } from '../history';
import { fetchData, getNewPage } from '../utils';

const styles = {
  wrapper: {
    overflow: 'hidden',
  },
};

const Products = ({
  location: { pathname, search } = {},
  history,
  searchParam,
  state,
  classes,
  isMobile,
  setPage,
  setItemsPerPage
}) => {
  const { itemsPerPage: items = 8, page } = searchParam;
  const { total, products } = state;

  const lastPage = Math.ceil(total / items);
  if (lastPage && page > lastPage) {
    const sp = new URLSearchParams(search);
    sp.set('page', lastPage);
    history.replace(pathname + '?' + sp.toString());
  };

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
    (state, props) => {
      const { location: { search } = {} } = props;
      const sp = new URLSearchParams(search);
      const itemsPerPage = sp.get('itemsPerPage') || 8;
      const page = sp.get('page') || 1;
      const offset = ((page - 1) * itemsPerPage);
      return {
        state: {
          ...state.productReducer,
          products: state.productReducer.products.slice(offset, offset + itemsPerPage),
        },
      };
    },
    dispatch => ({
      fetchProducts(...args) {
        return dispatch(actions.fetchProducts(...args));
      },
    })
  ),
  lifecycle({
    componentWillMount() {
      const {
        fetchProducts,
        location: { search } = {},
        state,
      } = this.props;
      const param = getParam(search);
      fetchData(fetchProducts, {
        currentPage: param.page || 1,
        itemsPerPage: param.itemsPerPage || 8,
        currentItemCount: state.itemCount,
        totalCount: state.total,
      });
    },
  }),
  withHandlers({
    setItemsPerPage: ({
      location: { pathname, search },
      history,
      fetchProducts,
      state,
    }) =>
      items => {
        const page = getNewPage(getParam(search), items);
        const sp = new URLSearchParams(search);
        sp.set('itemsPerPage', items);
        if (page) {
          sp.set('page', page);
        }
        history.push(pathname + '?' + sp.toString());
        fetchData(fetchProducts, {
          currentPage: page,
          itemsPerPage: items,
          currentItemCount: state.itemCount,
          totalCount: state.total,
        });
      },
    setPage: ({
      location: { pathname, search },
      history,
      fetchProducts,
      state,
    }) =>
      p => {
        const sp = new URLSearchParams(search);
        sp.set('page', p);
        history.push(pathname + '?' + sp.toString());
        fetchData(fetchProducts, {
          currentPage: p,
          itemsPerPage: sp.get('itemsPerPage') || 8,
          currentItemCount: state.itemCount,
          totalCount: state.total,
        });
      },
  }),
  withProps(({ location = {} }) => {
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

