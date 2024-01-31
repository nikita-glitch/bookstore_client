import { TextField } from '@mui/material';
import * as React from 'react';
import styled from '@mui/styled-engine';
import hidePass from '../Logos/Hide.svg'
import viewPass from '../Logos/View.svg'
import Mail from '../Logos/Mail.svg'

const FormInput = ( props: { labelText: string, helperText: string, iconStyle: string }) => {
  return (
    <>
    <img className='icon' src={props.iconStyle === 'email' ? `${Mail}` : `${hidePass}`} alt=''/>
    <TextField
          id="filled-helperText"
          label={props.labelText}
          helperText={props.helperText}
          variant="filled"
        />
    </> 
  );
}
  const CustomTextField = styled(TextField)`

  `
export default FormInput;