import React from 'react';
import { Checkbox, asField } from 'informed';
import style from "./FormCheckbox.module.css"

const FormCheckbox = asField(({ fieldState, placeholder, className, ...props }) => (
  <React.Fragment>
    <Checkbox
      className={style.Checkbox}
      {...props}
    />
    {fieldState.error ? (
      <small name="scroll-to-element" className="help-block form-text text-danger">{fieldState.error}</small>
    ) : null}
  </React.Fragment>
));

export default FormCheckbox;
