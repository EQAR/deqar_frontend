import React from 'react';
import { asField } from 'informed';
import { Input } from 'reactstrap';
import cx from 'classnames';

import style from './FormTextArea.module.css'

const FormTextArea = asField(({ fieldState, placeholder, disabled, className, ...props }) => (
  <React.Fragment>
    <Input
      type="textarea"
      fieldState={fieldState}
      placeholder={disabled ? "" : placeholder}
      readOnly={disabled}
      {...props}
      className={cx(fieldState.error ? ' form-control is-invalid' : ' form-control', className, style.Textarea)}
    />
    {fieldState.error ? (
      <small className="help-block form-text text-danger">{fieldState.error}</small>
    ) : null}
  </React.Fragment>
));

export default FormTextArea;
