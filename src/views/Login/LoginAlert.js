import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

const LoginAlert = ({visible, ...props}) => {
  const onDismiss = () => {
    props.onClose();
  };

  return (
    <Alert color="danger" isOpen={visible} toggle={onDismiss}>
      The given username and password is not correct!
    </Alert>
  );
};

LoginAlert.defaultProps = {
  visible: false
};

LoginAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default LoginAlert;
