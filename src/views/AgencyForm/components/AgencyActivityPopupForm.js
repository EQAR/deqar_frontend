import React, {Component} from 'react';
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import PropTypes from 'prop-types';
import {Form} from 'informed';
import FormSelectField from "../../../components/FormFields/FormSelectField";
import agency from "../../../services/Agency";
import FormDatePickerField from "../../../components/FormFields/FormDatePickerField";
import FormTextField from "../../../components/FormFields/FormTextField";
import {
  validateDate,
  validateDateFromRequired,
  validateRequired,
  validateURL
} from "../../../utils/validators";
import {withRouter} from "react-router-dom";

class AgencyActivityPopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityTypeOptions: [],
      currentDecisionFiles: [],
      extraDecisionFiles: []
    }
  }

  componentDidMount() {
    this.populateActivityType();
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
  populateActivityType = () => {
    agency.selectActivityType().then((response) => {
      this.setState({
        activityTypeOptions: response.data
      })
    })
  };

  onToggle = () => {
    this.props.onToggle();
  };

  isReadOnly = () => {
    const {userIsAdmin, location, disabled} = this.props;
    const path = location.pathname;

    if (path.includes('my-agency')) {
      return true
    } else {
      if (userIsAdmin) {
        return disabled
      } else {
        return true
      }
    }
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
    const {activityTypeOptions} = this.state;

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
                      <Label for="activity" className={'required'}>Activity</Label>
                      <FormTextField
                        field={'activity'}
                        placeholderText={'Enter full activity name'}
                        disabled={this.isReadOnly()}
                        validate={validateRequired}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="activity_type" className={'required'}>Activity Type</Label>
                      <FormSelectField
                        field={'activity_type'}
                        options={activityTypeOptions}
                        placeholder={'Please select'}
                        labelField={'type'}
                        valueField={'id'}
                        disabled={this.isReadOnly()}
                        validate={validateRequired}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="activity_description">Short Display Form</Label>
                      <FormTextField
                        field={'activity_description'}
                        placeholderText={'Enter short display form of name'}
                        disabled={this.isReadOnly()}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="activity_local_identifier">Activity Local ID</Label>
                      <FormTextField
                        field={'activity_local_identifier'}
                        placeholderText={'Enter local ID for activity'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="reports_link">Documentation link</Label>
                      <FormTextField
                        field={'reports_link'}
                        placeholderText={'Enter URL'}
                        disabled={this.isReadOnly()}
                        validate={validateURL}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="activity_valid_from" className={'required'}>Valid From</Label>
                      <FormDatePickerField
                        field={'activity_valid_from'}
                        placeholderText={'YYYY-MM-DD'}
                        disabled={this.isReadOnly()}
                        validate={(value) => validateDateFromRequired(value, formState.values.activity_valid_to)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="activity_valid_to">Valid To</Label>
                      <FormDatePickerField
                        field={'activity_valid_to'}
                        placeholderText={'YYYY-MM-DD'}
                        disabled={this.isReadOnly()}
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

AgencyActivityPopupForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  formValue: PropTypes.object,
  formIndex: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default withRouter(AgencyActivityPopupForm);
