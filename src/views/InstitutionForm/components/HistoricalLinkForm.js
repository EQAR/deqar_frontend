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
import InstitutionSelect from './InstitutionSelect';
import AssignedList from '../../../components/FormFieldsUncontrolled/AssignedList';
import institution from '../../../services/Institution'
import { validateRequired } from "../../../utils/validators";


class HistoricalLinkForm extends Component {
  constructor(props) {
    super(props);
    this._isMounted = true;

    this.state = {
      historicalRelationTypes: null,
    }
  }

  componentDidMount = () => {
    institution.getHistoricalRelationTypes().then(response => (
      this.setState({historicalRelationTypes: response.data}))
    )
  }

  componentWillUnmount = () => {
    this._isMounted = false;
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

  getLabel = (option) => option.relationship;

  getValue = (option) => option.relationship;

  changeLinkType = (value) => {
    const { historicalRelationTypes } = this.state;
    const values = this.formApi.getState().values

    this.formApi.setValues({
      ...values,
      relationship_type: {
        type_from: historicalRelationTypes.filter(
          t => t.relationship_type_id === value.relationship_type_id && t.institution_direction === 'source'
        )[0].relationship,
        type_to: historicalRelationTypes.filter(
          t => t.relationship_type_id === value.relationship_type_id && t.institution_direction === 'target'
        )[0].relationship,
        id: value.relationship_type_id
      },
      direction: value.institution_direction
    });
  }

  linkValue = (formState) => (
    formState.values.direction === 'source'
    ? {relationship: formState.values.relationship_type.type_from}
    : {relationship: formState.values.relationship_type.type_to}
  )

  getLinkValue = (formState) => formState.values.direction ? this.linkValue(formState) : null;

  render() {
    const { modalOpen, disabled, formIndex, fieldName } = this.props;
    const { historicalRelationTypes } = this.state;

    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex, fieldName)}
          id="historical-link-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader toggle={this.onToggle}>{this.renderActionName()} Historical Link</ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="former_name_official" className={'required'}>Relationship</Label>
                    <Select
                      options={historicalRelationTypes}
                      onChange={this.changeLinkType}
                      placeholder={'Select select multiple, if necessary'}
                      getOptionLabel={this.getLabel}
                      getOptionValue={this.getValue}
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
                    <Label for="founding_date">Date</Label>
                      <FormDatePickerField
                        field={'relationship_date'}
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
                {!disabled ?
                  <Button
                    color="primary"
                    type={'button'}
                    onClick={this.submitForm}
                  >
                    Add Link
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

HistoricalLinkForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  formValue: PropTypes.object,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default HistoricalLinkForm;
