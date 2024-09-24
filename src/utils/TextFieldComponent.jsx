import React from 'react'
import { TextField } from '@mui/material'

const TextFieldComponent = ({ label, name, placeholder, handleChange, handleBlur, values, desc, touched, errors, proId }) => {
  return (
    <TextField

      fullWidth
      autoComplete='off'
      variant='outlined'
      disabled={proId ? true : false}
      type='text'
      label={label}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values || ""}
      rows={desc ? 3 : 1}
      multiline
      error={!!
        touched && !!errors}
      helperText={touched && errors}
    />
  )
}

export default TextFieldComponent