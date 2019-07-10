import React from 'react';
import { asField } from 'informed';
import Select from 'react-select';
import { style } from './selectStyle';

const FormSelectField = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;
  const { onChange, onBlur, initialValue, forwardedRef, labelField, valueField, disabled, placeholder, includeID,
    isMulti, ...rest } = props;
  const borderColor = fieldApi.getError() ? '#f86c6b' : '#e4e7ea';
  const customStyles = style(borderColor);

  const getLabel = (option) => {
    if (includeID) {
      if (includeID === 'back') {
        return (<React.Fragment>{option[labelField]} - ID {option['id']}</React.Fragment>)
      } else {
        return (<React.Fragment>{option['id']} - {option[labelField]}</React.Fragment>)
      }
    } else {
      return option[labelField]
    }
  }

  const getValue = () => {

    if(isMulti) {
      const val = value || initialValue || [];

      const vals =  val.map((v) => {
        if (v.hasOwnProperty(labelField)) {
          return v[labelField]
        } else {
          return ''
        }
      });
      return vals.join(', ');
    } else {
      const val = value || initialValue || [];

      if(val.hasOwnProperty(labelField)) {
        return val[labelField]
      } else {
        return ''
      }
    }
  }

  const changeValue = value =>  {
    setError('');
    onChange ? onChange(value) : setValue(value);
  }

  return (
    <React.Fragment>
      {disabled ?
        <input
          readOnly={disabled}
          value={getValue()}
          {...rest}
          className={'form-control'}
        />
          :
        <Select
          {...rest}
          isMulti={isMulti}
          styles={customStyles}
          ref={forwardedRef}
          defaultValue={value || initialValue || ''}
          value={value || initialValue || ''}
          onChange={(value, action) => changeValue(value, action)}
          onBlur={e => {
            setTouched();
            if  (onBlur) {
              onBlur(e);
            }
          }}
          isDisabled={disabled}
          placeholder={disabled ? "" : placeholder}
          isClearable={true}
          getOptionLabel={getLabel}
          getOptionValue={(option) => option[valueField]}
        />
      }
      {fieldState.error ? (
        <small name="scroll-to-element" className="help-block form-text text-danger">{fieldState.error}</small>
      ) : null}
    </React.Fragment>
  )
})

FormSelectField.defaultProps = {
  includeID: false
}

export default FormSelectField;
