import React from 'react';
import { asField } from 'informed';
import Select from 'react-select';

const FormSimpleSelect = asField(({ fieldState, fieldApi, ...props }) => {
  const { onChange, disabled, placeholder, value, isMulti, forwardedRef, initialValue, options, ...rest } = props;
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
  }


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
          onChange={(value, action) => changeValue(value, action)}
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
