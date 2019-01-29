import React from 'react';
import {asField} from 'informed';
import DatePicker from "react-datepicker";
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";

const FormDatePickerField = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const { onChange, onBlur, initialValue,...rest } = props;

  return (
    <div className={'datepicker'}>
      <DatePicker
        selected={value ? moment(value, 'YYYY-MM-DD').toDate() : null}
        showYearDropdown
        {...rest}
        dateFormat="yyyy-MM-dd"
        className={fieldState.error ? 'form-control is-invalid' : 'form-control'}
        onSelect={(value) => {
          setValue(moment(value).format('YYYY-MM-DD'));
          if (onChange) {
            onChange(moment(value).format('YYYY-MM-DD'));
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
        <small className="help-block form-text text-danger">{fieldState.error}</small>
      ) : null}
    </div>
  )
});

export default FormDatePickerField;