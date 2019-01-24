import React from 'react';
import { asField } from 'informed';

const FormFileUploadField = asField(({ fieldState, fieldApi, ...props }) => {
  const { setValue, setTouched } = fieldApi;
  const { onChange, onBlur, initialValue, forwardedRef, ...rest } = props;

  return (
    <React.Fragment>
      <input
        style={{display: 'block'}}
        type={'file'}
        accept='.doc,.docx,.pdf'
        {...rest}
        onChange={(e) => {
          setValue(e.target.files[0]);
          if (onChange) {
            onChange(e.target.files[0]);
          }
        }}
        onBlur={e => {
          setTouched();
          if (onBlur) {
            onBlur(e);
          }
        }}
      />
    </React.Fragment>
  )
});

export default FormFileUploadField;