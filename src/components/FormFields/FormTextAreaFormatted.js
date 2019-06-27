import React from 'react';
import {asField} from "informed";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const FormTextAreaFormatted = asField(({ fieldState, fieldApi, ...props }) => {
  let { value } = fieldState;
  const { setValue, setError } = fieldApi;
  const { onChange, disabled, ...rest } = props;

  const configuration = {
    toolbar: [ 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList' ],
  };

  return (
    <React.Fragment>
      <div className={disabled ? 'textAreaFormatted-disabled' : 'textAreaFormatted'}>
        <CKEditor
          {...rest}
          config={disabled ? {toolbar: []} : configuration}
          editor={ ClassicEditor }
          data={value}
          disabled={disabled}
          onChange={ ( event, editor ) => {
            const data = editor.getData();
            setError('');
            setValue(data);
            if (onChange) {
              onChange(data);
            }
          }}
        />
      </div>
      {fieldState.error ? (
        <small className="help-block form-text text-danger">{fieldState.error}</small>
      ) : null}
    </React.Fragment>
  );
});

export default FormTextAreaFormatted;