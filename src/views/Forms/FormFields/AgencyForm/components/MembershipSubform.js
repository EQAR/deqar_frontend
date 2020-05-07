import React from 'react';
import {Col, FormGroup, Label, Row} from "reactstrap";
import {validateDate, validateDateFromRequired, validateRequired} from "../../../../../utils/validators";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import list from "../../../../../services/List";

const MembershipSubform = ({formApi, formState, disabled}) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="association" className={'required'}>Association</Label>
            <FormSelectField
              field={'association'}
              optionsAPI={list.selectAssociations}
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
              validate={(value) => validateDateFromRequired(value, formState.values.activity_valid_to)}
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
    </React.Fragment>
  )
};

export default withPopupFormManager(MembershipSubform);
