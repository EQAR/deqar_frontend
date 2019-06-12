import React, { Component } from 'react';
import {
  Button,
  Col,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row } from "reactstrap";
import PropTypes from 'prop-types';
import { Form } from 'informed';

import FormTextArea from "../../../components/FormFields/FormTextArea";
import FormSelectField from '../../../components/FormFields/FormSelectField';
import agency from '../../../services/Agency';


class FlagForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agencies: null
    }
  }

  componentDidMount = () => {
    agency.selectMyAgency().then((response, error) => this.setState({agencies: response.data}));
  }

  setFormApi = (formApi) => {

    const { formValue } = this.props;
    this.formApi = formApi;
    this.formApi.setValues(formValue);
  }

  submitForm = () => {
    this.formApi.submitForm();
  }

  onToggle = () => {
    this.props.onToggle();
  }

  renderActionName = () => {
    const { formIndex, disabled } = this.props;
    let action = '';

    if (formIndex >= 0) {
      action = disabled ? 'View' : 'Edit'
    } else {
      action = 'Add'
    }

    return action;
  }

  render() {
    const { modalOpen, disabled, formIndex } = this.props;
    const { agencies } = this.state;
    console.log(this.formApi);


    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex)}
          id="flag-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader toggle={this.onToggle}>{this.renderActionName()}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="agency" className={'required'}>Agency</Label>
                    <FormSelectField
                      field={'flags'}
                      options={agencies}
                      placeholder={'Please select'}
                      labelField={'acronym_primary'}
                      valueField={'id'}
                    />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="request" className={'required'}>Request</Label>
                      <FormSelectField
                        field={'flag'}
                        options={agencies}
                        placeholder={'Please select'}
                        labelField={'acronym_primary'}
                        valueField={'flag'}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="flag_message" className={'required'}>Explanation</Label>
                      <FormTextArea
                        field={'flag_message'}
                        placeholder={'Enter explanation, justification or description'}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  type={'button'}
                  onClick={this.props.onToggle}
                >
                  Close
                </Button>
              </ModalFooter>
            </React.Fragment>
          )}
          </Form>
      </Modal>
    )
  }
}

FlagForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  formValue: PropTypes.object,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default FlagForm;
