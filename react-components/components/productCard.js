import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = {
  media: {
    height: 200,
    backgroundSize: 'contain',
  },
  title: {
    opacity: 0.6,
    lineHeight: '90%',
  },
  desc: {
    opacity: 0.6,
  },
  price: {
    lineHeight: '95%',
  },
  content: {
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  card: {
    borderRadius: 0,
    height: '100%',
  },
};

const ProductCard = ({
  image,
  title,
  price,
  description,
  classes,
}) => {
  return (
    <Card classes={{ root: classes.card }}>
      <CardMedia
        image={image}
        title={title}
        classes={{ root: classes.media }}
      />
      <Divider />
      <CardContent classes={{ root: classes.content }}>
        <Typography variant="h6" component="h3" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="subtitle2" component="p" className={classes.desc}>
          {description}
        </Typography>
        <Typography variant="h6" component="p" className={classes.price}>
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Enhanced = withStyles(styles)(ProductCard);

export { Enhanced as ProductCard };
