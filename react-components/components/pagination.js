import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  selected: {
    backgroundColor: 'white',
  },
  root: {
    minWidth: 48,
  },
};

const Pagination = ({
  pages = 1,
  page = 1,
  confirmPage = () => {},
  classes,
}) => {
  return (
    <Tabs
      value={page - 1}
      onChange={(_, i)  => confirmPage(i + 1)}
      indicatorColor="primary"
    >
      {Array(pages).fill(null).map(
        (_, p) => <Tab key={p} label={p + 1} classes={classes}/>
      )}
    </Tabs>
);
};

const Enhanced = withStyles(styles)(Pagination);

export { Enhanced as Pagination };
