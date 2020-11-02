import React from 'react';
import {Col, FormGroup, Label, Row} from "reactstrap";
import {validateDate, validateDateFromRequired, validateRequired} from "../../../../../utils/validators";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import list from "../../../../../services/List";
import FormTextArea from "../../../../../components/FormFields/FormTextArea/FormTextArea";

const QARequirmentsSubform = ({formApi, formState, disabled, submitDisabled, formType}) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="qa_requirement" className={'required'}>QA Requriement</Label>
            <FormTextField
              field={'qa_requirement'}
              disabled={disabled}
              validate={validateRequired}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="qa_requirement_type" className={'required'}>QA Requirement Type</Label>
            <FormSelectField
              field={'qa_requirement_type'}
              optionsAPI={list.selectQARequirementType}
              placeholder={'Please select'}
              labelField={'qa_requirement_type'}
              valueField={'id'}
              disabled={disabled}
              validate={validateRequired}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="qa_requirement_note">QA Requirement Note</Label>
            <FormTextArea
              field={'qa_requirement_note'}
              disabled={disabled}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="requirement_valid_from" className={'required'}>Requirement Valid From</Label>
            <FormDatePickerField
              field={'requirement_valid_from'}
              placeholderText={'YYYY-MM-DD'}
              disabled={disabled}
              validate={(value) => validateDateFromRequired(
                value,
                formState.values.requirement_valid_to,
                "Requirement valid from date should be earlier than valid to date!"
                )}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="requirement_valid_to">Requirement Valid To</Label>
            <FormDatePickerField
              field={'requirement_valid_to'}
              placeholderText={'YYYY-MM-DD'}
              disabled={disabled}
              validate={validateDate}
            />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default withPopupFormManager(QARequirmentsSubform);
