import React from 'react';
import {Col, FormGroup, Label, Row} from "reactstrap";
import {validateDate, validateDateFromRequired, validateRequired, validateURL} from "../../../../../utils/validators";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";

const QAARegulationsSubform = ({formApi, formState, disabled}) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="regulation" className={'required'}>Regulation</Label>
            <FormTextField
              field={'regulation'}
              disabled={disabled}
              validate={validateRequired}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="regulation_url">Regulation URL</Label>
            <FormTextField
              field={'regulation_url'}
              disabled={disabled}
              validate={validateURL}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="regulation_valid_from" className={'required'}>Regulation Valid From</Label>
            <FormDatePickerField
              field={'regulation_valid_from'}
              placeholderText={'YYYY-MM-DD'}
              disabled={disabled}
              validate={(value) => validateDateFromRequired(value, formState.values.regulation_valid_from)}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="regulation_valid_to">Regulation Valid To</Label>
            <FormDatePickerField
              field={'regulation_valid_to'}
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

export default withPopupFormManager(QAARegulationsSubform);
