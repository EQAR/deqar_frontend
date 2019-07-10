import React from 'react';
import { BasicText, asField } from 'informed';
import cx from 'classnames';

const FormTextField = asField(({ fieldState, placeholder, disabled, className, ...props }) => (
  <React.Fragment>
    <BasicText
      fieldState={fieldState}
      placeholder={disabled ? "" : placeholder}
      readOnly={disabled}
      {...props}
      className={cx(fieldState.error ? ' form-control is-invalid' : ' form-control', className)}
    />
    {fieldState.error ? (
      <small name="scroll-to-element" className="help-block form-text text-danger">{fieldState.error}</small>
    ) : null}
  </React.Fragment>
));

export default FormTextField;
