import React, {Component} from 'react';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon, InputGroupText, Alert,
} from 'reactstrap';
import { Form, Text } from 'informed';
import {Link} from 'react-router-dom';
import LaddaButton, {EXPAND_RIGHT} from 'react-ladda';
import 'ladda/dist/ladda-themeless.min.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {checkFormCanBeSubmitted} from '../../utils/checkFormCanBeSubmitted';
import auth from '../../services/Auth';
import FormInputGroupTextField from "../../components/FormFields/FormInputGroupTextField";
import {validateRequired, validateValuesMatch} from "../../utils/validators";

class PasswordResetConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alertOpen: false,
      uid: props.match.params.uid,
      token: props.match.params.token,
      errorMessage: ""
    }
  }

  loadingToggle = () => {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    });
  };

  setFormApi = (formApi) => {
    this.formApi = formApi;
  };

  onSubmit = (value) => {
    this.loadingToggle();
    value['uid'] = this.state.uid;
    value['token'] = this.state.token;
    auth.resetPasswordConfirm(value).then( response => {
      this.loadingToggle();
      this.formApi.reset();
      toast.success("Password has been updated! Redirecting to login...", {
        onClose: () => this.props.history.push('/login')
      });
    }).catch( error => {
      if("non_field_errors" in error.response.data) {
        this.setState({
          ...this.state,
          errorMessage: "Password reset link was already used.",
          alertOpen: true
        });
      } else {
        this.setState({
          ...this.state,
          errorMessage: error.response.data["new_password"].join(),
          alertOpen: true
        });
      }
      this.loadingToggle();
    });
  };

  closeAlert = () => {
    this.setState({
      ...this.state,
      alertOpen: false,
    })
  };

  validateNewPassword = (value, values) => {
    if(validateRequired(value)) {
      this.formApi.setError("re_new_password", 'Both fields are required!');
      return "error"
    }
    if(validateValuesMatch(value, values.re_new_password)) {
      this.formApi.setError("re_new_password", 'Passwords do not match!');
      return "error"
    }
    this.formApi.setError("re_new_password", null);
    return null;
  };

  validateConfirmNewPassword = (value, values) => {
    if(validateRequired(value)) {
      return 'Both fields are required!';
    }
    if(validateValuesMatch(value, values.new_password)) {
      return 'Passwords do not match!';
    }
    this.formApi.setError("new_password", null);
    return null;
  };

  render() {
    const {alertOpen, errorMessage} = this.state;
    const containerStyle = {
      zIndex: 1999
    };

    return (
      <div className="app flex-row align-items-center">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          draggable={false}
          style={containerStyle}
        />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Change Password</h1>
                    <p className="text-muted">Please enter your new password!</p>
                    <Alert color="danger" isOpen={alertOpen} toggle={this.closeAlert}>
                      {errorMessage}
                    </Alert>
                    <Form getApi={this.setFormApi} onSubmit={this.onSubmit} id="forgot-password-confirm-form">
                      {({ formApi }) => (
                        <div>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"> </i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Text
                              field="new_password"
                              id="new_password"
                              type="password"
                              placeholder="Password"
                              className={'form-control'}
                              validate={this.validateNewPassword}
                              validateOnChange
                              validateOnBlur
                            />
                          </InputGroup>
                          <FormInputGroupTextField
                            field="re_new_password"
                            id="re_new_password"
                            type="password"
                            addonType={'prepend'}
                            iconClass={'icon-lock'}
                            inputGroupClass={'mb-3'}
                            placeholder="Retype Password"
                            validate={this.validateConfirmNewPassword}
                            validateOnChange
                            validateOnBlur
                          />
                          <Row>
                            <Col xs="6">
                              <LaddaButton
                                className="btn btn-primary btn-ladda"
                                loading={this.state.loading}
                                data-color="blue"
                                disabled={checkFormCanBeSubmitted(formApi.getState())}
                                data-style={EXPAND_RIGHT}>Request</LaddaButton>
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
                      <p>By submitting the form, your password will be changed immediately.</p>
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

export default PasswordResetConfirm;
