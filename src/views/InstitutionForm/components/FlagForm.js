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
import Select from 'react-select';

import FormTextArea from '../../../components/FormFields/FormTextArea';
import agency from '../../../services/Agency';
import { validateRequired } from '../../../utils/validators';
import style from './Components.module.css';

class FlagForm extends Component {
  constructor(props) {
    super(props);
    this._isMounted = true;
    this.state = {
      agencies: null,
      flags: [
        {label: 'low level', value: 'low level'},
        {label: 'high level', value: 'high level'}
      ]
    }
  }

  componentDidMount = () => {
    agency.selectMySubmissionAgency().then((response, error) => this.setState({agencies: response.data}));
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  setFormApi = (formApi) => {
    const { formValue } = this.props;

    this.setState({
      selectValue: formValue ? {value: formValue.flag} : null
    })

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

  onChange = (value) => {
    const values = this.formApi.getState().values
    this.formApi.setValues({...values, flag: value.value})
    this.setState({
      selectValue: value
    })
  }

  selectValue = (formState) => (
    formState.values.flag
    ? {value: formState.values.flag, label: formState.values.flag}
    : null
  )

  renderActionName = () => {
    const { formIndex } = this.props;
    let action = '';

    if (Number.isInteger(formIndex)) {
      action = ''
    } else {
      action = 'Add'
    }

    return action;
  }

  render() {
    const { modalOpen, formIndex } = this.props;
    const { flags } = this.state;

    return(
      <Modal isOpen={modalOpen}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex)}
          id="flag-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader>{this.renderActionName()} Flag</ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="request" className={'required'}>Request</Label>
                      <Select
                        options={flags}
                        placeholder={'Please select'}
                        onChange={this.onChange}
                        value={this.selectValue(formState)}
                        validate={validateRequired}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="flag_message" className={'required'}>Explanation</Label>
                      <FormTextArea
                        field={'flag_message'}
                        placeholder={'Enter explanation, justification or description'}
                        validate={validateRequired}
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
                  Add Flag
                </Button>
              </ModalFooter>
            </React.Fragment>
          )}
          </Form>
      </Modal>
    )
  }
}

FlagForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  formValue: PropTypes.object,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default FlagForm;
