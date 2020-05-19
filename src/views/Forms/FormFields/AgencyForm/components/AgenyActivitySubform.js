import React from 'react';
import {Col, FormGroup, Label, Row} from "reactstrap";
import {validateDate, validateDateFromRequired, validateRequired, validateURL} from "../../../../../utils/validators";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import agency from "../../../../../services/Agency";

const AgencyActivitySubform = ({formApi, formState, disabled, submitDisabled, formType}) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="activity" className={'required'}>Activity</Label>
            <FormTextField
              field={'activity'}
              placeholderText={'Enter full activity name'}
              disabled={disabled}
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
              optionsAPI={agency.selectActivityType}
              placeholder={'Please select'}
              labelField={'type'}
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
            <Label for="activity_description">Short Display Form</Label>
            <FormTextField
              field={'activity_description'}
              placeholderText={'Enter short display form of name'}
              disabled={disabled}
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
              disabled={formType === 'view'}
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
              disabled={disabled}
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
              disabled={disabled}
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
              disabled={disabled}
              validate={validateDate}
            />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default withPopupFormManager(AgencyActivitySubform);
