import React from "react";
import {Col, FormGroup, Label, Row} from "reactstrap";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import {
  validateDate,
  validateDateFrom,
  validateRequired,
} from "../../../../../utils/validators";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import FormTextArea from "../../../../../components/FormFields/FormTextArea/FormTextArea";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import agency from "../../../../../services/Agency";

const LocalIDSubform = ({formApi, formState, disabled}) => {
  return (
    <React.Fragment>
      <FormTextField
        field={'resource'}
        hidden={true}
        initialValue={'local identifier'}
      />
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="agency" className={'required'}>Agency</Label>
            <FormSelectField
              field={'agency'}
              placeholder={'Select agency...'}
              optionsAPI={agency.selectMySubmissionAgency}
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
            <Label for="identifier" className={'required'}>Local Identifier</Label>
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
            <Label for="identifier_valid_from">Valid From</Label>
            <FormDatePickerField
              field={'identifier_valid_from'}
              placeholderText={'YYYY-MM-DD'}
              disabled={disabled}
              validate={(value) => validateDateFrom(value, formState.values['identifier_valid_to'])}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="identifier_valid_to">Valid To</Label>
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
            <Label for="note">Identifier Note</Label>
            <FormTextArea
              field={'note'}
              placeholder={'Enter identifier information'}
              disabled={disabled}
            />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default withPopupFormManager(LocalIDSubform);
