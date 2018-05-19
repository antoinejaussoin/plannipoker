import React, { SFC } from 'react';
import { TextField } from 'material-ui';

export interface InputProps {
  label: string;
  value: string;
  onChange: ( (value: string) => void);
}

const Input: SFC<InputProps> = ({ label, value, onChange }) => (
  <TextField
    label={label}
    value={value}
    onChange={e => onChange(e.target.value)}
    margin="normal" />
);

export default Input;
