import React from 'react';
import { BasicText, asField } from 'informed';
import Select from 'react-select';
import {Badge} from "reactstrap";
import style from './FormSelectField.module.scss';

const FormSelectField = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;
  const { onChange, onBlur, initialValue, forwardedRef, labelField, valueField, disabled, placeholder, includeID,
    isMulti, ...rest } = props;

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

  const getLabel = (option) => {
    if(includeID) {
      return (<React.Fragment>{option[labelField]} <Badge className={style.Badge}>{option['id']}</Badge></React.Fragment>)
    } else {
      return option[labelField]
    }
  };

  const getValue = () => {
    const val = value || initialValue || '';

    if(isMulti) {
      const vals =  val.map((v) => {
        if(v.hasOwnProperty(labelField)) {
          return v[labelField]
        } else{
          return ''
        }
      });
      return vals.join(', ');
    } else {
      if(val.hasOwnProperty(labelField)) {
        return val[labelField]
      } else {
        return ''
      }
    }
  };

  return (
    <React.Fragment>
      {disabled ?
        <input
          disabled={disabled}
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
          onChange={(value, action) => {
            setError('');
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
          getOptionLabel={getLabel}
          getOptionValue={(option) => {return option[valueField]}}
        />
      }
      {fieldState.error ? (
        <small className="help-block form-text text-danger">{fieldState.error}</small>
      ) : null}
    </React.Fragment>
  )
});

FormSelectField.defaultProps = {
  includeID: false
};

export default FormSelectField;