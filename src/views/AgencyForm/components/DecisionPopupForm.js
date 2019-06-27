import React, {Component} from 'react';
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import PropTypes from 'prop-types';
import {Form} from 'informed';
import FormSelectField from "../../../components/FormFields/FormSelectField";
import list from "../../../services/List";
import FormDatePickerField from "../../../components/FormFields/FormDatePickerField";
import {validateRequired, validateRequiredDate} from "../../../utils/validators";

class MembershipPopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decisionTypeOptions: [],
    }
  }

  componentDidMount() {
    this.populateDecisionType();
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
  populateDecisionType = () => {
    list.selectDecisions().then((response) => {
      this.setState({
        decisionTypeOptions: response.data
      })
    })
  };

  onToggle = () => {
    this.props.onToggle();
  };

  getFileDisplay = (field, label) => {
    const { disabled, formValue } = this.props;

    if(disabled) {
      if(formValue) {
        return(
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for={field}>Current {label}</Label>
                <div>
                  <a href={formValue[field]} target={'new'}>Check {label} file from DEQAR.</a>
                </div>
              </FormGroup>
            </Col>
          </Row>
        )
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
    const {decisionTypeOptions} = this.state;

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
                  <Col md={6}>
                    <FormGroup>
                      <Label for="decision_date" className={'required'}>Date</Label>
                      <FormDatePickerField
                        field={'decision_date'}
                        placeholderText={'YYYY-MM-DD'}
                        disabled={disabled}
                        validate={validateRequiredDate}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="decision_type" className={'required'}>Decision Type</Label>
                      <FormSelectField
                        field={'decision_type'}
                        options={decisionTypeOptions}
                        placeholder={'Please select'}
                        labelField={'type'}
                        valueField={'id'}
                        disabled={disabled}
                        validate={validateRequired}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {this.getFileDisplay('decision_file', 'Decision File')}
                {this.getFileDisplay('decision_file_extra', 'Extra File')}
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
