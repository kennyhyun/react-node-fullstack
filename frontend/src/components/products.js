import React from 'react';

import { ListHeader } from 'react-components';

const ListFooter = ({ page }) => <div>{`page ${page}`}</div>;

const Products = ({ page }) => (
  <>
    <ListHeader title="All Products" />
    <div>
      list
    </div>
    <ListFooter page={page} />
  </>
);

export default Products;

