import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

class LoginAlert extends React.Component {
  onDismiss = () => {
    this.props.onClose();
  };

  render() {
    const {visible} = this.props;

    return (
      <Alert color="danger" isOpen={visible} toggle={this.onDismiss}>
        The given username and password is not correct!
      </Alert>
    );
  }
}

LoginAlert.defaultProps = {
  visible: false
};

LoginAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default LoginAlert;
