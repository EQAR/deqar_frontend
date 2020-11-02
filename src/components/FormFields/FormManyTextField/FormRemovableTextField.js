import React from 'react';
import { BasicText, asField } from 'informed';
import cx from 'classnames';
import {Button, InputGroup, InputGroupAddon} from "reactstrap";

const FormRemovableTextField = asField(({ fieldState, placeholder, disabled, className, onRemoveButtonClick, ...props }) => (
  <React.Fragment>
    <InputGroup>
      <BasicText
        fieldState={fieldState}
        placeholder={disabled ? "" : placeholder}
        readOnly={disabled}
        {...props}
        className={cx(fieldState.error ? ' form-control is-invalid' : ' form-control', className)}
      />
      {!disabled && (
        <InputGroupAddon addonType="append">
          <Button
            color="secondary"
            onClick={(e) => onRemoveButtonClick()}
          >
            <i className="fa fa-trash-o"> </i>
          </Button>
        </InputGroupAddon>
      )}
    </InputGroup>
    {fieldState.error ? (
      <small name="scroll-to-element" className="help-block form-text text-danger">{fieldState.error}</small>
    ) : null}
  </React.Fragment>
));

export default FormRemovableTextField;
