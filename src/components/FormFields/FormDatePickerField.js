import React from 'react';
import {asField} from 'informed';
import DatePicker from "react-datepicker";
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";

const FormDatePickerField = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;
  const { onChange, onBlur, initialValue, placeholderText, disabled,...rest } = props;

  const setDateValue = (value) => {
    return value ? moment(value).format('YYYY-MM-DD') : null;
  };

  const getDateValue = (value) => {
    return value? moment(value, 'YYYY-MM-DD').toDate() : null;
  };

  return (
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
  )
});

export default FormDatePickerField;
