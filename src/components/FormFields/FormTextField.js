import React from 'react';
import { BasicText, asField } from 'informed';

const FormTextField = asField(({ fieldState, placeholder, disabled, ...props }) => (
  <React.Fragment>
    <BasicText
      fieldState={fieldState}
      placeholder={disabled ? "" : placeholder}
      disabled={disabled}
      {...props}
      className={fieldState.error ? ' form-control is-invalid' : ' form-control'}
    />
    {fieldState.error ? (
      <small className="help-block form-text text-danger">{fieldState.error}</small>
    ) : null}
  </React.Fragment>
));

export default FormTextField;