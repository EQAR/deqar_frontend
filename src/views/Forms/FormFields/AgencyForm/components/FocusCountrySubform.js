import React from 'react';
import {Col, FormGroup, Label, Row} from "reactstrap";
import {validateDate, validateDateFromRequired, validateRequired} from "../../../../../utils/validators";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import country from "../../../../../services/Country";
import FormCheckbox from "../../../../../components/FormFields/FormCheckbox/FormCheckbox";

const FocusCountrySubform = ({formApi, formState, disabled}) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="country" className={'required'}>Country</Label>
            <FormSelectField
              field={'country'}
              optionsAPI={country.select}
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
            <FormCheckbox
              field={'country_is_official'}
              disabled={disabled}
              className={'form-control'}
              style={{display: 'block', marginTop: 0, marginLeft: '10px'}}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="country_is_crossborder">Crossborder</Label>
            <FormCheckbox
              field={'country_is_crossborder'}
              disabled={disabled}
              className={'form-control'}
              style={{display: 'block', marginTop: 0, marginLeft: '10px'}}
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
              validate={(value) => validateDateFromRequired(
                value,
                formState.values.country_valid_to,
                "Country valid from date should be earlier than valid to date!"
              )}
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
    </React.Fragment>
  )
};

export default withPopupFormManager(FocusCountrySubform);
