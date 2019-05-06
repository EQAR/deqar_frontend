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

import FormDatePickerField from "../../../components/FormFields/FormDatePickerField";
import FormTextArea from "../../../components/FormFields/FormTextArea";
import FormSelectField from '../../../components/FormFields/FormSelectField';
import InstitutionSelect from './InstitutionSelect';
import Institution from '../../../services/Institution';


class HistoricalLinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      institutions: null
    }
  }

  onInstitutionSelected = (value) => {
    let institutions = this.formApi.getValue('institutions');

    if (institutions) {
      const institution_ids = institutions.map(i => i.id);
      if (!(institution_ids.includes(value.id))) {
        institutions.push(value)
      }
    } else {
      institutions = [value]
    }
    this.formApi.setValue('institutions', institutions);
  };

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
    const { modalOpen, disabled, formIndex } = this.props;
    const { institutions } = this.state;

    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex)}
          id="alternative-name-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader toggle={this.onToggle}>Add Historical Link</ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="former_name_official" className={'required'}>Relationship</Label>
                    <FormSelectField
                      field={`identifiers`}
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
                    <Label for="former_name_official" className={'required'}>Institution Name, Official</Label>
                    <InstitutionSelect
                      onChange={this.onInstitutionSelected}
                    />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="founding_date">Date</Label>
                      <FormDatePickerField
                        field={'founding_date'}
                        placeholderText={'YYYY-MM-DD'}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="name_english">Relationship Note</Label>
                      <FormTextArea
                        field={'identifier'}
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

HistoricalLinkForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  formValue: PropTypes.object,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default HistoricalLinkForm;
