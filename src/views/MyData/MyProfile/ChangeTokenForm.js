import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormGroup, Label
} from 'reactstrap';
import { Form, Text } from 'informed';
import LaddaButton, { EXPAND_RIGHT } from '@zumper/react-ladda';
import { toast } from 'react-toastify';
import auth from '../../../services/Auth';
import axiosBearerInterceptor from "../../../utils/axios.bearer_token";

class ChangeTokenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  getCurrentToken = () => {
    return {api_token: auth.getToken()};
  };

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
    auth.postToken(value).then((response) => {
      this.loadingToggle();
      auth.saveToken(response.data.token);
      toast.success("Token has been updated!");
      this.formApi.setValue('api_token', response.data.token);
      axiosBearerInterceptor();
    }).catch((error) => {
      this.loadingToggle();
      toast.error("There was a problem updating your API token.");
    });
  };

  render() {
    return (
      <Card>
        <CardHeader>
          <Row>
            <Col>Change API Token</Col>
          </Row>
        </CardHeader>
        <Form
          getApi={this.setFormApi}
          onSubmit={this.onSubmit}
          id="change-token-form"
          initialValues={this.getCurrentToken()}
        >
          <CardBody>
            <FormGroup>
              <Label htmlFor="api_token">API Token</Label>
              <Text field="api_token" id="apiToken" className={'form-control'} readOnly={true}/>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <LaddaButton
              className="btn btn-primary btn-ladda btn-sm"
              loading={this.state.loading}
              data-color="blue"
              data-style={EXPAND_RIGHT}>
              Submit
            </LaddaButton>
          </CardFooter>
        </Form>
      </Card>
    );
  }
}

export default ChangeTokenForm;
