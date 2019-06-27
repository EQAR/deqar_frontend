import React, {Component} from 'react';
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import PropTypes from 'prop-types';
import {Form} from 'informed';
import FormSelectField from "../../../components/FormFields/FormSelectField";
import list from "../../../services/List";
import FormDatePickerField from "../../../components/FormFields/FormDatePickerField";
import {validateDate, validateDateFrom, validateRequired} from "../../../utils/validators";

class MembershipPopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      associationOptions: [],
    }
  }

  componentDidMount() {
    this.populateAssociations();
  }

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

  // Populate selects
  populateAssociations = () => {
    list.selectAssociations().then((response) => {
      this.setState({
        associationOptions: response.data
      })
    })
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
    const {modalOpen, title, disabled, formIndex} = this.props;
    const {associationOptions} = this.state;

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
                    <FormGroup>
                      <Label for="association" className={'required'}>Association</Label>
                      <FormSelectField
                        field={'association'}
                        options={associationOptions}
                        placeholder={'Please select'}
                        labelField={'association'}
                        valueField={'id'}
                        disabled={disabled}
                        validate={validateRequired}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="membership_valid_from" className={'required'}>Valid From</Label>
                      <FormDatePickerField
                        field={'membership_valid_from'}
                        placeholderText={'YYYY-MM-DD'}
                        disabled={disabled}
                        validate={(value) => validateDateFrom(value, formState.values.activity_valid_to)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="membership_valid_to">Valid To</Label>
                      <FormDatePickerField
                        field={'membership_valid_to'}
                        placeholderText={'YYYY-MM-DD'}
                        disabled={disabled}
                        validate={validateDate}
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

MembershipPopupForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  formValue: PropTypes.object,
  formIndex: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default MembershipPopupForm;
