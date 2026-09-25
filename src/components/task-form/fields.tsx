import { MenuItem, TextField, type TextFieldProps } from '@mui/material';
import { categoryEntries, typeEntries } from '../../constants/taskOptions';

/** Native date/time pickers — no extra date library needed. */
export const DateField = (props: TextFieldProps) => (
  <TextField type="date" {...props} slotProps={{ inputLabel: { shrink: true } }} />
);

export const TimeField = (props: TextFieldProps) => (
  <TextField type="time" {...props} slotProps={{ inputLabel: { shrink: true } }} />
);

export const TypeSelect = (props: TextFieldProps) => (
  <TextField select label="Type" {...props}>
    {typeEntries.map(([value, { label }]) => (
      <MenuItem key={value} value={value}>
        {label}
      </MenuItem>
    ))}
  </TextField>
);

export const CategorySelect = (props: TextFieldProps) => (
  <TextField select label="Category" {...props}>
    {categoryEntries.map(([value, { label }]) => (
      <MenuItem key={value} value={value}>
        {label}
      </MenuItem>
    ))}
  </TextField>
);
