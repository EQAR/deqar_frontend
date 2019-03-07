import React, { Component } from 'react';
import {
  Button,
  Col,
  Collapse,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row} from "reactstrap";
import PropTypes from 'prop-types';
import {
  Form,
  Scope} from 'informed';

import FormTextField from "../../../components/FormFields/FormTextField";
import { validateRequired } from "../../../utils/validators";

class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  setFormApi = (formApi) => {
    const { formValue } = this.props;
    this.formApi = formApi;

    if (formValue) {
      this.formApi.setValues(formValue[0]);
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

    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex)}
          id="country-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader toggle={this.onToggle}>Geographic Location</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="country" className="required">Country</Label>
                      <FormTextField
                        field={'country.name_english'}
                        placeholder={'Enter country'}
                        validate={validateRequired}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="city">City</Label>
                      <FormTextField
                        field={'city'}
                        placeholder={'Enter city'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="lat">Latitude</Label>
                      <FormTextField
                        field={'lat'}
                        placeholder={'Enter latitude'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="city">Longitude</Label>
                      <FormTextField
                        field={'long'}
                        placeholder={'Enter longitude'}
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

LocationForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  formValue: PropTypes.array,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default LocationForm;
