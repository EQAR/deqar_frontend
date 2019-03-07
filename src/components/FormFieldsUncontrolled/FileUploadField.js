import React, {Component} from 'react';
import PropTypes from 'prop-types';

class FileUploadField extends Component {
  onChange = (e) => {
    this.props.onChange(e.target.files[0]);
  };

  render() {
    return (
      <React.Fragment>
        <input
          style={{display: 'block'}}
          type={'file'}
          accept='.doc,.docx,.pdf'
          onChange={this.onChange}
        />
      </React.Fragment>
    )
  };
}

FileUploadField.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default FileUploadField;