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
  Collapse,
  Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Form, Scope} from 'informed';

import FormTextField from '../../../components/FormFields/FormTextField';
import FormDatePickerField from '../../../components/FormFields/FormDatePickerField';
import FormTextArea from '../../../components/FormFields/FormTextArea';
import { validateRequired, validateRoman, validateMultipleRequiredDate } from '../../../utils/validators';
import style from './Components.module.css';

class FormerNameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alternativeNameCount: 0,
    }
  }

  setFormApi = (formApi) => {
    const { formValue } = this.props;
    this.formApi = formApi;

    if (formValue) {
      this.formApi.setValues(formValue);
      this.setState({
        alternativeNameCount: formValue.alternative_names ? formValue.alternative_names.length : 0
      })
    }

  }

  submitForm = () => {
    this.formApi.submitForm();
  }

  onToggle = () => {
    this.setState({
      alternativeNameCount: 0
    });
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

  renderAlternativeNames = () => {
    const { alternativeNameCount } = this.state;
    const { disabled } = this.props;
    const count = Array.apply(null, {length: alternativeNameCount}).map(Number.call, Number);

    return count.map((c, idx) => {
      const scopeName = `alternative_names[${idx}]`;
      return (
        <React.Fragment key={idx}>
          <Scope scope={scopeName}>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="name">Alternative Institution Name # {c+1}</Label>
                  <FormTextField
                    field={'name'}
                    placeholder={'Enter alternative institution name'}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Scope>
        </React.Fragment>
      )
    });
  }

  onAddButtonClick = () => {
    const { alternativeNameCount } = this.state;

    if (alternativeNameCount !== 0) {
      let altNames = this.formApi.getValue('alternative_names') || [{}];
      const lastAltName = altNames.slice(-1).pop();

      if (lastAltName) {
        if ('name' in lastAltName) {
          if (lastAltName.name.length > 0) {
            this.setState({alternativeNameCount: alternativeNameCount + 1})
          }
        }
      }
    } else {
      this.setState({alternativeNameCount: alternativeNameCount + 1})
    }
  }

  render() {
    const { modalOpen, disabled, formIndex, fieldName, formerNames } = this.props;
    const { alternativeNameCount } = this.state;

    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex, fieldName)}
          id={`former-name-form-${formIndex}`}
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader>{this.renderActionName()} Former Name</ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="former_name_official" className={'required'}>Institution Name, Official</Label>
                      <FormTextField
                        field={'name_official'}
                        placeholder={'Enter official institution name'}
                        validate={validateRequired}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="name_official_transliterated">Institution Name, Transliterated</Label>
                      <FormTextField
                        field={'name_official_transliterated'}
                        placeholder={'Enter transliterated form'}
                        disabled={disabled}
                        validate={validateRoman}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="name_english">Institution Name, English</Label>
                      <FormTextField
                        field={'name_english'}
                        placeholder={'Enter english form'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                  <Collapse isOpen={alternativeNameCount > 0}>
                    {this.renderAlternativeNames()}
                  </Collapse>
                  {disabled ? "" :
                    <Row>
                      <Col md={12}>
                        <div className="pull-right">
                          <Button
                            type={'button'}
                            size="sm"
                            color="secondary"
                            onClick={this.onAddButtonClick}
                          >Add Alternative Name</Button>
                        </div>
                      </Col>
                    </Row>
                  }
                <Row>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="acronym">Institution Acronym</Label>
                      <FormTextField
                        field={'acronym'}
                        placeholder={'Enter acronym'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                    <Label for="valid_to" className={'required'}>Valid To</Label>
                      <FormDatePickerField
                        field={'name_valid_to'}
                        placeholderText={'YYYY-MM-DD'}
                        validate={value => validateMultipleRequiredDate(value, formerNames)}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                    <Label for="name_english">Name source Note</Label>
                      <FormTextArea
                        field={'name_source_note'}
                        placeholder={'Enter name source information'}
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
                {!disabled ?
                  <Button
                    color="primary"
                    type={'button'}
                    onClick={this.submitForm}
                  >
                    Add Name
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

FormerNameForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  formValue: PropTypes.object,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  formerNames: PropTypes.array
}

export default FormerNameForm;
