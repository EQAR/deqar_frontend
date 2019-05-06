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
import FormSelectField from '../../../components/FormFields/FormSelectField';
import agency from '../../../services/Agency';


class LocalIdForm extends Component {
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
    const { agencies } = this.state;

    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex)}
          id="alternative-name-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader toggle={this.onToggle}>Add Local ID</ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="former_name_official" className={'required'}>Agency</Label>
                    <FormSelectField
                      field={`identifiers`}
                      options={agencies}
                      placeholder={'Please select...'}
                      labelField={'acronym_primary'}
                      valueField={'id'}
                    />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="name_official_transliterated">Locale Identifier</Label>
                      <FormTextField
                        field={'names[0].name_official_transliterated'}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="founding_date">Valif From</Label>
                      <FormDatePickerField
                        field={'founding_date'}
                        placeholderText={'YYYY-MM-DD'}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="closing_date">Valid To</Label>
                      <FormDatePickerField
                        field={'closing_date'}
                        placeholderText={'YYYY-MM-DD'}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="name_english">Identifier Note</Label>
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

LocalIdForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  formValue: PropTypes.object,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default LocalIdForm;
