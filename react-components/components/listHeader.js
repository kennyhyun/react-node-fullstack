import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Row } from './common';

const ListHeader = ({
  title
}) => (
  <Row>
    {title || 'List Header'}
  </Row>
);

export { ListHeader };
