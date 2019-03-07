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
import {Form, Text} from 'informed';
import LaddaButton, {EXPAND_RIGHT} from "react-ladda";
import 'ladda/dist/ladda-themeless.min.css';
import { toast } from 'react-toastify';
import {checkFormCanBeSubmitted} from "../../utils/checkFormCanBeSubmitted";
import FormTextField from "../../components/FormFields/FormTextField";
import {validateEmail, validateRequired, validateValuesMatch} from "../../utils/validators";
import user from '../../services/User';
import {connect} from "react-redux";
import setEmail from "../../components/DefaultLayout/actions/setEmail";

class ChangeEmailForm extends Component {
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

  validateNewEmail = (value, values) => {
    if(validateRequired(value)) {
      this.formApi.setError("re_new_email", 'Both fields are required!');
      return "error"
    }
    if(validateValuesMatch(value, values.re_new_email)) {
      this.formApi.setError("re_new_email", 'Emails do not match!');
      return "error"
    }
    if(validateEmail(value)) {
      this.formApi.setError("re_new_email", 'Emails should be properly formatted!');
      return "error"
    }
    this.formApi.setError("re_new_email", null);
  };

  validateConfirmNewEmail = (value, values) => {
    if(validateRequired(value)) {
      return 'Both fields are required!';
    }
    if(validateValuesMatch(value, values.re_new_email)) {
      return 'Emails do not match!';
    }
    if(validateEmail(value)) {
      return 'Emails should be properly formatted!';
    }
    this.formApi.setError("new_email", null);
  };

  onSubmit = (value) => {
    const {setEmail} = this.props;
    this.loadingToggle();
    user.setNewEmail(value).then((response) => {
      this.loadingToggle();
      toast.success("Email has been updated!");
      setEmail(response.data.email);
      this.formApi.reset();
    }).catch( error => {
      this.loadingToggle();
      toast.error("There was a problem updating your email.");
    });
  };

  render() {
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col>Change Email</Col>
          </Row>
        </CardHeader>
        <Form getApi={this.setFormApi} onSubmit={this.onSubmit} id="change-email-form">
          {({ formApi }) => (
            <div>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="new_email" className="required-input">New Email</Label>
                  <Text
                    field="new_email"
                    validate={this.validateNewEmail}
                    validateOnChange
                    validateOnBlur
                    className={'form-control'}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="re_new_email" className="required-input">Confirm New Email</Label>
                  <FormTextField
                    field="re_new_email"
                    validate={this.validateConfirmNewEmail}
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

const mapDispatchToProps = (dispatch) => {
  return {
    setEmail: email => {
      dispatch(setEmail(email))
    }
  }
};

export default connect(null, mapDispatchToProps)(ChangeEmailForm);