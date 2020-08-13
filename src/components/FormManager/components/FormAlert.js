import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

const FormAlert = ({visible, errorMessage, onClose, ...props}) => {
  const onDismiss = () => {
    onClose();
  };

  return (
    <Alert color="danger" isOpen={visible} toggle={onDismiss}>
      {errorMessage.map((msg, idx) => {
        return (
          <React.Fragment key={idx}>
            <span>{msg}</span>
            <br/>
          </React.Fragment>
        )
      })}
    </Alert>
  );
};

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
