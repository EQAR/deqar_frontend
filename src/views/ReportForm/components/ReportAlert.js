import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

class ReportAlert extends React.Component {
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

ReportAlert.defaultProps = {
  visible: false,
  errorMessage: []
};

ReportAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  errorMessage: PropTypes.array,
  onClose: PropTypes.func.isRequired
};

export default ReportAlert;
