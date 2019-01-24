import React from 'react';
import { BasicText, asField } from 'informed';
import {InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import PropTypes from 'prop-types';


const FormInputGroupTextField = asField(({ fieldState, ...props }) => {
  const {addonType, inputGroupClass, iconClass, ...rest} = props;

  return(
    <React.Fragment>
      <InputGroup className={inputGroupClass}>
        <InputGroupAddon addonType={addonType}>
          <InputGroupText>
            <i className={iconClass}> </i>
          </InputGroupText>
        </InputGroupAddon>
        <BasicText
          fieldState={fieldState}
          {...rest}
          className={fieldState.error ? 'form-control is-invalid' : 'form-control'}
        />
      </InputGroup>
      {fieldState.error ? (
        <small className="help-block form-text text-danger">{fieldState.error}</small>
      ) : null}
    </React.Fragment>
  )
});

FormInputGroupTextField.defaultProps = {
  addonType: 'prepend',
  iconClass: 'icon-lock',
  inputGroupClass: 'mb-3'
};

FormInputGroupTextField.propTypes = {
  addonType: PropTypes.string,
  iconClass: PropTypes.string,
  inputGroupClass: PropTypes.string
};

export default FormInputGroupTextField;