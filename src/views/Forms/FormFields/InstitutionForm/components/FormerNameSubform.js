import React from "react";
import {Col, FormGroup, Label, Row} from "reactstrap";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import {validateMultipleRequiredDate, validateRequired, validateRoman} from "../../../../../utils/validators";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormManyTextField from "../../../../../components/FormFields/FormManyTextField/FormManyTextField";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import FormTextArea from "../../../../../components/FormFields/FormTextArea/FormTextArea";
import FormTextTransliterated from "../../../../../components/FormFields/FormTextTransliterated/FormTextTransliterated";

const FormerNameSubform = ({formApi, formState, disabled}) => {
  return (
    <React.Fragment>
      <FormTextTransliterated
        label={'Institution Former Name, Official'}
        formType={disabled ? 'view' : 'edit'}
        formApi={formApi}
        field={'name_official'}
        transliterationField={'name_official_transliterated'}
        readOnly={disabled}
      />
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
      <Row>
        <Col md={12}>
          <FormGroup>
            <FormManyTextField
              label={'Alternative Institution Name'}
              data={formState.values['alternative_names']}
              scopeName={'alternative_names'}
              field={'name'}
              required={false}
              disabled={disabled}
              formApi={formApi}
              addButtonText={'Add Alternative Name'}
              extra={0}
              placeholder={'Enter alternative institution name'}
              validate={validateRequired}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for={'acronym'}>Institution Acronym</Label>
            <FormTextField
              field={'acronym'}
              disabled={disabled}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="valid_to" className={'required'}>Valid To</Label>
            <FormDatePickerField
              field={'name_valid_to'}
              placeholderText={'YYYY-MM-DD'}
              validate={value => validateMultipleRequiredDate(value, formState.values['former_names'])}
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
    </React.Fragment>
  )
};

export default withPopupFormManager(FormerNameSubform);
