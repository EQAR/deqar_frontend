import React from 'react';
import {Col, FormGroup, Label, Row} from "reactstrap";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import {TextArea} from "informed";
import FormManyMultipleField from "../../../../../components/FormFieldsUncontrolled/FormManyMultipleField/FormManyMultipleField";
import {
  validateMultipleRequiredDate,
  validateRequiredDate,
  validateRequiredUnique
} from "../../../../../utils/validators";
import validatePrimaryCheckbox from "../validators/validatePrimaryCheckbox";
import FormCheckbox from "../../../../../components/FormFields/FormCheckbox/FormCheckbox";
import FormTextTransliterated from "../../../../../components/FormFields/FormTextTransliterated/FormTextTransliterated";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";

const NameSubform = ({formApi, formState, formType}) => {
  const disabled = formType === 'view';

  return (
    <React.Fragment>
      <Row>
        <Col md={7}>
          <FormTextTransliterated
            label={'Agency Former Name, Primary'}
            formType={formType}
            formApi={formApi}
            values={formState.values.hasOwnProperty('former_primary_name') ? formState.values['former_primary_name'][0] : undefined}
            scopeName={'former_primary_name[0]'}
            counter={1}
            field={'name'}
            transliterationField={'name_transliterated'}
            readOnly={disabled}
          />
        </Col>
        <Col md={5}>
          <FormTextTransliterated
            label={'Agency Former Acronym, Primary'}
            formType={formType}
            formApi={formApi}
            values={formState.values.hasOwnProperty('former_primary_name') ? formState.values['former_primary_name'][0] : undefined}
            scopeName={'former_primary_name[0]'}
            counter={1}
            field={'acronym'}
            transliterationField={'acronym_transliterated'}
            readOnly={disabled}
          />
        </Col>
      </Row>
      <Row>
        <FormManyMultipleField
          label={'Agency Alternative Names / Acronyms'}
          deleteInRow={true}
          scopeName={'former_alternative_names'}
          formApi={formApi}
          data={formState.values['former_alternative_names']}
          disabled={disabled}
          extra={0}
          addButtonText={'Add Alternative Name / Acronym'}
          render={({counter, scope, data}) => (
            <React.Fragment>
              <Col md={7}>
                <FormTextTransliterated
                  labelDisabled={true}
                  repeat={true}
                  scopeName={scope}
                  formType={disabled ? 'view' : 'edit'}
                  formApi={formApi}
                  field={'name'}
                  values={data}
                  transliterationField={'name_transliterated'}
                />
              </Col>
              <Col md={4}>
                <FormTextTransliterated
                  labelDisabled={true}
                  repeat={true}
                  scopeName={scope}
                  formType={disabled ? 'view' : 'edit'}
                  formApi={formApi}
                  field={'acronym'}
                  values={data}
                  transliterationField={'acronym_transliterated'}
                />
              </Col>
            </React.Fragment>
          )}
        />
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="name_note">Name Note</Label>
            <TextArea
              field={'name_note'}
              placeholder={disabled ? "" : 'Enter note, as applicable'}
              className={'form-control'}
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
              validate={validateRequiredDate}
              disabled={disabled}
            />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default withPopupFormManager(NameSubform);
