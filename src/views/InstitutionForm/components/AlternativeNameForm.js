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

import FormTextField from "../../../components/FormFields/FormTextField";
import { validateRequired } from "../../../utils/validators";

class AlternativeNameForm extends Component {
  constructor(props) {
    super(props);
  }

  setFormApi = (formApi) => {
    const { formValue } = this.props;
    this.formApi = formApi;
    if (formValue) {
      this.formApi.setValues(formValue);
    }
  }

  submitForm = () => {
    this.formApi.submitForm();
  }

  onAddButtonClick = () => {

  }

  onToggle = () => {
    this.props.onToggle();
  }

  renderActionName = () => {
    const {formIndex, disabled} = this.props;
    let action = '';

    if(formIndex >= 0) {
      action = disabled ? 'View' : 'Edit'
    } else {
      action = 'Add'
    }

    return action;
  }

  render() {
    const { modalOpen, disabled, formIndex, formValue, formState } = this.props;
    console.log(formState);


    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex)}
          id="alternative-name-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader toggle={this.onToggle}>Alternative Name</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="alternative_name">Alternative Institution Name</Label>
                      <FormTextField
                        field={'name'}
                        placeholder={'Enter alternative institution name'}
                        validate={validateRequired}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="name_transliterated">Alternative Institution Name, Transliterated</Label>
                      <FormTextField
                        field={'transliteration'}
                        placeholder={'Enter alternative institution name, transliterated'}
                        disabled={disabled}
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

AlternativeNameForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  formValue: PropTypes.object,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default AlternativeNameForm;
