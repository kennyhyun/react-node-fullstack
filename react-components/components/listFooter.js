import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import ForwardIcon from '@material-ui/icons/KeyboardArrowRight';
import withSizes from 'react-sizes';
import { compose } from 'recompose';
import { defaultProps, propTypes } from 'proptypes-helper';

import { Row } from './common';
import { Pagination } from "./pagination";

const pgItem = {
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
};

const paginationStyles = {
  pgRoot: {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    textAlign: 'center',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  pgItem: pgItem,
  pgItemMobile: {
    ...pgItem,
    minWidth: 32,
  },
  pgActive: {
    backgroundColor: 'white',
    fontWeight: 600,
    borderBottom: [['solid', 2, 'gray']],
  },
};

const styles = {
  wrapper: {
    padding: 12,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  content: {
    display: 'flex',
  },
  ...paginationStyles,
};

const types = {
  optional: {
    itemsPerPage: 8,
    page: 1,
  },
  required: {
    totalItems: 0,
    confirmPage: () => {},
  },
};

const ListFooter = ({
  itemsPerPage,
  page,
  totalItems = 0,
  confirmPage = () => {},
  isMobile,
  isSmall,
  classes,
}) => {
  const pages = Math.ceil(totalItems / itemsPerPage) || 1;
  const isFirst = page <= 1 || pages === 1;
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
          pages={pages}
          page={page}
          confirmPage={confirmPage}
        />
        <Button disabled={isLast} onClick={() => move(1)}>
          Next page
          <ForwardIcon />
        </Button>
      </div>
    </div>
  );
};

ListFooter.defaultProps = defaultProps(types);
ListFooter.propTypes = propTypes(types);

const Enhanced = compose(
  withSizes(({ width }) => ({
    isMobile: width < 600,
    isSmall: width < 768,
  })),
  withStyles(styles)
)(ListFooter);

export { Enhanced as ListFooter };
