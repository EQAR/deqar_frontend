import React from 'react';
import {Col, FormGroup, Label, Row} from "reactstrap";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import {TextArea} from "informed";
import FormManyMultipleField from "../../../../../components/FormFieldsUncontrolled/FormManyMultipleField/FormManyMultipleField";
import {validateRequiredUnique} from "../../../../../utils/validators";
import validatePrimaryCheckbox from "../validators/validatePrimaryCheckbox";
import FormCheckbox from "../../../../../components/FormFields/FormCheckbox/FormCheckbox";

const NameSubform = ({formApi, formState, formType}) => {
  const disabled = formType === 'view';

  const onCheckboxClick = (field, index, checked) => {
    if (checked) {
      const values = formState.values;
      if (values.hasOwnProperty('agency_name_versions')) {
        values['agency_name_versions'].forEach((value, idx) => {
          if (idx+1 !== index) {
            value[field] = false
          }
        });
        formApi.setValues(values);
      }
    }
  };

  return (
    <React.Fragment>
      <Row>
        <FormManyMultipleField
          scopeName={'agency_name_versions'}
          formApi={formApi}
          data={formState.values['agency_name_versions']}
          disabled={disabled}
          render={({counter}) => (
            <React.Fragment>
              <Col md={10}>
                <FormGroup>
                  <Label for="name">Agency Name</Label>
                  <FormTextField
                    field={'name'}
                    placeholder={'Agency Name'}
                    disabled={disabled}
                    validate={(value) => validateRequiredUnique(
                      value,
                      ['name', 'agency_name_versions.name'],
                      formState.values
                    )}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="name_is_primary">Primary</Label>
                  <FormCheckbox
                    onClick={(e) => onCheckboxClick('name_is_primary', counter, e.target.checked)}
                    field={'name_is_primary'}
                    disabled={disabled}
                    validate={(value, values) => validatePrimaryCheckbox(values, 'name_is_primary')}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <FormTextField
                    field={'name_transliterated'}
                    placeholder={'Agency Name Transliteration'}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col md={10}>
                <FormGroup>
                  <Label for="name">Agency Acronym</Label>
                  <FormTextField
                    field={'acronym'}
                    placeholder={'Enter agency acronym'}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="acronym_is_primary">Primary</Label>
                  <FormCheckbox
                    onClick={(e) => onCheckboxClick('acronym_is_primary', counter, e.target.checked)}
                    field={'acronym_is_primary'}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col md={10}>
                <FormGroup>
                  <FormTextField
                    field={'acronym_transliterated'}
                    placeholder={'Agency Acronym Transliteration'}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
            </React.Fragment>
          )}
        />
      </Row>
      <Row>
        <Col md={12}>
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
      </Row>
    </React.Fragment>
  )
};

export default withPopupFormManager(NameSubform);
