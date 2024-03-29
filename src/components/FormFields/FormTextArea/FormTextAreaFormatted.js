import React from 'react';
import {asField} from "informed";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import style from './FormTextAreaFormatted.module.css';

const FormTextAreaFormatted = asField(({ fieldState, fieldApi, onChange, disabled, height='100%', ...props }) => {
  const { value, error } = fieldState;
  const { setValue } = fieldApi;

  const options = {
    buttonList: [
      ['bold', 'underline', 'italic'],
      ['list'],
      ['removeFormat'],
      ['undo', 'redo']
    ],
    defaultStyle: 'font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif; ' +
      'font-size: 14px; color: #5c6873;',
    resizingBar : false
  };

  const handleChange = (content) => {
    setValue(content);
  };

  return (
    <React.Fragment>
      <div className={disabled ? style.SunEditorDisabled : style.SunEditor}>
        <SunEditor
          height={height}
          showToolbar={!disabled}
          disable={disabled}
          setContents={value === null ? "" : value}
          onChange={handleChange}
          setOptions={options}
        />
      </div>
      {fieldState.error ? (
        <small name="scroll-to-element" className="help-block form-text text-danger">{error}</small>
      ) : null}
    </React.Fragment>
  );
});

export default FormTextAreaFormatted;
