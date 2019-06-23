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
import FormDatePickerField from "../../../components/FormFields/FormDatePickerField";
import FormTextArea from "../../../components/FormFields/FormTextArea";
import { validateRequired, validateRequiredPastDate } from "../../../utils/validators";

class FormerNameForm extends Component {

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

  onToggle = () => {
    this.props.onToggle();
  }

  renderActionName = () => {
    const { formIndex, disabled } = this.props;
    let action = '';

    if (Number.isInteger(formIndex)) {
      action = disabled ? 'View' : 'Edit'
    } else {
      action = 'Add'
    }

    return action;
  }

  render() {
    const { modalOpen, disabled, formIndex, fieldName } = this.props;
    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex, fieldName)}
          id="former-name-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader toggle={this.onToggle}>{this.renderActionName()} Former Name</ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="former_name_official" className={'required'}>Institution Name, Official</Label>
                      <FormTextField
                        field={'name_official'}
                        placeholder={'Enter official institution name'}
                        validate={validateRequired}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="name_official_transliterated">Institution Name, Transliterated</Label>
                      <FormTextField
                        field={'name_official_transliterated'}
                        placeholder={'Enter transliterated form'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="name_english">Institution Name, English</Label>
                      <FormTextField
                        field={'name_english'}
                        placeholder={'Enter english form'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="pull-right">
                      <Button
                        type={'button'}
                        size="sm"
                        color="secondary"
                      >Add More...</Button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="acronym">Institution Acronym</Label>
                      <FormTextField
                        field={'acronym'}
                        placeholder={'Enter acronym'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="valid_to" className={'required'}>Valid To</Label>
                      <FormDatePickerField
                        field={'name_valid_to'}
                        placeholderText={'YYYY-MM-DD'}
                        validate={validateRequiredPastDate}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="name_english">Name source Note</Label>
                      <FormTextArea
                        field={'name_english'}
                        placeholder={'Enter name source information'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  type={'button'}
                  onClick={this.props.onToggle}
                >
                  Close
                </Button>
                {!disabled ?
                  <Button
                    color="primary"
                    type={'button'}
                    onClick={this.submitForm}
                  >
                    Add Name
                  </Button> :
                  null
                }
              </ModalFooter>
            </React.Fragment>
          )}
          </Form>
      </Modal>
    )
  }
}

FormerNameForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  formValue: PropTypes.object,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default FormerNameForm;
