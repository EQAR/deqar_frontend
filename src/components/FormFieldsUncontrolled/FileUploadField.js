import React from 'react';
import PropTypes from 'prop-types';

const FileUploadField = (props) => {
  const onChange = (e) => {
    props.onChange(e.target.files[0]);
  };

  return (
    <React.Fragment>
      <input
        style={{display: 'block'}}
        type={'file'}
        accept='.doc,.docx,.pdf'
        onChange={onChange}
      />
    </React.Fragment>
  )
};

FileUploadField.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default FileUploadField;