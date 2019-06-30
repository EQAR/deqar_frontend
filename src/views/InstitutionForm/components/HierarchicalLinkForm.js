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
import Select from 'react-select';

import FormDatePickerField from "../../../components/FormFields/FormDatePickerField";
import FormTextArea from "../../../components/FormFields/FormTextArea";
import AssignedList from '../../../components/FormFieldsUncontrolled/AssignedList';
import InstitutionSelect from './InstitutionSelect';
import { validateRequired, validateDateFrom } from "../../../utils/validators";

class HierarchicalLinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relationShipTypes: [
        {
          label: 'Parent',
          value: 'parent'
        },
        {
          label: 'Child',
          value: 'child'
        }
      ],
      selectedOption: null
    }
  }

  onInstitutionSelected = (value) => {
    let institution = this.formApi.getValue('institution');
    const values = this.formApi.getState().values

    institution = {
      id: parseInt(value.id),
      name_primary: value.name_primary
    }

    this.formApi.setValues({...values, institution});
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

  renderInstitutions = value => value ? value.name_primary : null;

  changeLinkType = (value) => {
    const values = this.formApi.getState().values;
    this.formApi.setValues({...values, position: value.value});
  }

  getLinkValue = (formState) => (
    formState.values.position
    ? {value: formState.values.position, label: formState.values.position.charAt(0).toUpperCase() + formState.values.position.slice(1)}
    : null
  )

  render() {
    const { modalOpen, disabled, formIndex, fieldName } = this.props;
    const { relationShipTypes } = this.state;

    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex, fieldName)}
          id="hierarchical-link-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader toggle={this.onToggle}>{this.renderActionName()} Hierarchical Link</ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="former_name_official" className={'required'}>Relationship</Label>
                    <Select
                      options={relationShipTypes}
                      placeholder={'Please select'}
                      onChange={this.changeLinkType}
                      labelField={'acronym_primary'}
                      value={this.getLinkValue(formState)}
                      isDisabled={disabled}
                    />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col>
                    <FormGroup>
                      <Label for="former_name_official" className={'required'}>Institution Name, Official</Label>
                      {!disabled &&
                        <InstitutionSelect
                          onChange={this.onInstitutionSelected}
                        />
                      }
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <AssignedList
                        errors={formState.errors}
                        field={'institution'}
                        labelShowRequired={true}
                        renderDisplayValue={this.renderInstitutions}
                        values={[formState.values.institution]}
                        onRemove={() => null}
                        onClick={() => null}
                        validate={validateRequired}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="valid_from">Valid From</Label>
                      <FormDatePickerField
                        field={'valid_from'}
                        placeholderText={'YYYY-MM-DD'}
                        validate={(value) => validateDateFrom(value, formState.values.valid_to)}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="valid_to">Valid To</Label>
                      <FormDatePickerField
                        field={'valid_to'}
                        placeholderText={'YYYY-MM-DD'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="name_english">Relationship Note</Label>
                      <FormTextArea
                        field={'relationship_note'}
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
                {!disabled &&
                  <Button
                    color="primary"
                    type={'button'}
                    onClick={this.submitForm}
                  >
                    Add Link
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

HierarchicalLinkForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  formValue: PropTypes.object,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default HierarchicalLinkForm;
