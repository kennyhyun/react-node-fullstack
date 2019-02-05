import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Preset = ({
  name,
  id,
  items,
  value,
  handleChange,
  formatLabel = text => text,
  classes,
}) => {
  return (
    <Select
      value={value}
      onChange={handleChange}
      inputProps={{ name, id }}
      variant="outlined"
      disableUnderline
    >
      {items.map(text => <MenuItem key={text} value={text}>{formatLabel(text)}</MenuItem>)}
    </Select>
  );
};

export { Preset };
