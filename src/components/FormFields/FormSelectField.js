import React from 'react';
import { asField } from 'informed';
import Select from 'react-select';

const FormSelectField = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const { onChange, onBlur, initialValue, forwardedRef, labelField, valueField, disabled, placeholder, ...rest } = props;

  const borderColor = fieldApi.getError() ? '#f86c6b' : '#e4e7ea';

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      '&:focus': {
        borderColor: 'none'
      },
    }),
    control: (provided, state) => ({
      ...provided,
      maxHeight: '35px',
      minHeight: '25px',
      '&:hover': {
        borderColor: 'none'
      },
      border: state.isDisabled ? 'unset' : `1px solid ${borderColor}`,
      backgroundColor: state.isDisabled ? '#FCFCFC' : '#FFFFFF'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? '#5c6873' : "#5C685C",
    }),
    option: (provided) => ({
      ...provided,
      whiteSpace: 'nowrap',
      overFlow: 'hidden',
      textOverFlow: 'ellipsis'
    }),
    indicatorsContainer: (provided, state) => ({
      display: state.isDisabled ? 'none' : 'flex'
    })
  };

  return (
    <React.Fragment>
      <Select
        {...rest}
        styles={customStyles}
        ref={forwardedRef}
        defaultValue={value || initialValue || ''}
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
        isDisabled={disabled}
        placeholder={disabled ? "" : placeholder}
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