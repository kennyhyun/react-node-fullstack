import React from 'react';
import Grid from '@material-ui/core/Grid';
import withSizes from 'react-sizes';

import { ProductCard } from './productCard';

const ProductGrid = ({ items, isMobile }) => (
  <Grid container spacing={isMobile ? 8 : 16}>
    {items.map((p, i) => {
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
);

const Enhanced = withSizes(({ width }) => ({
  isMobile: width < 600,
}))(ProductGrid);

export { Enhanced as ProductGrid };
