import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { defaultProps, propTypes } from 'proptypes-helper';
import { getVisiblePageIndice } from './utils';

const styles = {
  selected: {
    backgroundColor: 'white',
  },
  root: {
    minWidth: 48,
  },
};

const types = {
  optional: {
    visibleLength: 10,
  },
  required: {
    page: 1,
    pages: 1,
    confirmPage: () => {},
  },
};

const Pagination = ({
  pages = 1,
  page = 1,
  visibleLength,
  confirmPage = () => {},
  classes,
}) => {
  const visible = getVisiblePageIndice(pages, page, visibleLength);
  const lastIndex = visible.slice(-1)[0];

  return (
    <Tabs
      value={Math.min(page, pages) - visible[0]}
      onChange={(_, i)  => confirmPage(i + visible[0])}
      indicatorColor="primary"
    >
      {visible.map(
        (p, i) => <Tab key={p} label={
          (i == (visible.length - 1) && lastIndex != pages) ? '...' : p
        } classes={classes}/>
      )}
    </Tabs>
);
};

Pagination.defaultProps = defaultProps(types);
Pagination.propTypes = propTypes(types);

const Enhanced = withStyles(styles)(Pagination);

export { Enhanced as Pagination };
