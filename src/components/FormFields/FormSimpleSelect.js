import React from 'react';
import { asField } from 'informed';
import Select from 'react-select';
import { style } from './selectStyle';

const FormSimpleSelect = asField(({ fieldState, fieldApi, ...props }) => {
  const { onChange, disabled, placeholder, value, isMulti, forwardedRef, initialValue, options, ...rest } = props;
  const borderColor = fieldApi.getError() ? '#f86c6b' : '#e4e7ea';
  const customStyles = style(borderColor);

  const changeValue = value =>  {
    onChange(value);
  }

  return (
    <React.Fragment>
      {disabled ?
        <input
          readOnly={disabled}
          value={value}
          {...rest}
          className={'form-control'}
        />
          :
        <Select
          {...rest}
          options={options}
          isMulti={isMulti}
          styles={customStyles}
          ref={forwardedRef}
          defaultValue={value || initialValue || ''}
          value={value || initialValue || ''}
          onChange={(value) => changeValue(value)}
          isDisabled={disabled}
          placeholder={disabled ? "" : placeholder}
          isClearable={true}
        />
      }
      {fieldState.error ? (
        <small className="help-block form-text text-danger">{fieldState.error}</small>
      ) : null}
    </React.Fragment>
  )
})

FormSimpleSelect.defaultProps = {
  includeID: false
}

export default FormSimpleSelect;
