import React, {Component} from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  InputGroup,
  InputGroupAddon, InputGroupText,
  Row
} from 'reactstrap';
import { Form, Text } from 'informed';
import LaddaButton, { EXPAND_RIGHT } from '@zumper/react-ladda';
import { Link } from 'react-router-dom';
import {validateEmail} from '../../utils/validators';
import auth from '../../services/Auth'
import {checkFormCanBeSubmitted} from "../../utils/checkFormCanBeSubmitted";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alertOpen: false,
      successOpen: false,
    }
  }

  loadingToggle = () => {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    });
  };

  alertToggle = () => {
    this.setState({
      ...this.state,
      alertOpen: true,
      successOpen: false,
    })
  };

  successToggle = () => {
    this.setState({
      ...this.state,
      successOpen: true,
      alertOpen: false,
    })
  };

  closeAlerts = () => {
    this.setState({
      ...this.state,
      alertOpen: false,
      successOpen: false
    })
  };

  setFormApi = (formApi) => {
    this.formApi = formApi;
  };

  onSubmit = (value) => {
    this.loadingToggle();
    auth.resetPassword(value).then((response) => {
      this.loadingToggle();
      this.successToggle();
      this.formApi.reset();
    }).catch( error => {
      this.loadingToggle();
      this.alertToggle();
    });
  };

  render() {
    const {loading, successOpen, alertOpen} = this.state;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Forgot Password</h1>
                    <p className="text-muted">Please enter your registered e-mail address.</p>
                    <Alert color="success" isOpen={successOpen} toggle={this.closeAlerts}>
                      Password reset instructions were sent to your submitted email address!
                    </Alert>
                    <Alert color="danger" isOpen={alertOpen} toggle={this.closeAlerts}>
                      The given e-mail address is not registered in DEQAR!
                    </Alert>
                    <Form getApi={this.setFormApi} onSubmit={this.onSubmit} id="forgot-password-form">
                      {({ formApi }) => (
                        <div>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-envelope"> </i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Text
                              field="email"
                              id="email"
                              validate={validateEmail}
                              validateOnChange
                              validateOnBlur
                              className="form-control"
                              placeholder="E-mail address"/>
                          </InputGroup>
                          <Row>
                            <Col xs="6">
                              <LaddaButton
                                className="btn btn-primary btn-ladda"
                                loading={loading}
                                data-color="blue"
                                disabled={checkFormCanBeSubmitted(formApi.getState())}
                                data-style={EXPAND_RIGHT}
                                type="submit">Request</LaddaButton>
                            </Col>
                            <Col xs="6" className="text-right">
                              <Link to='/login'>
                                <Button color="link" className="px-0">Login</Button>
                              </Link>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>DEQAR - Reset your password</h2>
                      <p>By submitting a valid e-mail address a mail will arrive to your mailbox with the details of resetting your password.</p>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgotPassword;
