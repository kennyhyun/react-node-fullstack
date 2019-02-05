import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { Row } from './common';
import { Preset as Select } from './select';

const styles = {
  rightWrapper: {
    float: 'right',
    marginTop: 16,
  },
};

const ListHeader = ({
  title,
  itemsPerPage = 8,
  totalItems = 0,
  confirmItemsPerPage = () => {},
  classes,
}) => (
  <div>
    <div className={classes.rightWrapper}>
      <Select
        name={`${itemsPerPage} per page`}
        id="items-per-page"
        value={'8'}
        items={['32', '16', '8', '4']}
        handleChange={(e, elm) => confirmItemsPerPage(elm.props.value)}
        formatLabel={t => `${t} per page`}
      />
    </div>
    <Typography variant="h5" component="h2">
      {title || 'List Header'}
    </Typography>
    <Typography color="textSecondary">
      {totalItems ? `${totalItems} products` : 'No item'}
    </Typography>
    <Divider />
  </div>
);

const Enhanced = withStyles(styles)(ListHeader);

export { Enhanced as ListHeader };
