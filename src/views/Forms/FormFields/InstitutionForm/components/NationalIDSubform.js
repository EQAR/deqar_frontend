import React from "react";
import {Col, FormGroup, Label, ModalBody, Row} from "reactstrap";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import {
  validateDate,
  validateDateFrom,
  validateRequired,
} from "../../../../../utils/validators";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import FormTextArea from "../../../../../components/FormFields/FormTextArea/FormTextArea";

const LocalIDSubform = ({formApi, formState, formType}) => {
  const disabled = formType === 'view';

  return (
    <React.Fragment>
      <FormTextField
        field={'resource'}
        hidden={true}
        initialValue={'national identifier'}
      />
      <Row>
        <Col>
          <FormGroup>
            <Label for="identifier" className={'required'}>National Identifier</Label>
            <FormTextField
              field={'identifier'}
              placeholder={'Enter national identifier'}
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
              validate={(value) => validateDateFrom(value, formState.values['identifier_valid_to'])}
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
    </React.Fragment>
  )
};

export default withPopupFormManager(LocalIDSubform);
