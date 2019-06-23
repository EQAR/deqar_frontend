import React, {Component} from 'react';
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import PropTypes from 'prop-types';
import {Form, Scope, Checkbox, TextArea, Text} from 'informed';
import FormTextField from "../../../components/FormFields/FormTextField";
import style from './NamePopupForm.module.css';
import FormTextArrayField from "../../../components/FormFieldsUncontrolled/FormTextArrayField";

class NamePopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVersionCount: 0,
    }
  }

  setFormApi = (formApi) => {
    const { formValue } = this.props;
    this.formApi = formApi;
    if(formValue) {
      this.formApi.setValues(formValue);
      if('agency_name_versions' in formValue) {
        this.setState({
          nameVersionCount: formValue['agency_name_versions'].length
        })
      }
    }
  };

  // Submit the form
  submitForm = () => {
    this.formApi.submitForm();
  };

  // Populate selects

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

  renderNameVersions = () => {
    const {nameVersionCount} = this.state;
    const {disabled} = this.props;
    const count = Array.apply(null, {length: nameVersionCount}).map(Number.call, Number);

    return count.map((c, idx) => {
      const scopeName = `agency_name_versions[${idx}]`;
      return(
        <React.Fragment key={idx}>
          <Scope scope={scopeName}>
            <Row>
              <Col md={10}>
                <FormGroup>
                  <Label for="name">Agency Name # {c+1}</Label>
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
            </Row>
          </Scope>
        </React.Fragment>
      )
    });
  };

  render() {
    const {modalOpen, title, disabled, formIndex} = this.props;
    const {nameVersionCount, nameTransliteratedCount, acronymTransliteratedCount} = this.state;

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
                    {titleText}
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
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default NamePopupForm;
