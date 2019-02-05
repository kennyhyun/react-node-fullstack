import React from 'react';
import Grid from '@material-ui/core/Grid';
import withSizes from 'react-sizes';
import { defaultProps, propTypes } from 'proptypes-helper';

import { ProductCard } from './productCard';

const types = {
  optional: {
  },
  required: {
    items: [],
  },
};

const ProductGrid = ({ items, isMobile }) => (
  <Grid container spacing={isMobile ? 8 : 16}>
    {items.map((p, i) => {
      const id = p._id || p.id || (p.name ? `${p.name}-${i}` : i);
      return <Grid item xs={6} sm={4} md={3} lg={2} key={id}>
        <ProductCard
          title={p.name}
          description={p.description}
          price={p.price}
          image={p.image}
        />
      </Grid>;
    })}
  </Grid>
);

ProductGrid.defaultProps = defaultProps(types);
ProductGrid.propTypes = propTypes(types);

const Enhanced = withSizes(({ width }) => ({
  isMobile: width < 600,
}))(ProductGrid);

export { Enhanced as ProductGrid };
