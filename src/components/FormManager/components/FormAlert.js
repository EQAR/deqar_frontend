import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

class FormAlert extends React.Component {
  onDismiss = () => {
    this.props.onClose();
  };

  render() {
    const {visible, errorMessage} = this.props;

    return (
      <Alert color="danger" isOpen={visible} toggle={this.onDismiss}>
        {errorMessage.map((msg) => {
          return (
            <React.Fragment>
              <span>{msg}</span>
              <br/>
            </React.Fragment>
          )
        })}
      </Alert>
    );
  }
}

FormAlert.defaultProps = {
  visible: false,
  errorMessage: []
};

FormAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  errorMessage: PropTypes.array,
  onClose: PropTypes.func.isRequired
};

export default FormAlert;
