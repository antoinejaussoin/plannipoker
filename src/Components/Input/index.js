import React from 'react';
import { TextField } from 'material-ui';

const Input = ({ label, value, onChange }) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    margin="normal" />
);

export default Input;
