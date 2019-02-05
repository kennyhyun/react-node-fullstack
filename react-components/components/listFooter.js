import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import ForwardIcon from '@material-ui/icons/KeyboardArrowRight';

import { Row } from './common';
import { Pagination } from './pagination';

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  content: {
    display: 'flex',
  }
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
        <Pagination pages={pages} page={page} confirmPage={confirmPage}/>
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
