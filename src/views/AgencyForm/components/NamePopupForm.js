import React, {Component} from 'react';
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import PropTypes from 'prop-types';
import {Form, Checkbox, TextArea} from 'informed';
import FormTextField from "../../../components/FormFields/FormTextField";
import style from './NamePopupForm.module.css';
import FormTextArrayField from "../../../components/FormFieldsUncontrolled/FormTextArrayField";
import FormDatePickerField from "../../../components/FormFields/FormDatePickerField";
import { validateRequiredDate } from "../../../utils/validators";

class NamePopupForm extends Component {
  setFormApi = (formApi) => {
    const { formValue } = this.props;
    this.formApi = formApi;
    if(formValue) {
      this.formApi.setValues(formValue);
    }
  };

  // Submit the form
  submitForm = () => {
    this.formApi.submitForm();
  };

  onToggle = () => {
    this.props.onToggle();
  };

  renderActionName = () => {
    const {formIndex, disabled} = this.props;
    let action = '';

    if(formIndex >= 0) {
      action = disabled ? 'View' : 'Edit'
    } else {
      action = 'Add'
    }

    return action;
  };

  render() {
    const {modalOpen, title, disabled, formIndex, nameType} = this.props;
    const titleText = `${this.renderActionName()} ${title}`;

    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex)}
          id={`file-popup-form-${formIndex}`}
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader>{titleText}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={12}>
                    <FormTextArrayField
                      field={'agency_name_versions'}
                      values={formState.values.agency_name_versions}
                      disabled={disabled}
                    >
                      <Row>
                        <Col md={10}>
                          <FormGroup>
                            <Label for="name">Agency Name</Label>
                            <FormTextField
                              field={'name'}
                              placeholder={'Enter agency name'}
                              disabled={disabled}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                            <Label for="name_is_primary">Primary</Label>
                            <Checkbox
                              field={'name_is_primary'}
                              className={style.Checkbox}
                              disabled={disabled}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="name">Agency Name Transliteration</Label>
                            <FormTextField
                              field={'name_transliterated'}
                              placeholder={'Enter agency name transliteration'}
                              disabled={disabled}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={10}>
                          <FormGroup>
                            <Label for="name">Agency Acronym</Label>
                            <FormTextField
                              field={'acronym'}
                              placeholder={'Enter agency acronym'}
                              disabled={disabled}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                            <Label for="acronym_is_primary">Primary</Label>
                            <Checkbox
                              field={'acronym_is_primary'}
                              className={style.Checkbox}
                              disabled={disabled}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="name">Agency Acronym Transliteration</Label>
                            <FormTextField
                              field={'acronym_transliterated'}
                              placeholder={'Enter agency acronym transliteration'}
                              disabled={disabled}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </FormTextArrayField>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="name_note">Name Note</Label>
                      <TextArea
                        field={'name_note'}
                        placeholder={disabled ? "" : 'Enter note, as applicable'}
                        className={'form-control'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {
                  nameType === 'former' ?
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="name_valid_to" className={'required'}>Valid To</Label>
                          <FormDatePickerField
                            field={'name_valid_to'}
                            placeholderText={'YYYY-MM-DD'}
                            disabled={disabled}
                            validate={validateRequiredDate}
                          />
                        </FormGroup>
                      </Col>
                    </Row> : ''
                }
              </ModalBody>
              <ModalFooter className={'justify-content-between'}>
                <Button
                  color="secondary"
                  type={'button'}
                  onClick={this.props.onToggle}
                  size="sm"
                >
                  Close
                </Button>
                { disabled ? "" :
                  <Button
                    color="primary"
                    type={'button'}
                    onClick={this.submitForm}
                    size="sm"
                  >
                    Save
                  </Button>
                }
              </ModalFooter>
            </React.Fragment>
          )}
        </Form>
      </Modal>
    )
  }
}

NamePopupForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  formValue: PropTypes.object,
  formIndex: PropTypes.number,
  nameType: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default NamePopupForm;
