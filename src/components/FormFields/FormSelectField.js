import React from 'react';
import { asField } from 'informed';
import Select from 'react-select';

const FormSelectField = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const { onChange, onBlur, initialValue, forwardedRef, labelField, valueField, ...rest } = props;

  const borderColor = fieldApi.getError() ? '#f86c6b' : '#e4e7ea';

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      '&:focus': {
        borderColor: 'none'
      }
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: borderColor,
      maxHeight: '35px',
      minHeight: '25px',
      '&:hover': {
        borderColor: 'none'
      }
    })
  };

  return (
    <React.Fragment>
      <Select
        {...rest}
        styles={customStyles}
        ref={forwardedRef}
        value={value || initialValue || ''}
        onChange={(value, action) => {
          setValue(value);
          if (onChange) {
            onChange(value);
          }
        }}
        onBlur={e => {
          setTouched();
          if (onBlur) {
            onBlur(e);
          }
        }}
        isClearable={true}
        getOptionLabel={(option) => {return option[labelField]}}
        getOptionValue={(option) => {return option[valueField]}}
      />
      {fieldState.error ? (
        <small className="help-block form-text text-danger">{fieldState.error}</small>
      ) : null}
    </React.Fragment>
  )
});

export default FormSelectField;