import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import ForwardIcon from '@material-ui/icons/KeyboardArrowRight';
import Pagination from "react-js-pagination";

import { Row } from './common';

const paginationStyles = {
  pgRoot: {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    textAlign: 'center',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    '& li': {
      height: 32,
      minWidth: 48,
      lineHeight: 2.1,
      '& a': {
        textDecoration: 'none',
        color: 'inherit',
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  pgActive: {
    backgroundColor: 'white',
    fontWeight: 600,
    borderBottom: [['solid', 2, 'gray']],
  },
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  content: {
    display: 'flex',
  },
  ...paginationStyles,
};

const ListFooter = ({
  itemsPerPage = 8,
  page = 1,
  totalItems = 0,
  confirmPage = () => {},
  classes,
}) => {
  const pages = Math.floor(totalItems / itemsPerPage) + 1;
  const isFirst = page <= 1;
  const isLast = pages <= page;
  const move = diff => {
    if ((diff < 0 && !isFirst) || (diff > 0 && !isLast)) {
      confirmPage(Number(page) + Number(diff));
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Button disabled={isFirst} onClick={() => move(-1)}>
          <BackIcon />
          Previous page
        </Button>
        <Pagination
          hideFirstLastPages
          hideNavigation
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItems}
          activePage={page}
          pageRangeDisplayed={10}
          onChange={confirmPage}
          innerClass={classes.pgRoot}
          activeClass={classes.pgActive}
        />
        <Button disabled={isLast} onClick={() => move(1)}>
          Next page
          <ForwardIcon />
        </Button>
      </div>
    </div>
  );
};

const Enhanced = withStyles(styles)(ListFooter);

export { Enhanced as ListFooter };
