import React, {Component} from 'react';
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import PropTypes from 'prop-types';
import {Form, Checkbox} from 'informed';
import FormSelectField from "../../../components/FormFields/FormSelectField";
import FormDatePickerField from "../../../components/FormFields/FormDatePickerField";
import country from "../../../services/Country";
import style from "./FocusCountryPopupForm.module.css";
import cx from 'classnames';
import {validateDate, validateDateFrom, validateRequired} from "../../../utils/validators";

class FocusCountryPopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryOptions: [],
    }
  }

  componentDidMount() {
    this.populateCountry();
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
  populateCountry = () => {
    country.select().then((response) => {
      this.setState({
        countryOptions: response.data
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
    const {countryOptions} = this.state;

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
                      <Label for="country" className={'required'}>Country</Label>
                      <FormSelectField
                        field={'country'}
                        options={countryOptions}
                        placeholder={'Please select'}
                        labelField={'name_english'}
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
                      <Label for="country_is_official">Official</Label>
                      <Checkbox
                        field={'country_is_official'}
                        className={cx(style.Checkbox, 'form-control')}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="country_is_crossborder">Crossborder</Label>
                      <Checkbox
                        field={'country_is_crossborder'}
                        className={cx(style.Checkbox, 'form-control')}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="country_valid_from" className={'required'}>Valid From</Label>
                      <FormDatePickerField
                        field={'country_valid_from'}
                        placeholderText={'YYYY-MM-DD'}
                        disabled={disabled}
                        validate={(value) => validateDateFrom(value, formState.values.country_valid_to)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="country_valid_to">Valid To</Label>
                      <FormDatePickerField
                        field={'country_valid_to'}
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

FocusCountryPopupForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  formValue: PropTypes.object,
  formIndex: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default FocusCountryPopupForm;
