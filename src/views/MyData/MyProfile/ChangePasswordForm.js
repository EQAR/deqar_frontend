import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormGroup,
  Label
} from 'reactstrap';
import {Form} from 'informed';
import LaddaButton, {EXPAND_RIGHT} from "@zumper/react-ladda";
import { toast } from 'react-toastify';
import {checkFormCanBeSubmitted} from "../../../utils/checkFormCanBeSubmitted";
import FormTextField from "../../../components/FormFields/FormTextField/FormTextField";
import {validateRequired, validateValuesMatch} from "../../../utils/validators";
import user from '../../../services/User';

class ChangePasswordForm extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      loading: false,
    }
  }

  loadingToggle() {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    });
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  };

  validateNewPassword = (value, values) => {
    if(validateRequired(value)) {
      this.formApi.setError("re_new_password", 'All fields are required!');
    }
    if(validateValuesMatch(value, values.re_new_password)) {
      this.formApi.setError("re_new_password", 'Passwords do not match!');
    }
    this.formApi.setError("re_new_password", null);
    return null;
  };

  validateConfirmNewPassword = (value, values) => {
    if(validateRequired(value)) {
      return 'All fields are required!';
    }
    if(validateValuesMatch(value, values.new_password)) {
      return 'Passwords do not match!';
    }
    this.formApi.setError("new_password", null);
    return null;
  };

  onSubmit = (value) => {
    this.loadingToggle();
    user.setNewPassword(value).then((response) => {
      this.loadingToggle();
      toast.success("Password has been updated!");
      this.formApi.reset();
    }).catch( error => {
      if (error.response.status === 400) {
        Object.keys(error.response.data).forEach(key => {
          const value = error.response.data[key].join(" ");
          this.formApi.setError(key, value);
        });
      }
      this.loadingToggle();
      toast.error("There was a problem updating your password.");
    });
  };

  render() {
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col>Change Password</Col>
          </Row>
        </CardHeader>
        <Form getApi={this.setFormApi} onSubmit={this.onSubmit} id="change-password-form">
          {({ formApi }) => (
            <div>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="current_password" className="required-input">Current Password</Label>
                  <FormTextField
                    field="current_password"
                    type={'password'}
                    validate={validateRequired}
                    validateOnChange
                    validateOnBlur
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="new_password" className="required-input">New Password</Label>
                  <FormTextField
                    field="new_password"
                    type={'password'}
                    validate={this.validateNewPassword}
                    validateOnChange
                    validateOnBlur
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="re_new_password" className="required-input">Confirm New Password</Label>
                  <FormTextField
                    field="re_new_password"
                    type={'password'}
                    validate={this.validateConfirmNewPassword}
                    validateOnChange
                    validateOnBlur
                  />
                </FormGroup>
              </CardBody>
              <CardFooter>
                <LaddaButton
                  className="btn btn-primary btn-ladda btn-sm"
                  loading={this.state.loading}
                  data-color="blue"
                  disabled={checkFormCanBeSubmitted(formApi.getState())}
                  data-style={EXPAND_RIGHT}>
                  Submit
                </LaddaButton>
              </CardFooter>
            </div>
          )}
        </Form>
      </Card>
    );
  }
}

export default ChangePasswordForm;
