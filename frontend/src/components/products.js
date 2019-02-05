import React from 'react';
import injectSheet from 'react-jss'

import { ProductCard, ListHeader, ListFooter } from 'react-components';

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

const Products = ({ page, classes }) => (
  <div className={classes.wrapper}>
    <ListHeader title="All Products" />
    <div className={classes.grid}>
      {Array(4).fill(null).map((_, i) => {
        return <ProductCard
            key={i}
            title={`title ${i}`}
            description={`description ${i}`}
            price={`$${i}.99`}
          />;
      })}
    </div>
    <ListFooter page={page} />
  </div>
);

export default injectSheet(styles)(Products);

