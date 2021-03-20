import React from 'react';
import {asField} from 'informed';
import DatePicker from "react-datepicker";
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";
import {FormText} from "reactstrap";
import style from './FormDatePickerField.module.css';
import PropTypes from "prop-types";
import FormAssignedList from "../FormAssignedList/FormAssignedList";

const FormDatePickerField = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;
  const { onChange, onBlur, initialValue, placeholderText, disabled, yearPlus, ...rest } = props;

  const setDateValue = (value) => {
    return value ? moment(value).format('YYYY-MM-DD') : '';
  };

  const getDateValue = (value) => {
    return value? moment(value, 'YYYY-MM-DD').toDate() : value;
  };

  const onYearPlusClick = () => {
    const { yearPlusValue } = props;
    let valid_to;

    if(yearPlusValue) {
      if(!value) {
        valid_to = moment(yearPlusValue);
      } else {
        valid_to = moment(value);
      }
      setValue(valid_to.add(1, 'y').format('YYYY-MM-DD'))
    }
  };

  return (
    <React.Fragment>
    <div className={'datepicker'}>
      <DatePicker
        selected={ getDateValue(value) }
        showYearDropdown
        {...rest}
        dateFormat="yyyy-MM-dd"
        className={fieldState.error ? 'form-control is-invalid' : 'form-control'}
        readOnly={disabled}
        placeholderText={disabled ? '' : placeholderText}
        onSelect={(value) => {
          setError('');
          setValue(setDateValue(value));
          if (onChange) {
            onChange(setDateValue(value));
          }
        }}
        onChange={value => {
          setTouched();
          if (onBlur) {
            onBlur(value);
          }
        }}
      />
      {fieldState.error ? (
        <small name="scroll-to-element" className="help-block form-text text-danger">{fieldState.error}</small>
      ) : null}
    </div>
    {disabled || !yearPlus ? "" :
      <FormText color="muted">
        <span onClick={onYearPlusClick} className={style.yearPlus}>
          +1 Year
        </span>
      </FormText>
    }
    </React.Fragment>
  )
});


FormAssignedList.defaultValues = {
  yearPlus: false,
  disabled: false
};

FormAssignedList.propTypes = {
  field: PropTypes.string.isRequired,
  validate: PropTypes.func,
  placeholderText: PropTypes.string,
  disabled: PropTypes.bool,
  yearPlusValue: PropTypes.string,
  yearPlus: PropTypes.bool
};

export default FormDatePickerField;
