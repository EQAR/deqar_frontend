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
  Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Form } from 'informed';
import { connect } from 'react-redux';

import { validateRequired, validateDateFrom, validateDate } from '../../../../../utils/validators';
import FormTextField from '../../../../../components/FormFields/FormTextField/FormTextField';
import FormDatePickerField from '../../../../../components/FormFields/FormDatePickerField/FormDatePickerField';
import FormTextArea from '../../../../../components/FormFields/FormTextArea/FormTextArea';
import FormSelectField from '../../../../../components/FormFields/FormSelectField';
import agency from '../../../../../services/Agency';
import style from './Components.module.css';



class LocalIdForm extends Component {
  constructor(props) {
    super(props);
    this._isMounted = true;

    this.state = {
      agencies: []
    }
  }

  componentDidMount = () => {
    const { isAdmin } = this.props;

    isAdmin
    ? agency.getAgencies().then((response, error) => this.setState({agencies: response.data}))
    : agency.selectMySubmissionAgency().then((response, error) => this.setState({agencies: response.data}));
  }

  componentWillUnmount = () => {
    this._isMounted = false;
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

  getAgencies = () => {
    const { localIDs } = this.props;
    const { agencies } = this.state;

    return localIDs
      ? agencies.map(agency => (
        localIDs.find(id => (
          id.agency.id === agency.id))
          ? {...agency, isDisabled: true}
          : agency
        )
      )
      : agencies
  }

  render() {
    const { modalOpen, formIndex, fieldName, disabled } = this.props;

    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex, fieldName)}
          id="local-id-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader>{this.renderActionName()} Local ID</ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="agency" className={'required'}>Agency</Label>
                    <FormSelectField
                      field={'agency'}
                      options={this.getAgencies()}
                      placeholder={'Please select'}
                      labelField={'acronym_primary'}
                      valueField={'id'}
                      validate={validateRequired}
                      disabled={disabled}
                    />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="local-id" className={'required'}>Locale Identifier</Label>
                      <FormTextField
                        field={'identifier'}
                        placeholder={'Enter local ID'}
                        validate={validateRequired}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="valid-from">Valid From</Label>
                      <FormDatePickerField
                        field={'identifier_valid_from'}
                        placeholderText={'YYYY-MM-DD'}
                        disabled={disabled}
                        validate={(value) => validateDateFrom(value, formState.values.identifier_valid_to)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="valid-to">Valid To</Label>
                      <FormDatePickerField
                        field={'identifier_valid_to'}
                        placeholderText={'YYYY-MM-DD'}
                        validate={validateDate}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="id-note">Identifier Note</Label>
                      <FormTextArea
                        field={'note'}
                        placeholder={'Enter identifier information'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter className={style.modaFooterJustify}>
                <Button
                  color="secondary"
                  type={'button'}
                  onClick={this.props.onToggle}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  type={'button'}
                  onClick={this.submitForm}
                >
                  Add ID
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

const mapStateToProps = (state) => {
  return {isAdmin: state.user.is_admin}
}

export default connect(mapStateToProps)(LocalIdForm);
